/* =====================================================================
   PORTAFOLIO UGC · script.js
   ---------------------------------------------------------------------
   Lo que SÍ puedes editar (todo está arriba):
     1) CONFIG     → nombre, WhatsApp, correo, precios
     2) VIDEOS     → agrega, quita o cambia videos y su tema de colores
     3) TEXTOS_EN  → traducción al inglés de los textos de index.html
     4) UI         → textos que arma el código (botones, mensajes de WhatsApp)
   Del bloque "MOTOR" para abajo no necesitas tocar nada.
   ===================================================================== */
'use strict';

/* ---------- 1) CONFIGURACIÓN ---------- */
const CONFIG = {
  nombre: 'Silvia',
  apellido: 'Labastida',               // ← cambia aquí tu apellido (o déjalo vacío: '')
  ciudad: 'Querétaro, México',
  ciudadCorta: 'Querétaro, MX',
  whatsapp: '524422066199',            // 52 + tus 10 dígitos, sin espacios ni signos
  whatsappVisible: '442 206 6199',     // cómo se muestra en la página
  correo: 's.Labastida94@Hotmail.com',
  iva: 0.16,
  precios: {                           // en MXN, antes de IVA
    video: 1000,
    paquete3: 2500,
    raw: 400,                          // por video
    mesOrganico: 300,                  // por mes adicional
    mesPauta: 300,                     // por mes de pauta (ads)
    regrabacion: 200,
  },
  // false = los meses de uso se cobran una sola vez, sin importar cuántos videos.
  // true  = los meses de uso se multiplican por el número de videos.
  usoPorVideo: false,
  maxMeses: 12,
};

/* ---------- 2) VIDEOS ----------
   Cada video es un bloque { ... }. Para agregar uno, copia un bloque completo,
   pégalo y cambia sus datos. Para quitarlo, borra su bloque.

   archivo / poster : nombre del video (.mp4) y de su portada (.jpg), en esta misma carpeta
   subtitulos       : (opcional) archivo .vtt con subtítulos; déjalo en '' si no tienes
   etiqueta         : 'colaboracion' → "Colaboración" (video real para una marca)
                      'muestra' → "Video de muestra"   ·   'concepto' → "Concepto"
   marca            : (opcional) nombre de la marca; se muestra junto a "Colaboración"
   tema             : colores y tipografías que toma TODA la página al reproducirlo
     fondo, superficie (tarjetas), texto, textoSuave, acento (líneas y detalles),
     destacado (palabras en cursiva), boton, botonTexto, logo,
     bloque, bloqueTexto, bloqueAcento (la sección de contacto)
     titulares: 'anton' | 'archivo' | 'worksans'      cursiva: 'pinyon' | 'worksans'
     (opcional) celFondo, celTexto, celAcento: colores de la pantalla del último celular
   Tip de contraste: texto y textoSuave deben leerse bien sobre fondo y superficie. */
const VIDEOS = [
  {
    archivo: '01-tech-wellness.mp4',
    poster: '01-tech-wellness.jpg',
    subtitulos: '',
    etiqueta: 'colaboracion',
    marca: 'El Portal',
    nicho: { es: 'Tech wellness', en: 'Tech wellness' },
    titulo: { es: 'Problema y solución', en: 'Problem and solution' },
    tema: {
      fondo: '#172B3A', superficie: '#1F3A4D', texto: '#FFFCF7', textoSuave: '#D7CCC0',
      acento: '#C9AC83', destacado: '#C9AC83', boton: '#C9AC83', botonTexto: '#172B3A', logo: '#C9AC83',
      bloque: '#FFFCF7', bloqueTexto: '#172B3A', bloqueAcento: '#7A5E3A',
      titulares: 'archivo', cursiva: 'worksans',
    },
  },
  {
    archivo: '02-skincare-30.mp4',
    poster: '02-skincare-30.jpg',
    subtitulos: '',
    etiqueta: 'muestra',
    nicho: { es: 'Skincare', en: 'Skincare' },
    titulo: { es: '3 tips para cuidar tu piel después de los 30', en: '3 tips to care for your skin after 30' },
    tema: {
      fondo: '#D8B3B8', superficie: '#F2E9DF', texto: '#3F302B', textoSuave: '#4F3F39',
      acento: '#8E5560', destacado: '#642D3B', boton: '#5C4A43', botonTexto: '#F2E9DF', logo: '#642D3B',
      bloque: '#F2E9DF', bloqueTexto: '#3F302B', bloqueAcento: '#8E5560',
      titulares: 'anton', cursiva: 'pinyon',
    },
  },
  {
    archivo: '03-press-on.mp4',
    poster: '03-press-on.jpg',
    subtitulos: '',
    etiqueta: 'muestra',
    nicho: { es: 'Belleza · uñas press-on', en: 'Beauty · press-on nails' },
    titulo: { es: '“Ya no hay excusa”', en: '“No more excuses”' },
    tema: {
      fondo: '#642D3B', superficie: '#74394A', texto: '#FFFCF7', textoSuave: '#EAD6D8',
      acento: '#C9AC83', destacado: '#D8B3B8', boton: '#D8B3B8', botonTexto: '#642D3B', logo: '#C9AC83',
      bloque: '#D8B3B8', bloqueTexto: '#3A1820', bloqueAcento: '#642D3B',
      titulares: 'anton', cursiva: 'pinyon',
    },
  },
  {
    archivo: '04-tech-wellness-terapeutas.mp4',
    poster: '04-tech-wellness-terapeutas.jpg',
    subtitulos: '',
    etiqueta: 'colaboracion',
    marca: 'El Portal',
    nicho: { es: 'Tech wellness', en: 'Tech wellness' },
    titulo: { es: 'Problema y solución para terapeutas', en: 'Problem and solution for therapists' },
    tema: {
      fondo: '#C9AC83', superficie: '#F2E9DF', texto: '#172B3A', textoSuave: '#2F3E4A',
      acento: '#172B3A', destacado: '#642D3B', boton: '#172B3A', botonTexto: '#F2E9DF', logo: '#172B3A',
      bloque: '#172B3A', bloqueTexto: '#FFFCF7', bloqueAcento: '#C9AC83',
      titulares: 'archivo', cursiva: 'worksans',
    },
  },
];

/* ---------- 2b) ÚLTIMO CELULAR · "Aquí iría el tuyo" ----------
   Invitación para las marcas al final del carrusel. Al tocar una categoría,
   TODA la página cambia de mood y el texto de ese celular cambia según la categoría.
   Para quitarlo, pon activo: false. Puedes cambiar textos y colores de cada categoría:
   nombre, gancho (frase de arranque), ideas (3 tomas), cierre y tema
   (mismos campos que el tema de los videos, más celFondo/celTexto/celAcento). */
const CEL_FINAL = {
  activo: true,
  categorias: [
    {
      id: 'beauty',
      nombre: { es: 'Beauty', en: 'Beauty' },
      gancho: { es: '“La rutina de 5 minutos que me salva las mañanas”', en: '“The 5-minute routine that saves my mornings”' },
      ideas: {
        es: ['Antes y después, con luz natural', 'La textura del producto, de cerca', 'Mi opinión honesta, como de amiga'],
        en: ['Before and after, in natural light', 'The product’s texture, up close', 'My honest take, like a friend'],
      },
      cierre: { es: 'Glow real, sin filtros.', en: 'Real glow, no filters.' },
      tema: {
        fondo: '#D8B3B8', superficie: '#FFFCF7', texto: '#3A1820', textoSuave: '#4F3F39',
        acento: '#642D3B', destacado: '#642D3B', boton: '#642D3B', botonTexto: '#FFFCF7', logo: '#642D3B',
        bloque: '#642D3B', bloqueTexto: '#FFFCF7', bloqueAcento: '#D8B3B8',
        celFondo: '#FFFCF7', celTexto: '#3A1820', celAcento: '#642D3B',
        titulares: 'anton', cursiva: 'pinyon',
      },
    },
    {
      id: 'tech',
      nombre: { es: 'Tech', en: 'Tech' },
      gancho: { es: '“Esta app me ahorra horas cada semana”', en: '“This app saves me hours every week”' },
      ideas: {
        es: ['El problema, contado en 3 segundos', 'La app en pantalla, paso a paso', 'El resultado en mi día a día'],
        en: ['The problem, told in 3 seconds', 'The app on screen, step by step', 'The result in my everyday life'],
      },
      cierre: { es: 'Cero tecnicismos, puro resultado.', en: 'No jargon, just results.' },
      tema: {
        fondo: '#172B3A', superficie: '#1F3A4D', texto: '#FFFCF7', textoSuave: '#D7CCC0',
        acento: '#C9AC83', destacado: '#C9AC83', boton: '#C9AC83', botonTexto: '#172B3A', logo: '#C9AC83',
        bloque: '#FFFCF7', bloqueTexto: '#172B3A', bloqueAcento: '#7A5E3A',
        celFondo: '#FFFCF7', celTexto: '#172B3A', celAcento: '#7A5E3A',
        titulares: 'archivo', cursiva: 'worksans',
      },
    },
    {
      id: 'wellness',
      nombre: { es: 'Wellness', en: 'Wellness' },
      gancho: { es: '“Mi ritual para bajarle al estrés”', en: '“My ritual to dial down stress”' },
      ideas: {
        es: ['Momentos de calma en casa', 'Hábitos fáciles de copiar', 'Cómo me siento después'],
        en: ['Calm moments at home', 'Easy habits to copy', 'How I feel afterwards'],
      },
      cierre: { es: 'Bienestar que se siente posible.', en: 'Wellness that feels doable.' },
      tema: {
        fondo: '#5C4A43', superficie: '#4F3F39', texto: '#FFFCF7', textoSuave: '#E2D6CC',
        acento: '#C9AC83', destacado: '#E2CCAA', boton: '#E2CCAA', botonTexto: '#3A2E29', logo: '#E2CCAA',
        bloque: '#F2E9DF', bloqueTexto: '#4F3F39', bloqueAcento: '#7A5E3A',
        celFondo: '#F2E9DF', celTexto: '#4F3F39', celAcento: '#7A5E3A',
        titulares: 'worksans', cursiva: 'pinyon',
      },
    },
    {
      id: 'fitness',
      nombre: { es: 'Fitness', en: 'Fitness' },
      gancho: { es: '“20 minutos, cero excusas: hoy sí me muevo”', en: '“20 minutes, zero excuses: today I move”' },
      ideas: {
        es: ['Calentamiento con energía, en tiempo real', 'El producto en acción: sudor, ritmo y movimiento', 'Mi rutina para estar activa toda la semana'],
        en: ['An energetic warm-up, in real time', 'The product in action: sweat, rhythm and movement', 'My routine to stay active all week'],
      },
      cierre: { es: '¡Muévete conmigo!', en: 'Move with me!' },
      tema: {
        fondo: '#C9AC83', superficie: '#F2E9DF', texto: '#172B3A', textoSuave: '#2F3E4A',
        acento: '#172B3A', destacado: '#642D3B', boton: '#642D3B', botonTexto: '#FFFCF7', logo: '#172B3A',
        bloque: '#642D3B', bloqueTexto: '#FFFCF7', bloqueAcento: '#D8B3B8',
        celFondo: '#172B3A', celTexto: '#FFFCF7', celAcento: '#C9AC83',
        titulares: 'anton', cursiva: 'worksans',
      },
    },
  ],
};

/* ---------- 3) TEXTOS EN INGLÉS ----------
   El español vive en index.html. Aquí va su traducción, con la misma clave
   (data-i18n="clave"). {nombre} y {apellido} se reemplazan solos. */
const TEXTOS_EN = {
  skip: 'Skip to portfolio',
  navHome: 'Home',
  navLabel: 'Main',
  navAbout: 'About me',
  navWork: 'Portfolio',
  navProcess: 'Process',
  navRates: 'Rates',
  navContact: 'Contact',
  heroMeta: 'UGC Portfolio',
  heroKicker: 'UGC content creator',
  heroTag1: 'Real content',
  heroTag2: 'that connects.',
  heroCta: 'See my work',
  heroCta2: 'Get a quote',
  altHero: 'Portrait of Silvia, UGC content creator',
  sealText: 'REAL CONTENT THAT CONNECTS · UGC · ',
  marquee: 'Beauty ✦ Skincare ✦ Wellness ✦ Lifestyle ✦',
  aboutLabel: 'About me',
  altAbout1: 'Black and white portrait of Silvia',
  altAbout2: 'Silvia in a black blazer, lace tights and heels',
  aboutT1: 'Hi,',
  aboutT2: 'I’m {nombre}.',
  aboutP1: 'I create videos that feel like a recommendation from a friend: real, thoughtful and relatable.',
  aboutP2: 'Soft light, a warm voice and a story that makes you want to try the product.',
  aboutP3: 'From Querétaro, I create beauty, skincare, wellness and lifestyle content for brands that want to feel like part of everyday life.',
  aboutP4: 'If you like what you see, tell me about your brand.',
  nichesLabel: 'Niches',
  niche1: 'Beauty',
  niche2: 'Skincare',
  niche3: 'Wellness',
  niche4: 'Lifestyle',
  div1a: 'soft light,',
  div1b: 'warm voice',
  pfLabel: 'Portfolio',
  pfT1: 'My work',
  pfT2: 'on video',
  pfNote: 'Some are <strong>brand collaborations</strong> and others are <strong>sample videos</strong>: concepts I filmed to show you my style. Each one is labeled. The videos are in Spanish. Press play and watch the page take on each video’s look.',
  pfTrack: 'Portfolio videos',
  pfPrev: 'Previous video',
  pfNext: 'Next video',
  prLabel: 'Workflow',
  prT1: 'How we work,',
  prT2: 'step by step',
  st1t: 'Brief',
  st1p: 'You tell me what you sell, who you’re talking to and what can’t be missing.',
  st2t: 'Script',
  st2p: 'You send it to me or we write it together.',
  st3t: 'Filming and editing',
  st3p: 'I film your video and give it a basic edit.',
  st4t: 'Delivery',
  st4p: 'Within 5 business days, counting from when I have the approved brief and the product.',
  term1: 'Includes <strong>1 round of revisions</strong>: minor changes to the video and the material only.',
  term2: 'Reshoots are not included.',
  term3: 'I issue invoices. All prices are plus VAT (IVA).',
  div2a: 'real, thoughtful',
  div2b: 'and relatable',
  rtLabel: 'Rates',
  rtT1: 'Get your',
  rtT2: 'quote',
  rtIntro: 'Every brand is different. Here’s an estimate; I’ll confirm the final price once I know your brief.',
  rc1k: 'UGC video',
  rc1t: 'One video',
  rc1d: '30 to 45 seconds, with basic editing and script included.',
  approxFrom: 'approx.',
  mxnTax: 'MXN + VAT',
  rc2k: 'Package',
  rc2t: 'Three videos',
  rc2d: 'Three UGC videos of 30 to 45 seconds, with basic editing and script included.',
  exTitle: 'Extras',
  ex1: 'Script',
  ex1v: 'Included: you send it or we write it together',
  ex2: 'Raw footage',
  perVideo: 'per video',
  ex3: 'Additional month of organic usage',
  perMonth: 'per month',
  ex4: 'Paid ads usage',
  ex5: 'Reshoot',
  payTerms: 'Payment: 50% upfront and 50% on delivery. Prices in MXN, plus VAT.',
  qT1: 'Quick',
  qT2: 'quote',
  qIntro: 'Choose what you need and send me your selection on WhatsApp.',
  qL1: '1. What do you need?',
  qOpt1: '1 video',
  qOpt2: '3-video package',
  qL2: '2. Raw footage',
  qRaw: 'Yes, I want the raw footage',
  qL3: '3. Usage months',
  qOrg: 'Additional months of organic usage',
  qOrgMinus: 'Remove one month of organic usage',
  qOrgPlus: 'Add one month of organic usage',
  qAds: 'Months of paid ads usage',
  qAdsMinus: 'Remove one month of ads usage',
  qAdsPlus: 'Add one month of ads usage',
  qBrand: 'Your brand (optional)',
  qBrandPh: 'Your brand name',
  qTotal: 'Approximate total',
  qSendWa: 'Send on WhatsApp',
  qSendMail: 'Send by email',
  qFine: 'This is an estimate, not a final quote. Payment: 50% upfront and 50% on delivery.',
  ctLabel: 'Contact',
  ctT1: 'Let’s talk',
  ctT2: 'about your brand',
  ctText: 'Message me on WhatsApp, it’s the fastest way. You can also reach me by email.',
  ctWa: 'WhatsApp',
  ftRole: 'UGC content creator',
  ftNote: 'Videos labeled “Sample video” are concepts created to show my style.',
};

/* ---------- 4) TEXTOS QUE ARMA EL CÓDIGO ---------- */
const UI = {
  es: {
    docTitle: 'Creadora de contenido UGC en Querétaro',
    langBtn: 'Cambiar idioma a inglés',
    badge: { muestra: 'Video de muestra', concepto: 'Concepto', colaboracion: 'Colaboración con marca' },
    badgeMarca: 'Colaboración · {marca}',
    videoEs: '',
    play: 'Reproducir video: {t}',
    pause: 'Pausar video: {t}',
    mute: 'Silenciar',
    unmute: 'Activar sonido',
    videoLabel: 'Video: {t}',
    dot: 'Ver video {n} de {total}: {t}',
    nowPlaying: 'Reproduciendo: {t}. La página tomó los colores de este video.',
    paused: 'Video en pausa. La página volvió a su tema base.',
    missing: 'Este video todavía no está en la carpeta del sitio.',
    optVideo: '1 video UGC',
    optPack: 'Paquete de 3 videos',
    raw: 'Material raw',
    org: 'Uso orgánico adicional',
    ads: 'Uso en pauta (ads)',
    month: 'mes', months: 'meses',
    yes: 'Sí', no: 'No',
    withIva: '≈ {total} con IVA ({pct}%)',
    waHello: 'Hola, {nombre}. Vi tu portafolio y me gustaría una cotización.',
    waBrand: 'Marca: {marca}',
    waTotal: 'Total aproximado: {total} MXN + IVA',
    waGeneral: 'Hola, {nombre}. Vi tu portafolio y me gustaría platicar sobre un proyecto para mi marca.',
    mailSubject: 'Cotización de video UGC',
    mailGeneralSubject: 'Proyecto UGC para mi marca',
    celKicker: 'Tu marca aquí',
    celTitle1: 'Aquí iría',
    celTitle2: 'el tuyo',
    celChips: 'Elige la categoría de tu marca',
    celHint: 'Toca una categoría y mira cómo se vería tu video.',
    celIdeas: 'Así lo grabaría',
    celBtn: 'Quiero el mío',
    celBtnCat: 'Quiero mi video de {cat}',
    celTag: 'Espacio disponible',
    celNiche: 'Beauty · Tech · Wellness · Fitness',
    celCardTitle: '¿Cuál es tu mood?',
    celMood: 'Mood {cat}: la página cambió de colores.',
    celMoodOff: 'La página volvió a su tema base.',
    celDot: 'Ver {n} de {total}: Aquí iría el tuyo',
    waCel: 'Hola, {nombre}. Vi tu portafolio y me gustaría un video para mi marca.',
    waCelCat: 'Hola, {nombre}. Vi tu portafolio y me gustaría un video de {cat} para mi marca.',
  },
  en: {
    docTitle: 'UGC content creator in Querétaro, Mexico',
    langBtn: 'Switch language to Spanish',
    badge: { muestra: 'Sample video', concepto: 'Concept', colaboracion: 'Brand collaboration' },
    badgeMarca: 'Collab · {marca}',
    videoEs: 'In Spanish',
    play: 'Play video: {t}',
    pause: 'Pause video: {t}',
    mute: 'Mute',
    unmute: 'Unmute',
    videoLabel: 'Video: {t}',
    dot: 'Go to video {n} of {total}: {t}',
    nowPlaying: 'Playing: {t}. The page took on this video’s colors.',
    paused: 'Video paused. The page is back to its base theme.',
    missing: 'This video is not in the site folder yet.',
    optVideo: '1 UGC video',
    optPack: '3-video package',
    raw: 'Raw footage',
    org: 'Additional organic usage',
    ads: 'Paid ads usage',
    month: 'month', months: 'months',
    yes: 'Yes', no: 'No',
    withIva: '≈ {total} including VAT ({pct}%)',
    waHello: 'Hi {nombre}! I saw your portfolio and I’d like a quote.',
    waBrand: 'Brand: {marca}',
    waTotal: 'Approximate total: {total} MXN + VAT',
    waGeneral: 'Hi {nombre}! I saw your portfolio and I’d like to talk about a project for my brand.',
    mailSubject: 'UGC video quote',
    mailGeneralSubject: 'UGC project for my brand',
    celKicker: 'Your brand here',
    celTitle1: 'Your video',
    celTitle2: 'goes here',
    celChips: 'Choose your brand’s category',
    celHint: 'Tap a category to see how your video would look.',
    celIdeas: 'How I’d film it',
    celBtn: 'I want mine',
    celBtnCat: 'I want my {cat} video',
    celTag: 'Spot available',
    celNiche: 'Beauty · Tech · Wellness · Fitness',
    celCardTitle: 'What’s your mood?',
    celMood: '{cat} mood: the page changed colors.',
    celMoodOff: 'The page is back to its base theme.',
    celDot: 'Go to {n} of {total}: Your video goes here',
    waCel: 'Hi {nombre}! I saw your portfolio and I’d like a video for my brand.',
    waCelCat: 'Hi {nombre}! I saw your portfolio and I’d like a {cat} video for my brand.',
  },
};

/* =====================================================================
   MOTOR · a partir de aquí no necesitas cambiar nada
   ===================================================================== */
(() => {
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const metaTheme = $('meta[name="theme-color"]');
  const BASE_THEME_COLOR = '#FFFCF7';

  const store = {
    get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento: no pasa nada */ } },
  };

  let lang = store.get('idioma') === 'en' ? 'en' : 'es';
  const t = (key) => (UI[lang] && UI[lang][key] != null ? UI[lang][key] : UI.es[key]);
  const fmt = (str, vars = {}) => String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => '$' + Math.round(n).toLocaleString('es-MX');
  const nombreCompleto = () => [CONFIG.nombre, CONFIG.apellido].filter(Boolean).join(' ');
  const baseVars = () => ({ nombre: esc(CONFIG.nombre), apellido: esc(CONFIG.apellido) });
  const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  const mailLink = (subject, body) => `mailto:${CONFIG.correo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  /* ---------- Datos de CONFIG en la página ---------- */
  function fillConfig() {
    const values = { ...CONFIG, nombreCompleto: nombreCompleto() };
    $$('[data-config]').forEach((el) => {
      const v = values[el.dataset.config];
      if (v != null && typeof v !== 'object') el.textContent = v;
    });
    $$('[data-precio]').forEach((el) => {
      const v = CONFIG.precios[el.dataset.precio];
      if (v != null) el.textContent = money(v);
    });
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Idioma ---------- */
  const ES = { text: {}, aria: {}, alt: {}, placeholder: {} };
  const ATTRS = [['aria', 'aria-label'], ['alt', 'alt'], ['placeholder', 'placeholder']];

  function captureSpanish() {
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (!(k in ES.text)) ES.text[k] = el.innerHTML;
    });
    ATTRS.forEach(([key, attr]) => {
      $$(`[data-i18n-${key}]`).forEach((el) => {
        const k = el.getAttribute(`data-i18n-${key}`);
        if (!(k in ES[key])) ES[key][k] = el.getAttribute(attr) || '';
      });
    });
  }

  function applyLanguage() {
    root.lang = lang;
    const vars = baseVars();
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      const val = lang === 'en' && TEXTOS_EN[k] != null ? fmt(TEXTOS_EN[k], vars) : ES.text[k];
      if (val != null && el.innerHTML !== val) el.innerHTML = val;
    });
    ATTRS.forEach(([key, attr]) => {
      $$(`[data-i18n-${key}]`).forEach((el) => {
        const k = el.getAttribute(`data-i18n-${key}`);
        const val = lang === 'en' && TEXTOS_EN[k] != null ? fmt(TEXTOS_EN[k], vars) : ES[key][k];
        if (val != null) el.setAttribute(attr, val);
      });
    });
    document.title = `${nombreCompleto()} · ${t('docTitle')}`;
    const btn = $('#lang-toggle');
    if (btn) {
      btn.setAttribute('aria-label', t('langBtn'));
      $$('.lang__opt', btn).forEach((o) => o.classList.toggle('is-active', o.dataset.lang === lang));
    }
    $$('.js-wa').forEach((a) => { a.href = waLink(fmt(t('waGeneral'), { nombre: CONFIG.nombre })); });
    $$('.js-mail').forEach((a) => { a.href = mailLink(t('mailGeneralSubject'), fmt(t('waGeneral'), { nombre: CONFIG.nombre })); });
    updateVideoTexts();
    updateQuote();
  }

  function initLanguage() {
    const btn = $('#lang-toggle');
    if (btn) btn.addEventListener('click', () => {
      lang = lang === 'es' ? 'en' : 'es';
      store.set('idioma', lang);
      applyLanguage();
    });
  }

  /* ---------- Tema por video ---------- */
  const VAR_MAP = {
    fondo: '--bg', superficie: '--surface', texto: '--ink', textoSuave: '--ink-soft',
    acento: '--accent', destacado: '--highlight', boton: '--btn', botonTexto: '--btn-ink', logo: '--logo',
    bloque: '--block', bloqueTexto: '--block-ink', bloqueAcento: '--block-accent',
    celFondo: '--cel-bg', celTexto: '--cel-ink', celAcento: '--cel-accent',
  };
  let fontTarget = { s: '', f: '' };
  let swapTimer = null;

  function setFonts(strong, fine) {
    const s = strong && strong !== 'anton' ? strong : '';
    const f = fine && fine !== 'pinyon' ? fine : '';
    if (fontTarget.s === s && fontTarget.f === f) return;
    fontTarget = { s, f };
    const apply = () => {
      if (s) root.dataset.strong = s; else delete root.dataset.strong;
      if (f) root.dataset.fine = f; else delete root.dataset.fine;
      root.classList.remove('is-swapping');
    };
    clearTimeout(swapTimer);
    if (reduceMotion.matches) { apply(); return; }
    root.classList.add('is-swapping');
    swapTimer = setTimeout(apply, 260);
  }

  function applyTheme(tema) {
    if (!tema) return;
    Object.entries(VAR_MAP).forEach(([k, cssVar]) => {
      if (tema[k]) root.style.setProperty(cssVar, tema[k]);
      else root.style.removeProperty(cssVar);
    });
    setFonts(tema.titulares, tema.cursiva);
    if (metaTheme && tema.fondo) metaTheme.setAttribute('content', tema.fondo);
    root.classList.add('is-themed');
  }

  function resetTheme() {
    Object.values(VAR_MAP).forEach((cssVar) => root.style.removeProperty(cssVar));
    setFonts('', '');
    if (metaTheme) metaTheme.setAttribute('content', BASE_THEME_COLOR);
    root.classList.remove('is-themed');
  }

  /* ---------- Portafolio: tarjetas, carrusel y reproductor ---------- */
  const track = $('#pf-track');
  const dotsBox = $('#pf-dots');
  const status = $('#pf-status');
  let cards = [];
  let dots = [];
  let active = 0;
  let current = null; // { video, index }
  let celLi = null;     // último celular ("Aquí iría el tuyo")
  let celSelected = null;

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm16.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>',
  };

  function buildCard(v, i) {
    const li = document.createElement('li');
    li.className = 'phone-card';
    li.dataset.index = String(i);
    li.innerHTML = `
      <div class="phone">
        <div class="phone__screen">
          <video preload="none" playsinline webkit-playsinline poster="${esc(v.poster)}">
            <source src="${esc(v.archivo)}" type="video/mp4">
            ${v.subtitulos ? `<track kind="captions" src="${esc(v.subtitulos)}" srclang="es" label="Español" default>` : ''}
          </video>
          <span class="phone__island" aria-hidden="true"></span>
          <span class="badge"></span>
          <span class="badge badge--es" hidden></span>
          <button class="phone__play" type="button">${ICONS.play}</button>
          <div class="phone__controls">
            <button class="ctl ctl--toggle" type="button">${ICONS.pause}</button>
            <div class="phone__progress" aria-hidden="true"><span></span></div>
            <button class="ctl ctl--mute" type="button">${ICONS.sound}</button>
          </div>
        </div>
      </div>
      <div class="phone-card__info">
        <span class="phone-card__num">${String(i + 1).padStart(2, '0')}</span><span class="phone-card__tag"></span>
        <span class="phone-card__niche"></span>
        <h3 class="phone-card__title"></h3>
      </div>`;

    const video = $('video', li);
    const phone = $('.phone', li);
    const bigPlay = $('.phone__play', li);
    const toggle = $('.ctl--toggle', li);
    const muteBtn = $('.ctl--mute', li);
    const bar = $('.phone__progress span', li);

    const tryPlay = () => {
      $$('.phone__error', li).forEach((e) => e.remove());
      if (i !== active) goTo(i);
      const p = video.play();
      if (p && p.catch) p.catch(() => { /* el navegador bloqueó o el archivo falta: lo maneja "error" */ });
    };
    bigPlay.addEventListener('click', tryPlay);
    toggle.addEventListener('click', () => (video.paused ? tryPlay() : video.pause()));
    video.addEventListener('click', () => (video.paused ? tryPlay() : video.pause()));
    muteBtn.addEventListener('click', () => { video.muted = !video.muted; updateCardTexts(i); });

    video.addEventListener('play', () => {
      const prev = current;
      current = { video, index: i };
      if (prev && prev.video !== video) prev.video.pause();
      if (celSelected) { celSelected = null; updateCelTexts(); }
      phone.classList.add('is-playing', 'is-started');
      applyTheme(v.tema);
      updateCardTexts(i);
      announce(fmt(t('nowPlaying'), { t: v.titulo[lang] || v.titulo.es }));
    });
    video.addEventListener('pause', () => {
      phone.classList.remove('is-playing');
      updateCardTexts(i);
      if (current && current.video === video) {
        current = null;
        resetTheme();
        announce(t('paused'));
      }
    });
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      phone.classList.remove('is-playing', 'is-started');
      bar.style.width = '0%';
      if (current && current.video === video) { current = null; resetTheme(); }
      updateCardTexts(i);
    });
    video.addEventListener('timeupdate', () => {
      if (video.duration) bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    });
    const onError = () => {
      phone.classList.remove('is-playing');
      if (current && current.video === video) { current = null; resetTheme(); }
      if (!$('.phone__error', li)) {
        const msg = document.createElement('p');
        msg.className = 'phone__error';
        msg.setAttribute('role', 'status');
        msg.textContent = t('missing');
        $('.phone__screen', li).appendChild(msg);
      }
    };
    video.addEventListener('error', onError);
    $('source', video).addEventListener('error', onError);
    return li;
  }

  function updateCardTexts(i) {
    const v = VIDEOS[i];
    const li = cards[i];
    if (!v || !li) return;
    const titulo = v.titulo[lang] || v.titulo.es;
    const video = $('video', li);
    const etiqueta = v.etiqueta === 'colaboracion' && v.marca
      ? fmt(t('badgeMarca'), { marca: v.marca })
      : (t('badge') || {})[v.etiqueta] || t('badge').muestra;
    $('.badge', li).textContent = etiqueta;
    $('.phone-card__tag', li).textContent = etiqueta;
    const es = $('.badge--es', li);
    es.textContent = t('videoEs');
    es.hidden = !t('videoEs');
    $('.phone-card__niche', li).textContent = v.nicho[lang] || v.nicho.es;
    $('.phone-card__title', li).textContent = titulo;
    video.setAttribute('aria-label', fmt(t('videoLabel'), { t: titulo }));
    $('.phone__play', li).setAttribute('aria-label', fmt(t('play'), { t: titulo }));
    const toggle = $('.ctl--toggle', li);
    toggle.setAttribute('aria-label', fmt(video.paused ? t('play') : t('pause'), { t: titulo }));
    toggle.innerHTML = video.paused ? ICONS.play : ICONS.pause;
    const muteBtn = $('.ctl--mute', li);
    muteBtn.setAttribute('aria-label', video.muted ? t('unmute') : t('mute'));
    muteBtn.setAttribute('aria-pressed', String(video.muted));
    muteBtn.innerHTML = video.muted ? ICONS.muted : ICONS.sound;
    $$('.phone__error', li).forEach((e) => { e.textContent = t('missing'); });
    if (dots[i]) dots[i].setAttribute('aria-label', fmt(t('dot'), { n: i + 1, total: cards.length, t: titulo }));
  }

  function updateVideoTexts() { VIDEOS.forEach((_, i) => updateCardTexts(i)); updateCelTexts(); }

  /* ---------- Último celular: "Aquí iría el tuyo" ---------- */
  const celCat = (id) => CEL_FINAL.categorias.find((c) => c.id === id) || null;

  function buildCelCard(i) {
    const li = document.createElement('li');
    li.className = 'phone-card phone-card--cel';
    li.dataset.index = String(i);
    const chips = CEL_FINAL.categorias
      .map((c) => `<button type="button" class="chip" data-cat="${esc(c.id)}" aria-pressed="false"></button>`).join('');
    li.innerHTML = `
      <div class="phone">
        <div class="phone__screen cel">
          <span class="phone__island" aria-hidden="true"></span>
          <div class="cel__inner">
            <p class="cel__kicker"></p>
            <p class="cel__title"><span class="t-strong cel__t1"></span> <span class="t-script cel__t2"></span></p>
            <div class="cel__chips" role="group">${chips}</div>
            <div class="cel__body" aria-live="polite"></div>
            <a class="cel__btn" href="#contacto" target="_blank" rel="noopener"></a>
          </div>
        </div>
      </div>
      <div class="phone-card__info">
        <span class="phone-card__num">${String(i + 1).padStart(2, '0')}</span><span class="phone-card__tag"></span>
        <span class="phone-card__niche"></span>
        <h3 class="phone-card__title"></h3>
      </div>`;
    $$('.chip', li).forEach((b) => b.addEventListener('click', () => {
      if (i !== active) goTo(i);
      selectCel(celSelected === b.dataset.cat ? null : b.dataset.cat);
    }));
    return li;
  }

  function selectCel(id) {
    const cat = celCat(id);
    celSelected = cat ? cat.id : null;
    if (cat) {
      if (current) { const v = current.video; current = null; v.pause(); }
      applyTheme(cat.tema);
      announce(fmt(t('celMood'), { cat: cat.nombre[lang] || cat.nombre.es }));
    } else if (!current) {
      resetTheme();
      announce(t('celMoodOff'));
    }
    updateCelTexts();
  }

  function updateCelTexts() {
    const li = celLi;
    if (!li) return;
    const cat = celCat(celSelected);
    $('.cel__kicker', li).textContent = t('celKicker');
    $('.cel__t1', li).textContent = t('celTitle1');
    $('.cel__t2', li).textContent = t('celTitle2');
    $('.cel__chips', li).setAttribute('aria-label', t('celChips'));
    $$('.chip', li).forEach((b) => {
      const c = celCat(b.dataset.cat);
      b.textContent = c.nombre[lang] || c.nombre.es;
      b.setAttribute('aria-pressed', String(c.id === celSelected));
    });
    const body = $('.cel__body', li);
    body.innerHTML = '';
    const add = (tag, cls, text) => { const el = document.createElement(tag); el.className = cls; el.textContent = text; body.appendChild(el); return el; };
    if (cat) {
      add('p', 'cel__hook', cat.gancho[lang] || cat.gancho.es);
      add('p', 'cel__label', t('celIdeas'));
      const ol = add('ol', 'cel__ideas', '');
      (cat.ideas[lang] || cat.ideas.es).forEach((x) => { const it = document.createElement('li'); it.textContent = x; ol.appendChild(it); });
      add('p', 'cel__close', cat.cierre[lang] || cat.cierre.es);
    } else {
      add('p', 'cel__hint', t('celHint'));
    }
    const name = cat ? (cat.nombre[lang] || cat.nombre.es).toLowerCase() : '';
    const btn = $('.cel__btn', li);
    btn.textContent = cat ? fmt(t('celBtnCat'), { cat: name }) : t('celBtn');
    btn.href = waLink(fmt(cat ? t('waCelCat') : t('waCel'), { nombre: CONFIG.nombre, cat: name }));
    $('.phone-card__tag', li).textContent = t('celTag');
    $('.phone-card__niche', li).textContent = t('celNiche');
    $('.phone-card__title', li).textContent = t('celCardTitle');
    const di = cards.indexOf(li);
    if (dots[di]) dots[di].setAttribute('aria-label', fmt(t('celDot'), { n: di + 1, total: cards.length }));
  }

  function announce(msg) { if (status) status.textContent = msg; }

  function cardOffset(c) { return c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2; }

  function goTo(i) {
    const c = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (!c) return;
    track.scrollTo({ left: cardOffset(c), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  let ticking = false;
  function updateCarousel() {
    ticking = false;
    if (!cards.length) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const dist = Math.abs(cc - center);
      c.style.setProperty('--d', Math.min(1, dist / (c.offsetWidth + gap)).toFixed(3));
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    if (best !== active || !cards[best].classList.contains('is-active')) {
      active = best;
      cards.forEach((c, i) => c.classList.toggle('is-active', i === best));
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === best)));
    }
  }
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateCarousel); } };

  function initPortfolio() {
    if (!track) return;
    track.innerHTML = '';
    dotsBox.innerHTML = '';
    cards = VIDEOS.map((v, i) => {
      const li = buildCard(v, i);
      track.appendChild(li);
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.addEventListener('click', () => goTo(i));
      dotsBox.appendChild(d);
      dots.push(d);
      return li;
    });
    if (typeof CEL_FINAL !== 'undefined' && CEL_FINAL.activo && CEL_FINAL.categorias.length) {
      const i = cards.length;
      celLi = buildCelCard(i);
      track.appendChild(celLi);
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.addEventListener('click', () => goTo(i));
      dotsBox.appendChild(d);
      dots.push(d);
      cards.push(celLi);
    }
    $('#pf-prev').addEventListener('click', () => goTo(active - 1));
    $('#pf-next').addEventListener('click', () => goTo(active + 1));
    track.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
    });

    // Si deslizas y el video que suena ya casi no se ve, se pausa solo.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const video = $('video', en.target);
          if (en.intersectionRatio < 0.35 && video && !video.paused) video.pause();
          if (en.target === celLi && en.intersectionRatio < 0.35 && celSelected) selectCel(null);
        });
      }, { root: track, threshold: [0, 0.35, 0.6, 1] });
      cards.forEach((c) => io.observe(c));
    }

    // Empieza con el primer video al centro
    requestAnimationFrame(() => {
      track.scrollLeft = cardOffset(cards[0]);
      updateCarousel();
    });
  }

  /* ---------- Cotizador ---------- */
  const form = $('#cotizador');

  function monthsText(n) { return `${n} ${n === 1 ? t('month') : t('months')}`; }
  function clampMonths(v) {
    const n = Math.round(Number(v));
    return Number.isFinite(n) ? Math.max(0, Math.min(CONFIG.maxMeses, n)) : 0;
  }

  function readQuote() {
    const tipo = form.elements.tipo.value === 'paquete3' ? 'paquete3' : 'video';
    const n = tipo === 'paquete3' ? 3 : 1;
    const raw = form.elements.raw.checked;
    const org = clampMonths(form.elements.organico.value);
    const ads = clampMonths(form.elements.pauta.value);
    const mult = CONFIG.usoPorVideo ? n : 1;
    const P = CONFIG.precios;
    const items = [
      { label: tipo === 'paquete3' ? t('optPack') : t('optVideo'), amount: P[tipo] },
    ];
    if (raw) items.push({ label: `${t('raw')} (×${n})`, amount: P.raw * n });
    if (org) items.push({ label: `${t('org')} · ${monthsText(org)}`, amount: P.mesOrganico * org * mult });
    if (ads) items.push({ label: `${t('ads')} · ${monthsText(ads)}`, amount: P.mesPauta * ads * mult });
    const subtotal = items.reduce((s, it) => s + it.amount, 0);
    const marca = (form.elements.marca.value || '').trim();
    return { tipo, n, raw, org, ads, items, subtotal, total: subtotal * (1 + CONFIG.iva), marca };
  }

  function updateQuote() {
    if (!form) return;
    const q = readQuote();
    $('#q-total').textContent = money(q.subtotal);
    $('#q-iva').textContent = fmt(t('withIva'), { total: money(q.total), pct: Math.round(CONFIG.iva * 100) });
    const list = $('#q-breakdown');
    list.innerHTML = '';
    q.items.forEach((it) => {
      const li = document.createElement('li');
      const a = document.createElement('span'); a.textContent = it.label;
      const b = document.createElement('span'); b.textContent = money(it.amount);
      li.append(a, b);
      list.appendChild(li);
    });

    const lines = [fmt(t('waHello'), { nombre: CONFIG.nombre })];
    if (q.marca) lines.push(fmt(t('waBrand'), { marca: q.marca }));
    lines.push('');
    lines.push(`• ${q.tipo === 'paquete3' ? t('optPack') : t('optVideo')}`);
    lines.push(`• ${t('raw')}: ${q.raw ? t('yes') : t('no')}`);
    lines.push(`• ${t('org')}: ${monthsText(q.org)}`);
    lines.push(`• ${t('ads')}: ${monthsText(q.ads)}`);
    lines.push('');
    lines.push(fmt(t('waTotal'), { total: money(q.subtotal) }));
    const msg = lines.join('\n');
    $('#q-wa').href = waLink(msg);
    $('#q-mail').href = mailLink(t('mailSubject') + (q.marca ? ` · ${q.marca}` : ''), msg.replace(/\n/g, '\r\n'));
  }

  function initQuote() {
    if (!form) return;
    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('input', updateQuote);
    form.addEventListener('change', (e) => {
      if (e.target.type === 'number') e.target.value = clampMonths(e.target.value);
      updateQuote();
    });
    $$('.stepper__btn', form).forEach((b) => b.addEventListener('click', () => {
      const input = document.getElementById(b.dataset.target);
      input.value = clampMonths(Number(input.value) + Number(b.dataset.step));
      updateQuote();
    }));
    $$('input[type="number"]', form).forEach((i) => i.setAttribute('max', String(CONFIG.maxMeses)));
  }

  /* ---------- Detalles: barra superior y apariciones suaves ---------- */
  function initChrome() {
    const bar = $('#topbar');
    const onScroll = () => bar && bar.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const targets = $$('.section-head, .section .display, .about__photos, .about__text > p, .tags, .step, .terms, .rate-card, .extras, .quote, .contact__inner > *');
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Arranque ---------- */
  fillConfig();
  captureSpanish();
  initPortfolio();
  initQuote();
  initLanguage();
  applyLanguage();
  initChrome();
})();
