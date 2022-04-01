(function() {
  var dot = document.getElementById('dot');
  var number = document.getElementById('number');
  var title = document.getElementById('title');
  var answers = document.getElementById('answers');
  var answerEls = document.querySelectorAll('.answer');
  var questions = [
    {
      flip: true,
      title: 'La violencia es el producto exclusivo de la ausencia de una cultura de paz en Colombia',
      type: 'exclusion',
    },
    {
      flip: false,
      title: 'Las violaciones de derechos humanos que cometió la fuerza pública fue el precio necesario para defender la democracia',
      type: 'responsabilidad'
    },
    {
      flip: true,
      title: 'Colombia siempre ha sido una democracia satisfactoria, incluso en los años del Frente Nacional, momento en el que nacieron múltiples movimientos guerrilleros',
      type: 'exclusion'
    },
    {
      flip: false,
      title: 'La pobreza y la desigualdad han generado violencia en Colombia',
      type: 'exclusion'
    },
    {
      flip: false,
      title: 'Las fuerzas armadas no violaron derechos humanos',
      type: 'responsabilidad'
    },
    {
      flip: false,
      title: 'Las FARC y las fuerzas armadas no pueden equipararse porque mientras las FARC fueron un grupo terrorista, las fuerzas armadas defienden la constitución y a la ciudadanía',
      type: 'responsabilidad'
    },
    {
      flip: true,
      title: 'Las FARC, el ELN, y otros movimientos guerrilleros no son los únicos actores con responsabilidad en la violación de derechos humanos',
      type: 'responsabilidad'
    },
    {
      flip: false,
      title: 'La exclusión política en Colombia ha cobrado y sigue cobrando vidas, como lo deja ver el asesinato de líderes sociales',
      type: 'exclusion'
    },
    {
      flip: false,
      title: 'La intolerancia y la ausencia de valores democráticos presente en la sociedad colombiana no son la única forma de explicar la violencia en Colombia',
      type: 'exclusion'
    },
    {
      flip: false,
      title: 'La población civil apoyando guerrilleros tiene que ser entendida como parte de los grupos guerrilleros que deben ser combatidos por las fuerzas armadas',
      type: 'responsabilidad'
    },
    {
      flip: false,
      title: 'El desigual de acceso al uso y la propiedad de la tierra ha generado violencia en Colombia',
      type: 'exclusion'
    },
    {
      flip: false,
      title: 'Instituciones como el ejército no violan derechos humanos. Solo las manzanas podridas lo hacen. ',
      type: 'responsabilidad'
    },
    {
      flip: true,
      title: 'Si la fe y la espiritualidad fuera más fuerte en las colombianas y colombianos, la violencia no habría tenido lugar',
      type: 'exclusion'
    },
      
  ];
  var questionNum = 1;

  function setup() {
    window.addEventListener('hashchange', onHash);
    answerEls.forEach(function(answerEl) {
      answerEl.addEventListener('click', onClick);
    });
    onHash();
  }

  function load(num) {
    console.log('questions.load', num);
    var question = questions[num - 1];
    number.innerText = `Afirmación ${num}`;
    title.innerText = question.title;
    questionNum = num;
  }

  function onClick(e) {
    var num = Number(e.target.getAttribute('data-num'));
    console.log('questions.answer', questionNum, '=', num);
    questions[questionNum - 1].answer = num;
    e.target.blur();
    updateChart();
    if (questionNum < questions.length) {
      answers.style.display = 'flex';
      window.location.hash = questionNum + 1;
    } else {
      answers.style.display = 'none';
      number.innerText = `Complete!`;
      title.innerText = 'All questions answered';
    }
  }

  function onHash() {
    var num = Number(window.location.hash.slice(1));
    if (num) {
      load(num);
    } else {
      reset();
      updateChart();
      load(1);
    }
  }

  function reset() {
    answers.style.display = 'flex';
    questions.forEach(function(question) {
      delete question.answer;
    });
    console.log(questions);
  }

  function updateChart() {
    var results = {
      exclusion: {
        matches: 0,
        score: 0
      },
      responsabilidad: {
        matches: 0,
        score: 0
      }
    };
    questions.forEach(function(question) {
      if (question.answer) {
        if (question.flip) {
          results[question.type].score = results[question.type].score - question.answer;
        } else {
          results[question.type].score = results[question.type].score + question.answer;
        }
        results[question.type].matches += 1;
      }
    });
    var exclusion = results['exclusion'].score / (results['exclusion'].matches || 1);
    var responsabilidad = results['responsabilidad'].score / (results['responsabilidad'].matches || 1);
    console.log('questions', questions);
    console.log('results', results);
    console.log('exclusion', exclusion);
    console.log('responsabilidad', responsabilidad);
    dot.style.left = ((exclusion + 1) / 2) * 100 + '%';
    dot.style.top = ((responsabilidad + 1) / 2) * 100 + '%';
  }

  setup();
}());