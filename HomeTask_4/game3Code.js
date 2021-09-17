//  После игры необходимо сбросить номер вопроса.
//  По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа.
function step(ques, ans1, ans2, ans3, q, bonus, corrAns) {
    do {    //  Выводим исходный вопрос
        ok = false;
        event1 = +prompt(ques + '\n' + ans1 + '\n' + ans2 + '\n' + ans3 + '\n' + '-1 - Выход из игры' + '\n' + 'За правильный ответ вы получите ' + bonus + ' баллов');
        let results = {
            question: ques,
            answer: funAnswer(ans1, ans2, ans3),
            bonus: Number(bonus),
            count: ++j,
        };
        console.log(results);
        arrQuestion.push(results.question);
        arrAnswer.push(results.answer);
        arrCount.push(results.count);
        //arrBonus.push(results.bonus);
        if (event1 == -1) {
            break;
        }
        else {
            ok = isAnswer(q, event1);
        }
    } while (!ok);

}

function funAnswer(x, y, z) {
    if (event1 == +1) {
        return x;
    }
    else if (event1 == +2) {
        return y;
    }
    else {
        return z;
    }
};

function checkAnswer(x, y, z) { // x - ответ, y - номер правильного ответа, z - бонусов за правильный ответ
    if (x == y) {
        alert('Поздравляем! Вы ответили правильно и заработали ' + '\n' + z + ' бонусов');
        arrTotal.push(Number(z));
    }
    else {
        alert('К сожалению вы ответили неправильно, бонусов - ноль.')
    }
}

// добавка для логирования
var results = new Object();
var arrQuestion = [];
var arrAnswer = [];
var arrCount = [];
//var arrBonus = [];
arrTotal = [];
var count = 0;
var j = 0;

var event1, ok;
step(works.a00, works.a1, works.a2, works.a3, works.a0, works.aa, works.aCorr);
checkAnswer(event1, works.aCorr, works.aa);

step(works.b00, works.b1, works.b2, works.b3, works.b0, works.bb, works.bCorr);
checkAnswer(event1, works.bCorr, works.bb);

step(works.c00, works.c1, works.c2, works.c3, works.c0, works.cc, works.cCorr);
checkAnswer(event1, works.cCorr, works.cc);

step(works.d00, works.d1, works.d2, works.d3, works.d0, works.dd, works.dCorr);
checkAnswer(event1, works.dCorr, works.dd);

console.log(arrTotal);

var total = 0;
for (let k = 0; k < arrTotal.length; k++) {
    total += arrTotal[k];
}

alert('Всего баллов за игру: ' + total);

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