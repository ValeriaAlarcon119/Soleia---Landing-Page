// script.js
// Por ahora vacío, solo para futuras interacciones visuales si se requieren. 

// Simulación de 59 lotes con datos de ejemplo
const lotes = Array.from({ length: 59 }, (_, i) => {
  const estados = ['disponible', 'apartado', 'vendido'];
  return {
    id: i + 1,
    nombre: `Lote ${i + 1}`,
    estado: estados[Math.floor(Math.random() * estados.length)],
    etapa: Math.ceil((i + 1) / 10),
    superficie: `${Math.floor(Math.random() * 200) + 200} m²`,
    precio: `$${(Math.floor(Math.random() * 500) + 500) * 1000}`
  };
});

const grid = document.getElementById('cotizador-grid');
const loteInfo = document.getElementById('lote-info');
const loteSeleccionadoInput = document.getElementById('lote-seleccionado');

function renderLotes() {
  grid.innerHTML = '';
  lotes.forEach((lote, idx) => {
    const div = document.createElement('div');
    div.className = `lote ${lote.estado}`;
    div.title = lote.nombre;
    div.tabIndex = 0;
    div.setAttribute('data-idx', idx);

    // Tooltip personalizado
    const tooltip = document.createElement('div');
    tooltip.className = 'lote-tooltip';
    tooltip.innerHTML = `
      <strong>${lote.nombre}</strong><br>
      Estado: <b>${lote.estado.toUpperCase()}</b><br>
      Etapa: ${lote.etapa}<br>
      Superficie: ${lote.superficie}<br>
      Precio: ${lote.precio}<br>
      <span style='font-size:0.9em;color:#888;'>Click para más información</span>
    `;
    div.appendChild(tooltip);

    div.addEventListener('mouseenter', () => {
      tooltip.style.opacity = 1;
    });
    div.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
    div.addEventListener('click', () => {
      document.querySelectorAll('.lote.selected').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
      mostrarInfoLote(lote);
    });
    grid.appendChild(div);
  });
}

function mostrarInfoLote(lote) {
  loteInfo.innerHTML = `
    <h3>${lote.nombre}</h3>
    <p><b>Estado:</b> ${lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}</p>
    <p><b>Etapa:</b> ${lote.etapa}</p>
    <p><b>Superficie:</b> ${lote.superficie}</p>
    <p><b>Precio:</b> ${lote.precio}</p>
  `;
  loteSeleccionadoInput.value = lote.nombre;
}

renderLotes();

// -- Código para Preguntas Frecuentes --

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Alternar la clase 'active' en el ítem completo
            item.classList.toggle('active');

            // Opcional: Cerrar otras respuestas cuando se abre una nueva
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //     }
            // });
        });
    });
}); 