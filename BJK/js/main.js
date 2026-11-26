const vyhodnotitBtn = document.getElementById('vyhodnotit-btn');
const resetBtn = document.getElementById('reset-btn');
const vysledekBox = document.getElementById('quiz-vysledek');

if (vyhodnotitBtn) {
  const spravneOdpovedi = {
    q1: 'b',
    q2: 'a',
    q3: 'c',
    q4: 'b',
    q5: 'a',
    q6: 'b'
  };

  vyhodnotitBtn.addEventListener('click', () => {
    let skore = 0;
    const celkem = Object.keys(spravneOdpovedi).length;

    // Nejdřív smažu označení z předchozího pokusu
    document.querySelectorAll('.quiz-otazka label').forEach(label => {
      label.classList.remove('spravne', 'spatne');
    });

    for (let otazka in spravneOdpovedi) {
      const spravna = spravneOdpovedi[otazka];
      const vybrana = document.querySelector(`input[name="${otazka}"]:checked`);
      const spravnyInput = document.querySelector(`input[name="${otazka}"][value="${spravna}"]`);

      // Správnou odpověď označím zeleně
      spravnyInput.parentElement.classList.add('spravne');

      if (vybrana) {
        if (vybrana.value === spravna) {
          skore++;
        } else {
          vybrana.parentElement.classList.add('spatne');
        }
      }
    }

    let zprava = '';
    if (skore === celkem) {
      zprava = `Skvělé! ${skore} z ${celkem} bodů – jsi opravdový fanoušek Çarşı! 🦅`;
    } else if (skore >= 4) {
      zprava = `Dobrá práce! Získal jsi ${skore} z ${celkem} bodů.`;
    } else {
      zprava = `Získal jsi ${skore} z ${celkem} bodů. Projdi si znovu celou stránku  a zkus to ještě jednou!`;
    }

    vysledekBox.textContent = zprava;
    vysledekBox.style.display = 'block';
    vysledekBox.style.border = '2px solid #e30a17';
  });

  // Po kliknutí na tlačítko se kvíz vrátí do původního stavu
  resetBtn.addEventListener('click', () => {
    document.querySelectorAll('.quiz-otazka label').forEach(label => {
      label.classList.remove('spravne', 'spatne');
    });
    vysledekBox.style.display = 'none';
  });
}

const themeBtn = document.getElementById('theme-toggle');

// Při otevření stránky se načte uložený režim
if (localStorage.getItem('rezim') === 'tmavy') {
  document.body.classList.add('dark-mode');
  if (themeBtn) themeBtn.textContent = '☀️';
}

// Přepínání mezi světlým a tmavým režimem
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('rezim', 'tmavy');
      themeBtn.textContent = '☀️';
    } else {
      localStorage.setItem('rezim', 'svetly');
      themeBtn.textContent = '🌙';
    }
  });
}