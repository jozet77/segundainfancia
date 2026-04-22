const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const monthMap = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const parseSpanishDate = (dateText) => {
  const parts = dateText.trim().toLowerCase().split(/\s+/);

  if (parts.length !== 3) return null;

  const day = Number.parseInt(parts[0], 10);
  const month = monthMap[parts[1]];
  const year = Number.parseInt(parts[2], 10);

  if (Number.isNaN(day) || month === undefined || Number.isNaN(year)) return null;

  return new Date(year, month, day);
};

const timeline = document.getElementById('timeline');

if (timeline) {
  const items = Array.from(timeline.querySelectorAll('.timeline-item'));

  items
    .sort((a, b) => {
      const dateA = parseSpanishDate(a.querySelector('.date')?.textContent || '');
      const dateB = parseSpanishDate(b.querySelector('.date')?.textContent || '');

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB - dateA;
    })
    .forEach((item) => timeline.appendChild(item));
}


const liveStreamIframe = document.getElementById('live-stream-embed');

const setLiveStreamFromExtEnv = async () => {
  if (!liveStreamIframe) return;

  try {
    const response = await fetch('./ext_env', { cache: 'no-store' });
    if (!response.ok) return;

    const streamUrl = (await response.text()).trim();
    if (!streamUrl) return;

    const parsedUrl = new URL(streamUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return;

    liveStreamIframe.src = parsedUrl.href;
  } catch (_error) {
    // Keep the default iframe source when ext_env is not available.
  }
};

setLiveStreamFromExtEnv();
