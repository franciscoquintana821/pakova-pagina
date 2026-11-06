/* =============================================================================
   SECCIÓN CURSOS · Pakova
   -----------------------------------------------------------------------------
   Arma las tarjetas de la sección Cursos. El botón "Ver el curso" lleva
   a la página de detalle de cada curso (ver CONFIG.paginaDelCurso).

   Índice del archivo:
     1. Configuración general
     2. Datos de los cursos          ← lo que más se edita
     3. Íconos
     4. Utilidades
     5. Componentes compartidos
     6. Tarjetas de la sección
     7. Carrusel y abanico
     8. Animación de entrada
     9. Inicio
   ========================================================================== */


/* =============================================================================
   1. CONFIGURACIÓN GENERAL
   ========================================================================== */

const CONFIG = {
  // Código de país + área + número, sin "+" ni espacios
  whatsapp: '5493416206812',
  email: 'pakovatesting@gmail.com',

  // Se muestra en todos los cursos
  costo: 'Gratuito',

  // Dirección de la página de detalle de cada curso (la arma otra persona
  // del equipo). Por defecto: cursos/<id>.html, por ejemplo
  // cursos/testing-qa-manual.html. Si un curso tiene "pagina", se usa esa.
  paginaDelCurso: (curso) => curso.pagina || `cursos/${curso.id}.html`,

  // Mensajes que se escriben solos en WhatsApp
  mensajes: {
    curso: (nombre) =>
      `Hola Pakova, quiero información sobre el curso de ${nombre}`,
    proximos:
      'Hola Pakova, quiero que me avisen cuando abran los próximos cursos'
  }
};


/* =============================================================================
   2. DATOS DE LOS CURSOS
   -----------------------------------------------------------------------------
   Para agregar un curso: copiá un bloque { ... } completo y cambiá
   los textos.

   Campos:
     id           Único, en minúsculas, sin espacios ni tildes (va en el link
                  a la página del curso)
     pagina       Opcional. Dirección de la página del curso, si no es la de
                  siempre (ver CONFIG.paginaDelCurso)
     nombre       Título del curso
     icono        Uno de los nombres de la sección 3 (ICONOS)
     resumen      Qué es el curso, en 1 o 2 frases simples (unos 120
                  caracteres). Va en la tarjeta
     nivel        Ej.: 'Desde cero', 'Nivel inicial'. Va arriba en la tarjeta
     estado       Opcional. Ej.: 'Inscripción abierta'. Dejar '' para ocultarlo
     temas        Lista de { titulo, texto }. En la tarjeta se muestra
                  cuántos son ("5 temas")

   Contenido para la página de detalle de cada curso (esta sección no lo
   muestra; queda acá para quien arme esas páginas):
     fechas, sede, descripcion, paraQuien, requisitos, alTerminar, preguntas
   ========================================================================== */

const CURSOS = [
  {
    id: 'testing-qa-manual',
    pagina: 'testing-qa-manual.html',
    nombre: 'Testing QA Manual',
    icono: 'lupa',
    resumen:
      'Aprendé a revisar apps y páginas web para encontrar errores antes ' +
        'de que lleguen a la gente. No hace falta saber programar.',
    nivel: 'Nivel inicial',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'El testing es la tarea de revisar que un programa, una app o una ' +
        'página web funcione como debe antes de que llegue a las personas ' +
        'que lo usan. Quien hace testing busca errores, los documenta y ' +
        'ayuda al equipo a corregirlos.',
      'En este curso vas a conocer cómo trabaja un equipo de QA (control ' +
        'de calidad) y vas a practicar como en un proyecto real: diseñar ' +
        'casos de prueba, ejecutarlos y reportar los errores que ' +
        'encuentres de forma clara.'
    ],
    paraQuien: [
      'Personas que quieren dar su primer paso en el mundo tecnológico',
      'Quienes buscan una salida laboral en el área de software',
      'Personas detallistas, curiosas y con ganas de entender cómo ' +
        'funcionan las cosas'
    ],
    temas: [
      {
        titulo: 'Fundamentos de QA',
        texto:
          'Qué es la calidad de software, por qué existen los errores y ' +
          'cuál es el rol de quien hace testing dentro de un equipo.'
      },
      {
        titulo: 'Ciclo de vida del software',
        texto:
          'Las etapas por las que pasa un producto, desde la idea hasta ' +
          'que se publica, y en qué momento interviene el testing.'
      },
      {
        titulo: 'Casos de prueba',
        texto:
          'Cómo pensar qué probar, escribir casos de prueba claros y ' +
          'organizarlos para no dejar nada afuera.'
      },
      {
        titulo: 'Reporte de errores',
        texto:
          'Cómo describir un error para que se pueda reproducir y ' +
          'corregir: pasos, resultado esperado, resultado obtenido y ' +
          'evidencia.'
      },
      {
        titulo: 'Metodologías ágiles',
        texto:
          'Cómo se organizan los equipos que trabajan con Scrum y otras ' +
          'metodologías ágiles, y cómo se integra el testing en ese ' +
          'ritmo.'
      }
    ],
    requisitos: [
      'Manejo básico de computadora e internet',
      'No hace falta experiencia previa en tecnología'
    ],
    alTerminar: [
      'Entender cómo trabaja un equipo de QA',
      'Diseñar y ejecutar casos de prueba',
      'Reportar errores de forma clara y profesional',
      'Usar herramientas de gestión de pruebas'
    ],
    preguntas: [
      {
        pregunta: '¿Necesito saber programar?',
        respuesta:
          'No. El testing manual no requiere programar. Si después querés ' +
          'automatizar pruebas, Testing QA Automation es el siguiente paso.'
      }
    ]
  },
  {
    id: 'testing-qa-automation',
    nombre: 'Testing QA Automation con IA',
    nombreAcento: 'con IA',
    icono: 'robot',
    resumen:
      'Aprendé a crear programas que revisan apps y páginas web solos y ' +
        'avisan cuando algo falla. Es el paso siguiente al testing manual.',
    nivel: 'Nivel intermedio',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'Cuando un programa crece, probarlo todo a mano lleva mucho tiempo. ' +
        'La automatización consiste en escribir pruebas que la ' +
        'computadora ejecuta sola, cada vez que hace falta, y que avisan ' +
        'si algo dejó de funcionar.',
      'En este curso vas a dar el paso del testing manual al automatizado: ' +
        'vas a aprender a pensar qué conviene automatizar, a escribir tus ' +
        'primeras pruebas y a leer sus resultados.'
    ],
    paraQuien: [
      'Quienes hicieron Testing QA Manual y quieren seguir creciendo',
      'Testers que quieren sumar herramientas más buscadas por las empresas',
      'Personas con nociones de programación que quieren aplicarlas'
    ],
    temas: [
      {
        titulo: 'Qué es la automatización',
        texto:
          'Para qué sirve, cuándo conviene automatizar una prueba y ' +
          'cuándo es mejor hacerla a mano.'
      },
      {
        titulo: 'Programación para testers',
        texto:
          'Los conceptos de programación que hacen falta para escribir ' +
          'pruebas, explicados paso a paso.'
      },
      {
        titulo: 'Pruebas de páginas web',
        texto:
          'Cómo hacer que un programa abra una página, complete ' +
          'formularios y revise que todo funcione.'
      },
      {
        titulo: 'Pruebas de servicios (APIs)',
        texto:
          'Cómo probar la parte "invisible" de una aplicación: los datos ' +
          'que se envían y se reciben.'
      },
      {
        titulo: 'Organizar las pruebas',
        texto:
          'Cómo ordenar las pruebas para que sean fáciles de mantener y de ' +
          'volver a usar.'
      },
      {
        titulo: 'Reportes de resultados',
        texto:
          'Cómo leer lo que devuelven las pruebas y comunicar los errores ' +
          'al equipo.'
      }
    ],
    requisitos: [
      'Haber hecho Testing QA Manual o tener conocimientos equivalentes',
      'Recomendable: nociones básicas de programación'
    ],
    alTerminar: [
      'Decidir qué pruebas conviene automatizar',
      'Escribir pruebas automáticas para páginas web',
      'Probar servicios y datos de una aplicación',
      'Leer resultados y reportar errores al equipo'
    ],
    preguntas: [
      {
        pregunta: '¿Necesito saber programar?',
        respuesta:
          'Ayuda tener nociones básicas. Si nunca programaste, te ' +
          'recomendamos empezar por Programación Web Inicial.'
      }
    ]
  },
  {
    id: 'alfabetizacion-digital',
    nombre: 'Alfabetización Digital',
    icono: 'compu',
    resumen:
      'Tus primeros pasos con la computadora, internet y el correo ' +
        'electrónico. Desde cero, a tu ritmo y con acompañamiento.',
    nivel: 'Desde cero',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'Hoy muchos trámites, trabajos y estudios dependen de saber usar una ' +
        'computadora e internet. Este curso es para dar esos primeros ' +
        'pasos con tranquilidad, a tu ritmo y con acompañamiento.',
      'Vas a aprender a manejar la computadora, buscar información, usar ' +
        'el correo electrónico, organizar tus archivos y escribir ' +
        'documentos, siempre cuidando tu seguridad en internet.'
    ],
    paraQuien: [
      'Personas que nunca usaron una computadora o la usan poco',
      'Quienes necesitan herramientas digitales para estudiar, trabajar o ' +
        'hacer trámites',
      'Adultos y adultos mayores que quieren ganar autonomía'
    ],
    temas: [
      {
        titulo: 'La computadora',
        texto:
          'Encender y apagar, usar el mouse y el teclado, abrir programas ' +
          'y moverse por las ventanas.'
      },
      {
        titulo: 'Internet',
        texto:
          'Qué es un navegador, cómo buscar información y cómo reconocer ' +
          'páginas confiables.'
      },
      {
        titulo: 'Correo electrónico',
        texto:
          'Crear una cuenta, enviar y responder mails, y adjuntar archivos.'
      },
      {
        titulo: 'Archivos',
        texto:
          'Guardar, encontrar, ordenar en carpetas y descargar documentos ' +
          'e imágenes.'
      },
      {
        titulo: 'Herramientas de oficina',
        texto:
          'Escribir un documento, armar una lista o una planilla simple y ' +
          'compartirla.'
      },
      {
        titulo: 'Seguridad digital',
        texto:
          'Contraseñas seguras, cómo reconocer estafas y engaños, y cómo ' +
          'cuidar tus datos personales.'
      }
    ],
    requisitos: ['Ningún conocimiento previo', 'Ganas de aprender'],
    alTerminar: [
      'Usar la computadora con confianza',
      'Buscar información y comunicarte por correo electrónico',
      'Crear y organizar tus propios documentos',
      'Navegar por internet de forma segura'
    ],
    preguntas: [
      {
        pregunta: '¿Necesito tener computadora en casa?',
        respuesta:
          'Consultanos: te contamos cómo se organiza cada convocatoria y ' +
          'con qué equipos se trabaja.'
      }
    ]
  },
  {
    id: 'programacion-web-inicial',
    nombre: 'Programación Web Inicial',
    icono: 'codigo',
    resumen:
      'Descubrí cómo se hace una página web por dentro y armá la tuya, ' +
        'paso a paso. Ideal para empezar a programar.',
    nivel: 'Nivel inicial',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'Cada página que visitás está hecha con código. En este curso vas ' +
        'a aprender cómo se arma una página web: su estructura, su ' +
        'diseño y las primeras líneas de programación que le dan vida.',
      'Vas a desarrollar el pensamiento lógico y practicar desde la primera ' +
        'clase, hasta armar tu propia página.'
    ],
    paraQuien: [
      'Personas que quieren empezar a programar desde cero',
      'Quienes quieren crear su propia página o trabajar en desarrollo web',
      'Personas a las que les gusta resolver problemas y crear cosas'
    ],
    temas: [
      {
        titulo: 'Cómo funciona una página web',
        texto:
          'Qué pasa cuando abrís un link: el navegador, el servidor y los ' +
          'archivos que forman una página.'
      },
      {
        titulo: 'HTML: la estructura',
        texto:
          'Títulos, textos, imágenes y links: el esqueleto de la página.'
      },
      {
        titulo: 'CSS: el diseño',
        texto: 'Colores, tipografías y cómo ubicar cada cosa en la pantalla.'
      },
      {
        titulo: 'Lógica de programación',
        texto:
          'Variables, condicionales y bucles, explicados con ejemplos de ' +
          'la vida diaria.'
      },
      {
        titulo: 'JavaScript básico',
        texto:
          'Darle vida a la página: botones que responden y mensajes que ' +
          'aparecen.'
      },
      {
        titulo: 'Tu primera página',
        texto: 'Juntar todo lo aprendido y armar una página completa.'
      }
    ],
    requisitos: [
      'Manejo básico de computadora',
      'No hace falta saber matemática avanzada'
    ],
    alTerminar: [
      'Entender cómo funciona una página web',
      'Armar una página con HTML y CSS',
      'Escribir tus primeros programas en JavaScript',
      'Seguir aprendiendo por tu cuenta o en próximos cursos'
    ],
    preguntas: [
      {
        pregunta: '¿Necesito ser bueno en matemática?',
        respuesta:
          'No. Alcanza con la lógica del día a día; el curso te ayuda a ' +
          'desarrollarla.'
      }
    ]
  },
  {
    id: 'testing-qa-videojuegos',
    nombre: 'Testing QA de Videojuegos',
    icono: 'control',
    resumen:
      'Probá videojuegos como lo hace un equipo profesional: buscá fallas ' +
        'y ayudá a que el juego funcione bien antes de salir.',
    nivel: 'Nivel inicial',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'Antes de que un videojuego salga a la venta, un equipo de testers ' +
        'lo juega una y otra vez para encontrar errores: personajes que ' +
        'atraviesan paredes, niveles que no cargan, controles que no ' +
        'responden o partes que resultan confusas.',
      'En este curso vas a aprender a jugar con mirada profesional: ' +
        'detectar fallas, evaluar la jugabilidad y el rendimiento, y ' +
        'comunicar lo que encontrás para que el equipo de desarrollo pueda ' +
        'mejorar el juego.'
    ],
    paraQuien: [
      'Personas a las que les gustan los videojuegos y quieren conocer la ' +
        'industria por dentro',
      'Quienes ya hicieron Testing QA Manual y quieren especializarse',
      'Personas observadoras y pacientes'
    ],
    temas: [
      {
        titulo: 'Análisis de bugs',
        texto:
          'Tipos de errores en videojuegos (gráficos, de lógica, de ' +
          'sonido, de colisiones) y cómo reproducirlos y documentarlos.'
      },
      {
        titulo: 'Jugabilidad',
        texto:
          'Cómo evaluar si un juego se entiende, si los controles ' +
          'responden bien y si la dificultad está equilibrada.'
      },
      {
        titulo: 'Rendimiento',
        texto:
          'Qué mirar cuando un juego se traba, tarda en cargar o baja la ' +
          'cantidad de cuadros por segundo.'
      },
      {
        titulo: 'Experiencia de usuario',
        texto:
          'Cómo detectar partes confusas, menús difíciles de usar o ' +
          'momentos que frustran a quien juega.'
      },
      {
        titulo: 'Compatibilidad',
        texto:
          'Por qué un juego puede funcionar bien en un equipo y mal en ' +
          'otro, y cómo se prueba en distintos dispositivos.'
      }
    ],
    requisitos: [
      'Manejo básico de computadora',
      'Recomendable (no obligatorio): haber hecho Testing QA Manual'
    ],
    alTerminar: [
      'Probar un videojuego de forma ordenada',
      'Detectar y clasificar distintos tipos de errores',
      'Escribir reportes que el equipo de desarrollo pueda usar',
      'Dar opiniones fundamentadas sobre jugabilidad y experiencia'
    ],
    preguntas: [
      {
        pregunta: '¿Tengo que ser gamer?',
        respuesta:
          'No hace falta, pero sí ganas de jugar con atención y probar las ' +
          'cosas muchas veces.'
      }
    ]
  },
  {
    id: 'english-for-qa',
    nombre: 'English for QA',
    icono: 'globo',
    resumen:
      'Inglés técnico para trabajar en QA: vocabulario, reportes de errores ' +
        'y reuniones. Ideal para sumarte a equipos internacionales.',
    nivel: 'Nivel inicial',
    estado: '',
    fechas: '',
    sede: '',
    descripcion: [
      'Muchos equipos de calidad trabajan en inglés: los reportes de ' +
        'errores, las historias de usuario, las reuniones diarias y las ' +
        'entrevistas laborales suelen estar en ese idioma.',
      'En este curso vas a aprender el inglés específico del testing: el ' +
        'vocabulario que se usa todos los días y las formas de escribir y ' +
        'hablar para que te entiendan dentro de un equipo de QA.'
    ],
    paraQuien: [
      'Testers que quieren trabajar en equipos o empresas internacionales',
      'Personas con inglés básico que necesitan usarlo en el trabajo',
      'Quienes ya hacen QA y quieren comunicarse con más seguridad'
    ],
    temas: [
      {
        titulo: 'Vocabulario de QA',
        texto:
          'Las palabras que aparecen todo el tiempo: bug, test case, ' +
          'regression, release, sprint y acceptance criteria.'
      },
      {
        titulo: 'Reportar errores en inglés',
        texto:
          'Cómo escribir un reporte claro: pasos, resultado esperado, ' +
          'resultado obtenido y evidencia.'
      },
      {
        titulo: 'Leer tickets y documentación',
        texto:
          'Cómo entender historias de usuario, criterios de aceptación y ' +
          'notas de una versión.'
      },
      {
        titulo: 'Reuniones y standups',
        texto:
          'Frases para contar qué hiciste, qué vas a hacer y qué te está ' +
          'bloqueando en una reunión diaria.'
      },
      {
        titulo: 'Comunicación diaria',
        texto:
          'Mensajes por chat, correos y llamadas breves con el equipo de ' +
          'desarrollo y otras áreas.'
      },
      {
        titulo: 'Entrevistas y primer día',
        texto:
          'Preguntas frecuentes en una entrevista de QA y vocabulario para ' +
          'empezar a trabajar en un equipo en inglés.'
      }
    ],
    requisitos: [
      'Conocimientos básicos de inglés (lectura y escritura)',
      'Manejo básico de computadora',
      'Recomendable: estar haciendo o haber hecho un curso de QA'
    ],
    alTerminar: [
      'Entender y escribir reportes de errores en inglés',
      'Leer tickets y documentación de un proyecto',
      'Participar en reuniones y standups con seguridad',
      'Prepararte para entrevistas de QA en inglés'
    ],
    preguntas: [
      {
        pregunta: '¿Necesito tener un inglés avanzado?',
        respuesta:
          'No. El curso parte de una base básica y se enfoca en el inglés ' +
          'que se usa en QA. Si te cuesta leer o escribir, te recomendamos ' +
          'practicar un poco antes de empezar.'
      },
      {
        pregunta: '¿Es un curso de inglés general?',
        respuesta:
          'No. Es inglés aplicado al trabajo de QA: vocabulario, reportes, ' +
          'reuniones y entrevistas. No reemplaza un curso general de idioma.'
      }
    ]
  }
];

// Cursos que vienen: se muestran en la cinta de "Próximamente"
const PROXIMOS = [
  {
    sigla: 'IA',
    nombre: 'Testing con inteligencia artificial',
    imagen: 'img/proximo-ia.svg'
  },
  {
    sigla: 'PY',
    nombre: 'Python para automatización',
    imagen: 'img/proximo-python.svg'
  },
  {
    sigla: 'JV',
    nombre: 'Java con Spring Boot',
    imagen: 'img/proximo-java.svg'
  }
];


/* =============================================================================
   3. ÍCONOS
   -----------------------------------------------------------------------------
   Cada ícono es una lista de trazos SVG (atributo "d" de <path>), en una
   cuadrícula de 24×24. Para sumar uno, agregá una línea más con su nombre.
   ========================================================================== */

const ICONOS = {
  // Íconos de cursos (todos con el mismo estilo: trazo simple, sin relleno)
  lupa: [
    'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z',
    'm20 20-4-4',
    'm8 11 2 2 4-4'
  ],
  control: [
    'M7 8h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 8Z',
    'M8 11v4M6 13h4',
    'M15.5 12h.01M17.5 14h.01'
  ],
  compu: [
    'M5 5h14a1 1 0 0 1 1 1v10H4V6a1 1 0 0 1 1-1Z',
    'M2 19h20',
    'M10 9l3 2-3 2Z'
  ],
  codigo: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm13.5 6-3 12'],
  robot: [
    'M7 9h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z',
    'M12 9V5M12 5h.01',
    'M9.5 13h.01M14.5 13h.01M10 16h4'
  ],
  libro: [
    'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z',
    'M4 19a2 2 0 0 1 2-2h13'
  ],
  globo: [
    'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z',
    'M3 12h18',
    'M12 3c3.5 3 3.5 15 0 18',
    'M12 3c-3.5 3-3.5 15 0 18'
  ],

  // Íconos de interfaz
  abrir: ['M4 12h14M13 6l6 6-6 6']
};


/* =============================================================================
   4. UTILIDADES
   ========================================================================== */

/** Evita que un texto con < > & " rompa el HTML. Usar SIEMPRE con datos. */
function esc(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Une una lista de textos HTML en uno solo. */
function unir(lista, funcion) {
  return lista.map(funcion).join('');
}

/** Link de WhatsApp para consultar por un curso (o con otro mensaje). */
function linkWhatsApp(mensaje) {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
}

function linkConsulta(curso) {
  return linkWhatsApp(CONFIG.mensajes.curso(curso.nombre));
}


/* =============================================================================
   5. COMPONENTES COMPARTIDOS
   Piezas que usan las tarjetas.
   ========================================================================== */

/** Ícono SVG. */
function icono(nombre) {
  const trazos = ICONOS[nombre] || ICONOS.libro;
  const paths = unir(trazos, (d) => `<path d="${d}"/>`);

  return `
    <svg class="pk-svg" viewBox="0 0 24 24" aria-hidden="true">
      ${paths}
    </svg>`;
}

/** Cuadrado amarillo con el ícono del curso. */
function cajaIcono(nombre) {
  return `<span class="pk-icon">${icono(nombre)}</span>`;
}

/** Datos rápidos: "Gratuito · 5 temas". */
function datosRapidos(curso) {
  const items = [CONFIG.costo, `${curso.temas.length} temas`];

  return `
    <ul class="pk-dots">
      ${unir(items, (texto) => `<li>${esc(texto)}</li>`)}
    </ul>`;
}

/** Etiqueta con el nivel del curso ("Desde cero", "Nivel inicial"). */
function etiquetaNivel(curso) {
  if (!curso.nivel) return '';
  return `<span class="pk-level">${esc(curso.nivel)}</span>`;
}

/** Etiqueta amarilla de estado (solo si el curso tiene estado). */
function etiquetaEstado(curso) {
  if (!curso.estado) return '';
  return `<span class="pk-status">${esc(curso.estado)}</span>`;
}

/** Link a WhatsApp con forma de botón. Variante: '' o 'ghost'. */
function botonWhatsApp(curso, texto, variante = '') {
  const clase = variante ? `pk-btn pk-btn--${variante}` : 'pk-btn';

  return `
    <a
      class="${clase}"
      href="${linkConsulta(curso)}"
      target="_blank"
      rel="noopener"
    >
      ${texto}
    </a>`;
}


/* =============================================================================
   6. TARJETAS DE LA SECCIÓN
   ========================================================================== */

/*
  La variable --orden hace que las tarjetas aparezcan de a una
  (ver "Animación de entrada" en cursos.css).
*/
/**
 * Título de la tarjeta. Si el curso define "nombreAcento", esa parte
 * final del nombre se muestra como una etiqueta amarilla para destacarla.
 */
function tituloCurso(curso) {
  const nombre = esc(curso.nombre);
  const acento = curso.nombreAcento ? esc(curso.nombreAcento) : '';

  if (!acento || !nombre.endsWith(acento)) return nombre;

  return (
    nombre.slice(0, -acento.length).trimEnd() +
    `<span class="pk-course__title-accent">${acento}</span>`
  );
}

function tarjetaCurso(curso, indice) {
  return `
    <article class="pk-card pk-course" style="--orden: ${indice}">
      <div class="pk-course__top">
        ${cajaIcono(curso.icono)}
        ${etiquetaNivel(curso)}
      </div>

      ${etiquetaEstado(curso)}

      <h3
        class="pk-course__title"${curso.nombreAcento ? ` aria-label="${esc(curso.nombre)}"` : ''}
      >${tituloCurso(curso)}</h3>
      <p class="pk-course__text">${esc(curso.resumen)}</p>
      ${datosRapidos(curso)}

      <div class="pk-actions">
        <a class="pk-btn" href="${esc(CONFIG.paginaDelCurso(curso))}">
          Ver el curso ${icono('abrir')}
        </a>
        ${botonWhatsApp(curso, 'Consultar', 'ghost')}
      </div>
    </article>`;
}

function itemProximo(item) {
  return `
    <li>
      <span class="pk-ticker__media">
        <img
          class="pk-ticker__img"
          src="${esc(item.imagen)}"
          alt=""
          width="480"
          height="300"
          loading="lazy"
        >
        <span class="pk-next__code">${esc(item.sigla)}</span>
      </span>
      <span class="pk-ticker__info">
        <span class="pk-ticker__name">${esc(item.nombre)}</span>
        <span class="pk-ticker__soon">Muy pronto</span>
      </span>
    </li>`;
}

function mostrarTarjetas() {
  const grilla = document.getElementById('pk-lista');
  const proximos = document.getElementById('pk-proximos');
  const listaProximos = document.getElementById('pk-proximos-lista');
  const botonProximos = document.getElementById('pk-proximos-boton');

  grilla.innerHTML = unir(CURSOS, tarjetaCurso);

  if (PROXIMOS.length === 0) {
    proximos.hidden = true;
    return;
  }

  listaProximos.innerHTML = unir(PROXIMOS, itemProximo);
  botonProximos.href = linkWhatsApp(CONFIG.mensajes.proximos);
  iniciarCarruselProximos();
}


/* ---------- Próximos cursos: cinta automática ----------
   La cinta y su movimiento están en cursos.css (sección 5). Acá se arma
   la copia de la lista y se calcula la velocidad.
*/

// Velocidad de la cinta, en píxeles por segundo (más alto = más rápido)
const VELOCIDAD_PROXIMOS = 32;

/**
 * La animación dura lo que tarda en pasar una lista entera a esta
 * velocidad. Así se mueve igual de rápido en celular y en compu, y
 * aunque se agreguen o saquen cursos.
 */
function ajustarVelocidadProximos() {
  const carrusel = document.getElementById('pk-proximos-carrusel');
  const ancho = document.getElementById('pk-proximos-lista').offsetWidth;

  carrusel.style.setProperty(
    '--pk-duracion',
    `${Math.max(ancho / VELOCIDAD_PROXIMOS, 10)}s`
  );
}

function iniciarCarruselProximos() {
  const lista = document.getElementById('pk-proximos-lista');
  const copia = document.getElementById('pk-proximos-copia');

  copia.innerHTML = lista.innerHTML;

  // Recalcula la velocidad si cambia el ancho (girar el celular, etc.)
  ajustarVelocidadProximos();
  if ('ResizeObserver' in window) {
    new ResizeObserver(ajustarVelocidadProximos).observe(lista);
  }
}


/* =============================================================================
   7. CARRUSEL Y ABANICO
   -----------------------------------------------------------------------------
   Las tarjetas se muestran como carrusel (celular, tablet, pantallas
   táctiles) o como abanico (computadora con mouse y pantalla grande).
   El dibujo de cada forma está en cursos.css (sección 4). Acá se maneja
   lo que comparten las dos: cuál es la tarjeta "activa" y cómo se pasa
   de una a otra (flechas, puntitos, teclado, deslizar, arrastrar o clic).

   7.1  Estado y ayudas
   7.2  Cambiar la tarjeta activa
   7.3  Puntitos, flechas, contador y pista
   7.4  Escuchar flechas, clics, teclado, arrastre y deslizamiento
   ========================================================================== */

/* ---------- 7.1 Estado y ayudas ---------- */

// Misma condición que el abanico en cursos.css (sección 4.4)
const MODO_ABANICO = window.matchMedia(
  '(min-width: 1360px) and (hover: hover) and (pointer: fine)'
);

const SIN_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)');

// Índice de la tarjeta que está al frente (abanico) o al centro (carrusel)
let tarjetaActiva = 0;

// Textos de la pista según cómo se ve la sección
const PISTAS = {
  abanico: 'Hacé clic en una tarjeta o usá las flechas para ver más cursos',
  carrusel: 'Deslizá con el dedo para ver más cursos'
};

function listaDeTarjetas() {
  return [...document.querySelectorAll('.pk-course')];
}

function esAbanico() {
  return MODO_ABANICO.matches;
}


/* ---------- 7.2 Cambiar la tarjeta activa ---------- */

/**
 * Acomoda un grupo de tarjetas en abanico alrededor de la "activa".
 * A cada tarjeta le pone la clase "pk-activa", su --lugar y su z-index.
 */
function ubicarEnAbanico(tarjetas, activa) {
  const total = tarjetas.length;
  const mitad = Math.floor(total / 2);

  tarjetas.forEach((tarjeta, i) => {
    // Lugar en el abanico contando desde la activa, que queda en el centro
    // (0). Las demás se reparten en ronda a los dos lados. En el abanico
    // se muestran solo 5 posiciones (-2 a 2): la tarjeta más lejana queda
    // oculta hasta que el abanico gira.
    const lugar = (((i - activa) % total) + total + mitad) % total - mitad;
    const lugarAnterior = Number(tarjeta.dataset.lugar);

    // La tarjeta que pasa de una punta a la otra (tendría que cruzar más
    // de medio abanico) no se arrastra por delante: salta directo a su
    // nuevo lugar, por detrás de las demás.
    const salta =
      tarjeta.dataset.lugar !== undefined &&
      Math.abs(lugar - lugarAnterior) > mitad;
    if (salta) tarjeta.classList.add('pk-salto');

    // En el abanico se muestran solo 5 posiciones: las tarjetas que
    // quedarían más lejos se ocultan y vuelven a aparecer al girar.
    tarjeta.classList.toggle('pk-oculta', esAbanico() && Math.abs(lugar) > 2);

    tarjeta.classList.toggle('pk-activa', i === activa);
    tarjeta.style.setProperty('--lugar', lugar);
    tarjeta.style.zIndex = total - Math.abs(lugar);
    tarjeta.dataset.lugar = lugar;

    // De qué lado de la activa está (para el cartel "Clic para ver")
    tarjeta.dataset.lado = lugar < 0 ? 'izq' : 'der';

    if (salta) {
      void tarjeta.offsetWidth;   // aplica el salto antes de volver a animar
      requestAnimationFrame(() => tarjeta.classList.remove('pk-salto'));
    }
  });
}

/**
 * Marca una tarjeta de curso como activa y actualiza puntitos y flechas.
 */
function marcarActiva(indice) {
  const tarjetas = listaDeTarjetas();

  tarjetaActiva = Math.max(0, Math.min(tarjetas.length - 1, indice));
  ubicarEnAbanico(tarjetas, tarjetaActiva);

  actualizarPuntitos();
  actualizarFlechas(tarjetas.length);
}

/**
 * La primera vez que la persona pasa de tarjeta, se apagan las ayudas
 * (la flecha que late y la pista de abajo). Ver cursos.css, 4.5.
 */
function marcarUsado() {
  document.getElementById('pk-slider').classList.add('pk-slider--usado');
}

/** Marca la tarjeta y, en el carrusel, la desliza hasta el centro. */
function irATarjeta(indice) {
  marcarActiva(indice);
  if (esAbanico()) return;

  const grilla = document.getElementById('pk-lista');
  const tarjeta = listaDeTarjetas()[tarjetaActiva];
  const izquierda =
    tarjeta.offsetLeft - (grilla.clientWidth - tarjeta.offsetWidth) / 2;

  grilla.scrollTo({
    left: izquierda,
    behavior: SIN_MOVIMIENTO.matches ? 'auto' : 'smooth'
  });
}

/** En el carrusel: la tarjeta más cercana al centro pasa a ser la activa. */
function activarLaDelCentro() {
  if (esAbanico()) return;

  const grilla = document.getElementById('pk-lista');
  const centroGrilla = grilla.scrollLeft + grilla.clientWidth / 2;
  const distancias = listaDeTarjetas().map((tarjeta) =>
    Math.abs(tarjeta.offsetLeft + tarjeta.offsetWidth / 2 - centroGrilla)
  );

  const masCercana = distancias.indexOf(Math.min(...distancias));
  if (masCercana !== tarjetaActiva) marcarUsado();

  marcarActiva(masCercana);
}


/* ---------- 7.3 Puntitos, flechas, contador y pista ---------- */

function crearPuntitos() {
  const puntitos = document.getElementById('pk-puntitos');

  puntitos.innerHTML = unir(CURSOS, (curso, i) => `
    <button
      type="button"
      data-ir="${i}"
      aria-label="Ver ${esc(curso.nombre)}"
    ></button>`);
}

function actualizarPuntitos() {
  document.querySelectorAll('#pk-puntitos button').forEach((punto, i) => {
    punto.setAttribute('aria-current', String(i === tarjetaActiva));
  });
}

/**
 * Las flechas nunca se apagan: en la última tarjeta, "siguiente" vuelve
 * a la primera, y en la primera, "anterior" va a la última (ver 7.4).
 * El texto para lectores de pantalla avisa cuando se da la vuelta.
 */
function actualizarFlechas(total) {
  const anterior = document.querySelector('.pk-slider__arrow--prev');
  const siguiente = document.querySelector('.pk-slider__arrow--next');
  const contador = document.getElementById('pk-contador');

  anterior.setAttribute(
    'aria-label',
    tarjetaActiva === 0 ? 'Ir al último curso' : 'Curso anterior'
  );
  siguiente.setAttribute(
    'aria-label',
    tarjetaActiva === total - 1 ? 'Volver al primer curso' : 'Curso siguiente'
  );
  contador.textContent = `Curso ${tarjetaActiva + 1} de ${total}`;
}

function actualizarPista() {
  const texto = document.getElementById('pk-pista-texto');
  texto.textContent = esAbanico() ? PISTAS.abanico : PISTAS.carrusel;
}


/* ---------- 7.4 Escuchar flechas, clics, teclado y deslizamiento ---------- */

/** Pasa de tarjeta por una acción de la persona (no al cargar la página). */
function moverPorLaPersona(indice) {
  marcarUsado();
  irATarjeta(indice);
}

// Tiempo mínimo entre un paso y otro, casi lo que tarda el abanico en
// girar (transform 0.42s en cursos.css, 4.1). Así responde rápido sin
// encadenar giros a lo loco.
const PAUSA_ENTRE_PASOS = 380;
let ultimoPaso = 0;

/**
 * Avanza (paso = 1) o retrocede (paso = -1) dando la vuelta:
 * después de la última viene la primera, y antes de la primera, la última.
 *
 * Dos frenos para que no gire "a lo loco":
 *  - Los pedidos que llegan mientras el abanico todavía está girando se
 *    ignoran (clics muy rápidos, tecla apretada).
 *  - Si la persona deja una tecla apretada (repetido = true), avanza hasta
 *    la última tarjeta y ahí se detiene. Para volver a la 1ª hay que soltar
 *    y apretar otra vez.
 */
function moverEnRonda(paso, repetido = false) {
  const ahora = performance.now();
  if (ahora - ultimoPaso < PAUSA_ENTRE_PASOS) return;

  const total = listaDeTarjetas().length;
  const destino = tarjetaActiva + paso;
  const daLaVuelta = destino < 0 || destino >= total;
  if (daLaVuelta && repetido) return;

  ultimoPaso = ahora;
  moverPorLaPersona((destino + total) % total);
}

function escucharTarjetas() {
  const slider = document.getElementById('pk-slider');
  const grilla = document.getElementById('pk-lista');
  let esperaDeslizar;
  let inicioArrastre = null;
  let recienArrastrado = false;

  // Clic en una tarjeta
  grilla.addEventListener('click', (evento) => {
    const tarjeta = evento.target.closest('.pk-course');
    if (!tarjeta) return;

    // El clic que llega al soltar un arrastre no abre ningún link
    if (recienArrastrado) {
      evento.preventDefault();
      return;
    }

    const indice = listaDeTarjetas().indexOf(tarjeta);

    // Si es una tarjeta de costado, primero se trae al frente (sus links
    // no se abren). En la activa, los links funcionan normalmente.
    if (indice !== tarjetaActiva) {
      evento.preventDefault();
      moverPorLaPersona(indice);
    }
  });

  // Flechas y puntitos
  slider.addEventListener('click', (evento) => {
    const flecha = evento.target.closest('[data-mover]');
    const punto = evento.target.closest('[data-ir]');

    if (flecha) moverEnRonda(Number(flecha.dataset.mover));
    if (punto) moverPorLaPersona(Number(punto.dataset.ir));
  });

  // Enter apretado sobre una flecha de la pantalla repite el clic solo:
  // se deja pasar solo el primero (soltar y apretar de nuevo para seguir)
  slider.addEventListener('keydown', (evento) => {
    if (evento.repeat && evento.target.closest('[data-mover]')) {
      evento.preventDefault();
    }
  });

  // Flechas del teclado (cuando la grilla tiene el foco).
  // evento.repeat = la tecla quedó apretada (ver moverEnRonda).
  grilla.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') moverEnRonda(-1, evento.repeat);
    if (evento.key === 'ArrowRight') moverEnRonda(1, evento.repeat);
  });

  // Abanico: arrastrar con el mouse hacia un lado pasa de tarjeta
  grilla.addEventListener('pointerdown', (evento) => {
    if (esAbanico()) inicioArrastre = evento.clientX;
  });

  grilla.addEventListener('pointerup', (evento) => {
    if (inicioArrastre === null) return;

    const recorrido = evento.clientX - inicioArrastre;
    inicioArrastre = null;
    if (Math.abs(recorrido) < 50) return;   // fue un clic, no un arrastre

    // Arrastrar a la izquierda muestra la siguiente (como en el celular)
    moverEnRonda(recorrido < 0 ? 1 : -1);

    // Evita que el clic que llega después del arrastre abra algo
    recienArrastrado = true;
    setTimeout(() => (recienArrastrado = false), 0);
  });

  // Deslizar con el dedo en el carrusel: espera a que frene
  grilla.addEventListener('scroll', () => {
    clearTimeout(esperaDeslizar);
    esperaDeslizar = setTimeout(activarLaDelCentro, 80);
  });

  // Si cambia el modo (ej.: se agranda la ventana), se reacomoda
  MODO_ABANICO.addEventListener('change', () => {
    actualizarPista();
    irATarjeta(tarjetaActiva);
  });
}

function iniciarCarruselYAbanico() {
  crearPuntitos();
  actualizarPista();
  escucharTarjetas();

  // El abanico y el carrusel arrancan con la primera tarjeta al frente.
  // En el abanico, las demás se reparten en las 5 posiciones visibles.
  const inicial = 0;
  irATarjeta(inicial);
}


/* =============================================================================
   8. ANIMACIÓN DE ENTRADA
   -----------------------------------------------------------------------------
   Cuando la sección aparece en pantalla, le agrega la clase "pk-visible" a
   la grilla y las tarjetas suben de a una. El movimiento está en cursos.css.
   ========================================================================== */

function animarAlAparecer() {
  const grilla = document.getElementById('pk-lista');

  // Navegadores viejos: se muestran directo, sin animación
  if (!('IntersectionObserver' in window)) {
    grilla.classList.add('pk-visible');
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    if (!entradas[0].isIntersecting) return;
    grilla.classList.add('pk-visible');
    observador.disconnect();
  }, { threshold: 0.15 });

  observador.observe(grilla);
}


/* =============================================================================
    9. INICIO
   ========================================================================== */

function iniciarCursos() {
  mostrarTarjetas();
  iniciarCarruselYAbanico();
  animarAlAparecer();
}

document.addEventListener('DOMContentLoaded', iniciarCursos);
