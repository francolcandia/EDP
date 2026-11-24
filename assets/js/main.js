/**
 * EDP ADVISORY - Strategic Senior Advisory
 * Master Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initInsightsFilter();
  initArticleModal();
  initBookingSystem();
  initFaqAccordion();
  initForms();
  initMethodologyNav();
});

/* --------------------------------------------------------------------------
   1. Navbar & Header Scroll Behavior
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger-btn');
  const menu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Insights Filter & Live Search
   -------------------------------------------------------------------------- */
function initInsightsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.querySelector('.insights-search-input');
  const cards = document.querySelectorAll('.insight-card');

  if (!tabs.length || !cards.length) return;

  function filterCards() {
    const activeTab = document.querySelector('.filter-tab.active');
    const category = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.insight-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.insight-excerpt')?.textContent.toLowerCase() || '';

      const matchesCat = (category === 'all' || cardCategory === category);
      const matchesSearch = (!query || title.includes(query) || excerpt.includes(query));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }
}

/* --------------------------------------------------------------------------
   3. In-Depth Insights Article Reader Modal
   -------------------------------------------------------------------------- */
const insightArticlesData = {
  1: {
    badge: "ARTÍCULO",
    category: "Inteligencia de Mercado",
    date: "15 Mayo 2026",
    title: "Panorama de la inversión minera en América Latina 2026",
    author: "Pablo R. Lapido | Socio Fundador & CEO",
    readTime: "6 min de lectura",
    content: `
      <p>América Latina continúa consolidándose como la frontera indispensable para la transición energética global. Con más del 50% de las reservas mundiales de litio y una participación crucial en el suministro de cobre, plata y oro, la región enfrenta una oportunidad histórica de captación de capitales institucionales.</p>
      <h3 style="margin: 1.5rem 0 0.75rem; color: #1D2F54; font-size: 1.25rem;">La nueva dinámica del capital internacional</h3>
      <p>A diferencia de ciclos alcistas previos, los inversores globales en bolsas como TSX, ASX y NYSE exigen un estándar de maduración técnica mucho más riguroso. Ya no es suficiente contar con anomalías geológicas prometedoras; los comités de inversión demandan certidumbre institucional y marcos de gobernanza transparentes.</p>
      <blockquote style="border-left: 3px solid #CB9904; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #1D2F54;">
        "El capital global no teme al riesgo geológico conocido, sino a la incertidumbre institucional y regulatoria no gestionada."
      </blockquote>
      <h3 style="margin: 1.5rem 0 0.75rem; color: #1D2F54; font-size: 1.25rem;">Conclusiones para los operadores de la región</h3>
      <p>El rol de EDP Senior Advisory radica precisamente en construir el puente técnico-estratégico: transformar el valor de los yacimientos en expedientes confiables, auditados bajo estándares NI 43-101 y JORC, con mapeo integral de riesgos 360°.</p>
    `
  },
  2: {
    badge: "ANÁLISIS",
    category: "Due Diligence",
    date: "08 Mayo 2026",
    title: "El rol del QA/QC en la confianza del inversor",
    author: "Sebastián Rodríguez | Socio & Director Técnico",
    readTime: "5 min de lectura",
    content: `
      <p>En el mercado de capitales minero, la credibilidad de los datos analíticos es el activo más sensible de cualquier compañía en exploración o desarrollo. Un protocolo de aseguramiento y control de calidad (QA/QC) defectuoso puede desvalorizar millones de dólares en inversión en perforación.</p>
      <h3 style="margin: 1.5rem 0 0.75rem; color: #1D2F54; font-size: 1.25rem;">Estándares internacionales y la figura del Qualified Person</h3>
      <p>La validación independiente por parte de una Qualified Person (QP) garantiza que las muestras, duplicados, blancos y estándares certificados cumplan estrictamente con las tolerancias estadísticas internacionales antes de la estimación de recursos.</p>
      <p>EDP acompaña a las compañías estructurando protocolos de QA/QC desde el testigo de perforación hasta la base de datos final del Data Room.</p>
    `
  },
  3: {
    badge: "NOTA DE MERCADO",
    category: "Litio",
    date: "01 Mayo 2026",
    title: "Litio: oferta, demanda y precios en transición",
    author: "Equipo de Análisis EDP",
    readTime: "4 min de lectura",
    content: `
      <p>Tras la volatilidad de precios en los mercados spot durante los últimos 24 meses, el mercado del litio ingresa en una etapa de racionalización estructural. Los proyectos con ventajas de costo operativo (Opex en primer cuartil) y huella de carbono minimizada son los únicos que continúan atrayendo financiamiento de largo plazo.</p>
      <p>Los salares del Triángulo del Litio (Argentina y Chile) continúan liderando el atractivo de inversión debido a su alta ley y compatibilidad con tecnologías de evaporación optimizada y Extracción Directa de Litio (DLE).</p>
    `
  },
  4: {
    badge: "ARTÍCULO",
    category: "Riesgo Geopolítico",
    date: "24 Abril 2026",
    title: "Riesgo político en proyectos mineros: claves para evaluarlo",
    author: "María José Aranguren | Socia & Directora de ESG",
    readTime: "5 min de lectura",
    content: `
      <p>Evaluar el riesgo político de un proyecto no consiste en una puntuación abstracta de país, sino en el análisis meticuloso de las dinámicas provinciales y municipales: legislación específica, licencias sociales locales, capacidad de suministro hídrico y antecedentes de diálogo comunitario.</p>
      <p>En Mendoza, San Juan o Salta, cada distrito posee particularidades institucionales que deben ser anticipadas en el diseño inicial del proyecto.</p>
    `
  },
  5: {
    badge: "WHITEPAPER",
    category: "ESG y Sostenibilidad",
    date: "17 Abril 2026",
    title: "ESG en minería: de la gestión de riesgos a la creación de valor",
    author: "María José Aranguren & Matías Costa",
    readTime: "7 min de lectura",
    content: `
      <p>Los criterios ambientales, sociales y de gobernanza (ESG) han dejado de ser un anexo de relaciones públicas para convertirse en una condición indispensable de acceso al costo de capital más bajo en los mercados de Londres, Toronto y Nueva York.</p>
      <p>Nuestra metodología integra ESG en la fase 02 (EVALUAR) para garantizar que los proyectos mitiguen contingencias de manera proactiva.</p>
    `
  },
  6: {
    badge: "ANÁLISIS",
    category: "Financiamiento",
    date: "10 Abril 2026",
    title: "TSX y financiamiento para junior miners",
    author: "Matías Costa | Socio & Director de Estrategia",
    readTime: "6 min de lectura",
    content: `
      <p>La Bolsa de Toronto (TSX y TSX Venture) continúa siendo el epicentro de la financiación junior mundial. Sin embargo, los requisitos para estructurar un IPO o un reverse takeover demandan una preparación exhaustiva que involucra modelado financiero, compliance ético y un Investment Story con narrativa sólida.</p>
    `
  },
  7: {
    badge: "ARTÍCULO",
    category: "Due Diligence",
    date: "03 Abril 2026",
    title: "Due Diligence técnico: más allá de la geología",
    author: "Sebastián Rodríguez | Director Técnico",
    readTime: "5 min de lectura",
    content: `
      <p>Un Due Diligence riguroso analiza la consistencia geológica pero trasciende hacia la constructabilidad, el acceso a energía y agua, las rutas logísticas de transporte de concentrados y la validez registral de las concesiones mineras.</p>
    `
  },
  8: {
    badge: "NOTA DE MERCADO",
    category: "Inteligencia de Mercado",
    date: "27 Marzo 2026",
    title: "Cobre: fundamentos de largo plazo siguen sólidos",
    author: "Equipo de Estrategia EDP",
    readTime: "4 min de lectura",
    content: `
      <p>El déficit proyectado de concentrado de cobre para la próxima década debido a la electrificación de flotas y redes de transmisión de energía limpia posiciona a los pórfidos andinos de Argentina y Chile en el centro de atención de las grandes corporaciones mineras globales (Majors).</p>
    `
  },
  9: {
    badge: "ANÁLISIS",
    category: "Relaciones Comunitarias",
    date: "20 Marzo 2026",
    title: "Permisos y relaciones comunitarias: el nuevo diferenciador",
    author: "María José Aranguren | Directora de ESG",
    readTime: "5 min de lectura",
    content: `
      <p>El éxito de una operación minera moderna reside en la construcción de confianza compartida con las comunidades anfitrionas. Analizamos casos de éxito y marcos metodológicos para la obtención y preservación de la licencia social para operar.</p>
    `
  }
};

function initArticleModal() {
  const modal = document.getElementById('articleModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalContainer = document.getElementById('modalArticleContent');

  if (!modal || !modalContainer) return;

  document.querySelectorAll('.js-open-article').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-article-id');
      const data = insightArticlesData[id];
      if (!data) return;

      modalContainer.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span class="insight-badge" style="display: inline-block; margin-bottom: 0.5rem;">${data.badge} | ${data.category}</span>
          <h2 style="font-size: 1.75rem; color: #1D2F54; line-height: 1.3; margin-bottom: 0.5rem;">${data.title}</h2>
          <div style="font-family: var(--font-ui); font-size: 0.8125rem; color: #8C8C8C;">
            <span>${data.author}</span> • <span>${data.date}</span> • <span>${data.readTime}</span>
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 1.5rem;" />
        <div style="font-family: var(--font-body); font-size: 1rem; line-height: 1.8; color: #334155;">
          ${data.content}
        </div>
        <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <span style="font-family: var(--font-ui); font-size: 0.8125rem; color: #64748b;">¿Desea profundizar este análisis con nuestro equipo?</span>
          <a href="agendar.html" class="btn btn-gold" style="padding: 0.5rem 1.25rem; font-size: 0.75rem;">Agendar Reunión Confidencial</a>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Meeting Booking Engine (agendar.html)
   -------------------------------------------------------------------------- */
function initBookingSystem() {
  const wizard = document.getElementById('bookingWizard');
  if (!wizard) return;

  let selectedMeeting = "Reunión Estratégica Inicial";
  let selectedDate = "15 de Mayo de 2026";
  let selectedTime = "14:00";

  // 1. Meeting Type Selection
  const meetingOptions = document.querySelectorAll('.meeting-type-option');
  meetingOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      meetingOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedMeeting = opt.querySelector('.meeting-type-name')?.textContent.trim() || selectedMeeting;
      updateSummaryBadge();
    });
  });

  // 2. Calendar Days Selection
  const days = document.querySelectorAll('.cal-day:not(.disabled)');
  days.forEach(day => {
    day.addEventListener('click', () => {
      days.forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
      const dayNum = day.textContent.trim();
      selectedDate = `${dayNum} de Mayo de 2026`;
      const dateDisplay = document.getElementById('selectedDateDisplay');
      if (dateDisplay) dateDisplay.textContent = selectedDate;
      updateSummaryBadge();
    });
  });

  // 3. Time Slots Selection
  const slots = document.querySelectorAll('.time-slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedTime = slot.textContent.trim();
      updateSummaryBadge();
    });
  });

  function updateSummaryBadge() {
    const badge = document.getElementById('bookingSelectionSummary');
    if (badge) {
      badge.textContent = `${selectedMeeting} • ${selectedDate} a las ${selectedTime} hs (GMT-3)`;
    }
  }

  // 4. Form Submission & Confirmation Modal
  const bookingForm = document.getElementById('meetingBookingForm');
  const confirmModal = document.getElementById('bookingConfirmModal');
  const confirmClose = document.getElementById('bookingConfirmClose');

  if (bookingForm && confirmModal) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookingName')?.value || 'Invitado';
      const role = document.getElementById('bookingRole')?.value || '';
      const company = document.getElementById('bookingCompany')?.value || '';
      const email = document.getElementById('bookingEmail')?.value || '';
      const phone = document.getElementById('bookingPhone')?.value || '';
      const country = document.getElementById('bookingCountry')?.value || '';
      const message = document.getElementById('bookingMessage')?.value || '';

      const summaryDetails = document.getElementById('confirmedMeetingDetails');
      if (summaryDetails) {
        summaryDetails.innerHTML = `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin: 1.25rem 0;">
            <p style="margin-bottom: 0.4rem;"><strong>Tipo:</strong> ${selectedMeeting}</p>
            <p style="margin-bottom: 0.4rem;"><strong>Fecha y hora:</strong> ${selectedDate} a las ${selectedTime} hs (GMT-3)</p>
            <p style="margin-bottom: 0.4rem;"><strong>Participante:</strong> ${name} (${company || 'Confidencial'})</p>
            <p style="margin-bottom: 0;"><strong>Enlace de acceso:</strong> Se enviará a <em>${email}</em> por correo seguro.</p>
          </div>
        `;
      }

      // Enviar datos al backend (si el hosting cuenta con soporte PHP como cPanel/Apache)
      try {
        fetch('send-booking.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: selectedMeeting,
            fecha: selectedDate,
            horario: selectedTime,
            nombre: name,
            cargo: role,
            empresa: company,
            email: email,
            telefono: phone,
            pais: country,
            mensaje: message
          })
        }).catch(() => {
          // Si el hosting es estático puro (Vercel/Netlify sin PHP), la interfaz continúa sin error
        });
      } catch (err) {
        // Silencioso
      }

      confirmModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      bookingForm.reset();
    });
  }

  if (confirmClose && confirmModal) {
    confirmClose.addEventListener('click', () => {
      confirmModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
}

/* --------------------------------------------------------------------------
   5. Methodology Timeline Interactive Navigator
   -------------------------------------------------------------------------- */
function initMethodologyNav() {
  const nodes = document.querySelectorAll('.step-node');
  const cards = document.querySelectorAll('.step-detail-card');

  if (!nodes.length || !cards.length) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepNum = node.getAttribute('data-step');
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const targetCard = document.querySelector(`.step-detail-card[data-step="${stepNum}"]`);
      if (targetCard) {
        cards.forEach(c => {
          c.style.borderColor = 'var(--color-navy-border)';
          c.style.transform = 'none';
        });
        targetCard.style.borderColor = 'var(--color-gold)';
        targetCard.style.transform = 'translateY(-6px)';
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion (contacto.html)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7. Form Feedback & Notifications
   -------------------------------------------------------------------------- */
function initForms() {
  const contactForm = document.getElementById('generalContactForm');
  const newsletterForms = document.querySelectorAll('.js-newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const role = document.getElementById('contactRole')?.value || '';
      const company = document.getElementById('contactCompany')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const country = document.getElementById('contactCountry')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';

      // Enviar datos al backend (si el hosting cuenta con soporte PHP como cPanel/Apache)
      try {
        fetch('send-contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: name,
            cargo: role,
            empresa: company,
            email: email,
            telefono: phone,
            pais: country,
            mensaje: message
          })
        }).catch(() => {});
      } catch (err) {}

      showToast('Su consulta ha sido enviada con éxito. Un socio senior de EDP se pondrá en contacto en menos de 24 horas.');
      contactForm.reset();
    });
  }

  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('¡Gracias por suscribirse! Recibirá nuestros reportes y análisis exclusivos en su casilla.');
      form.reset();
    });
  });

  const reportDownloadBtns = document.querySelectorAll('.js-download-report');
  reportDownloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Iniciando descarga del Informe Trimestral Q1 2026 en formato PDF confidencial...');
    });
  });

  const loadMoreBtn = document.getElementById('btnLoadMoreInsights');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Se han mostrado todos los 9 artículos e informes disponibles para el ciclo actual.');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background-color: #1D2F54;
      color: #ffffff;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      border-left: 4px solid #CB9904;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.875rem;
      z-index: 3000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      max-width: 420px;
      line-height: 1.5;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4500);
}
