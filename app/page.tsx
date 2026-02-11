"use client";

import { useEffect, useMemo, useState } from "react";
import {
  benefits,
  clients,
  contactConfig,
  portfolio,
  products,
  reviews,
} from "@/lib/site";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("ne-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function imageTone(tone: "green" | "pink" | "violet") {
  if (tone === "green") return "from-emerald-300/75 to-green-700/80";
  if (tone === "pink") return "from-rose-200/75 to-pink-700/85";
  return "from-violet-200/75 to-fuchsia-700/85";
}

function imageHeight(size: "tall" | "medium" | "wide") {
  if (size === "tall") return "h-[26rem]";
  if (size === "wide") return "h-[18rem]";
  return "h-[21rem]";
}

const heroImage = "/image00022.jpeg";
const productImages = ["/3.jpeg", "/4.jpeg", "/6.jpeg"] as const;
const portfolioImages = [
  "/image00006.jpeg",
  "/image00022.jpeg",
  "/image00029.jpeg",
  "/image00030.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/6.jpeg",
] as const;

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [galleryModalIndex, setGalleryModalIndex] = useState<number | null>(null);
  const [reviewModalIndex, setReviewModalIndex] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("ne-theme", theme);
  }, [theme]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16 }
    );

    for (const item of items) {
      item.classList.add("reveal");
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      "Hola! Quiero un presupuesto para jardines verticales artificiales."
    );
    return `https://wa.me/${contactConfig.whatsappNumber}?text=${message}`;
  }, []);

  const marqueeClients = [...clients, ...clients];

  return (
    <div className="pb-16">
      <header className="container-main sticky top-4 z-30 pt-4">
        <div className="frost rounded-2xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.22em] text-[var(--muted)]">
                NUEVOS ESPACIOS
              </p>
              <p className="mt-1 text-sm font-semibold">CABA, Buenos Aires</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Presupuesto
              </a>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="line-card rounded-full px-3 py-2 text-sm"
              >
                {theme === "dark" ? "Modo dia" : "Modo noche"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-8">
        <section className="section-band">
          <div className="container-main grid items-stretch gap-8 md:grid-cols-[1.02fr_0.98fr]">
            <div data-reveal className="space-y-5">
              <span className="pill inline-flex">Jardines verticales artificiales</span>
              <h1 className="section-title text-4xl leading-tight font-semibold md:text-6xl">
                Diseno verde para espacios que venden mejor
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                Creamos paredes verdes modernas con instalacion profesional en
                CABA y GBA. Tambien trabajamos plantas artificiales y cesped
                sintetico para proyectos residenciales y comerciales.
              </p>
              <div className="accent-rule" />
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Pedir presupuesto
                </a>
                <a
                  href="#portfolio"
                  className="line-card rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Ver portfolio
                </a>
              </div>
            </div>
            <div data-reveal className="relative overflow-hidden rounded-3xl hero-visual deep-shadow p-5 text-white">
              <img
                src={heroImage}
                alt="Proyecto destacado de jardin vertical"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/34" />
              <div className="relative z-10">
                <p className="text-xs tracking-[0.15em] text-white/80">PROYECTO DESTACADO</p>
                <h2 className="section-title mt-2 text-3xl font-semibold leading-tight">
                  Jardin vertical combinado para local comercial
                </h2>
                <div className="mt-5 grid gap-2 text-sm">
                  <div className="frost rounded-xl px-3 py-2">Cobertura: CABA + GBA</div>
                  <div className="frost rounded-xl px-3 py-2">Instalacion prolija y rapida</div>
                  <div className="frost rounded-xl px-3 py-2">
                    Soluciones para interior y exterior
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band section-band-soft">
          <div className="container-main">
            <div data-reveal className="mb-6">
              <p className="text-xs tracking-[0.18em] text-[var(--muted)]">VENTAJAS</p>
              <h2 className="section-title mt-2 text-3xl font-semibold">
                Estetica limpia, impacto inmediato y cero mantenimiento complejo
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} data-reveal className="line-card rounded-2xl p-5">
                  <h3 className="section-title text-2xl font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="container-main">
            <div data-reveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--muted)]">PRESUPUESTO</p>
                <h2 className="section-title mt-2 text-3xl font-semibold">
                  Asesoria inicial sin costo
                </h2>
                <p className="mt-2 text-[var(--muted)]">
                  Te recomendamos una solucion real segun tu espacio, estilo y uso.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Escribir por WhatsApp
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product, index) => (
                <article
                  key={product.title}
                  data-reveal
                  className="line-card deep-shadow overflow-hidden rounded-2xl p-5 transition duration-200 hover:-translate-y-1"
                >
                  <img
                    src={productImages[index % productImages.length]}
                    alt={product.title}
                    className="mb-4 h-36 w-full rounded-xl object-cover"
                  />
                  <span className="pill inline-flex">{product.badge}</span>
                  <h3 className="section-title mt-3 text-2xl font-semibold">{product.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {product.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section-band-soft">
          <div className="container-main">
            <div data-reveal className="mb-6">
              <p className="text-xs tracking-[0.18em] text-[var(--muted)]">CLIENTES</p>
              <h2 className="section-title mt-2 text-3xl font-semibold">
                Marcas y espacios que confian
              </h2>
            </div>
            <div data-reveal className="logo-marquee">
              <div className="logo-track">
                {marqueeClients.map((client, index) => (
                  <span key={`${client}-${index}`} className="logo-pill">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-band">
          <div className="container-main">
            <div data-reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--muted)]">PORTFOLIO</p>
                <h2 className="section-title mt-2 text-3xl font-semibold">
                  Galeria de trabajos
                </h2>
              </div>
              <span className="pill">Layout irregular, no carrusel</span>
            </div>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {portfolio.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  data-reveal
                  onClick={() => setGalleryModalIndex(index)}
                  className={`group relative mb-5 block w-full overflow-hidden rounded-2xl deep-shadow ${imageHeight(item.size)} text-left`}
                >
                  <img
                    src={portfolioImages[index % portfolioImages.length]}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${imageTone(item.tone)} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/22 transition group-hover:bg-black/34" />
                  <div className="absolute right-3 bottom-3 left-3 text-white">
                    <p className="section-title text-lg font-semibold">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section-band-soft">
          <div className="container-main">
            <div data-reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--muted)]">RESENAS</p>
                <h2 className="section-title mt-2 text-3xl font-semibold">Resenas de Google</h2>
              </div>
              <span className="pill">Frontend estatico, sin backend</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review, index) => (
                <article key={review.author} data-reveal className="line-card rounded-2xl p-5">
                  <p className="text-sm tracking-[0.16em] text-amber-500">*****</p>
                  <h3 className="section-title mt-2 text-2xl font-semibold">{review.summary}</h3>
                  <p className="mt-3 max-h-16 overflow-hidden text-sm leading-relaxed text-[var(--muted)]">
                    {review.body}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{review.author}</p>
                    <button
                      type="button"
                      onClick={() => setReviewModalIndex(index)}
                      className="pill"
                    >
                      Ver completa
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="container-main">
            <div data-reveal className="mb-6">
              <p className="text-xs tracking-[0.18em] text-[var(--muted)]">CONTACTO</p>
              <h2 className="section-title mt-2 text-3xl font-semibold">
                Hablemos de tu proyecto
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div data-reveal className="space-y-3">
                <p className="text-sm text-[var(--muted)]">Telefono</p>
                <p className="text-lg font-semibold">{contactConfig.phoneDisplay}</p>
                <p className="text-sm text-[var(--muted)]">Email</p>
                <p className="text-lg font-semibold">{contactConfig.email}</p>
                <p className="text-sm text-[var(--muted)]">Ubicacion</p>
                <p className="text-lg font-semibold">{contactConfig.location}</p>
              </div>
              <form data-reveal className="line-card grid gap-3 rounded-2xl p-4">
                <input
                  placeholder="Nombre"
                  className="rounded-xl border border-[var(--line)] bg-[var(--bg-alt)] px-3 py-2"
                />
                <input
                  placeholder="Telefono"
                  className="rounded-xl border border-[var(--line)] bg-[var(--bg-alt)] px-3 py-2"
                />
                <textarea
                  placeholder="Contanos que espacio queres transformar"
                  className="min-h-28 rounded-xl border border-[var(--line)] bg-[var(--bg-alt)] px-3 py-2"
                />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Enviar por WhatsApp
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>

      {galleryModalIndex !== null && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4">
          <div className="surface w-full max-w-2xl rounded-3xl p-6">
            <h3 className="section-title text-3xl font-semibold">
              {portfolio[galleryModalIndex].name}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Reemplazar este bloque por foto real optimizada cuando la tengas lista.
            </p>
            <div
              className="relative mt-5 h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={portfolioImages[galleryModalIndex % portfolioImages.length]}
                alt={portfolio[galleryModalIndex].name}
                className="h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${imageTone(
                  portfolio[galleryModalIndex].tone
                )} mix-blend-multiply`}
              />
            </div>
            <button
              type="button"
              onClick={() => setGalleryModalIndex(null)}
              className="line-card mt-5 rounded-full px-4 py-2 text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {reviewModalIndex !== null && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4">
          <div className="surface w-full max-w-xl rounded-3xl p-6">
            <p className="text-sm tracking-[0.16em] text-amber-500">*****</p>
            <h3 className="section-title mt-2 text-3xl font-semibold">
              {reviews[reviewModalIndex].summary}
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              {reviews[reviewModalIndex].body}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <p className="font-semibold">{reviews[reviewModalIndex].author}</p>
              <p className="text-sm text-[var(--muted)]">{reviews[reviewModalIndex].source}</p>
            </div>
            <button
              type="button"
              onClick={() => setReviewModalIndex(null)}
              className="line-card mt-6 rounded-full px-4 py-2 text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
