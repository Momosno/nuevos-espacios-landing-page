export const siteConfig = {
  name: "Nuevos Espacios",
  description:
    "Nuevos Espacios es una empresa dedicada a la venta de jardines artificiales verticales, cesped sintetico y plantas artificiales en CABA, Buenos Aires.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuevosespacios.com.ar",
  ogImage: '/og.png', // put a 1200x630 image in /public/og.png later
} as const;

export const contactConfig = {
  whatsappNumber: "5491139359554",
  phoneDisplay: "+54 9 11 3935-9554",
  email: process.env.EMAIL_ADDRESS,
  location: "Villa Pueyrredon, CABA, Buenos Aires",
} as const;

export const benefits = [
  {
    title: "Estetica todo el ano",
    description:
      "Ambientes siempre verdes, sin poda ni riego, ideales para interiores, balcones y locales comerciales.",
  },
  {
    title: "Instalacion profesional",
    description:
      "Asesoramiento y colocacion para que cada pared o espacio quede prolijo, resistente y listo para disfrutar.",
  },
  {
    title: "Bajo mantenimiento",
    description:
      "Materiales durables con minima limpieza y excelente presencia visual en hogares y proyectos corporativos.",
  },
] as const;

export const products = [
  {
    title: "Jardines verticales artificiales",
    description:
      "Producto principal para crear muros verdes con impacto visual premium en interior o exterior.",
    badge: "Producto principal",
  },
  {
    title: "Plantas artificiales",
    description:
      "Opciones decorativas realistas para completar oficinas, recepciones, hogares y eventos.",
    badge: "Complementario",
  },
  {
    title: "Cesped sintetico",
    description:
      "Superficie uniforme y resistente para patios, terrazas, balcones y espacios recreativos.",
    badge: "Complementario",
  },
] as const;

export const clients = [
  "Estudios de arquitectura",
  "Locales gastronomicos",
  "Consorcios y constructoras",
  "Oficinas corporativas",
  "Tiendas y showrooms",
  "Clientes residenciales",
] as const;

export const portfolio = [
  { name: "Terraza Urbana", tone: "green", size: "tall" },
  { name: "Lobby Corporativo", tone: "pink", size: "wide" },
  { name: "Balcon Privado", tone: "green", size: "medium" },
  { name: "Recepcion Comercial", tone: "violet", size: "tall" },
  { name: "Patio Moderno", tone: "green", size: "medium" },
  { name: "Hall de Edificio", tone: "pink", size: "wide" },
  { name: "Espacio de Co-working", tone: "violet", size: "medium" },
] as const;

export const reviews = [
  {
    author: "Romina G.",
    rating: 5,
    summary: "Excelente calidad y atencion",
    body: "Nos instalaron un jardin vertical en el quincho y quedo impecable. Cumplieron tiempos y asesoraron muy bien.",
    source: "Google",
  },
  {
    author: "Mariano P.",
    rating: 5,
    summary: "Super recomendables",
    body: "Buscabamos una solucion para la terraza y el cesped sintetico quedo perfecto. Muy prolijo el trabajo.",
    source: "Google",
  },
  {
    author: "Carla V.",
    rating: 5,
    summary: "Cambio total del local",
    body: "Sumamos paneles verdes y plantas artificiales en el ingreso del negocio. Mejora visual inmediata.",
    source: "Google",
  },
  {
    author: "Federico T.",
    rating: 5,
    summary: "Servicio profesional",
    body: "Desde el primer contacto hasta la instalacion todo fue claro. Materiales muy buenos y terminaciones excelentes.",
    source: "Google",
  },
  {
    author: "Luciana M.",
    rating: 5,
    summary: "Muy buena experiencia",
    body: "Nos ayudaron a elegir la combinacion correcta para el patio. El resultado quedo prolijo y con gran impacto visual.",
    source: "Google",
  },
  {
    author: "Diego R.",
    rating: 5,
    summary: "Atencion rapida y clara",
    body: "Pedi presupuesto por WhatsApp y respondieron enseguida. La instalacion fue ordenada y termino en el tiempo acordado.",
    source: "Google",
  },
] as const;
