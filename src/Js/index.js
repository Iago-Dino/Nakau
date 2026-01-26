document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="item"]');
    const maxSelection = 6;  // até 6 itens por pedido (casal)
    const btnWpp = document.getElementById('btn-whatsapp');
    const form = document.getElementById('breakfast-form');
    const pousadaWhats = '+5581998757627'; // número da pousada (DDD + telefone)
  
    // Limita a 6 seleções
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="item"]:checked');
        if (checked.length > maxSelection) {
          cb.checked = false;
          alert(`Você só pode escolher até ${maxSelection} itens.`);
        }
      });
    });
  
    // Gera e abre o link do WhatsApp
    btnWpp.addEventListener('click', () => {
      const hora = form.hora.value;
      const checked = Array.from(document.querySelectorAll('input[name="item"]:checked'))
                           .map(el => el.value);
  
      if (!hora) {
        alert('Por favor, selecione um horário entre 07:15 e 09:00.');
        return;
      }
      if (checked.length === 0) {
        alert('Escolha ao menos 1 item.');
        return;
      }
  
      // Monta a mensagem
      let msg = `🛎️ *Pedido de Café*%0A`;
      msg += `⏰ Horário: ${hora}%0A`;
      msg += `☕ Itens (%20items):%0A`;
      checked.forEach((item, i) => {
        msg += `${i+1}. ${item}%0A`;
      });
      msg += `%0A*Pousada Vila Nakau*`;
  
      // Abre WhatsApp
      const url = `https://wa.me/${pousadaWhats.replace(/\D/g, '')}?text=${msg}`;
      window.open(url, '_blank');
    });
  });
  