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

/* ---------- 2c) PORTAFOLIOS PARA CREADORAS ----------
   Tu segundo producto: le armas su portafolio a otras creadoras.
   Se abre con el botón "¿Te gustó mi portafolio? Cotiza el tuyo" (al final del tarifario)
   o con el link directo: tu-pagina/#crea-el-tuyo

   LUGARES DE LANZAMIENTO: cada vez que una creadora aparte, baja lugaresDisponibles
   (8 → 7 → 6…). El 8 aparece tachado solo cuando ya se apartó al menos un lugar.
   En 0 dice "agotado" y los precios de lanzamiento desaparecen solos.

   PLANES: nombre, videos, precio (MXN antes de IVA), descuento de lanzamiento
   (0.15 = 15%), rondas incluidas, cotizador ('no' | 'extra' | 'incluido'),
   mood (cuál de los moods de abajo toma la página al elegirlo) e incluye
   (lista; lo que empieza con ! se muestra con guion porque NO viene incluido).

   Si cambias precios aquí, se actualizan solos en la página, el cotizador y los términos. */
const PORTAFOLIOS = {
  activo: true,
  lanzamiento: {
    lugaresTotales: 8,
    lugaresDisponibles: 8,           // ← cámbialo cada vez que alguien aparte
    fechaLimite: { es: '', en: '' }, // opcional, ej. { es: '30 de noviembre', en: 'November 30' }
  },
  maxVideos: 12,                     // tope de videos por página (límite de peso para GitHub)
  maxRondas: 5,                      // tope de rondas de revisión, contando las incluidas
  extras: {                          // durante el proyecto
    video: 500,                      // video adicional, c/u
    idioma: 400,                     // por idioma extra (ella manda los textos traducidos)
    cotizador: 1000,                 // cotizador en Pro (en Firma ya viene incluido)
    seccion: 800,                    // sección a la medida, c/u
    sticker: 250,                    // foto recortada tipo sticker, c/u
    dominio: 500,                    // conectar dominio propio
    ronda: 300,                      // ronda de revisión extra
  },
  despues: {                         // cambios después de entregar (no hay mantenimiento)
    cambiarVideo: 400,
    agregarVideo: 700,
    textos: 300,                     // por ronda
  },
  moodInicial: 'plano',              // el mood con el que se abre, antes de elegir plan
  moods: {
    plano: {
      nombre: { es: 'Modo plano', en: 'Blueprint mode' },
      patron: 'plano',               // cuadrícula de fondo
      tema: {
        fondo: '#FFFCF7', superficie: '#F2E9DF', texto: '#172B3A', textoSuave: '#3D4F5D',
        acento: '#172B3A', destacado: '#642D3B', boton: '#172B3A', botonTexto: '#FFFCF7', logo: '#172B3A',
        bloque: '#172B3A', bloqueTexto: '#FFFCF7', bloqueAcento: '#C9AC83',
        titulares: 'archivo', cursiva: 'worksans',
      },
    },
    creadora: {
      nombre: { es: 'Modo creadora', en: 'Creator mode' },
      patron: '',
      tema: {
        fondo: '#D8B3B8', superficie: '#F2E9DF', texto: '#3A1820', textoSuave: '#4F2A33',
        acento: '#642D3B', destacado: '#642D3B', boton: '#642D3B', botonTexto: '#FFFCF7', logo: '#642D3B',
        bloque: '#642D3B', bloqueTexto: '#FFFCF7', bloqueAcento: '#D8B3B8',
        titulares: 'archivo', cursiva: 'pinyon',
      },
    },
    estudio: {
      nombre: { es: 'Modo estudio', en: 'Studio mode' },
      patron: 'estudio',             // cuadrícula fina champagne
      tema: {
        fondo: '#0E1B26', superficie: '#172B3A', texto: '#FFFCF7', textoSuave: '#E2D6CC',
        acento: '#C9AC83', destacado: '#C9AC83', boton: '#C9AC83', botonTexto: '#0E1B26', logo: '#C9AC83',
        bloque: '#C9AC83', bloqueTexto: '#0E1B26', bloqueAcento: '#172B3A',
        titulares: 'worksans', cursiva: 'pinyon',
      },
    },
  },
  planes: [
    {
      id: 'esencial',
      nombre: { es: 'Esencial', en: 'Essential' },
      videos: 4,
      precio: 3500,
      descuento: 0.15,
      rondas: 1,
      cotizador: 'no',
      mood: 'plano',
      incluye: {
        es: ['Portada, sobre mí, videos y contacto', '!Sin cambio de mood', 'Hasta 3 colores y 2 tipografías, que tú defines', 'En español', '1 ronda de revisión', 'Entrega en 5 días hábiles'],
        en: ['Hero, about me, videos and contact', '!No mood change', 'Up to 3 colors and 2 fonts, chosen by you', 'In Spanish', '1 round of revisions', 'Delivered in 5 business days'],
      },
    },
    {
      id: 'pro',
      nombre: { es: 'Pro', en: 'Pro' },
      videos: 6,
      precio: 5000,
      descuento: 0.15,
      rondas: 1,
      cotizador: 'extra',
      mood: 'creadora',
      incluye: {
        es: ['Todo lo de Esencial + proceso y tarifario', 'Cambia de mood con cada video', 'Hasta 8 colores y 3 tipografías, que tú defines', 'En español', '1 ronda de revisión', 'Entrega en 7 días hábiles'],
        en: ['Everything in Essential + process and rates', 'Mood changes with each video', 'Up to 8 colors and 3 fonts, chosen by you', 'In Spanish', '1 round of revisions', 'Delivered in 7 business days'],
      },
    },
    {
      id: 'firma',
      nombre: { es: 'Firma', en: 'Signature' },
      videos: 10,
      hasta: true,                   // se muestra como "Hasta 10 videos"
      precio: 7000,
      descuento: 0.20,
      rondas: 2,
      cotizador: 'incluido',
      mood: 'estudio',
      incluye: {
        es: ['Todo lo de Pro + cotizador', 'Celular “Aquí iría el tuyo” y 1 foto tipo sticker', 'Cambia de mood con cada video', 'Hasta 8 colores y 4 tipografías, que tú defines', 'En español', '2 rondas de revisión', 'Entrega en 10 días hábiles'],
        en: ['Everything in Pro + quote tool', '“Your video goes here” phone and 1 sticker-style photo', 'Mood changes with each video', 'Up to 8 colors and 4 fonts, chosen by you', 'In Spanish', '2 rounds of revisions', 'Delivered in 10 business days'],
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

  /* Modo creadoras */
  crNavLabel: 'Portfolios for creators',
  crPlansLabel: 'Plans',
  crPrLabel: 'Process',
  crExLabel: 'Extras',
  crqLabel: 'Quote',
  crNavTyc: 'Terms',
  crCtaKicker: 'Are you a UGC creator?',
  crT1: 'Like my portfolio?',
  crT2: 'Get a quote for yours.',
  crCtaText: 'I’ll build you one like it, with your videos, your colors and your style. No monthly fees, and it’s 100% yours.',
  crCtaBtn: 'See plans for creators',
  crKicker: 'Portfolios for UGC creators',
  crLead: 'I’ll build you a page like this one, with your videos, your colors and your fonts. It’s published on your own GitHub account, with no monthly fees, and it’s 100% yours.',
  crCta1: 'See plans',
  crCta2: 'Get a quote',
  crPlansT1: 'Choose your plan',
  crPlansT2: 'and see its mood',
  crPlansIntro: 'Tap a plan and this page switches to its mood. The cards are a preview: your page is built with your own material.',
  crPlansAll: 'Every plan includes a design for phones and computers, a WhatsApp button and publishing on your GitHub account. Prices in MXN, plus VAT.',
  crTycLink: 'Terms and conditions',
  crPrT1: 'How we build it,',
  crPrT2: 'step by step',
  crSt1t: 'Book your spot',
  crSt1p: 'You pick your plan in the quote tool, message me on WhatsApp and pay a 50% deposit.',
  crSt2t: 'Kickoff call',
  crSt2p: 'In a 45-minute video call we define your palette, your fonts, the tone and the sections.',
  crSt3t: 'Send me your material',
  crSt3p: 'Videos, photos, copy and logo, all together. Delivery days start counting from here.',
  crSt4t: 'Review',
  crSt4p: 'I send you your page to review. Essential and Pro include 1 round; Signature includes 2.',
  crSt5t: 'Delivery',
  crSt5p: 'You pay the remaining 50%, I publish it on your GitHub account and it’s 100% yours.',
  crNeedT: 'What I need from you',
  crNeed1: 'Your original videos, up to 90 seconds each',
  crNeed2: '3 to 5 photos of you',
  crNeed3: 'Your copy: tagline, short bio, niches and rates (if included)',
  crNeed4: 'Your palette with color codes (for example, #642D3B)',
  crNeed5: 'Your font names (free or licensed for web use)',
  crNeed6: 'Your logo, ready as PNG or SVG, if you have one',
  crNeed7: 'Your WhatsApp and email',
  crNeed8: 'Translated copy, if you want another language',
  crLimT: 'Limits so your page fits on GitHub',
  crLimP1: 'Each video: up to 90 seconds and 15 MB once compressed (I compress them).',
  crLimP2: 'Up to 12 videos per page. The whole page weighs under 200 MB.',
  crLimP3: 'GitHub accepts files up to 25 MB and pages up to 1 GB, so you have room to spare and your page loads fast on phones.',
  crExT1: 'Make it yours',
  crExT2: 'with extras',
  crExDuring: 'During the project',
  crExAfter: 'After delivery',
  crExAfterP: 'I deliver your page published on your GitHub account, and that’s where my work ends: maintenance isn’t included. I only make changes to pages I built, and they’re charged separately.',
  crqT1: 'Quote',
  crqT2: 'your portfolio',
  crqIntro: 'Build your package and send it to me on WhatsApp. It’s an estimate: I’ll confirm the final price at the kickoff call.',
  crqL1: '1. Choose your plan',
  crqL2: '2. Extras',
  crqL3: '3. More options',
  crqVideos: 'Extra videos',
  crqVideosMinus: 'Remove one video',
  crqVideosPlus: 'Add one video',
  crqIdiomas: 'Extra languages',
  crqIdiomasMinus: 'Remove one language',
  crqIdiomasPlus: 'Add one language',
  crqSecciones: 'Custom sections',
  crqSeccionesMinus: 'Remove one section',
  crqSeccionesPlus: 'Add one section',
  crqStickers: 'Sticker-style photos',
  crqStickersMinus: 'Remove one sticker-style photo',
  crqStickersPlus: 'Add one sticker-style photo',
  crqRondas: 'Extra revision rounds',
  crqRondasMinus: 'Remove one round',
  crqRondasPlus: 'Add one round',
  crqCot: 'Quote tool on my page',
  crqDom: 'Connect my own domain',
  crqName: 'Your name or @handle (optional)',
  crqNamePh: 'e.g. @yourname.ugc',
  crqAccept: 'I have read and accept the terms and conditions.',
  crqSeeTyc: 'See terms',
  crqFine: 'The launch price applies only to the plan, not to extras. Payment: 50% deposit and 50% before publishing. Prices in MXN, plus VAT.',
  crCtT1: 'Ready for',
  crCtT2: 'your portfolio?',
  crCtText: 'Message me on WhatsApp and we’ll book your spot.',
  crBack: 'Back to my portfolio',
  ftCr: 'Are you a creator? Get a quote for your portfolio',
  tycClose: 'Close',
  tycTitle: 'Terms and conditions',
  tycDate: 'Last updated: October 2026',
  tycH1: '1. What’s included',
  tycP1: 'I build your page from scratch using the structure of my portfolio and customize it with your material, your colors and your fonts. It includes only what’s in your plan and the extras you pay for; anything else gets quoted before I do it.',
  tycH2: '2. Your material',
  tycP2: 'You send me everything: videos, photos, copy, logo (ready as PNG or SVG), your palette with color codes and the names of your fonts. I don’t film, write or translate your copy, and I don’t design logos. Essential: up to 3 colors and 2 fonts. Pro: up to 8 colors and 3 fonts. Signature: up to 8 colors and 4 fonts. Fonts must be free (for example, from Google Fonts) or have a web license in your name; otherwise I’ll use a similar one.',
  tycH3: '3. Rights and permissions',
  tycP3: 'You guarantee you have permission to use everything you send me, including videos made for brands, music, photos and fonts. If anyone files a claim over that material, it’s your responsibility. I can turn down illegal or offensive content.',
  tycH4: '4. Payments',
  tycP4: 'You book your spot with a 50% deposit, which is non-refundable after the kickoff call. The remaining 50% is paid before publishing: the page is published and handed over only once it’s paid in full. Prices in Mexican pesos, plus VAT. Quotes are valid for 15 days. The launch price applies only to the plan, not to extras, and only while spots last.',
  tycH5: '5. Timing',
  tycP5: 'Delivery days (5, 7 or 10 business days, depending on your plan) start counting once I have all your material, with your palette and fonts defined. If I don’t receive your material within 30 days, the project is paused and rescheduled based on my availability. After 60 days without a reply, the project is considered closed.',
  tycH6: '6. Revisions',
  tycP6: 'A round is a single list of changes sent together. Essential and Pro include 1 round; Signature includes 2. Each extra round costs <span data-pf="extras.ronda">$300</span>, up to 5 rounds in total. If you don’t reply to a review within 10 business days, that version is considered approved. Changing the palette or fonts after approving them is charged as a redesign.',
  tycH7: '7. Technical limits',
  tycP7: 'Each video is up to 90 seconds and up to 15 MB once compressed (I compress them). Up to 12 videos per page, and the whole page weighs under 200 MB. That keeps it within GitHub’s limits (files up to 25 MB and pages up to 1 GB) and fast on phones.',
  tycH8: '8. Your GitHub account',
  tycP8: 'You open your GitHub account with your own email and phone, and add me as a collaborator during the project; when I deliver, I leave. You look after your password and two-step verification. Your page is published for free on GitHub Pages: there are no monthly fees, but it can’t be used to take payments online.',
  tycH9: '9. Delivery and later changes',
  tycP9: 'I deliver your page published on your GitHub account, and that’s where my work ends: maintenance isn’t included. For 15 days after delivery I fix, free of charge, any functional errors that are mine; content changes aren’t included. After that, every change is charged: replacing a video, <span data-pf="despues.cambiarVideo">$400</span>; adding a video, <span data-pf="despues.agregarVideo">$700</span>; changing copy, prices or photos, <span data-pf="despues.textos">$300</span> per round.',
  tycH10: '10. I only work on my own work',
  tycP10: 'I don’t modify or fix pages made by someone else: I only make changes to pages I built. If you or someone else changes your page’s code and something stops working, I may quote the fix separately or decline it.',
  tycH11: '11. Ownership and credit',
  tycP11: 'Once paid in full, your page and your content are yours. The base structure and code are mine, and I may reuse them with other creators. I may show your page in my portfolio and add “Page made by {nombre} {apellido}” to the footer; with launch pricing, this is a condition.',
  tycH12: '12. Liability',
  tycP12: 'GitHub is an external, free service: I’m not responsible for its outages, rule changes or traffic limits. I don’t guarantee results such as brands, sales, followers or Google ranking. My maximum liability is the amount you paid me.',
  tycH13: '13. Acceptance',
  tycP13: 'By checking “I have read and accept” in the quote tool and by paying the deposit, you accept these terms. If there are differences between the Spanish version and another language, the Spanish version prevails.',
  tycNote: 'Questions? Message me before booking your spot.',
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
    // Modo creadoras
    crWaGeneral: 'Hola, {nombre}. Vi tu página y me interesa un portafolio como el tuyo.',
    crVideos: '{n} videos',
    crVideosUpTo: 'Hasta {n} videos',
    crChoose: 'Elegir {plan}',
    crChosen: 'Elegiste {plan}',
    crLaunch: 'Precio de lanzamiento (−{pct}%)',
    crTax: 'MXN + IVA',
    crRegularSr: 'Precio normal:',
    crTplName: 'Tu nombre',
    crTplLine: 'Tu frase aquí',
    crTplPhoto: 'Tu foto',
    crTplAbout: 'Sobre ti',
    lzLabel: 'Precio de lanzamiento',
    lzAll: 'Solo {total} lugares a precio de lanzamiento',
    lzSome: 'Quedan {left} de {total} lugares a precio de lanzamiento',
    lzOne: 'Queda 1 de {total} lugares a precio de lanzamiento',
    lzNone: 'Precio de lanzamiento agotado',
    lzUntil: ', o hasta el {fecha}, lo que pase primero',
    lzCta: 'Precio de lanzamiento: solo {total} lugares',
    lzCtaSome: 'Precio de lanzamiento: quedan {left} de {total} lugares',
    lzCtaOne: 'Precio de lanzamiento: queda 1 de {total} lugares',
    crMood: 'Plan {plan}: la página cambió a {mood}.',
    crModeOn: 'Estás viendo los planes de portafolio para creadoras.',
    crModeOff: 'Volviste a mi portafolio.',
    xVideo: 'Video adicional',
    xVideoNote: 'Máximo {max} videos por página',
    xEach: 'c/u',
    xIdioma: 'Otro idioma',
    xIdiomaNote: 'Tú mandas los textos traducidos',
    xPerLang: 'por idioma',
    xCot: 'Cotizador en el plan Pro',
    xCotNote: 'En Firma ya viene incluido',
    xSeccion: 'Sección a la medida',
    xSeccionNote: 'Métricas, servicios, preguntas frecuentes o lo que necesites',
    xSticker: 'Foto recortada tipo sticker',
    xStickerNote: 'Firma incluye 1',
    xDominio: 'Conectar tu dominio propio',
    xDominioNote: '.com o .mx; el dominio lo pagas tú cada año',
    xRonda: 'Ronda de revisión extra',
    xRondaNote: 'Máximo {max} rondas en total',
    xCambiarVideo: 'Cambiar un video por otro',
    xAgregarVideo: 'Agregar un video nuevo',
    xTextos: 'Cambiar textos, precios o fotos',
    xPerRound: 'por ronda',
    crqHintVideo: '+{p} c/u · hasta {max}',
    crqHintIdioma: '+{p} por idioma',
    crqHintEach: '+{p} c/u',
    crqHintRonda: '+{p} c/u · hasta {max}',
    crqCotPro: '(+{p})',
    crqCotFirma: '(incluido en Firma)',
    crqCotNo: '(disponible desde Pro)',
    crqDomHint: '(+{p})',
    crqNoPlan: 'Elige tu plan para ver el total.',
    crqPlanLine: 'Plan {plan} · {videos}',
    crqDiscount: 'Descuento de lanzamiento (−{pct}%)',
    crqVideosLine: '{n} video adicional',
    crqVideosLineP: '{n} videos adicionales',
    crqIdiomaLine: '{n} idioma extra',
    crqIdiomaLineP: '{n} idiomas extra',
    crqSeccionLine: '{n} sección a la medida',
    crqSeccionLineP: '{n} secciones a la medida',
    crqStickerLine: '{n} foto tipo sticker',
    crqStickerLineP: '{n} fotos tipo sticker',
    crqRondaLine: '{n} ronda extra',
    crqRondaLineP: '{n} rondas extra',
    crqCotLine: 'Cotizador',
    crqDomLine: 'Dominio propio',
    crqWaHello: 'Hola, {nombre}. Vi tu página y quiero cotizar mi portafolio.',
    crqWaName: 'Soy: {name}',
    crqWaTotal: 'Total aproximado: {total} MXN + IVA',
    crqWaLaunch: '(con precio de lanzamiento en el plan)',
    crqWaAccept: 'Leí y acepto los términos y condiciones.',
    crqWaNoPlan: 'Todavía no elijo plan.',
    crqMailSubject: 'Cotización de portafolio',
    crqErrAccept: 'Para enviar, marca que leíste y aceptas los términos y condiciones.',
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
    // Creator mode
    crWaGeneral: 'Hi {nombre}! I saw your page and I’m interested in a portfolio like yours.',
    crVideos: '{n} videos',
    crVideosUpTo: 'Up to {n} videos',
    crChoose: 'Choose {plan}',
    crChosen: 'You chose {plan}',
    crLaunch: 'Launch price (−{pct}%)',
    crTax: 'MXN + VAT',
    crRegularSr: 'Regular price:',
    crTplName: 'Your name',
    crTplLine: 'Your tagline here',
    crTplPhoto: 'Your photo',
    crTplAbout: 'About you',
    lzLabel: 'Launch price',
    lzAll: 'Only {total} spots at launch price',
    lzSome: '{left} of {total} spots left at launch price',
    lzOne: '1 of {total} spots left at launch price',
    lzNone: 'Launch price sold out',
    lzUntil: ', or until {fecha}, whichever comes first',
    lzCta: 'Launch price: only {total} spots',
    lzCtaSome: 'Launch price: {left} of {total} spots left',
    lzCtaOne: 'Launch price: 1 of {total} spots left',
    crMood: '{plan} plan: the page switched to {mood}.',
    crModeOn: 'You’re viewing the portfolio plans for creators.',
    crModeOff: 'You’re back on my portfolio.',
    xVideo: 'Extra video',
    xVideoNote: 'Up to {max} videos per page',
    xEach: 'each',
    xIdioma: 'Another language',
    xIdiomaNote: 'You send the translated copy',
    xPerLang: 'per language',
    xCot: 'Quote tool on the Pro plan',
    xCotNote: 'Already included in Signature',
    xSeccion: 'Custom section',
    xSeccionNote: 'Metrics, services, FAQ or whatever you need',
    xSticker: 'Sticker-style cut-out photo',
    xStickerNote: 'Signature includes 1',
    xDominio: 'Connect your own domain',
    xDominioNote: '.com or .mx; you pay for the domain each year',
    xRonda: 'Extra revision round',
    xRondaNote: 'Up to {max} rounds in total',
    xCambiarVideo: 'Replace a video',
    xAgregarVideo: 'Add a new video',
    xTextos: 'Change copy, prices or photos',
    xPerRound: 'per round',
    crqHintVideo: '+{p} each · up to {max}',
    crqHintIdioma: '+{p} per language',
    crqHintEach: '+{p} each',
    crqHintRonda: '+{p} each · up to {max}',
    crqCotPro: '(+{p})',
    crqCotFirma: '(included in Signature)',
    crqCotNo: '(available from Pro)',
    crqDomHint: '(+{p})',
    crqNoPlan: 'Choose your plan to see the total.',
    crqPlanLine: '{plan} plan · {videos}',
    crqDiscount: 'Launch discount (−{pct}%)',
    crqVideosLine: '{n} extra video',
    crqVideosLineP: '{n} extra videos',
    crqIdiomaLine: '{n} extra language',
    crqIdiomaLineP: '{n} extra languages',
    crqSeccionLine: '{n} custom section',
    crqSeccionLineP: '{n} custom sections',
    crqStickerLine: '{n} sticker-style photo',
    crqStickerLineP: '{n} sticker-style photos',
    crqRondaLine: '{n} extra round',
    crqRondaLineP: '{n} extra rounds',
    crqCotLine: 'Quote tool',
    crqDomLine: 'Own domain',
    crqWaHello: 'Hi {nombre}! I saw your page and I’d like a quote for my portfolio.',
    crqWaName: 'I’m: {name}',
    crqWaTotal: 'Approximate total: {total} MXN + VAT',
    crqWaLaunch: '(with launch price on the plan)',
    crqWaAccept: 'I have read and accept the terms and conditions.',
    crqWaNoPlan: 'I haven’t chosen a plan yet.',
    crqMailSubject: 'Portfolio quote',
    crqErrAccept: 'To send it, check that you have read and accept the terms and conditions.',
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
    updateModeLinks();
    updateVideoTexts();
    updateQuote();
    renderCreadoras();
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

  /* ---------- Portafolios para creadoras ---------- */
  const PF = typeof PORTAFOLIOS !== 'undefined' && PORTAFOLIOS && PORTAFOLIOS.activo ? PORTAFOLIOS : null;
  const crMain = $('#creadoras');
  const brandMain = $('#marcas');
  const crq = $('#crq');
  const wipe = $('.mode-wipe');
  const siteStatus = $('#site-status');
  const CR_HASH = '#crea-el-tuyo';
  const CRQ_FIELDS = ['videos', 'idiomas', 'secciones', 'stickers', 'rondas'];
  let modo = 'marcas';
  let crPlan = null;
  let crqCotUser = false;
  let returnTo = null;

  const isCrHash = (h) => h === CR_HASH || /^#cr-[\w-]+$/.test(h || '');
  const pick = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] != null ? o[lang] : (o.es != null ? o.es : '')));
  const say = (msg) => { if (siteStatus) siteStatus.textContent = msg; };
  const planById = (id) => (PF && PF.planes.find((p) => p.id === id)) || null;
  const moodOf = (p) => PF.moods[p ? p.mood : PF.moodInicial] || PF.moods[PF.moodInicial];
  const videosLabel = (p) => fmt(p.hasta ? t('crVideosUpTo') : t('crVideos'), { n: p.videos });
  const countLabel = (n, one, many) => fmt(n === 1 ? t(one) : t(many), { n });
  const signed = (n) => (n < 0 ? `−${money(-n)}` : money(n));
  const instant = { behavior: 'instant' };

  function launchState() {
    const l = (PF && PF.lanzamiento) || {};
    const total = Math.max(0, Math.round(Number(l.lugaresTotales) || 0));
    const left = Math.max(0, Math.min(total, Math.round(Number(l.lugaresDisponibles) || 0)));
    return { total, left, activo: total > 0 && left > 0, fecha: pick(l.fechaLimite) };
  }

  function planPrice(p, L = launchState()) {
    const d = L.activo ? Math.max(0, Math.min(0.9, Number(p.descuento) || 0)) : 0;
    return { regular: p.precio, final: Math.round(p.precio * (1 - d)), d };
  }

  // WhatsApp y correo generales: cambian según el modo
  function updateModeLinks() {
    const cr = modo === 'creadoras';
    const msg = fmt(cr ? t('crWaGeneral') : t('waGeneral'), { nombre: CONFIG.nombre });
    $$('.js-wa').forEach((a) => { a.href = waLink(msg); });
    $$('.js-mail').forEach((a) => { a.href = mailLink(cr ? t('crqMailSubject') : t('mailGeneralSubject'), msg); });
  }

  function applyCrMood() {
    const m = moodOf(planById(crPlan));
    applyTheme(m.tema);
    if (m.patron) root.dataset.patron = m.patron; else delete root.dataset.patron;
  }

  function renderLanzamiento() {
    const L = launchState();
    const until = L.fecha ? fmt(t('lzUntil'), { fecha: L.fecha }) : '';
    let text = t('lzNone');
    if (L.total && L.left === L.total) text = fmt(t('lzAll'), { total: L.total }) + until;
    else if (L.left === 1) text = fmt(t('lzOne'), { total: L.total }) + until;
    else if (L.left > 1) text = fmt(t('lzSome'), { left: L.left, total: L.total }) + until;

    const box = $('#cr-lz');
    if (box) {
      if (!L.total) {
        box.innerHTML = '';
      } else {
        const taken = L.total - L.left;
        const dots = Array.from({ length: L.total }, (_, i) => `<span class="lz__dot${i < taken ? ' is-taken' : ''}"></span>`).join('');
        const strike = taken > 0
          ? `<span class="lz__total">${L.total}<svg class="lz__strike" viewBox="0 0 40 60" preserveAspectRatio="none" aria-hidden="true"><path d="M3 50 C 12 41, 24 25, 37 9"/></svg></span>`
          : '';
        box.classList.toggle('lz--off', !L.activo);
        box.innerHTML = `<p class="lz__num" aria-hidden="true">${strike}<span class="lz__left">${L.left}</span></p>
          <div class="lz__body"><p class="lz__label">${esc(t('lzLabel'))}</p><p class="lz__text">${esc(text)}</p><div class="lz__dots" aria-hidden="true">${dots}</div></div>`;
      }
    }
    const cta = $('#cr-cta-lz');
    if (cta) {
      let c = '';
      if (L.activo) {
        if (L.left === L.total) c = fmt(t('lzCta'), { total: L.total });
        else if (L.left === 1) c = fmt(t('lzCtaOne'), { total: L.total });
        else c = fmt(t('lzCtaSome'), { left: L.left, total: L.total });
      }
      cta.textContent = c;
      cta.hidden = !c;
    }
  }

  function renderPlanes() {
    const box = $('#cr-plans');
    if (!box) return;
    const L = launchState();
    box.innerHTML = PF.planes.map((p) => {
      const pr = planPrice(p, L);
      const id = esc(p.id);
      const name = pick(p.nombre);
      const sel = p.id === crPlan;
      const cols = p.videos <= 6 ? p.videos : 5;
      const phones = Array.from({ length: p.videos }, (_, i) => `<b>${i + 1}</b>`).join('');
      const feats = (pick(p.incluye) || [])
        .map((f) => (f.charAt(0) === '!' ? `<li class="is-no">${esc(f.slice(1))}</li>` : `<li>${esc(f)}</li>`)).join('');
      const regular = pr.d ? `<s class="plan__regular"><span class="visually-hidden">${esc(t('crRegularSr'))} </span>${money(pr.regular)}</s>` : '';
      const launch = pr.d ? `<span class="plan__launch">${esc(fmt(t('crLaunch'), { pct: Math.round(pr.d * 100) }))}</span>` : '';
      return `<article class="plan plan--${esc(p.mood)}${sel ? ' is-selected' : ''}" data-plan="${id}" aria-labelledby="plan-${id}">
        <div class="plan__head"><h3 class="plan__name" id="plan-${id}">${esc(name)}</h3><span class="plan__videos">${esc(videosLabel(p))}</span></div>
        <p class="plan__mood">${esc(pick(moodOf(p).nombre))}</p>
        <div class="tpl" aria-hidden="true">
          <p class="tpl__name">${esc(t('crTplName'))}</p>
          <p class="tpl__line">${esc(t('crTplLine'))}</p>
          <div class="tpl__row"><span class="tpl__photo">${esc(t('crTplPhoto'))}<i>4:5</i></span><span class="tpl__bars"><span>${esc(t('crTplAbout'))}</span><i></i><i></i><i></i></span></div>
          <div class="tpl__phones" style="--cols:${cols}">${phones}</div>
        </div>
        <ul class="plan__feats">${feats}</ul>
        <p class="plan__price">${regular}<span class="plan__now">${money(pr.final)}</span><span class="plan__tax">${esc(t('crTax'))}</span>${launch}</p>
        <button type="button" class="plan__btn" data-plan="${id}" aria-pressed="${sel}">${esc(fmt(sel ? t('crChosen') : t('crChoose'), { plan: name }))}</button>
      </article>`;
    }).join('');
  }

  function renderExtras() {
    const E = PF.extras;
    const D = PF.despues;
    const row = (label, note, price) => `<div><dt>${esc(label)}${note ? `<small>${esc(note)}</small>` : ''}</dt><dd>${esc(price)}</dd></div>`;
    const plus = (n, suffix) => `+${money(n)}${suffix ? ` ${suffix}` : ''}`;
    const durante = $('#cr-x-durante');
    const despues = $('#cr-x-despues');
    if (durante) {
      durante.innerHTML = [
        row(t('xVideo'), fmt(t('xVideoNote'), { max: PF.maxVideos }), plus(E.video, t('xEach'))),
        row(t('xIdioma'), t('xIdiomaNote'), plus(E.idioma, t('xPerLang'))),
        row(t('xCot'), t('xCotNote'), plus(E.cotizador)),
        row(t('xSeccion'), t('xSeccionNote'), plus(E.seccion, t('xEach'))),
        row(t('xSticker'), t('xStickerNote'), plus(E.sticker, t('xEach'))),
        row(t('xDominio'), t('xDominioNote'), plus(E.dominio)),
        row(t('xRonda'), fmt(t('xRondaNote'), { max: PF.maxRondas }), plus(E.ronda, t('xEach'))),
      ].join('');
    }
    if (despues) {
      despues.innerHTML = [
        row(t('xCambiarVideo'), '', money(D.cambiarVideo)),
        row(t('xAgregarVideo'), '', money(D.agregarVideo)),
        row(t('xTextos'), '', `${money(D.textos)} ${t('xPerRound')}`),
      ].join('');
    }
  }

  // Precios dentro de los términos (data-pf="extras.ronda", etc.)
  function fillPfPrices() {
    $$('[data-pf]').forEach((el) => {
      const v = el.dataset.pf.split('.').reduce((o, k) => (o == null ? o : o[k]), PF);
      if (typeof v === 'number') el.textContent = money(v);
    });
  }

  function renderCrqPlanes() {
    const box = $('#crq-planes');
    if (!box) return;
    const L = launchState();
    box.innerHTML = PF.planes.map((p) => {
      const pr = planPrice(p, L);
      return `<label class="choice"><input type="radio" name="crPlan" value="${esc(p.id)}"${p.id === crPlan ? ' checked' : ''}><span class="choice__box"><span class="choice__title">${esc(pick(p.nombre))}</span><span class="choice__meta">${esc(videosLabel(p))}</span><span class="choice__price">${pr.d ? `<s>${money(pr.regular)}</s>` : ''}${money(pr.final)}</span></span></label>`;
    }).join('');
  }

  function crqLimits(p) {
    const minVideos = Math.min(...PF.planes.map((x) => x.videos));
    const minRondas = Math.min(...PF.planes.map((x) => x.rondas));
    return {
      videos: Math.max(0, PF.maxVideos - (p ? p.videos : minVideos)),
      idiomas: 2,
      secciones: 4,
      stickers: 4,
      rondas: Math.max(0, PF.maxRondas - (p ? p.rondas : minRondas)),
    };
  }

  function crqRead() {
    const p = planById(crPlan);
    const lim = crqLimits(p);
    const v = {};
    CRQ_FIELDS.forEach((k) => {
      const n = Math.round(Number($(`#crq-${k}`).value));
      v[k] = Number.isFinite(n) ? Math.max(0, Math.min(lim[k], n)) : 0;
    });
    const E = PF.extras;
    const cot = !!(p && p.cotizador === 'extra' && crqCotUser);
    const dom = $('#crq-dominio').checked;
    const items = [];
    let launch = false;
    if (p) {
      const pr = planPrice(p);
      items.push({ label: fmt(t('crqPlanLine'), { plan: pick(p.nombre), videos: videosLabel(p) }), amount: pr.regular });
      if (pr.d) {
        launch = true;
        items.push({ label: fmt(t('crqDiscount'), { pct: Math.round(pr.d * 100) }), amount: pr.final - pr.regular, discount: true });
      }
    }
    if (v.videos) items.push({ label: countLabel(v.videos, 'crqVideosLine', 'crqVideosLineP'), amount: v.videos * E.video });
    if (v.idiomas) items.push({ label: countLabel(v.idiomas, 'crqIdiomaLine', 'crqIdiomaLineP'), amount: v.idiomas * E.idioma });
    if (cot) items.push({ label: t('crqCotLine'), amount: E.cotizador });
    if (v.secciones) items.push({ label: countLabel(v.secciones, 'crqSeccionLine', 'crqSeccionLineP'), amount: v.secciones * E.seccion });
    if (v.stickers) items.push({ label: countLabel(v.stickers, 'crqStickerLine', 'crqStickerLineP'), amount: v.stickers * E.sticker });
    if (dom) items.push({ label: t('crqDomLine'), amount: E.dominio });
    if (v.rondas) items.push({ label: countLabel(v.rondas, 'crqRondaLine', 'crqRondaLineP'), amount: v.rondas * E.ronda });
    const subtotal = items.reduce((s, it) => s + it.amount, 0);
    return { p, v, lim, items, subtotal, launch, name: ($('#crq-nombre').value || '').trim() };
  }

  function crqUpdate() {
    if (!crq || !PF) return;
    const q = crqRead();
    const E = PF.extras;

    CRQ_FIELDS.forEach((k) => {
      const el = $(`#crq-${k}`);
      el.max = String(q.lim[k]);
      if (el.value !== String(q.v[k])) el.value = String(q.v[k]);
    });
    $$('.stepper__btn', crq).forEach((b) => {
      const k = b.dataset.target.replace('crq-', '');
      const off = Number(b.dataset.step) < 0 ? q.v[k] <= 0 : q.v[k] >= q.lim[k];
      b.setAttribute('aria-disabled', String(off));
    });

    const hint = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };
    hint('#crq-videos-hint', fmt(t('crqHintVideo'), { p: money(E.video), max: q.lim.videos }));
    hint('#crq-idiomas-hint', fmt(t('crqHintIdioma'), { p: money(E.idioma) }));
    hint('#crq-secciones-hint', fmt(t('crqHintEach'), { p: money(E.seccion) }));
    hint('#crq-stickers-hint', fmt(t('crqHintEach'), { p: money(E.sticker) }));
    hint('#crq-rondas-hint', fmt(t('crqHintRonda'), { p: money(E.ronda), max: q.lim.rondas }));

    const cotEl = $('#crq-cotizador');
    const cotMode = q.p ? q.p.cotizador : 'no';
    cotEl.disabled = cotMode !== 'extra';
    cotEl.checked = cotMode === 'incluido' || (cotMode === 'extra' && crqCotUser);
    hint('#crq-cot-hint', cotMode === 'incluido' ? t('crqCotFirma') : cotMode === 'extra' ? fmt(t('crqCotPro'), { p: money(E.cotizador) }) : t('crqCotNo'));
    hint('#crq-dom-hint', fmt(t('crqDomHint'), { p: money(E.dominio) }));

    const list = $('#crq-breakdown');
    list.innerHTML = '';
    if (!q.p) {
      $('#crq-total').textContent = '—';
      $('#crq-iva').textContent = t('crqNoPlan');
    } else {
      $('#crq-total').textContent = money(q.subtotal);
      $('#crq-iva').textContent = fmt(t('withIva'), { total: money(q.subtotal * (1 + CONFIG.iva)), pct: Math.round(CONFIG.iva * 100) });
      q.items.forEach((it) => {
        const li = document.createElement('li');
        const a = document.createElement('span'); a.textContent = it.label;
        const b = document.createElement('span'); b.textContent = signed(it.amount);
        li.append(a, b);
        list.appendChild(li);
      });
    }

    const lines = [fmt(t('crqWaHello'), { nombre: CONFIG.nombre })];
    if (q.name) lines.push(fmt(t('crqWaName'), { name: q.name }));
    lines.push('');
    if (q.p) q.items.filter((it) => !it.discount).forEach((it) => lines.push(`• ${it.label}`));
    else lines.push(t('crqWaNoPlan'));
    if (q.p) {
      lines.push('');
      lines.push(fmt(t('crqWaTotal'), { total: money(q.subtotal) }) + (q.launch ? ` ${t('crqWaLaunch')}` : ''));
    }
    lines.push('');
    lines.push(t('crqWaAccept'));
    const msg = lines.join('\n');
    $('#crq-wa').href = waLink(msg);
    $('#crq-mail').href = mailLink(t('crqMailSubject') + (q.p ? ` · ${pick(q.p.nombre)}` : ''), msg.replace(/\n/g, '\r\n'));

    const ok = $('#crq-acepto').checked;
    ['#crq-wa', '#crq-mail'].forEach((s) => $(s).setAttribute('aria-disabled', String(!ok)));
    if (ok) $('#crq-err').hidden = true;
  }

  function syncPlanUI() {
    $$('.plan', $('#cr-plans')).forEach((c) => {
      const on = c.dataset.plan === crPlan;
      const p = planById(c.dataset.plan);
      const b = $('.plan__btn', c);
      c.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', String(on));
      b.textContent = fmt(on ? t('crChosen') : t('crChoose'), { plan: pick(p.nombre) });
    });
    if (crq) $$('input[name="crPlan"]', crq).forEach((r) => { r.checked = r.value === crPlan; });
  }

  function selectPlan(id) {
    const p = planById(id);
    if (!p) return;
    const changed = crPlan !== id;
    crPlan = id;
    syncPlanUI();
    if (modo === 'creadoras') applyCrMood();
    crqUpdate();
    if (changed) say(fmt(t('crMood'), { plan: pick(p.nombre), mood: pick(moodOf(p).nombre).toLowerCase() }));
  }

  function renderCreadoras() {
    if (!PF) return;
    renderLanzamiento();
    renderPlanes();
    renderExtras();
    renderCrqPlanes();
    fillPfPrices();
    crqUpdate();
  }

  // Cambia entre el portafolio (marcas) y el modo creadoras
  function setModo(next, opts = {}) {
    if (!PF || !crMain || !brandMain || next === modo) return;
    const swap = () => {
      modo = next;
      const toCr = next === 'creadoras';
      if (toCr) {
        if (current) { const v = current.video; current = null; v.pause(); }
        if (celSelected) { celSelected = null; updateCelTexts(); }
      }
      brandMain.hidden = toCr;
      crMain.hidden = !toCr;
      $$('[data-nav]').forEach((el) => { el.hidden = el.dataset.nav !== next; });
      const back = $('#back-pill');
      if (back) back.hidden = !toCr;
      root.dataset.modo = next;
      if (toCr) applyCrMood();
      else { delete root.dataset.patron; resetTheme(); }
      updateModeLinks();
      const skip = $('.skip-link');
      if (skip) skip.setAttribute('href', toCr ? '#cr-planes' : '#portafolio');
      if (opts.history === 'push') history.pushState({ crModo: true }, '', CR_HASH);
      else if (opts.history === 'replace') history.replaceState(null, '', toCr ? CR_HASH : location.pathname + location.search);

      if (toCr) {
        let target = null;
        if (opts.keepHash && location.hash && location.hash !== CR_HASH) {
          try { target = $(location.hash); } catch (e) { target = null; }
        }
        if (target) target.scrollIntoView(instant);
        else {
          window.scrollTo({ top: 0, ...instant });
          const h = $('#cr-title');
          if (h) h.focus({ preventScroll: true });
        }
        say(t('crModeOn'));
      } else {
        const to = returnTo ? $(returnTo) : null;
        if (to) to.scrollIntoView({ block: 'center', ...instant });
        else window.scrollTo({ top: 0, ...instant });
        returnTo = null;
        say(t('crModeOff'));
      }
    };
    if (opts.instant || reduceMotion.matches || !wipe) { swap(); return; }
    wipe.classList.remove('is-out');
    void wipe.offsetWidth;
    wipe.classList.add('is-in');
    window.setTimeout(() => {
      swap();
      wipe.classList.remove('is-in');
      wipe.classList.add('is-out');
      window.setTimeout(() => wipe.classList.remove('is-out'), 520);
    }, 440);
  }

  function openTyc() {
    const d = $('#terminos');
    if (!d) return;
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
    const inner = $('.tyc__inner', d);
    if (inner) inner.scrollTop = 0;
    const c = $('.tyc__close', d);
    if (c) c.focus();
  }

  function closeTyc() {
    const d = $('#terminos');
    if (!d) return;
    if (typeof d.close === 'function' && d.open) d.close(); else d.removeAttribute('open');
  }

  function initCreadoras() {
    if (!PF || !crMain || !brandMain) {
      $$('.cr-cta, .footer__cr').forEach((el) => { el.hidden = true; });
      return;
    }
    document.addEventListener('click', (e) => {
      const m = e.target.closest('.js-modo');
      if (m) {
        e.preventDefault();
        if (m.dataset.modo === 'creadoras') {
          returnTo = m.closest('.cr-cta') ? '.cr-cta' : m.closest('.footer') ? '.footer' : null;
          setModo('creadoras', { history: 'push' });
        } else {
          setModo('marcas', { history: 'replace' });
        }
        return;
      }
      const tyc = e.target.closest('.js-tyc');
      if (tyc) { e.preventDefault(); openTyc(); }
    });

    const plansBox = $('#cr-plans');
    if (plansBox) {
      plansBox.addEventListener('click', (e) => {
        const b = e.target.closest('.plan__btn');
        if (b) selectPlan(b.dataset.plan);
      });
    }

    if (crq) {
      crq.addEventListener('submit', (e) => e.preventDefault());
      crq.addEventListener('change', (e) => {
        if (e.target.name === 'crPlan') { selectPlan(e.target.value); return; }
        if (e.target.id === 'crq-cotizador') crqCotUser = e.target.checked;
        crqUpdate();
      });
      crq.addEventListener('input', (e) => { if (e.target.type === 'text') crqUpdate(); });
      $$('.stepper__btn', crq).forEach((b) => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        const el = document.getElementById(b.dataset.target);
        el.value = String((Number(el.value) || 0) + Number(b.dataset.step));
        crqUpdate();
      }));
      ['#crq-wa', '#crq-mail'].forEach((s) => {
        const a = $(s);
        if (!a) return;
        a.addEventListener('click', (e) => {
          if ($('#crq-acepto').checked) return;
          e.preventDefault();
          const err = $('#crq-err');
          err.textContent = t('crqErrAccept');
          err.hidden = false;
          $('#crq-acepto').focus();
        });
      });
    }

    const dlg = $('#terminos');
    if (dlg) {
      const close = $('.tyc__close', dlg);
      if (close) close.addEventListener('click', closeTyc);
      dlg.addEventListener('click', (e) => { if (e.target === dlg) closeTyc(); });
    }

    // Botón "atrás" del navegador y links directos (…/#crea-el-tuyo)
    window.addEventListener('popstate', () => {
      const want = isCrHash(location.hash) ? 'creadoras' : 'marcas';
      if (want !== modo) setModo(want, { keepHash: true });
    });
    if (isCrHash(location.hash)) setModo('creadoras', { instant: true, keepHash: true });
  }

  /* ---------- Detalles: barra superior y apariciones suaves ---------- */
  function initChrome() {
    const bar = $('#topbar');
    const onScroll = () => bar && bar.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const targets = $$('.section-head, .section .display, .about__photos, .about__text > p, .tags, .step, .terms, .rate-card, .extras, .quote, .contact__inner > *')
      .filter((el) => !el.closest('#creadoras'));
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
  initCreadoras();
  initLanguage();
  applyLanguage();
  initChrome();
})();
