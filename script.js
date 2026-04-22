const form = document.getElementById('eventForm');
const timeline = document.getElementById('timeline');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const date = document.getElementById('eventDate').value;
  const title = document.getElementById('eventTitle').value.trim() || 'Evento del club';
  const description = document.getElementById('eventDesc').value.trim();

  if (!date || !description) return;

  const item = document.createElement('article');
  item.className = 'timeline-item glass';
  item.innerHTML = `
    <span class="date">${date}</span>
    <h4>${title}</h4>
    <p>${description}</p>
  `;

  timeline.prepend(item);
  form.reset();
});
