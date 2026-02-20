"use client";

import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { benefits, clients, contactConfig, products, reviews } from "@/lib/site";
import type { IconType } from "react-icons";
import {
  FiClock,
  FiCreditCard,
  FiDroplet,
  FiMapPin,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

type GalleryTab = "jardines" | "plantas" | "cesped";

const galleryTabs = [
  {
    key: "jardines" as const,
    label: "Jardines verticales",
    images: [
      { name: "Terraza Urbana", src: "/jardin_1.jpeg", size: "tall" as const },
      { name: "Lobby Corporativo", src: "/jardin_2.jpeg", size: "wide" as const },
      { name: "Patio Moderno", src: "/jardin_3.jpeg", size: "medium" as const },
      { name: "Recepcion Comercial", src: "/jardin_4.jpeg", size: "tall" as const },
      { name: "1", src: "/jardin_5.jpeg", size: "tall" as const },
      { name: "2", src: "/jardin_6.jpg", size: "tall" as const },
      { name: "3", src: "/jardin_7.jpg", size: "tall" as const },
      { name: "4", src: "/jardin_8.jpeg", size: "tall" as const },
      { name: "5", src: "/jardin_9.jpeg", size: "tall" as const },
    ],
  },  
  {
    key: "plantas" as const,
    label: "Plantas artificiales",
    images: [
      { name: "Showroom Verde", src: "/5.jpg", size: "wide" as const },
      { name: "Ingreso Comercial", src: "/6.jpeg", size: "medium" as const },
      { name: "Pasillo Decorado", src: "/7.jpeg", size: "tall" as const },
      { name: "Estar Moderno", src: "/8.jpeg", size: "medium" as const },
    ],
  },
  {
    key: "cesped" as const,
    label: "Cesped sintetico",
    images: [
      { name: "Balcon Privado", src: "/product_cesped_1.jpeg", size: "wide" as const },
      { name: "Terraza Familiar", src: "/product_cesped_2.jpeg", size: "tall" as const },
      { name: "Zona Recreativa", src: "/product_cesped_3.jpeg", size: "medium" as const },
      { name: "1", src: "/product_cesped_4.jpeg", size: "medium" as const },
      { name: "2", src: "/product_cesped_5.jpeg", size: "medium" as const },
      { name: "3", src: "/product_cesped_6.jpeg", size: "medium" as const },
      { name: "4", src: "/product_cesped_7.jpeg", size: "medium" as const },
      { name: "5", src: "/product_cesped_8.jpeg", size: "medium" as const },
    ],
  },
];

const productImages = ["product_jardin.jpeg", "product_plantas.webp ", "product_cesped_1.jpeg"] as const;

const mainBenefitIcons: IconType[] = [FiSun, FiUsers, FiShield, FiCreditCard];
const extraBenefitIcons: IconType[] = [FiClock, FiDroplet, FiTrendingUp, FiCreditCard, FiMapPin];

const extraInfo = [
  {
    title: "Instalacion en 24/48 hs",
    brief: "Planificamos la instalacion de forma agil y ordenada.",
    body: "Coordinamos visita y agenda para que el trabajo se realice sin demoras innecesarias y con el menor impacto en tu rutina.",
  },
  {
    title: "Materiales UV y lavables",
    brief: "Elegimos materiales resistentes y faciles de cuidar.",
    body: "Seleccionamos paneles y plantas artificiales con buena terminacion visual, faciles de limpiar y con reposicion por modulo cuando hace falta.",
  },
  {
    title: "Diseno adaptado a tu estilo",
    brief: "Definimos una propuesta que combine con tu espacio.",
    body: "Armamos una seleccion de colores y texturas para que el resultado refleje la identidad del ambiente y se vea armonico desde el primer dia.",
  },
  {
    title: "Opciones de pago claras",
    brief: "Te ofrecemos alternativas para que avances con tranquilidad.",
    body: "Contas con opciones en cuotas y beneficios por pago en efectivo o transferencia, segun el tipo de trabajo que necesites.",
  },
  {
    title: "Medicion y presupuesto",
    brief: "Recibis una propuesta completa antes de empezar.",
    body: "Tomamos medidas, recomendamos materiales y te enviamos un presupuesto detallado para que tengas claridad sobre alcance, tiempos y costo final.",
  },
] as const;

function imageHeight(size: "tall" | "medium" | "wide") {
  if (size === "tall") return "h-[26rem]";
  if (size === "wide") return "h-[18rem]";
  return "h-[21rem]";
}

function getClientTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("ne-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState<GalleryTab>("jardines");
  const [galleryModalIndex, setGalleryModalIndex] = useState<number | null>(null);
  const [reviewModalIndex, setReviewModalIndex] = useState<number | null>(null);
  const [infoModalIndex, setInfoModalIndex] = useState<number | null>(null);
  const didInitTheme = useRef(false);
  const logosTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nextTheme = getClientTheme();
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("ne-theme", nextTheme);
    didInitTheme.current = true;
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!didInitTheme.current) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("ne-theme", theme);
  }, [theme]);

  useEffect(() => {
    let frameId = 0;
    let offset = 0;
    let lastTime = 0;
    const speed = 42; // px/sec

    const tick = (time: number) => {
      const track = logosTrackRef.current;
      if (!track) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (lastTime === 0) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const halfWidth = track.scrollWidth / 2;
      offset -= speed * dt;
      if (Math.abs(offset) >= halfWidth) offset = 0;

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const selectedTab = galleryTabs.find((tab) => tab.key === activeTab) ?? galleryTabs[0];
  const marqueeClients = [...clients, ...clients];
  const activeReview = reviewModalIndex !== null ? reviews[reviewModalIndex] : null;
  const allBenefits = [
    ...benefits.map((benefit, index) => ({
      title: benefit.title,
      description: benefit.description,
      iconGroup: "main" as const,
      iconIndex: index,
    })),
    ...extraInfo.map((item, index) => ({
      title: item.title,
      description: item.brief,
      iconGroup: "extra" as const,
      iconIndex: index,
    })),
  ];

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      "Hola! Quiero un presupuesto para jardines verticales artificiales."
    );
    return `https://wa.me/${contactConfig.whatsappNumber}?text=${message}`;
  }, []);

  const scrollToGallery = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById("gallery");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const baseText = theme === "dark" ? "text-zinc-100" : "text-zinc-900";
  const mutedText = theme === "dark" ? "text-zinc-300" : "text-zinc-700";
  const panelBorder = theme === "dark" ? "border-white/15" : "border-black/10";
  const heroShadow =
    theme === "dark"
      ? "shadow-[0_24px_58px_-24px_rgba(255,255,255,0.38)]"
      : "shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)]";
  const glassPanel =
    theme === "dark"
      ? "border-white/15 bg-white/10 backdrop-blur-xl"
      : "border-black/10 bg-white/60 backdrop-blur-xl";
  const card =
    theme === "dark"
      ? "border-white/15 bg-black/35 backdrop-blur-md"
      : "border-black/10 bg-white/80 backdrop-blur-md";

  return (
    <div
      className={`relative min-h-screen overflow-x-clip ${baseText} transition-all duration-1000 ${
        isReady ? "blur-0 opacity-100" : "blur-md opacity-70"
      }`}
    >
      <div className="fixed inset-0 -z-30 bg-[url('/website_background_mobile.png')] bg-cover bg-center bg-no-repeat md:bg-[url('/website_background_desktop.png')]" />
      <div className="fixed inset-0 -z-20 bg-black/55" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(124,197,136,0.08),transparent_42%),radial-gradient(circle_at_86%_12%,rgba(237,178,233,0.08),transparent_38%)]" />

      <header className="sticky top-4 z-30 mx-auto w-[min(1140px,92vw)] pt-4">
        <div className={`rounded-2xl border px-4 py-3 md:px-6 ${glassPanel}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-md tracking-[0.22em] `}>NUEVOS ESPACIOS</p>
              <p className="mt-1 text-md font-semibold">CABA, Buenos Aires</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Presupuesto
              </a>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-full border px-3 py-2 text-sm ${card}`}
              >
                {theme === "dark" ? "Modo dia" : "Modo noche"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-8">
        <section className="my-16">
          <div className="mx-auto w-[90%] lg:w-[70%] max-w-[1400px]">
            <div
              className={`relative overflow-hidden rounded-3xl border px-5 py-16 md:px-10 md:py-24 border-white/15 shadow-[0_24px_58px_-24px_rgba(255,255,255,0.38)]`}
            >
              <div className="w-full absolute inset-0 bg-[linear-gradient(120deg,rgba(8,19,12,0.72),rgba(18,12,21,0.58)),radial-gradient(circle_at_18%_50%,rgba(113,194,126,0.38),transparent_48%),radial-gradient(circle_at_86%_20%,rgba(204,142,198,0.25),transparent_40%)]" />
              <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                <img
                  src="/hero.png"
                  alt="Hero Nuevos Espacios"
                  className="h-full w-full object-cover z-100 hidden md:block"
                />
              </div>
              <div className="relative w-full z-10 w-full md:w-[102%] grid md:grid-cols-2 ">
                <div />
                <div className="space-y-7 text-center md:text-right p-6">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-sm ${card}`}>
                    Jardines verticales artificiales
                  </span>
                  <h1 className="text-5xl font-semibold leading-tight -mb-4 text-white md:text-7xl">
                    Nuevos
                  </h1>
                  <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl">
                    Espacios
                  </h1>
                  <p className="text-base leading-relaxed text-white/85 md:ml-auto md:max-w-xl md:text-lg">
                    Creamos paredes verdes modernas con instalacion profesional en CABA y GBA.
                    Tambien trabajamos plantas artificiales y cesped sintetico para proyectos
                    residenciales y comerciales.
                  </p>
                  <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 to-fuchsia-300 md:ml-auto" />
                  <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      Pedir presupuesto
                    </a>
                    <a
                      href="#gallery"
                      onClick={scrollToGallery}
                      className={`rounded-full border px-6 py-3 text-sm font-semibold ${card}`}
                    >
                      Ver galeria
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/15 bg-black/25 py-[clamp(3.3rem,7vw,6.2rem)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-white/[0.04] to-black/25" />
          <div className="relative mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6">
              <p className={`text-xs tracking-[0.18em] text-zinc-100`}>VENTAJAS</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-100">
                Espacios verdes con presencia, cuidado simple y atencion cercana
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {allBenefits.map((item) => {
                const Icon =
                  item.iconGroup === "main"
                    ? mainBenefitIcons[item.iconIndex]
                    : extraBenefitIcons[item.iconIndex];

                return (
                <article key={item.title} className={`grid h-full grid-cols-[88px_1fr] gap-4 rounded-2xl items-center border p-5 ${card}`}>
                  <span className="grid h-20 w-20 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white">
                    {Icon ? <Icon className="h-10 w-10" aria-hidden="true" /> : null}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${mutedText}`}>{item.description}</p>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-[clamp(3.3rem,7vw,6.2rem)]">
          <div className="mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className={`text-xs tracking-[0.18em] text-zinc-100`}>PRESUPUESTO</p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-100">Asesoria inicial sin costo</h2>
                <p className={`mt-2 text-zinc-100`}>
                  Te recomendamos una solucion real segun tu espacio, estilo y uso.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Escribir por WhatsApp
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product, index) => (
                <article key={product.title} className={`rounded-2xl border p-5 ${glassPanel}`}>
                  <a
                    href="#gallery"
                    onClick={() =>
                      setActiveTab(index === 0 ? "jardines" : index === 1 ? "plantas" : "cesped")
                    }
                  >
                    <img
                      src={productImages[index % productImages.length]}
                      alt={product.title}
                      className="mb-4 h-64 w-full rounded-xl object-cover"
                    />
                  </a>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-sm ${card}`}>
                    {product.badge}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold">{product.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${mutedText}`}>{product.description}</p>
                  <a
                    href="#gallery"
                    onClick={() =>
                      setActiveTab(index === 0 ? "jardines" : index === 1 ? "plantas" : "cesped")
                    }
                    className={`mt-4 inline-flex rounded-full border px-3 py-1 text-sm ${card}`}
                  >
                    Ver galeria de este producto
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/15 bg-black/25 py-[clamp(3.3rem,7vw,6.2rem)] backdrop-blur-sm">
          <div className="mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6">
              <p className={`text-xs tracking-[0.18em] text-zinc-100`}>CLIENTES</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-100">Marcas y espacios que confian</h2>
            </div>
            <div className="overflow-hidden">
              <div ref={logosTrackRef} className="flex w-max gap-3 will-change-transform">
                {marqueeClients.map((client, index) => (
                  <span
                    key={`${client}-${index}`}
                    className={`grid justify-items-center gap-1 rounded-2xl border px-4 py-3 text-center text-sm ${glassPanel}`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-gradient-to-br from-emerald-400 to-fuchsia-400 text-[11px] font-bold text-white">
                      {client
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-[clamp(3.3rem,7vw,6.2rem)]">
          <div className="mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={`text-xs tracking-[0.18em] text-zinc-100`}>GALERIA</p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-100">Galeria de trabajos</h2>
              </div>
              {/* <span className={`rounded-full border px-3 py-1 text-sm ${card}`}>Tabs por producto</span> */}
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {galleryTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeTab === tab.key
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : theme === "dark"
                        ? "border-white/20 bg-black/65 text-zinc-100 hover:bg-black/80"
                        : "border-black/15 bg-white/75 text-zinc-900 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {selectedTab.images.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setGalleryModalIndex(index)}
                  className={`group relative mb-5 block w-full overflow-hidden rounded-2xl ${imageHeight(
                    item.size
                  )} text-left`}
                >
                  <img src={item.src} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
                  <div className="absolute right-3 bottom-3 left-3 text-white">
                    <p className="text-lg font-semibold">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/15 bg-black/25 py-[clamp(3.3rem,7vw,6.2rem)] backdrop-blur-sm">
          <div className="mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={`text-xs tracking-[0.18em] text-zinc-100`}>RESENAS</p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-100">Reseñas de Google</h2>
              </div>
              {/* <span className={`rounded-full border px-3 py-1 text-sm ${card}`}>
                Frontend estatico, sin backend
              </span> */}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review, index) => (
                <article key={review.author} className={`rounded-2xl border ${card}`}>
    
          <div className="w-full max-w-[560px] rounded-2xl bg-[#f1f3f4]  p-5 text-[#202124] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:p-6">
            <div className="mb-3 flex flex-col  items-center justify-between">


            <div className="mt-3  self-start flex items-center gap-4">
              <span className="grid  h-12 w-12 place-items-center rounded-full border border-[#9aa0a6] text-[13px] font-semibold text-[#5f6368]">
                {review.author
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div>
                <p className="text-base font-medium text-[#202124]">{review.author}</p>
                <p className="text-[23px] leading-none tracking-[0.12em] text-[#f9ab00]">
                  {"*".repeat(review.rating)}
                </p>
              </div>
            </div>
                 <p className="mt-4 text-sm leading-relaxed text-[#202124]">{review.body}</p>
 

                        <div className="mt-4 flex justify-end"> 

                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[clamp(3.3rem,7vw,6.2rem)]">
          <div className="mx-auto w-[min(1140px,92vw)]">
            <div className="mb-6">
              <p className={`text-xs tracking-[0.18em] text-zinc-100`}>CONTACTO</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-100">Hablemos de tu proyecto</h2>
            </div>
            <div className="mx-auto grid w-[min(1140px,92vw)] gap-5">
              <div className="grid gap-4 text-center md:grid-cols-3 md:text-left">
                <div>
                  <p className={`text-sm  text-zinc-100`}>Telefono</p>
                  <p className="text-lg font-semibold text-zinc-100">{contactConfig.phoneDisplay}</p>
                </div>
                <div> 
                  <p className={`text-sm text-zinc-100`}>Email</p>
                     <p className="text-lg font-semibold text-zinc-100">{contactConfig.mail}</p>
                </div>
                <div>
                  <p className={`text-sm text-zinc-100`}>Ubicacion</p>
                  <p className="text-lg font-semibold text-zinc-100">{contactConfig.location}</p>
                </div>
              </div>
              <form className={`grid gap-3 rounded-3xl border p-6 md:p-8 ${glassPanel}`}>
                <h3 className="text-center text-2xl font-semibold text-zinc-100">Recibi asesoramiento personalizado</h3>
                <p className="text-center text-sm text-white/80">Completalo y te respondemos por WhatsApp.</p>
                <input
                  placeholder="Nombre"
                  className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white placeholder:text-white/65"
                />
                <input
                  placeholder="Telefono"
                  className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white placeholder:text-white/65"
                />
                <textarea
                  placeholder="Contanos que espacio queres transformar"
                  className="min-h-28 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white placeholder:text-white/65"
                />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Enviar por WhatsApp
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>

      {galleryModalIndex !== null && (
        <div className="fixed inset-0 z-40 bg-black/90 px-4 py-6">
          <button
            type="button"
            onClick={() => setGalleryModalIndex(null)}
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-lg text-white transition hover:bg-black/75"
            aria-label="Cerrar imagen"
          >
            x
          </button>
          <div className="grid h-full w-full place-items-center">
            <img
              src={selectedTab.images[galleryModalIndex].src}
              alt={selectedTab.images[galleryModalIndex].name}
              className="max-h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      {infoModalIndex !== null && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4">
          <div className={`w-full max-w-xl rounded-3xl border p-6 ${card}`}>
            <h3 className="text-3xl font-semibold">{extraInfo[infoModalIndex].title}</h3>
            <p className={`mt-4 leading-relaxed ${mutedText}`}>{extraInfo[infoModalIndex].body}</p>
            <button
              type="button"
              onClick={() => setInfoModalIndex(null)}
              className={`mt-6 rounded-full border px-4 py-2 text-sm ${card}`}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {activeReview && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[560px] rounded-2xl bg-[#f1f3f4] p-5 text-[#202124] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="w-8" />
              <p className="text-center text-[36px] leading-none tracking-[-0.03em] text-[#5f6368]">
                Googleplex
              </p>
              <button
                type="button"
                onClick={() => setReviewModalIndex(null)}
                className="grid h-8 w-8 place-items-center rounded-full text-lg text-[#5f6368] transition hover:bg-black/5"
                aria-label="Cerrar modal de reseña"
              >
                x
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#9aa0a6] text-[13px] font-semibold text-[#5f6368]">
                {activeReview.author
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div>
                <p className="text-base font-medium text-[#202124]">{activeReview.author}</p>
                <p className="text-[23px] leading-none tracking-[0.12em] text-[#f9ab00]">
                  {"*".repeat(activeReview.rating)}
                </p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#5f6368]">
              <p>El contenido sera publico</p>
              <span className="grid h-4 w-4 place-items-center rounded-full border border-[#9aa0a6] text-[11px]">
                i
              </span>
            </div>

            <div className="mt-4 rounded-t-md bg-[#e8eaed] px-4 pt-3 pb-6">
              <p className="text-sm text-[#5f6368]">Comparte detalles de tu experiencia en este sitio</p>
              <p className="mt-2 text-sm leading-relaxed text-[#202124]">{activeReview.body}</p>
            </div>
            <div className="h-[2px] w-full bg-[#1a73e8]" />

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setReviewModalIndex(null)}
                className="rounded-full border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#1a73e8] transition hover:bg-[#f8f9fa]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
