/* =========================
 MENU ACTIVO SEGÚN SCROLL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".menu-btn");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    }); 

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});


/* =========================
 FADE IN AL HACER SCROLL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});


/* =========================
 MENU HAMBURGUESA MOBILE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainMenu = document.getElementById("mainMenu");

  if (!menuToggle || !mainMenu) return;

  const closeMenu = () => {
    mainMenu.classList.remove("mobile-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("mobile-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });
});

/* =========================
 TESTIMONIOS LOCALES
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTestimonio");
  const lista = document.getElementById("listaTestimonios");
  const nombreInput = document.getElementById("nombreTestimonio");
  const textoInput = document.getElementById("textoTestimonio");
  const estrellasInput = document.getElementById("estrellasTestimonio");
  const botonesEstrellas = form.querySelectorAll(".estrella-btn");
  const alertaSitio = document.getElementById("alertaCorreo");
  const storageKey = "ecoPilguaTestimonios";

  if (!form || !lista || !nombreInput || !textoInput || !estrellasInput || botonesEstrellas.length === 0) return;

  const obtenerTestimonios = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
      return [];
    }
  };

  const guardarTestimonios = (testimonios) => {
    localStorage.setItem(storageKey, JSON.stringify(testimonios));
  };

  let avisoTimer;

  const mostrarAvisoSitio = (mensaje, tipo = "ok") => {
    if (!alertaSitio) {
      alert(mensaje);
      return;
    }

    alertaSitio.textContent = mensaje;
    alertaSitio.dataset.tipo = tipo;
    window.clearTimeout(avisoTimer);
    alertaSitio.classList.add("visible");

    avisoTimer = window.setTimeout(() => {
      alertaSitio.classList.remove("visible");
    }, 3200);
  };

  const crearCardTestimonio = ({ nombre, experiencia, estrellas = 5 }) => {
    const card = document.createElement("div");
    card.className = "bg-pink-50 p-8 rounded-3xl shadow-lg testimonio-local";

    const texto = document.createElement("p");
    texto.className = "italic text-gray-600";
    texto.textContent = `"${experiencia}"`;

    const estrellasElemento = document.createElement("p");
    estrellasElemento.className = "mt-4 text-pink-400";
    estrellasElemento.textContent = "★".repeat(Number(estrellas) || 5);

    const autor = document.createElement("h4");
    autor.className = "mt-6 font-bold";
    autor.textContent = nombre;

    card.append(texto, estrellasElemento, autor);
    return card;
  };

  const renderizarTestimonios = () => {
    lista.querySelectorAll(".testimonio-local").forEach((card) => card.remove());
    obtenerTestimonios().forEach((testimonio) => {
      lista.appendChild(crearCardTestimonio(testimonio));
    });
  };

  const limpiarErroresTestimonio = () => {
    form.querySelectorAll(".input-contacto.invalido").forEach((campo) => {
      campo.classList.remove("invalido");
      campo.removeAttribute("aria-invalid");
    });
  };

  const mostrarErrorTestimonio = (campo, mensaje) => {
    campo.classList.add("invalido");
    campo.setAttribute("aria-invalid", "true");
    campo.focus();
    mostrarAvisoSitio(mensaje, "error");
  };

  form.querySelectorAll(".input-contacto").forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.classList.remove("invalido");
      campo.removeAttribute("aria-invalid");
    });
  });

  const actualizarEstrellas = (valor) => {
    estrellasInput.value = valor;
    botonesEstrellas.forEach((boton) => {
      const activo = Number(boton.dataset.valor) <= Number(valor);
      boton.classList.toggle("activa", activo);
      boton.setAttribute("aria-checked", boton.dataset.valor === String(valor) ? "true" : "false");
    });
  };

  botonesEstrellas.forEach((boton) => {
    boton.addEventListener("click", () => {
      actualizarEstrellas(boton.dataset.valor);
    });
  });

  const enviarAuditoriaTestimonio = async ({ nombre, experiencia, estrellas, fecha }) => {
    const auditAction = form.dataset.auditAction;

    if (!auditAction) {
      throw new Error("No hay un destino configurado para auditoría.");
    }

    const datos = new FormData();
    datos.append("_subject", "Nuevo testimonio Eco Pilgua");
    datos.append("tipo", "Testimonio");
    datos.append("nombre", nombre);
    datos.append("experiencia", experiencia);
    datos.append("estrellas", estrellas);
    datos.append("fecha", fecha);
    datos.append("message", `Nuevo testimonio de ${nombre} (${estrellas} estrellas): ${experiencia}`);

    const respuesta = await fetch(auditAction, {
      method: "POST",
      body: datos,
      headers: {
        Accept: "application/json"
      }
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo enviar el testimonio para auditoría.");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErroresTestimonio();

    const botonEnviar = form.querySelector(".btn-enviar-directo");
    const textoOriginal = botonEnviar?.textContent;
    const nombre = nombreInput.value.trim();
    const experiencia = textoInput.value.trim();
    const estrellas = estrellasInput.value.trim();
    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,20}$/;
    const regexExperiencia = /^[\s\S]{5,100}$/;
    const regexEstrellas = /^[1-5]$/;

    if (!regexNombre.test(nombre)) {
      mostrarErrorTestimonio(nombreInput, "Ingresa tu nombre. Debe tener entre 2 y 20 letras.");
      return;
    }

    if (!regexExperiencia.test(experiencia)) {
      mostrarErrorTestimonio(textoInput, "Ingresa tu experiencia. Debe tener entre 5 y 100 caracteres.");
      return;
    }

    if (!regexEstrellas.test(estrellas)) {
      mostrarAvisoSitio("La calificación debe estar entre 1 y 5 estrellas.", "error");
      return;
    }

    const nuevoTestimonio = {
      nombre,
      experiencia,
      estrellas: Number(estrellas),
      fecha: new Date().toISOString()
    };

    if (botonEnviar) {
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Publicando...";
    }

    try {
      await enviarAuditoriaTestimonio(nuevoTestimonio);
    } catch (error) {
      mostrarAvisoSitio("No se pudo enviar el testimonio para auditoría. Inténtalo nuevamente.", "error");
      if (botonEnviar) {
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginal;
      }
      return;
    }

    const testimonios = obtenerTestimonios();
    testimonios.unshift(nuevoTestimonio);

    guardarTestimonios(testimonios.slice(0, 12));
    renderizarTestimonios();
    form.reset();
    actualizarEstrellas(5);
    form.closest("details")?.removeAttribute("open");
    mostrarAvisoSitio("Gracias. Tu testimonio fue enviado y guardado en este navegador.");

    if (botonEnviar) {
      botonEnviar.disabled = false;
      botonEnviar.textContent = textoOriginal;
    }
  });

  renderizarTestimonios();
});

/* =========================
 MENSAJE CORREO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const formCorreo = document.getElementById("formCorreo");
  const alertaCorreo = document.getElementById("alertaCorreo");
  const modalCorreo = document.getElementById("modalCorreo");
  const abrirCorreo = document.getElementById("abrirCorreo");

  if (!formCorreo || !alertaCorreo) return;

  let alertaTimer;

  const mostrarAlerta = (mensaje, tipo = "ok") => {
    alertaCorreo.textContent = mensaje;
    alertaCorreo.dataset.tipo = tipo;

    window.clearTimeout(alertaTimer);
    alertaCorreo.classList.add("visible");

    alertaTimer = window.setTimeout(() => {
      alertaCorreo.classList.remove("visible");
    }, 3200);
  };

  const limpiarErrores = () => {
    formCorreo.querySelectorAll(".input-contacto.invalido").forEach((campo) => {
      campo.classList.remove("invalido");
      campo.removeAttribute("aria-invalid");
    });
  };

  const marcarError = (campo, mensaje) => {
    campo.classList.add("invalido");
    campo.setAttribute("aria-invalid", "true");
    campo.focus();
    mostrarAlerta(mensaje, "error");
  };

  const validarCorreo = () => {
    limpiarErrores();

    const nombre = formCorreo.elements.nombre;
    const asunto = formCorreo.elements.asunto;
    const email = formCorreo.elements.email;
    const mensaje = formCorreo.elements.message;

    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,80}$/;
    const regexAsunto = /^.{3,120}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexMensaje = /^[\s\S]{1,500}$/;

    if (!regexNombre.test(nombre.value.trim())) {
      marcarError(nombre, "Ingresa tu nombre. Debe tener entre 2 y 80 letras.");
      return false;
    }

    if (!regexAsunto.test(asunto.value.trim())) {
      marcarError(asunto, "Ingresa un asunto. Debe tener entre 3 y 120 caracteres.");
      return false;
    }

    if (!regexEmail.test(email.value.trim())) {
      marcarError(email, "Ingresa un correo electrónico válido.");
      return false;
    }

    if (!regexMensaje.test(mensaje.value.trim())) {
      marcarError(mensaje, "Ingresa un mensaje de máximo 500 caracteres.");
      return false;
    }

    return true;
  };

  formCorreo.querySelectorAll(".input-contacto").forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.classList.remove("invalido");
      campo.removeAttribute("aria-invalid");
    });
  });

  if (modalCorreo && abrirCorreo) {
    abrirCorreo.addEventListener("click", (e) => {
      e.preventDefault();
      modalCorreo.setAttribute("open", "");
      formCorreo.elements.nombre?.focus();
    });
  }

  formCorreo.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validarCorreo()) return;

    const botonEnviar = formCorreo.querySelector(".btn-enviar-directo");
    const textoOriginal = botonEnviar?.textContent;
    const datos = new FormData(formCorreo);

    if (botonEnviar) {
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";
    }

    try {
      const respuesta = await fetch(formCorreo.action, {
        method: formCorreo.method,
        body: datos,
        headers: {
          Accept: "application/json"
        }
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo enviar el mensaje.");
      }

      formCorreo.reset();
      formCorreo.closest("details")?.removeAttribute("open");
      mostrarAlerta("Mensaje enviado con éxito.");
    } catch (error) {
      mostrarAlerta("No se pudo enviar el mensaje. Inténtalo nuevamente.", "error");
    } finally {
      if (botonEnviar) {
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginal;
      }
    }
  });
});
