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