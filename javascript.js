
document.getElementById('year').textContent = new Date().getFullYear();

const CONTACT_EMAIL = 'vlstoreon@gmail.com';
const WHATSAPP_NUMBERS = ['573137080269', '573146613993'];

function sendSolicitud(message, subject = 'Solicitud vL Store'){
  const text = encodeURIComponent(message);
  WHATSAPP_NUMBERS.forEach(number => {
    window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener');
  });
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${text}`;
}

/* ---------------- menú móvil ---------------- */
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
function closeMenu(){
  mainNav.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', false);
}
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' && event.key !== 'Esc') return;
  closeMenu();
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  closeMenu();
}));

/* ---------------- catálogo ---------------- */
const capIcon = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20c-16 0-29 11-31 26h62C79 31 66 20 50 20z" fill="#3a3a3a" stroke="#f3f3f1" stroke-width="1.2"/>
  <path d="M19 46h62c10 0 18 5 20 12-3 3-9 5-15 5H49c-14 0-27-3-36-9 1-4 3-6 6-8z" fill="#232323" stroke="#f3f3f1" stroke-width="1.2"/>
  <circle cx="50" cy="30" r="2.4" fill="#f3f3f1"/>
</svg>`;

const productos = [
  {n:'Gorra Silueta Negra',   p:'$65.000 COP', tag:null,       status:['disponible']},
  {n:'Gorra Contraste Blanca',p:'$65.000 COP', tag:null,       status:['disponible']},
  {n:'Gorra Bordado Cruz',    p:'$69.000 COP', tag:'Agotado',  status:['agotado']},
  {n:'Gorra Street Grey',     p:'$65.000 COP', tag:null,       status:['disponible']},
  {n:'Gorra Edición Muro',    p:'$72.000 COP', tag:'Nuevo',    status:['disponible','nuevo']},
  {n:'Gorra Classic vL',      p:'$65.000 COP', tag:null,       status:['disponible']},
];

const grid = document.getElementById('grid');
productos.forEach(prod=>{
  const card = document.createElement('div');
  card.className = 'card ' + prod.status.map(s=>'status-'+s).join(' ');
  card.dataset.status = prod.status.join(' ');
  const tagClass = prod.tag === 'Nuevo' ? 'tag-nuevo' : prod.tag === 'Agotado' ? 'tag-agotado' : '';
  const quickLabel = prod.status.includes('agotado') ? 'Avísame' : 'Consultar';
  const productMsg = `Hola, quiero saber más sobre la ${prod.n}.`;
  card.innerHTML = `
    <div class="card-media">
      ${prod.tag ? `<span class="tag ${tagClass}">${prod.tag}</span>` : ''}
      ${capIcon}
      <a class="quick-btn" href="#contacto" data-message="${productMsg}">${quickLabel}</a>
    </div>
    <div class="card-info">
      <h3>${prod.n}</h3>
      <div class="price">${prod.p}</div>
    </div>`;
  grid.appendChild(card);
});

document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    sendSolicitud(btn.dataset.message || 'Hola, quiero hacer una consulta en vL Store.', 'Consulta de producto vL Store');
  });
});

/* ---------------- filtros del catálogo ---------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', () => {
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card=>{
      const show = filter === 'all' || card.dataset.status.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

/* ---------------- solicitudes ---------------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(this);
  const name = formData.get('name');
  const contact = formData.get('contact');
  const message = formData.get('message');
  const fullMessage = [
    'Hola, quiero hacer una solicitud en vL Store.',
    `Nombre: ${name}`,
    `Contacto: ${contact}`,
    `Mensaje: ${message}`
  ].join('\n');
  sendSolicitud(fullMessage);
  this.reset();
});

document.getElementById('newsletterForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = new FormData(this).get('newsletterEmail');
  sendSolicitud(`Hola, quiero unirme al parche vL Store. Mi correo es: ${email}`, 'Newsletter vL Store');
  this.reset();
});

/* ---------------- franja / banner ---------------- */
const stripTrack = document.getElementById('stripTrack');
const words = ['VL STORE','GORRAS URBANAS','EDICIÓN LIMITADA','HECHO PARA LA CALLE'];
let stripHTML = '';
for(let i=0;i<3;i++){ words.forEach(w=> stripHTML += `<span>${w}</span>`); }
stripTrack.innerHTML = stripHTML;

/* ---------------- fondo: rayos eléctricos ---------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('storm');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function drawBolt(x1,y1,x2,y2,displace,alpha){
  if(displace < 6){
    ctx.strokeStyle = `rgba(230,230,230,${alpha})`;
    ctx.lineWidth = Math.random()*1.2+0.4;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    return;
  }
  const midX = (x1+x2)/2 + (Math.random()-0.5)*displace;
  const midY = (y1+y2)/2 + (Math.random()-0.5)*displace;
  drawBolt(x1,y1,midX,midY,displace/2,alpha);
  drawBolt(midX,midY,x2,y2,displace/2,alpha);

  if(Math.random() < 0.28){
    const bx = x1 + (x2-x1)*(0.3+Math.random()*0.4);
    const by = y1 + (y2-y1)*(0.3+Math.random()*0.4);
    drawBolt(bx,by, bx + (Math.random()-0.5)*displace*2, by + displace, displace/2, alpha*0.6);
  }
}

function flash(){
  const startX = Math.random()*W;
  const endX = startX + (Math.random()-0.5)*W*0.5;
  const glow = ctx.createRadialGradient(startX,0,0,startX,0,H*0.7);
  glow.addColorStop(0,'rgba(180,180,180,0.05)');
  glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0,0,W,H);

  ctx.save();
  ctx.shadowColor = 'rgba(255,255,255,0.9)';
  ctx.shadowBlur = 8;
  drawBolt(startX, 0, endX, H*0.85, 90, 0.9);
  ctx.restore();
}

function loop(){
  ctx.fillStyle = 'rgba(10,10,10,0.18)';
  ctx.fillRect(0,0,W,H);

  if(!prefersReducedMotion && Math.random() < 0.012){
    flash();
    if(Math.random() < 0.4){ setTimeout(flash, 90); }
  }
  requestAnimationFrame(loop);
}
loop();
