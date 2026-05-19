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
 ADVERTENCIA TESTIMONIO
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('formTestimonio');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const nombre = document.getElementById('nombreTestimonio').value.trim();
            const experiencia = document.getElementById('textoTestimonio').value.trim();

            // Validación con advertencia
            if (nombre === "" || experiencia === "") {
                alert("⚠️ Por favor, completa tu nombre y tu experiencia. Ambos campos son obligatorios.");
            } else {
                alert(`¡Gracias ${nombre}! Tu testimonio será revisado por nuestro equipo.`);
                form.reset(); // Limpia el formulario
                form.closest('details').removeAttribute('open'); // Cierra la ventana
            }
        });
    }
});

/* =========================
 MENSAJE CORREO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const formCorreo = document.getElementById("formCorreo");
  const alertaCorreo = document.getElementById("alertaCorreo");

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

  formCorreo.addEventListener("submit", async (e) => {
    e.preventDefault();

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
