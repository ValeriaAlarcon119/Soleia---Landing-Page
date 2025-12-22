// Datos de los lotes de Soleia (59 lotes) - actualizados con todos los datos del Excel
const lotsData = [
  // ZONA 1 - Lotes 1-11
  { id: 1, etapa: 1, superficie: 240.66, precio: 1203300, precioListaFF: 1143135, precioContadoFF: 1028821.50, pago50EngancheFF: 1085978.25, precio30Enganche: 1143135, estado: 'vendido', zona: 'ZONA 1' },
  { id: 2, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'apartado', zona: 'ZONA 1' },
  { id: 3, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'disponible', zona: 'ZONA 1' },
  { id: 4, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'apartado', zona: 'ZONA 1' },
  { id: 5, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'disponible', zona: 'ZONA 1' },
  { id: 6, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'vendido', zona: 'ZONA 1' },
  { id: 7, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'disponible', zona: 'ZONA 1' },
  { id: 8, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'apartado', zona: 'ZONA 1' },
  { id: 9, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'disponible', zona: 'ZONA 1' },
  { id: 10, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'vendido', zona: 'ZONA 1' },
  { id: 11, etapa: 1, superficie: 243, precio: 1215000, precioListaFF: 1154250, precioContadoFF: 1038825, pago50EngancheFF: 1096537.50, precio30Enganche: 1154250, estado: 'disponible', zona: 'ZONA 1' },

  // ZONA 2 - Lotes 12-21
  { id: 12, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'vendido', zona: 'ZONA 2' },
  { id: 13, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'apartado', zona: 'ZONA 2' },
  { id: 14, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'disponible', zona: 'ZONA 2' },
  { id: 15, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'apartado', zona: 'ZONA 2' },
  { id: 16, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'disponible', zona: 'ZONA 2' },
  { id: 17, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'vendido', zona: 'ZONA 2' },
  { id: 18, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'disponible', zona: 'ZONA 2' },
  { id: 19, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'apartado', zona: 'ZONA 2' },
  { id: 20, etapa: 1, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'disponible', zona: 'ZONA 2' },
  { id: 21, etapa: 2, superficie: 243, precio: 1275750, precioListaFF: 1211962.50, precioContadoFF: 1090766.25, pago50EngancheFF: 1151364.38, precio30Enganche: 1211962.50, estado: 'apartado', zona: 'ZONA 2' },

  // ZONA 3 - Lotes 22-30
  { id: 22, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'disponible', zona: 'ZONA 3' },
  { id: 23, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'apartado', zona: 'ZONA 3' },
  { id: 24, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'vendido', zona: 'ZONA 3' },
  { id: 25, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'disponible', zona: 'ZONA 3' },
  { id: 26, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'apartado', zona: 'ZONA 3' },
  { id: 27, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'vendido', zona: 'ZONA 3' },
  { id: 28, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'disponible', zona: 'ZONA 3' },
  { id: 29, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'apartado', zona: 'ZONA 3' },
  { id: 30, etapa: 2, superficie: 243, precio: 1336500, precioListaFF: 1269675, precioContadoFF: 1142707.50, pago50EngancheFF: 1206191.25, precio30Enganche: 1269675, estado: 'vendido', zona: 'ZONA 3' },

  // LOTE 31 (antes de Habitacionales Playa)
  { id: 31, etapa: 2, superficie: 341.72, precio: 1879460, precioListaFF: 1785487, precioContadoFF: 1606938.30, pago50EngancheFF: 1696212.65, precio30Enganche: 1785487, estado: 'disponible', zona: 'ZONA 3' },

  // LOTES HABITACIONALES PLAYA - Lotes 32-59
  { id: 32, etapa: 2, superficie: 436.03, precio: 3008607, precioListaFF: 2858176.65, precioContadoFF: 2572358.99, pago50EngancheFF: 2715267.82, precio30Enganche: 2858176.65, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 33, etapa: 2, superficie: 290.66, precio: 2005554, precioListaFF: 1905276.30, precioContadoFF: 1714748.67, pago50EngancheFF: 1810012.49, precio30Enganche: 1905276.30, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 34, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 35, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 36, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 37, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 38, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 39, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 40, etapa: 2, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 41, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 42, etapa: 3, superficie: 292.74, precio: 2195550, precioListaFF: 2085772.50, precioContadoFF: 1877195.25, pago50EngancheFF: 1981483.88, precio30Enganche: 2085772.50, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 43, etapa: 3, superficie: 389.29, precio: 3308965, precioListaFF: 3143516.75, precioContadoFF: 2829165.08, pago50EngancheFF: 2986340.91, precio30Enganche: 3143516.75, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 44, etapa: 3, superficie: 313.1, precio: 3131000, precioListaFF: 2974450, precioContadoFF: 2677005, pago50EngancheFF: 2825727.50, precio30Enganche: 2974450, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 45, etapa: 3, superficie: 476.02, precio: 3284538, precioListaFF: 3120311.10, precioContadoFF: 2808279.99, pago50EngancheFF: 2964295.55, precio30Enganche: 3120311.10, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 46, etapa: 3, superficie: 292.97, precio: 2021493, precioListaFF: 1920418.35, precioContadoFF: 1728376.52, pago50EngancheFF: 1824397.43, precio30Enganche: 1920418.35, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 47, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 48, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 49, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 50, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 51, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 52, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 53, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 54, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 55, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, priceContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 56, etapa: 3, superficie: 292.74, precio: 2019906, precioListaFF: 1918910.70, precioContadoFF: 1727019.63, pago50EngancheFF: 1822965.17, precio30Enganche: 1918910.70, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 57, etapa: 3, superficie: 327.11, precio: 2453325, precioListaFF: 2330658.75, precioContadoFF: 2097592.88, pago50EngancheFF: 2214125.81, precio30Enganche: 2330658.75, estado: 'disponible', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 58, etapa: 3, superficie: 339.32, precio: 2884220, precioListaFF: 2740009, precioContadoFF: 2466008.10, pago50EngancheFF: 2603008.55, precio30Enganche: 2740009, estado: 'apartado', zona: 'LOTES HABITACIONALES PLAYA' },
  { id: 59, etapa: 3, superficie: 350.98, precio: 3509800, precioListaFF: 3334310, precioContadoFF: 3000879, pago50EngancheFF: 3167594.50, precio30Enganche: 3334310, estado: 'vendido', zona: 'LOTES HABITACIONALES PLAYA' }
];

// Variable para el lote seleccionado
let selectedLot = null;

// Elementos del DOM para el modal
let modal, modalStatus, modalStatusText, modalZona, modalEtapa, modalLote,
  modalSurface, modalPrecioLista, modalPrecioListaFF, modalPrecioContadoFF,
  modalPago50EngancheFF, modalPrecio30Enganche, modalViewPlan,
  modalQuoteForm, modalClose;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  initializeElements();
  setupEventListeners();
  updateSVGStatus(); // Actualizar colores de los lotes en el mapa
});

// Sincronizar clases de los lotes en el SVG con el estado en lotsData
function updateSVGStatus() {
  lotsData.forEach(lot => {
    const batch = document.querySelector(`.batch[data-lot-id="${lot.id}"]`);
    if (batch) {
      // Eliminar clases previas de estado
      batch.classList.remove('disponible', 'apartado', 'vendido');
      // Agregar la clase de estado actual
      batch.classList.add(lot.estado);

      // También actualizar el color del lot-path si es necesario (para compatibilidad)
      const path = batch.querySelector('.lot-path');
      if (path) {
        // La clase del estado en el 'a' debería ser suficiente si el CSS está bien
      }
    }
  });
}

// Inicializar referencias a elementos del DOM
function initializeElements() {
  modal = document.getElementById('lotModal');
  modalStatus = document.getElementById('modalStatus');
  modalStatusText = document.getElementById('modalStatusText');
  modalZona = document.getElementById('modalZona');
  modalEtapa = document.getElementById('modalEtapa');
  modalLote = document.getElementById('modalLote');
  modalSurface = document.getElementById('modalSurface');
  modalPrecioLista = document.getElementById('modalPrecioLista');
  modalPrecioListaFF = document.getElementById('modalPrecioListaFF');
  modalPrecioContadoFF = document.getElementById('modalPrecioContadoFF');
  modalPago50EngancheFF = document.getElementById('modalPago50EngancheFF');
  modalPrecio30Enganche = document.getElementById('modalPrecio30Enganche');
  modalViewPlan = document.getElementById('modalViewPlan');
  modalQuoteForm = document.getElementById('modalQuoteForm');
  modalClose = document.querySelector('.modal-close');
}

// Configurar event listeners
function setupEventListeners() {
  // Ajuste solicitado: dejar todos los lotes en 'disponible' excepto los indicados
  lotsData.forEach(lot => {
    lot.estado = 'disponible';
  });

  // Actualizar solo los lotes solicitados
  const soldLots = [12, 32, 56];
  const reservedLots = [21];

  lotsData.forEach(lot => {
    if (soldLots.includes(lot.id)) lot.estado = 'vendido';
    if (reservedLots.includes(lot.id)) lot.estado = 'apartado';
  });

  // Event listeners para los lotes SVG
  const batches = document.querySelectorAll('.batch');
  batches.forEach(batch => {
    batch.addEventListener('click', function (e) {
      e.preventDefault();
      const lotId = parseInt(this.getAttribute('data-lot-id'));
      const lot = lotsData.find(l => l.id === lotId);

      // Abrir modal para todos los lotes (disponible, apartado y vendido)
      if (lot) {
        openLotModal(lotId);
      }
    });
  });

  // Cerrar modal
  modalClose.addEventListener('click', closeModal);

  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Botón ver plano
  modalViewPlan.addEventListener('click', function () {
    if (selectedLot) {
      alert(`Ver plano del lote ${selectedLot.id} - Etapa ${selectedLot.etapa}\nSuperficie: ${selectedLot.superficie}m²`);
    }
  });

  // Formulario de cotización
  modalQuoteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!selectedLot) {
      alert('Error: No hay lote seleccionado.');
      return;
    }

    const formData = new FormData(modalQuoteForm);
    // Agregar información técnica del lote al mensaje
    const mensajeOriginal = formData.get('mensaje') || '';
    const infoLote = `\n\n--- Información del Lote ---\nID Lote: ${selectedLot.id}\nEtapa: ${selectedLot.etapa}\nSuperficie: ${selectedLot.superficie}m²\nZona: ${selectedLot.zona}\nPrecio: ${formatCurrency(selectedLot.precio)}`;
    formData.set('mensaje', mensajeOriginal + infoLote);

    // El campo form-name es requerido por Netlify para procesar envíos mediante AJAX
    formData.append('form-name', 'quote-form');

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        alert(`¡Cotización enviada exitosamente!\n\nTe contactaremos pronto para brindarte más información sobre el lote ${selectedLot.id}.`);
        modalQuoteForm.reset();
        closeModal();
      })
      .catch((error) => {
        console.error('Error al enviar formulario:', error);
        alert('Hubo un error al enviar la cotización. Por favor intenta de nuevo.');
      });
  });

  // Tecla ESC para cerrar modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

// Abrir modal del lote
function openLotModal(lotId) {
  selectedLot = lotsData.find(lot => lot.id === lotId);
  if (!selectedLot) return;

  // Actualizar información del lote en modal
  updateModalInfo();

  // Mostrar modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Cerrar modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  selectedLot = null;
}

// Actualizar información del lote en modal
function updateModalInfo() {
  if (!selectedLot) return;

  // Actualizar estado y clase CSS según el estado del lote
  modalStatus.className = `status-dot-large ${selectedLot.estado}`;

  // Asegurar que el texto del estado coincida con el color
  switch (selectedLot.estado) {
    case 'disponible':
      modalStatusText.textContent = 'Disponible';
      modalStatus.style.backgroundColor = '#28a745'; // Verde
      break;
    case 'apartado':
      modalStatusText.textContent = 'Apartado';
      modalStatus.style.backgroundColor = '#ffc107'; // Amarillo
      break;
    case 'vendido':
      modalStatusText.textContent = 'Vendido';
      modalStatus.style.backgroundColor = '#dc3545'; // Rojo
      break;
    default:
      modalStatusText.textContent = 'Desconocido';
      modalStatus.style.backgroundColor = '#6c757d'; // Gris
  }

  // Actualizar datos del lote
  modalZona.textContent = selectedLot.zona || '-';
  modalEtapa.textContent = selectedLot.etapa;
  modalLote.textContent = selectedLot.id;
  modalSurface.textContent = selectedLot.superficie.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Actualizar todos los precios
  modalPrecioLista.textContent = formatCurrency(selectedLot.precio);
  modalPrecioListaFF.textContent = formatCurrency(selectedLot.precioListaFF || 0);
  modalPrecioContadoFF.textContent = formatCurrency(selectedLot.precioContadoFF || 0);
  modalPago50EngancheFF.textContent = formatCurrency(selectedLot.pago50EngancheFF || 0);
  modalPrecio30Enganche.textContent = formatCurrency(selectedLot.precio30Enganche || 0);
}

// Funciones auxiliares
function getStatusText(estado) {
  switch (estado) {
    case 'disponible':
      return 'Disponible';
    case 'apartado':
      return 'Apartado';
    case 'vendido':
      return 'Vendido';
    default:
      return 'Desconocido';
  }
}

function formatCurrency(amount) {
  if (!amount || amount === 0) return '0';
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Función para generar lotes SVG dinámicamente (opcional)
function generateAllLotsSVG() {
  // Esta función se puede usar para generar todos los 59 lotes dinámicamente
  // Por ahora tenemos algunos lotes definidos manualmente en el HTML
  console.log('Total de lotes disponibles:', lotsData.filter(lot => lot.estado === 'disponible').length);
  console.log('Total de lotes apartados:', lotsData.filter(lot => lot.estado === 'apartado').length);
  console.log('Total de lotes vendidos:', lotsData.filter(lot => lot.estado === 'vendido').length);
}

// Ejecutar función de estadísticas al cargar
generateAllLotsSVG(); 