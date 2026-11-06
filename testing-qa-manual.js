/* ==========================================================================
   TESTING QA MANUAL · Animaciones e índice de secciones
   ========================================================================== */

(function () {
  var sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var hayObservador = "IntersectionObserver" in window;

  /* ------------------------------------------------------------------------
     1. Revelar listas con entrada escalonada
     ------------------------------------------------------------------------ */

  var listas = document.querySelectorAll(".revelar");

  if (!sinMovimiento && hayObservador) {
    listas.forEach(function (lista) {
      Array.prototype.forEach.call(lista.children, function (item, i) {
        item.style.setProperty("--retraso", i * 85 + "ms");
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Animación de entrada de cada sección
     ------------------------------------------------------------------------ */

  var bloques = document.querySelectorAll(".animar");

  if (!sinMovimiento && hayObservador) {
    document.documentElement.classList.add("js-anim");

    var observadorBloques = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visible");
          observadorBloques.unobserve(entrada.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    bloques.forEach(function (bloque) {
      observadorBloques.observe(bloque);
    });
  }

  /* ------------------------------------------------------------------------
     3. Revelar listas cuando entran en pantalla
     ------------------------------------------------------------------------ */

  if (!sinMovimiento && hayObservador) {
    var observadorListas = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visible");
          observadorListas.unobserve(entrada.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    listas.forEach(function (lista) {
      observadorListas.observe(lista);
    });
  }

  /* ------------------------------------------------------------------------
     4. Barra de progreso e índice de secciones
     ------------------------------------------------------------------------ */

  var barra = document.querySelector(".progreso");
  var indice = document.querySelector(".indice");
  var enlaces = Array.prototype.slice.call(
    document.querySelectorAll(".indice__enlace")
  );

  if (!barra || !indice || !enlaces.length) return;

  var secciones = enlaces.map(function (enlace) {
    return document.querySelector(enlace.getAttribute("href"));
  });

  var pendiente = false;

  function actualizar() {
    pendiente = false;

    // Progreso de lectura
    var recorrido = document.documentElement.scrollHeight - window.innerHeight;
    var avance = recorrido > 0 ? window.scrollY / recorrido : 0;
    barra.style.transform = "scaleX(" + Math.min(avance, 1) + ")";

    // El índice aparece después de la portada
    indice.classList.toggle("visible", window.scrollY > 260);

    // Sección activa: la última que ya pasó el tercio superior de la pantalla
    var referencia = window.scrollY + window.innerHeight * 0.35;
    var activa = null;

    secciones.forEach(function (seccion) {
      if (!seccion) return;
      var inicio = seccion.getBoundingClientRect().top + window.scrollY;
      if (inicio <= referencia) activa = seccion;
    });

    enlaces.forEach(function (enlace, i) {
      var esActiva = secciones[i] === activa;
      enlace.classList.toggle("activo", esActiva);
      if (esActiva) {
        enlace.setAttribute("aria-current", "true");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
  }

  function pedirActualizacion() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(actualizar);
  }

  window.addEventListener("scroll", pedirActualizacion, { passive: true });
  window.addEventListener("resize", pedirActualizacion);
  actualizar();
})();
