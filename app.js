
const State = { current: 0, answers: {} };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion(idx) {
  const q = QUESTIONS[idx];
  const pct = Math.round(((idx + 1) / QUESTIONS.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = 'Question ' + (idx + 1) + ' of ' + QUESTIONS.length;
  document.getElementById('btn-back').style.display = idx > 0 ? 'inline-block' : 'none';
  document.getElementById('btn-next').disabled = !State.answers[q.id];

  let h = '<div class="question-step">'
    + '<div class="q-number">Question ' + q.number + '</div>'
    + '<div class="q-text">' + q.text + '</div>'
    + '<div class="q-hint">' + q.hint + '</div>';

  if (q.type === 'text') {
    const v = State.answers[q.id] || '';
    h += '<textarea class="q-input" rows="3" placeholder="' + q.placeholder + '" '
       + 'oninput="App.textInput(' + JSON.stringify(q.id) + ',this.value)">' + v + '</textarea>';
  } else {
    h += '<div class="choices">';
    q.choices.forEach(c => {
      const sel = State.answers[q.id] === c.value ? ' selected' : '';
      h += '<button class="choice' + sel + '" onclick="App.pick(' + JSON.stringify(q.id) + ',' + JSON.stringify(c.value) + ')">'
         + '<span class="choice-icon">' + c.icon + '</span>'
         + '<div><div class="choice-label">' + c.label + '</div>'
         + (c.desc ? '<div class="choice-desc">' + c.desc + '</div>' : '')
         + '</div></button>';
    });
    h += '</div>';
  }
  h += '</div>';
  document.getElementById('question-area').innerHTML = h;
}

function buildResult() {
  const a = State.answers;
  const name = a.name || 'there';
  const role = a.role || 'other';
  const excites = a.excites || 'building';
  const timeline = a.timeline || '12m';
  const fear = a.fear || 'notime';

  const pathArr = (PATHS[role] && PATHS[role][excites]) ? PATHS[role][excites] : ['cloud_engineer', 'cloud_support'];
  const pk = pathArr[0], sk = pathArr[1] || 'cloud_support';
  const primary = ROLES[pk] || ROLES.cloud_engineer;
  const secondary = ROLES[sk] || ROLES.cloud_support;

  const bmap = BRIDGES[role] || BRIDGES.other;
  const bridge = bmap[pk] || bmap.default;

  const spd = timeline === '6m' ? 'fast' : (timeline === 'someday' ? 'slow' : 'steady');
  const steps = PLANS[spd][pk] || PLANS[spd].default;
  const fearTxt = FEAR_RESPONSES[fear] || FEAR_RESPONSES.notime;
  const tlLabel = { '6m': 'fast-track', '12m': '12-month', '2y': '2-year', 'someday': 'flexible' }[timeline] || '';

  document.getElementById('result-header').innerHTML =
    '<p class="result-greeting">Your personalised cloud path</p>'
    + '<h1 class="result-name">' + name + ', meet your future.</h1>'
    + '<p class="result-tagline">Based on your background and what excites you, here is where you fit — and exactly how to get there.</p>';

  document.getElementById('result-bridge').innerHTML =
    '<div class="card-label">Your transferable skills</div><p class="card-text">' + bridge + '</p>';

  document.getElementById('result-roles').innerHTML =
    '<div class="roles-label">Your recommended cloud roles</div>'
    + '<div class="role-cards">' + roleCard(primary, true) + roleCard(secondary, false) + '</div>';

  let sh = '<ul class="plan-steps">';
  steps.forEach((s, i) => { sh += '<li class="plan-step"><span class="step-num">' + (i + 1) + '</span><p class="step-text">' + s + '</p></li>'; });
  sh += '</ul>';
  document.getElementById('result-plan').innerHTML = '<div class="card-label">Your ' + tlLabel + ' 90-day plan</div>' + sh;

  document.getElementById('result-fear').innerHTML =
    '<div class="card-label">About your biggest fear</div><p class="card-text">' + fearTxt + '</p>';
}

function roleCard(r, isPrimary) {
  return '<div class="role-card">'
    + '<span class="role-badge">' + (isPrimary ? 'Best match' : 'Strong fit') + '</span>'
    + '<div class="role-title">' + r.title + '</div>'
    + '<div class="role-desc">' + r.desc + '</div>'
    + '<div class="role-salary">&#128176; ' + r.salary + '</div>'
    + '</div>';
}

const App = {
  start() { showScreen('screen-questions'); renderQuestion(0); },
  pick(id, val) { State.answers[id] = val; renderQuestion(State.current); },
  textInput(id, val) {
    State.answers[id] = val.trim();
    document.getElementById('btn-next').disabled = !val.trim();
  },
  next() {
    const q = QUESTIONS[State.current];
    if (!State.answers[q.id]) return;
    if (State.current < QUESTIONS.length - 1) {
      State.current++;
      renderQuestion(State.current);
    } else {
      const fn = State.answers.name || '';
      document.getElementById('email-heading').textContent = 'One last step' + (fn ? ', ' + fn : '');
      showScreen('screen-email');
    }
  },
  back() { if (State.current > 0) { State.current--; renderQuestion(State.current); } },
  validateEmail() {
    const v = document.getElementById('email-input').value;
    document.getElementById('btn-reveal').disabled = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },
  reveal() {
    State.answers.email = document.getElementById('email-input').value;
    buildResult();
    showScreen('screen-result');
  },
  skipEmail() { buildResult(); showScreen('screen-result'); },
  share() {
    const n = State.answers.name || '';
    const t = encodeURIComponent(
      'I just found my cloud path with You Are The Journey.'
      + (n ? ' ' + n + ' is heading into cloud.' : '')
      + ' Find yours: https://youarethejourney.academy/cloud-path'
    );
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://youarethejourney.academy/cloud-path&summary=' + t, '_blank');
  },
  copy() {
    navigator.clipboard.writeText('https://youarethejourney.academy/cloud-path').then(() => {
      const b = document.getElementById('btn-copy');
      const o = b.textContent;
      b.textContent = 'Copied!';
      setTimeout(() => { b.textContent = o; }, 2000);
    });
  }
};
