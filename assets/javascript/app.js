$(document).ready(() => {

    const question = document.querySelector('#question');
    const a = document.querySelector('#a');
    const b = document.querySelector('#b');
    const c = document.querySelector('#c');
    const d = document.querySelector('#d');

    let quiz = [{
        question: '1.) How much thrust is produced by each of the 5 Rocketdyne F-1 engines on the Saturn V rocket?',
        answers: ['10,000 lbf', '1,500,000 lbf', '50,000 lbf', '100,000 lbf'],
        correctAns: 'b',
        ansDescr: 'The F-1 engines that power the Saturn V each generate a whopping 1,500,000 lbf of thrust.'
    },
    {
        question: '2.) What is the escape velocity of the earth?',
        answers: ['2,500 mph', '5,000 mph', '10,000 mph', '25,000 mph'],
        correctAns: 'd',
        ansDescr: 'Escape velocity of Earth is approximately 25,000 mph.'
    },
    {
        question: '3.) How far can the Hubble Space Telescope see?',
        answers: ['10-15 billion light-years', '10-15 million light-years', '100,000 - 150,000 light-years', '10,000 - 15,000 light-years'],
        correctAns: 'a',
        ansDescr: 'Hubble can see approximately 10-15 billion light-years.'
    },
    {
        question: '4.) What is the fastest man-made object ever launched, relative to Earth?',
        answers: ['Saturn V', 'Galileo', 'Helios', 'New Horizons'],
        correctAns: 'c',
        ansDescr: 'Helios. Helios gained it\'s record velocity of 157,078 mph by using the sun\'s gravity.'
    },
    {
        question: '5.) How much matter is present in the deep vacuum of intergalactic space?',
        answers: ['zero', '2 - 5 atoms per cubic meter', '100 - 500 atoms per cubic meter', '10,000 - 50,000 atoms per cubic meter'],
        correctAns: 'b',
        ansDescr: 'Although deep space is often thought of as empty, it actually contains an average of 2 - 5 hydrogen atoms per cubic meter.'
    }
    ];

    let counter = 3000;
    let questionNum = 0;
    let timer = $('.timer');
    let thisLoop;
    let start = true;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let timeup = 0;

    timer.text(counter);

    $('.formBody').hide();
    $('#correct').hide();
    $('#incorrect').hide();
    $('#timeup').hide();

    $('button').on('click', () => {
        $('.description').hide();
        $('#start').hide();
        $('.formBody').show();
        if (start) {
            writeQandA();
            myLoop();
            start = false;
        }
    });

    $('.buttons').click(() => {
        counter = 3000;
        
        let e = event.target.id;

        if (e === quiz[questionNum].correctAns) {
            correctAnswers++;
            $('.formBody').hide();
            $('#correct').show();
            setTimeout(() => {
                $('#correct').hide();
                $('.formBody').show();
                counter = 3000;
            }, 5000);

        } else {
            incorrectAnswers++;
            $('.formBody').hide();
            $('#incorrect').prepend(`<h2 class="incorrect">Your answer was incorrect.</h2><h2>The correct answer was (${quiz[questionNum].correctAns}).</h2><h2>${quiz[questionNum].ansDescr}</h2>`);
            $('#incorrect').show();
            setTimeout(() => {
                $('#incorrect > h2').remove('h2');
                $('#incorrect').hide();
                $('.formBody').show();
                counter = 3000;
            }, 7000);
        }
        questionNum++;
        if (questionNum < quiz.length) {
            writeQandA();
        } else {
            clearInterval(thisLoop);
            $('.formBody').html(`<h2>Results:</h2><br><br><h3>You got ${correctAnswers} right.</h3><br><h3>You got ${incorrectAnswers} answers wrong.</h3><br><h3>Time expired on ${timeup} answers.</h3><br><h3>Your score is ${(correctAnswers / quiz.length) * 100}%.`);
        }
    });

    function myLoop() {
        thisLoop = setInterval(() => {
            counter--;
            timer.text(Math.round(counter / 100));

            if (counter === 0) {
                $('.formBody').hide();
                $('#timeup').show();
                setTimeout(() => {
                    $('#timeup').hide();
                    $('.formBody').show();
                    counter = 3000;
                }, 5000);
                questionNum++;
                timeup++;
                counter = 3000;
               
                if (questionNum === quiz.length) {
                    clearInterval(thisLoop);
                    $('.formBody').html(`<h2>Results:</h2><br><br><h3>You got ${correctAnswers} right.</h3><br><h3>You got ${incorrectAnswers} answers wrong.</h3><br><h3>Time expired on ${timeup} answers.</h3><br><h3>Your score is ${(correctAnswers / quiz.length) * 100}%.`);
                    
                } else {
                    writeQandA();
                }
            }
        }, 10);
    }

    function writeQandA() {
        question.textContent = quiz[questionNum].question;
        a.textContent = quiz[questionNum].answers[0];
        b.textContent = quiz[questionNum].answers[1];
        c.textContent = quiz[questionNum].answers[2];
        d.textContent = quiz[questionNum].answers[3];
    }
});