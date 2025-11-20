// reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));
})();

// menu toggle (mobile)
document.getElementById('menu-btn').addEventListener('click', () => {
  const menu = document.querySelector('.menu');
  if(!menu) return;
  menu.classList.toggle('ativo');
  menu.style.display = menu.classList.contains('ativo') ? 'flex' : 'none';
});

// CTA pulse stop when contact is visible
(function(){
  const cta = document.querySelector('.cta-pulse');
  const contato = document.getElementById('contato');
  if(!cta || !contato) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting) cta.classList.remove('cta-pulse');
    });
  }, {rootMargin:'-20% 0% -50% 0%'});
  obs.observe(contato);
})();

// simple whatsapp opener (edit number)
document.getElementById('abrir-wh').addEventListener('click', () => {
  const phone = '5599999999999'; // coloque seu número
  const text = 'Olá! Tenho interesse em um currículo profissional.';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});

// fake form submit with microinteractions
document.getElementById('form-contato').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const btn = document.querySelector('.form-actions .btn.primary');
  if(btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
  await new Promise(r => setTimeout(r, 1100));
  alert('Mensagem enviada — obrigado! Em breve retornaremos.');
  if(btn){ btn.disabled = false; btn.textContent = 'Enviar Mensagem'; }
  document.getElementById('form-contato').reset();
});
