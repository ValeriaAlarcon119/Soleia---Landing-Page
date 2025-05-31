// Datos de los lotes de Soleia (59 lotes) - Estados actualizados para coincidir con HTML
const lotsData = [
  // Etapa 1 - Lotes 1-20
  {id: 1, etapa: 1, superficie: 250, precio: 850000, estado: 'vendido'}, // Rojo en HTML
  {id: 2, etapa: 1, superficie: 275, precio: 920000, estado: 'apartado'}, // Amarillo en HTML
  {id: 3, etapa: 1, superficie: 300, precio: 980000, estado: 'disponible'}, // Verde en HTML
  {id: 4, etapa: 1, superficie: 280, precio: 950000, estado: 'apartado'}, // Amarillo en HTML
  {id: 5, etapa: 1, superficie: 265, precio: 890000, estado: 'disponible'}, // Verde en HTML
  {id: 6, etapa: 1, superficie: 290, precio: 970000, estado: 'vendido'}, // Rojo en HTML
  {id: 7, etapa: 1, superficie: 320, precio: 1020000, estado: 'disponible'}, // Verde en HTML
  {id: 8, etapa: 1, superficie: 285, precio: 960000, estado: 'apartado'}, // Amarillo en HTML
  {id: 9, etapa: 1, superficie: 310, precio: 1000000, estado: 'disponible'}, // Verde en HTML
  {id: 10, etapa: 1, superficie: 295, precio: 985000, estado: 'vendido'}, // Rojo en HTML
  {id: 11, etapa: 1, superficie: 270, precio: 910000, estado: 'disponible'}, // Verde en HTML
  {id: 12, etapa: 1, superficie: 330, precio: 1050000, estado: 'vendido'}, // Rojo en HTML
  {id: 13, etapa: 1, superficie: 255, precio: 870000, estado: 'apartado'}, // Amarillo en HTML
  {id: 14, etapa: 1, superficie: 305, precio: 995000, estado: 'disponible'}, // Verde en HTML
  {id: 15, etapa: 1, superficie: 275, precio: 925000, estado: 'apartado'}, // Amarillo en HTML
  {id: 16, etapa: 1, superficie: 315, precio: 1010000, estado: 'disponible'}, // Verde en HTML
  {id: 17, etapa: 1, superficie: 260, precio: 880000, estado: 'vendido'}, // Rojo en HTML
  {id: 18, etapa: 1, superficie: 340, precio: 1080000, estado: 'disponible'}, // Verde en HTML
  {id: 19, etapa: 1, superficie: 285, precio: 965000, estado: 'apartado'}, // Amarillo en HTML
  {id: 20, etapa: 1, superficie: 325, precio: 1035000, estado: 'disponible'}, // Verde en HTML
  
  // Etapa 2 - Lotes 21-40
  {id: 21, etapa: 2, superficie: 350, precio: 1150000, estado: 'vendido'}, // Rojo en HTML
  {id: 22, etapa: 2, superficie: 380, precio: 1250000, estado: 'disponible'}, // Verde en HTML
  {id: 23, etapa: 2, superficie: 365, precio: 1200000, estado: 'apartado'}, // Amarillo en HTML
  {id: 24, etapa: 2, superficie: 340, precio: 1120000, estado: 'vendido'}, // Rojo en HTML
  {id: 25, etapa: 2, superficie: 375, precio: 1230000, estado: 'disponible'}, // Verde en HTML
  {id: 26, etapa: 2, superficie: 390, precio: 1280000, estado: 'apartado'}, // Amarillo en HTML
  {id: 27, etapa: 2, superficie: 355, precio: 1170000, estado: 'vendido'}, // Rojo en HTML
  {id: 28, etapa: 2, superficie: 370, precio: 1220000, estado: 'disponible'}, // Verde en HTML
  {id: 29, etapa: 2, superficie: 385, precio: 1265000, estado: 'apartado'}, // Amarillo en HTML
  {id: 30, etapa: 2, superficie: 360, precio: 1185000, estado: 'vendido'}, // Rojo en HTML
  {id: 31, etapa: 2, superficie: 345, precio: 1135000, estado: 'disponible'}, // Verde en HTML
  {id: 32, etapa: 2, superficie: 395, precio: 1295000, estado: 'vendido'}, // Rojo en HTML
  {id: 33, etapa: 2, superficie: 350, precio: 1155000, estado: 'apartado'}, // Amarillo en HTML
  {id: 34, etapa: 2, superficie: 380, precio: 1245000, estado: 'disponible'}, // Verde en HTML
  {id: 35, etapa: 2, superficie: 365, precio: 1205000, estado: 'vendido'}, // Rojo en HTML
  {id: 36, etapa: 2, superficie: 375, precio: 1235000, estado: 'disponible'}, // Verde en HTML
  {id: 37, etapa: 2, superficie: 390, precio: 1285000, estado: 'vendido'}, // Rojo en HTML
  {id: 38, etapa: 2, superficie: 355, precio: 1175000, estado: 'vendido'}, // Rojo en HTML
  {id: 39, etapa: 2, superficie: 370, precio: 1215000, estado: 'apartado'}, // Amarillo en HTML
  {id: 40, etapa: 2, superficie: 400, precio: 1320000, estado: 'disponible'}, // Verde en HTML
  
  // Etapa 3 - Lotes 41-59
  {id: 41, etapa: 3, superficie: 420, precio: 1450000, estado: 'vendido'}, // Rojo en HTML
  {id: 42, etapa: 3, superficie: 435, precio: 1520000, estado: 'disponible'}, // Verde en HTML
  {id: 43, etapa: 3, superficie: 410, precio: 1380000, estado: 'apartado'}, // Amarillo en HTML
  {id: 44, etapa: 3, superficie: 450, precio: 1580000, estado: 'vendido'}, // Rojo en HTML
  {id: 45, etapa: 3, superficie: 425, precio: 1470000, estado: 'apartado'}, // Amarillo en HTML
  {id: 46, etapa: 3, superficie: 440, precio: 1540000, estado: 'disponible'}, // Verde en HTML
  {id: 47, etapa: 3, superficie: 415, precio: 1420000, estado: 'vendido'}, // Rojo en HTML
  {id: 48, etapa: 3, superficie: 460, precio: 1620000, estado: 'disponible'}, // Verde en HTML
  {id: 49, etapa: 3, superficie: 430, precio: 1500000, estado: 'apartado'}, // Amarillo en HTML
  {id: 50, etapa: 3, superficie: 445, precio: 1560000, estado: 'vendido'}, // Rojo en HTML
  {id: 51, etapa: 3, superficie: 455, precio: 1600000, estado: 'disponible'}, // Verde en HTML
  {id: 52, etapa: 3, superficie: 420, precio: 1460000, estado: 'vendido'}, // Rojo en HTML
  {id: 53, etapa: 3, superficie: 465, precio: 1640000, estado: 'disponible'}, // Verde en HTML
  {id: 54, etapa: 3, superficie: 435, precio: 1530000, estado: 'apartado'}, // Amarillo en HTML
  {id: 55, etapa: 3, superficie: 450, precio: 1590000, estado: 'disponible'}, // Verde en HTML
  {id: 56, etapa: 3, superficie: 470, precio: 1660000, estado: 'vendido'}, // Rojo en HTML
  {id: 57, etapa: 3, superficie: 425, precio: 1480000, estado: 'disponible'}, // Verde en HTML
  {id: 58, etapa: 3, superficie: 475, precio: 1680000, estado: 'apartado'}, // Amarillo en HTML
  {id: 59, etapa: 3, superficie: 440, precio: 1550000, estado: 'vendido'} // Rojo en HTML
];

// Variable para el lote seleccionado
let selectedLot = null;

// Elementos del DOM para el modal
let modal, modalStatus, modalStatusText, modalEtapa, modalLote, 
    modalSurface, modalBasePrice, modalViewPlan, 
    modalQuoteForm, modalClose;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
});

// Inicializar referencias a elementos del DOM
function initializeElements() {
  modal = document.getElementById('lotModal');
  modalStatus = document.getElementById('modalStatus');
  modalStatusText = document.getElementById('modalStatusText');
  modalEtapa = document.getElementById('modalEtapa');
  modalLote = document.getElementById('modalLote');
  modalSurface = document.getElementById('modalSurface');
  modalBasePrice = document.getElementById('modalBasePrice');
  modalViewPlan = document.getElementById('modalViewPlan');
  modalQuoteForm = document.getElementById('modalQuoteForm');
  modalClose = document.querySelector('.modal-close');
}

// Configurar event listeners
function setupEventListeners() {
  // Event listeners para los lotes SVG
  const batches = document.querySelectorAll('.batch');
  batches.forEach(batch => {
    batch.addEventListener('click', function(e) {
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
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Botón ver plano
  modalViewPlan.addEventListener('click', function() {
    if (selectedLot) {
      alert(`Ver plano del lote ${selectedLot.id} - Etapa ${selectedLot.etapa}\nSuperficie: ${selectedLot.superficie}m²`);
    }
  });

  // Formulario de cotización
  modalQuoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedLot) {
      alert('Error: No hay lote seleccionado.');
      return;
    }
    
    const nombre = e.target[0].value;
    const email = e.target[1].value;
    const telefono = e.target[2].value;
    const mensaje = e.target[3].value;
    
    // Simular envío de cotización
    alert(`¡Cotización enviada exitosamente!\n\nDatos del contacto:\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nLote seleccionado: ${selectedLot.id}\nEtapa: ${selectedLot.etapa}\nSuperficie: ${selectedLot.superficie}m²\nPrecio: ${formatCurrency(selectedLot.precio)}\n\nTe contactaremos pronto para brindarte más información.`);
    
    // Limpiar formulario y cerrar modal
    modalQuoteForm.reset();
    closeModal();
  });

  // Tecla ESC para cerrar modal
  document.addEventListener('keydown', function(e) {
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
  switch(selectedLot.estado) {
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
  modalEtapa.textContent = selectedLot.etapa;
  modalLote.textContent = selectedLot.id;
  modalSurface.textContent = selectedLot.superficie.toLocaleString();
  modalBasePrice.textContent = formatCurrency(selectedLot.precio);
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
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('MX$', '').trim();
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