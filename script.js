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
const liveStreamPlaceholder = document.getElementById('live-stream-placeholder');
const loadLiveStreamButton = document.getElementById('load-live-stream');

const getLiveStreamFromExtEnv = async () => {
  if (!liveStreamIframe) return;

  try {
    const response = await fetch('./ext_env', { cache: 'no-store' });
    if (!response.ok) return;

    const streamUrl = (await response.text()).trim();
    if (!streamUrl) return;

    const parsedUrl = new URL(streamUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return;

    liveStreamIframe.dataset.streamSrc = parsedUrl.href;
  } catch (_error) {
    // Keep the default iframe source when ext_env is not available.
  }
};

const loadLiveStream = () => {
  if (!liveStreamIframe) return;

  const streamSrc = liveStreamIframe.dataset.streamSrc || liveStreamIframe.dataset.defaultSrc;
  if (!streamSrc) return;

  liveStreamIframe.src = streamSrc;
  liveStreamIframe.hidden = false;
  liveStreamPlaceholder?.setAttribute('hidden', '');
};

loadLiveStreamButton?.addEventListener('click', loadLiveStream);
getLiveStreamFromExtEnv();

const worldCupMatches = [
  [1,'2026-06-11','13:00','Grupo A','Mexico','South Africa','Estadio Azteca, Mexico City'],
  [2,'2026-06-11','20:00','Grupo A','South Korea','Czech Republic','Estadio Akron, Guadalajara'],
  [3,'2026-06-12','15:00','Grupo B','Canada','Bosnia and Herzegovina','BMO Field, Toronto'],
  [4,'2026-06-12','18:00','Grupo D','United States','Paraguay','SoFi Stadium, Los Angeles'],
  [5,'2026-06-13','21:00','Grupo C','Haiti','Scotland','Gillette Stadium, Boston'],
  [6,'2026-06-13','21:00','Grupo D','Australia','Turkey','BC Place, Vancouver'],
  [7,'2026-06-13','18:00','Grupo C','Brazil','Morocco','MetLife Stadium, New York / New Jersey'],
  [8,'2026-06-13','12:00','Grupo B','Qatar','Switzerland',"Levi's Stadium, San Francisco Bay Area"],
  [9,'2026-06-14','19:00','Grupo E','Ivory Coast','Ecuador','Lincoln Financial Field, Philadelphia'],
  [10,'2026-06-14','12:00','Grupo E','Germany','Curaçao','NRG Stadium, Houston'],
  [11,'2026-06-14','15:00','Grupo F','Netherlands','Japan',"AT&T Stadium, Dallas"],
  [12,'2026-06-14','20:00','Grupo F','Sweden','Tunisia','Estadio BBVA, Monterrey'],
  [13,'2026-06-15','18:00','Grupo H','Saudi Arabia','Uruguay','Hard Rock Stadium, Miami'],
  [14,'2026-06-15','12:00','Grupo H','Spain','Cape Verde','Mercedes-Benz Stadium, Atlanta'],
  [15,'2026-06-15','18:00','Grupo G','Iran','New Zealand','SoFi Stadium, Los Angeles'],
  [16,'2026-06-15','12:00','Grupo G','Belgium','Egypt','Lumen Field, Seattle'],
  [17,'2026-06-16','15:00','Grupo I','France','Senegal','MetLife Stadium, New York / New Jersey'],
  [18,'2026-06-16','18:00','Grupo I','Iraq','Norway','Gillette Stadium, Boston'],
  [19,'2026-06-16','20:00','Grupo J','Argentina','Algeria','Arrowhead Stadium, Kansas City'],
  [20,'2026-06-16','21:00','Grupo J','Austria','Jordan',"Levi's Stadium, San Francisco Bay Area"],
  [21,'2026-06-17','19:00','Grupo L','Ghana','Panama','BMO Field, Toronto'],
  [22,'2026-06-17','15:00','Grupo L','England','Croatia',"AT&T Stadium, Dallas"],
  [23,'2026-06-17','12:00','Grupo K','Portugal','DR Congo','NRG Stadium, Houston'],
  [24,'2026-06-17','20:00','Grupo K','Uzbekistan','Colombia','Estadio Azteca, Mexico City'],
  [25,'2026-06-18','12:00','Grupo A','Czech Republic','South Africa','Mercedes-Benz Stadium, Atlanta'],
  [26,'2026-06-18','12:00','Grupo B','Switzerland','Bosnia and Herzegovina','SoFi Stadium, Los Angeles'],
  [27,'2026-06-18','15:00','Grupo B','Canada','Qatar','BC Place, Vancouver'],
  [28,'2026-06-18','19:00','Grupo A','Mexico','South Korea','Estadio Akron, Guadalajara'],
  [29,'2026-06-19','21:00','Grupo C','Brazil','Haiti','Lincoln Financial Field, Philadelphia'],
  [30,'2026-06-19','18:00','Grupo C','Scotland','Morocco','Gillette Stadium, Boston'],
  [31,'2026-06-19','20:00','Grupo D','Turkey','Paraguay',"Levi's Stadium, San Francisco Bay Area"],
  [32,'2026-06-19','12:00','Grupo D','United States','Australia','Lumen Field, Seattle'],
  [33,'2026-06-20','16:00','Grupo E','Germany','Ivory Coast','BMO Field, Toronto'],
  [34,'2026-06-20','19:00','Grupo E','Ecuador','Curaçao','Arrowhead Stadium, Kansas City'],
  [35,'2026-06-20','12:00','Grupo F','Netherlands','Sweden','NRG Stadium, Houston'],
  [36,'2026-06-20','22:00','Grupo F','Tunisia','Japan','Estadio BBVA, Monterrey'],
  [37,'2026-06-21','18:00','Grupo H','Uruguay','Cape Verde','Hard Rock Stadium, Miami'],
  [38,'2026-06-21','12:00','Grupo H','Spain','Saudi Arabia','Mercedes-Benz Stadium, Atlanta'],
  [39,'2026-06-21','12:00','Grupo G','Belgium','Iran','SoFi Stadium, Los Angeles'],
  [40,'2026-06-21','18:00','Grupo G','New Zealand','Egypt','BC Place, Vancouver'],
  [41,'2026-06-22','20:00','Grupo I','Norway','Senegal','MetLife Stadium, New York / New Jersey'],
  [42,'2026-06-22','17:00','Grupo I','France','Iraq','Lincoln Financial Field, Philadelphia'],
  [43,'2026-06-22','12:00','Grupo J','Argentina','Austria',"AT&T Stadium, Dallas"],
  [44,'2026-06-22','20:00','Grupo J','Jordan','Algeria',"Levi's Stadium, San Francisco Bay Area"],
  [45,'2026-06-23','16:00','Grupo L','England','Ghana','Gillette Stadium, Boston'],
  [46,'2026-06-23','19:00','Grupo L','Panama','Croatia','BMO Field, Toronto'],
  [47,'2026-06-23','12:00','Grupo K','Portugal','Uzbekistan','NRG Stadium, Houston'],
  [48,'2026-06-23','20:00','Grupo K','Colombia','DR Congo','Estadio Akron, Guadalajara'],
  [49,'2026-06-24','18:00','Grupo C','Scotland','Brazil','Hard Rock Stadium, Miami'],
  [50,'2026-06-24','18:00','Grupo C','Morocco','Haiti','Mercedes-Benz Stadium, Atlanta'],
  [51,'2026-06-24','12:00','Grupo B','Switzerland','Canada','BC Place, Vancouver'],
  [52,'2026-06-24','12:00','Grupo B','Bosnia and Herzegovina','Qatar','Lumen Field, Seattle'],
  [53,'2026-06-24','19:00','Grupo A','Czech Republic','Mexico','Estadio Azteca, Mexico City'],
  [54,'2026-06-24','19:00','Grupo A','South Africa','South Korea','Estadio BBVA, Monterrey'],
  [55,'2026-06-25','16:00','Grupo E','Curaçao','Ivory Coast','Lincoln Financial Field, Philadelphia'],
  [56,'2026-06-25','16:00','Grupo E','Ecuador','Germany','MetLife Stadium, New York / New Jersey'],
  [57,'2026-06-25','18:00','Grupo F','Japan','Sweden',"AT&T Stadium, Dallas"],
  [58,'2026-06-25','18:00','Grupo F','Tunisia','Netherlands','Arrowhead Stadium, Kansas City'],
  [59,'2026-06-25','19:00','Grupo D','Turkey','United States','SoFi Stadium, Los Angeles'],
  [60,'2026-06-25','19:00','Grupo D','Paraguay','Australia',"Levi's Stadium, San Francisco Bay Area"],
  [61,'2026-06-26','15:00','Grupo I','Norway','France','Gillette Stadium, Boston'],
  [62,'2026-06-26','15:00','Grupo I','Senegal','Iraq','BMO Field, Toronto'],
  [63,'2026-06-26','20:00','Grupo G','Egypt','Iran','Lumen Field, Seattle'],
  [64,'2026-06-26','20:00','Grupo G','New Zealand','Belgium','BC Place, Vancouver'],
  [65,'2026-06-26','19:00','Grupo H','Cape Verde','Saudi Arabia','NRG Stadium, Houston'],
  [66,'2026-06-26','18:00','Grupo H','Uruguay','Spain','Estadio Akron, Guadalajara'],
  [67,'2026-06-27','17:00','Grupo L','Panama','England','MetLife Stadium, New York / New Jersey'],
  [68,'2026-06-27','17:00','Grupo L','Croatia','Ghana','Lincoln Financial Field, Philadelphia'],
  [69,'2026-06-27','21:00','Grupo J','Algeria','Austria','Arrowhead Stadium, Kansas City'],
  [70,'2026-06-27','21:00','Grupo J','Jordan','Argentina',"AT&T Stadium, Dallas"],
  [71,'2026-06-27','19:30','Grupo K','Colombia','Portugal','Hard Rock Stadium, Miami'],
  [72,'2026-06-27','19:30','Grupo K','DR Congo','Uzbekistan','Mercedes-Benz Stadium, Atlanta'],
  [73,'2026-06-28','12:00','Dieciseisavos','2.º Grupo A','2.º Grupo B','SoFi Stadium, Los Angeles'],
  [74,'2026-06-29','16:30','Dieciseisavos','1.º Grupo E','3.º Grupo A/B/C/D/F','Gillette Stadium, Boston'],
  [75,'2026-06-29','19:00','Dieciseisavos','1.º Grupo F','2.º Grupo C','Estadio BBVA, Monterrey'],
  [76,'2026-06-29','12:00','Dieciseisavos','1.º Grupo C','2.º Grupo F','NRG Stadium, Houston'],
  [77,'2026-06-30','17:00','Dieciseisavos','1.º Grupo I','3.º Grupo C/D/F/G/H','MetLife Stadium, New York / New Jersey'],
  [78,'2026-06-30','12:00','Dieciseisavos','2.º Grupo E','2.º Grupo I',"AT&T Stadium, Dallas"],
  [79,'2026-06-30','19:00','Dieciseisavos','1.º Grupo A','3.º Grupo C/E/F/H/I','Estadio Azteca, Mexico City'],
  [80,'2026-07-01','12:00','Dieciseisavos','1.º Grupo L','3.º Grupo E/H/I/J/K','Mercedes-Benz Stadium, Atlanta'],
  [81,'2026-07-01','17:00','Dieciseisavos','1.º Grupo D','3.º Grupo B/E/F/I/J',"Levi's Stadium, San Francisco Bay Area"],
  [82,'2026-07-01','13:00','Dieciseisavos','1.º Grupo G','3.º Grupo A/E/H/I/J','Lumen Field, Seattle'],
  [83,'2026-07-02','19:00','Dieciseisavos','2.º Grupo K','2.º Grupo L','BMO Field, Toronto'],
  [84,'2026-07-02','12:00','Dieciseisavos','1.º Grupo H','2.º Grupo J','SoFi Stadium, Los Angeles'],
  [85,'2026-07-02','20:00','Dieciseisavos','1.º Grupo B','3.º Grupo E/F/G/I/J','BC Place, Vancouver'],
  [86,'2026-07-03','18:00','Dieciseisavos','1.º Grupo J','2.º Grupo H','Hard Rock Stadium, Miami'],
  [87,'2026-07-03','20:30','Dieciseisavos','1.º Grupo K','3.º Grupo D/E/I/J/L','Arrowhead Stadium, Kansas City'],
  [88,'2026-07-03','13:00','Dieciseisavos','2.º Grupo D','2.º Grupo G',"AT&T Stadium, Dallas"],
  [89,'2026-07-04','17:00','Octavos','Ganador Partido 74','Ganador Partido 77','Lincoln Financial Field, Philadelphia'],
  [90,'2026-07-04','12:00','Octavos','Ganador Partido 73','Ganador Partido 75','NRG Stadium, Houston'],
  [91,'2026-07-05','16:00','Octavos','Ganador Partido 76','Ganador Partido 78','MetLife Stadium, New York / New Jersey'],
  [92,'2026-07-05','18:00','Octavos','Ganador Partido 79','Ganador Partido 80','Estadio Azteca, Mexico City'],
  [93,'2026-07-06','14:00','Octavos','Ganador Partido 83','Ganador Partido 84',"AT&T Stadium, Dallas"],
  [94,'2026-07-06','17:00','Octavos','Ganador Partido 81','Ganador Partido 82','Lumen Field, Seattle'],
  [95,'2026-07-07','12:00','Octavos','Ganador Partido 86','Ganador Partido 88','Mercedes-Benz Stadium, Atlanta'],
  [96,'2026-07-07','13:00','Octavos','Ganador Partido 85','Ganador Partido 87','BC Place, Vancouver'],
  [97,'2026-07-09','16:00','Cuartos','Ganador Partido 89','Ganador Partido 90','Gillette Stadium, Boston'],
  [98,'2026-07-10','12:00','Cuartos','Ganador Partido 93','Ganador Partido 94','SoFi Stadium, Los Angeles'],
  [99,'2026-07-11','17:00','Cuartos','Ganador Partido 91','Ganador Partido 92','Hard Rock Stadium, Miami'],
  [100,'2026-07-11','20:00','Cuartos','Ganador Partido 95','Ganador Partido 96','Arrowhead Stadium, Kansas City'],
  [101,'2026-07-14','14:00','Semifinal','Ganador Partido 97','Ganador Partido 98',"AT&T Stadium, Dallas"],
  [102,'2026-07-15','15:00','Semifinal','Ganador Partido 99','Ganador Partido 100','Mercedes-Benz Stadium, Atlanta'],
  [103,'2026-07-18','17:00','Tercer lugar','Perdedor Partido 101','Perdedor Partido 102','Hard Rock Stadium, Miami'],
  [104,'2026-07-19','15:00','Final','Ganador Partido 101','Ganador Partido 102','MetLife Stadium, New York / New Jersey'],
].map(([number, date, time, stage, home, away, venue]) => ({ number, date, time, stage, home, away, venue }));

const teamNamesEs = {
  Algeria: 'Argelia',
  Argentina: 'Argentina',
  Australia: 'Australia',
  Austria: 'Austria',
  Belgium: 'Bélgica',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  Brazil: 'Brasil',
  Canada: 'Canadá',
  'Cape Verde': 'Cabo Verde',
  Colombia: 'Colombia',
  Croatia: 'Croacia',
  'Czech Republic': 'República Checa',
  'DR Congo': 'RD Congo',
  Ecuador: 'Ecuador',
  Egypt: 'Egipto',
  England: 'Inglaterra',
  France: 'Francia',
  Germany: 'Alemania',
  Ghana: 'Ghana',
  Haiti: 'Haití',
  Iran: 'Irán',
  Iraq: 'Irak',
  'Ivory Coast': 'Costa de Marfil',
  Japan: 'Japón',
  Jordan: 'Jordania',
  Mexico: 'México',
  Morocco: 'Marruecos',
  Netherlands: 'Países Bajos',
  'New Zealand': 'Nueva Zelanda',
  Norway: 'Noruega',
  Panama: 'Panamá',
  Paraguay: 'Paraguay',
  Portugal: 'Portugal',
  Qatar: 'Qatar',
  'Saudi Arabia': 'Arabia Saudita',
  Scotland: 'Escocia',
  Senegal: 'Senegal',
  'South Africa': 'Sudáfrica',
  'South Korea': 'Corea del Sur',
  Spain: 'España',
  Sweden: 'Suecia',
  Switzerland: 'Suiza',
  Tunisia: 'Túnez',
  Turkey: 'Turquía',
  'United States': 'Estados Unidos',
  Uruguay: 'Uruguay',
  Uzbekistan: 'Uzbekistán',
};

const displayTeam = (team) => teamNamesEs[team] || team;

const featuredTeams = ['Ecuador', 'Argentina', 'Spain', 'Brazil'];

const formatMatchDate = (date) =>
  new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric', month: 'short' }).format(
    new Date(`${date}T12:00:00`)
  );

const populateSelect = (select, values, labelFormatter = (value) => value) => {
  if (!select) return;
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = labelFormatter(value);
    select.appendChild(option);
  });
};

const calendar = document.getElementById('world-cup-calendar');
const dayFilter = document.getElementById('day-filter');
const stageFilter = document.getElementById('stage-filter');
const teamFilter = document.getElementById('team-filter');
const matchCount = document.getElementById('match-count');
const featuredMatchesBody = document.getElementById('featured-matches-body');

if (calendar && dayFilter && stageFilter && teamFilter) {
  const days = [...new Set(worldCupMatches.map((match) => match.date))];
  const stages = [...new Set(worldCupMatches.map((match) => match.stage))];
  const teams = [...new Set(worldCupMatches.flatMap((match) => [match.home, match.away]))].sort((a, b) =>
    a.localeCompare(b)
  );

  populateSelect(dayFilter, days, formatMatchDate);
  populateSelect(stageFilter, stages);
  populateSelect(teamFilter, teams, displayTeam);

  const renderCalendar = () => {
    const selectedDay = dayFilter.value;
    const selectedStage = stageFilter.value;
    const selectedTeam = teamFilter.value;

    const filteredMatches = worldCupMatches.filter((match) => {
      const dayMatches = selectedDay === 'all' || match.date === selectedDay;
      const stageMatches = selectedStage === 'all' || match.stage === selectedStage;
      const teamMatches = selectedTeam === 'all' || match.home === selectedTeam || match.away === selectedTeam;

      return dayMatches && stageMatches && teamMatches;
    });

    matchCount.textContent = `${filteredMatches.length} partido${filteredMatches.length === 1 ? '' : 's'}`;
    calendar.innerHTML = filteredMatches
      .map(
        (match) => `
          <article class="match-card">
            <div class="match-meta">
              <div class="match-number">Partido ${match.number}</div>
              <div>${formatMatchDate(match.date)} · ${match.time}</div>
            </div>
            <div>
              <div class="match-title">${displayTeam(match.home)} vs ${displayTeam(match.away)}</div>
              <span class="match-stage">${match.stage}</span>
            </div>
            <div class="match-venue">${match.venue}</div>
          </article>
        `
      )
      .join('');
  };

  [dayFilter, stageFilter, teamFilter].forEach((filter) => filter.addEventListener('change', renderCalendar));
  renderCalendar();
}

if (featuredMatchesBody) {
  featuredMatchesBody.innerHTML = worldCupMatches
    .filter((match) => featuredTeams.includes(match.home) || featuredTeams.includes(match.away))
    .map((match) => {
      const team = featuredTeams.find((featuredTeam) => match.home === featuredTeam || match.away === featuredTeam);

      return `
        <tr>
          <td>${displayTeam(team)}</td>
          <td>${formatMatchDate(match.date)} · ${match.time}</td>
          <td>${displayTeam(match.home)} vs ${displayTeam(match.away)}</td>
          <td>${match.stage}</td>
          <td>${match.venue}</td>
        </tr>
      `;
    })
    .join('');
}
