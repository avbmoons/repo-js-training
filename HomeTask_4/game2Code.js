//  После игры необходимо сбросить номер вопроса.
//  По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа.
function step(ques, ans1, ans2, q) {
    do {    //  Выводим исходный вопрос
        ok = false;
        event1 = +prompt(ques + '\n' + ans1 + '\n' + ans2 + '\n' + '-1 - Выход из игры');
        let results = {
            question: ques,
            answer: funAnswer(ans1, ans2),
            count: ++j,
        };
        console.log(results);
        arrQuestion.push(results.question);
        arrAnswer.push(results.answer);
        arrCount.push(results.count);
        if (event1 == -1) {
            break;
        }
        else {
            ok = isAnswer(q, event1);
        }
    } while (!ok);

}

function funAnswer(x, y) {
    if (event1 == +1) {
        return x;
    } else {
        return y;
    }
};

// добавка для логирования
var results = new Object();
var arrQuestion = [];
var arrAnswer = [];
var arrCount = [];
var count = 0;
var j = 0;

var event1, ok;
step(works.a00, works.a1, works.a2, works.a0);

switch (event1) {
    case 1: //  Первое действие - если в первом окне ввели 1, то открываем серию окон - окно 2
        step(works.b00, works.b1, works.b2, works.b0);

        switch (event1) {
            case 1: //  Второе действие - если во втором окне ввели 1, то переходим на окно 4
                step(works.d00, works.d1, works.d2, works.d0);

                break;
            case 2: //  Второе действие - если во втором окне ввели 2, то также переходим на окно 4
                step(works.d00, works.d1, works.d2, works.d0);

                break;
            case -1:    //  Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: //  Первое действие - если в первом окне ввели 2, то открываем серию окон - окно 3
        step(works.c00, works.c1, works.c2, works.c0);

        switch (event1) {
            case 1: //  Второе действие
                step(works.d00, works.d1, works.d2, works.d0);

                break;
            case 2: //  Второе действие
                step(works.d00, works.d1, works.d2, works.d0);
                ;
                break;
            case -1:    //  Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1:    //  Первое действие
        break;
    default:
        alert('Ошибка');
}

let theEnd = confirm('Вы хотите просмотреть свой ход?');
if (theEnd == true) {
    let theEndStepShow = +prompt('Введите номер хода, который хотите просмотреть: ');
    if (theEndStepShow <= arrCount.length + 1) {
        for (var m = 0; m <= arrCount.length + 1; m++) {
            if (theEndStepShow == arrCount[m]) {
                alert('Вы проматриваете ход № ' + theEndStepShow + '\n' + 'вопрос: ' + arrQuestion[m] + '\n' + 'ответ: ' + arrAnswer[m]);
            }
        }
    }
}
alert('Спасибо за игру');
function isAnswer(q, event2) {
    if (isNaN(event2) || !isFinite(event2)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event2 < 1 || event2 > q) {
        alert('Ваше число выходит из допустимого диапазона');
        return false;
    }
    return true;
}