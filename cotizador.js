// Datos de los lotes de Soleia (59 lotes) - actualizados con M2 y precio de lista del Excel
const lotsData = [
  // Etapa 1 - Lotes 1-20 (ZONA 1 y ZONA 2)
  {id: 1, etapa: 1, superficie: 240.66, precio: 1203300, estado: 'vendido'},      // Lote 1 - ZONA 1
  {id: 2, etapa: 1, superficie: 243,    precio: 1215000, estado: 'apartado'},     // Lote 2
  {id: 3, etapa: 1, superficie: 243,    precio: 1215000, estado: 'disponible'},   // Lote 3
  {id: 4, etapa: 1, superficie: 243,    precio: 1215000, estado: 'apartado'},     // Lote 4
  {id: 5, etapa: 1, superficie: 243,    precio: 1215000, estado: 'disponible'},   // Lote 5
  {id: 6, etapa: 1, superficie: 243,    precio: 1215000, estado: 'vendido'},      // Lote 6
  {id: 7, etapa: 1, superficie: 243,    precio: 1215000, estado: 'disponible'},   // Lote 7
  {id: 8, etapa: 1, superficie: 243,    precio: 1215000, estado: 'apartado'},     // Lote 8
  {id: 9, etapa: 1, superficie: 243,    precio: 1215000, estado: 'disponible'},   // Lote 9
  {id: 10, etapa: 1, superficie: 243,   precio: 1215000, estado: 'vendido'},      // Lote 10
  {id: 11, etapa: 1, superficie: 243,   precio: 1215000, estado: 'disponible'},   // Lote 11

  // ZONA 2 - mismos M2 y precio para 12-21
  {id: 12, etapa: 1, superficie: 243,   precio: 1275750, estado: 'vendido'},      // Lote 12
  {id: 13, etapa: 1, superficie: 243,   precio: 1275750, estado: 'apartado'},     // Lote 13
  {id: 14, etapa: 1, superficie: 243,   precio: 1275750, estado: 'disponible'},   // Lote 14
  {id: 15, etapa: 1, superficie: 243,   precio: 1275750, estado: 'apartado'},     // Lote 15
  {id: 16, etapa: 1, superficie: 243,   precio: 1275750, estado: 'disponible'},   // Lote 16
  {id: 17, etapa: 1, superficie: 243,   precio: 1275750, estado: 'vendido'},      // Lote 17
  {id: 18, etapa: 1, superficie: 243,   precio: 1275750, estado: 'disponible'},   // Lote 18
  {id: 19, etapa: 1, superficie: 243,   precio: 1275750, estado: 'apartado'},     // Lote 19
  {id: 20, etapa: 1, superficie: 243,   precio: 1275750, estado: 'disponible'},   // Lote 20
  
  // Etapa 2 - Lotes 21-40 (ZONA 2 final y ZONA 3)
  {id: 21, etapa: 2, superficie: 243,   precio: 1275750, estado: 'vendido'},      // Lote 21
  {id: 22, etapa: 2, superficie: 243,   precio: 1336500, estado: 'disponible'},   // Lote 22
  {id: 23, etapa: 2, superficie: 243,   precio: 1336500, estado: 'apartado'},     // Lote 23
  {id: 24, etapa: 2, superficie: 243,   precio: 1336500, estado: 'vendido'},      // Lote 24
  {id: 25, etapa: 2, superficie: 243,   precio: 1336500, estado: 'disponible'},   // Lote 25
  {id: 26, etapa: 2, superficie: 243,   precio: 1336500, estado: 'apartado'},     // Lote 26
  {id: 27, etapa: 2, superficie: 243,   precio: 1336500, estado: 'vendido'},      // Lote 27
  {id: 28, etapa: 2, superficie: 243,   precio: 1336500, estado: 'disponible'},   // Lote 28
  {id: 29, etapa: 2, superficie: 243,   precio: 1336500, estado: 'apartado'},     // Lote 29
  {id: 30, etapa: 2, superficie: 243,   precio: 1336500, estado: 'vendido'},      // Lote 30
  {id: 31, etapa: 2, superficie: 341.72,precio: 1879460, estado: 'disponible'},   // Lote 31

  // Etapa 2 - Habitacionales playa (inicio de 32)
  {id: 32, etapa: 2, superficie: 436.03,precio: 2834195, estado: 'vendido'},      // Lote 32
  {id: 33, etapa: 2, superficie: 290.66,precio: 1889290, estado: 'apartado'},     // Lote 33
  {id: 34, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 34
  {id: 35, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 35
  {id: 36, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 36
  {id: 37, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 37
  {id: 38, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 38
  {id: 39, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'apartado'},     // Lote 39
  {id: 40, etapa: 2, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 40

  // Etapa 3 - Lotes 41-59 (Habitacionales playa)
  {id: 41, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 41
  {id: 42, etapa: 3, superficie: 292.74,precio: 2195550, estado: 'disponible'},   // Lote 42
  {id: 43, etapa: 3, superficie: 389.29,precio: 3308965, estado: 'apartado'},     // Lote 43
  {id: 44, etapa: 3, superficie: 313.1, precio: 3131000, estado: 'vendido'},      // Lote 44
  {id: 45, etapa: 3, superficie: 476.02,precio: 3094130, estado: 'apartado'},     // Lote 45
  {id: 46, etapa: 3, superficie: 292.97,precio: 1904305, estado: 'disponible'},   // Lote 46
  {id: 47, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 47
  {id: 48, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 48
  {id: 49, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'apartado'},     // Lote 49
  {id: 50, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 50
  {id: 51, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 51
  {id: 52, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 52
  {id: 53, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 53
  {id: 54, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'apartado'},     // Lote 54
  {id: 55, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'disponible'},   // Lote 55
  {id: 56, etapa: 3, superficie: 292.74,precio: 1902810, estado: 'vendido'},      // Lote 56
  {id: 57, etapa: 3, superficie: 327.11,precio: 2453325, estado: 'disponible'},   // Lote 57
  {id: 58, etapa: 3, superficie: 339.32,precio: 2884220, estado: 'apartado'},     // Lote 58
  {id: 59, etapa: 3, superficie: 350.98,precio: 3509800, estado: 'vendido'}       // Lote 59
];

// Ajuste solicitado: todos los lotes deben estar en estado "disponible"
// y el "precio base" mostrado en el modal será el precio total de lista (campo `precio`).
lotsData.forEach(lot => {
  lot.estado = 'disponible';
});

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