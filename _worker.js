// _worker.js · Solo lo usa Cloudflare Pages. No lo borres ni le cambies el nombre.
//
// Para qué sirve:
// El iPhone (Safari) pide los videos por pedacitos y necesita que el servidor
// le conteste por pedacitos (respuesta 206). Cloudflare Pages siempre manda el
// archivo completo (respuesta 200), y por eso en iPhone los videos tardan o no cargan.
// Este archivo contesta por pedacitos SOLO a los videos.
// Todo lo demás (páginas, fotos, estilos, letras) pasa directo, igual que antes.
// GitHub Pages ignora este archivo.

const ES_VIDEO = /\.(mp4|m4v|mov)$/i;

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const metodo = request.method;
    const pidePedazo = request.headers.has('Range');
    if (!pidePedazo || !ES_VIDEO.test(pathname) || (metodo !== 'GET' && metodo !== 'HEAD')) {
      return env.ASSETS.fetch(request);
    }
    try {
      return await servirVideo(request, env, ctx);
    } catch (err) {
      // Si algo falla, se porta como si este archivo no existiera.
      return env.ASSETS.fetch(request);
    }
  },
};

async function servirVideo(request, env, ctx) {
  const rango = request.headers.get('Range');

  // Se pide el archivo completo (sin pedazos ni condiciones) y aquí se corta la parte pedida.
  const cab = new Headers(request.headers);
  ['Range', 'If-Range', 'If-None-Match', 'If-Modified-Since'].forEach((k) => cab.delete(k));
  const completo = await env.ASSETS.fetch(new Request(request.url, { method: 'GET', headers: cab }));
  const esVideo = /^video\//i.test(completo.headers.get('Content-Type') || '');
  if (completo.status !== 200 || !completo.body || !esVideo) return completo;

  // Regla del estándar: si el video cambió desde la última vez (If-Range), va completo.
  const ifRange = request.headers.get('If-Range');
  if (ifRange && ifRange !== completo.headers.get('ETag')) return aceptaPedazos(completo);

  let total = Number(completo.headers.get('Content-Length'));
  let bytes = null;
  if (!(total > 0) || completo.headers.get('Content-Encoding')) {
    bytes = new Uint8Array(await completo.arrayBuffer());
    total = bytes.byteLength;
  }

  const parte = leerRango(rango, total);
  if (parte === null) {
    // Pedido que no se entiende o de varias partes: se manda completo (lo permite el estándar).
    return aceptaPedazos(bytes ? new Response(bytes, completo) : completo);
  }
  if (parte === 'fuera') {
    if (!bytes) completo.body.cancel().catch(() => {});
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}`, 'Accept-Ranges': 'bytes' },
    });
  }

  const { ini, fin } = parte;
  const largo = fin - ini + 1;
  const salida = new Headers(completo.headers);
  salida.delete('Content-Encoding');
  salida.set('Content-Range', `bytes ${ini}-${fin}/${total}`);
  salida.set('Content-Length', String(largo));
  salida.set('Accept-Ranges', 'bytes');

  if (request.method === 'HEAD') {
    if (!bytes) completo.body.cancel().catch(() => {});
    return new Response(null, { status: 206, headers: salida });
  }
  if (bytes) {
    return new Response(bytes.slice(ini, fin + 1), { status: 206, headers: salida });
  }
  const tubo = typeof FixedLengthStream === 'function' ? new FixedLengthStream(largo) : new TransformStream();
  const tarea = ini === 0 && fin === total - 1
    ? completo.body.pipeTo(tubo.writable).catch(() => {}) // pidió todo el video: pasa directo
    : cortar(completo.body, tubo.writable, ini, fin);
  if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(tarea);
  return new Response(tubo.readable, { status: 206, headers: salida });
}

// "bytes=0-1" · "bytes=500-" · "bytes=-500" (los últimos 500)
function leerRango(valor, total) {
  const m = /^bytes=(\d*)-(\d*)$/i.exec(valor.trim());
  if (!m || (m[1] === '' && m[2] === '')) return null;
  let ini;
  let fin;
  if (m[1] === '') {
    const n = Number(m[2]);
    if (n === 0) return 'fuera';
    ini = Math.max(0, total - n);
    fin = total - 1;
  } else {
    ini = Number(m[1]);
    if (m[2] !== '' && Number(m[2]) < ini) return null;
    fin = m[2] === '' ? total - 1 : Math.min(Number(m[2]), total - 1);
  }
  if (ini >= total) return 'fuera';
  return { ini, fin };
}

// Copia solo los bytes de "ini" a "fin" y suelta el resto del archivo.
async function cortar(cuerpo, destino, ini, fin) {
  const lector = cuerpo.getReader();
  const escritor = destino.getWriter();
  let pos = 0;
  try {
    while (pos <= fin) {
      const { done, value } = await lector.read();
      if (done) break;
      const trozo = value instanceof Uint8Array ? value : new Uint8Array(value);
      const desde = pos;
      pos += trozo.byteLength;
      if (pos <= ini) continue;
      const a = Math.max(0, ini - desde);
      const b = Math.min(trozo.byteLength, fin + 1 - desde);
      if (b > a) await escritor.write(trozo.subarray(a, b));
    }
    await escritor.close();
  } catch (err) {
    await escritor.abort(err).catch(() => {});
  } finally {
    lector.cancel().catch(() => {});
  }
}

function aceptaPedazos(res) {
  const r = new Response(res.body, res);
  r.headers.set('Accept-Ranges', 'bytes');
  return r;
}
