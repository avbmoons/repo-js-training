var imgInd = 0;
var slide = document.createElement('img');
slide.className = 'slide';
slide.setAttribute('id', 'item');
console.log(slide.id);
slide.src = 'img/item-1.jpg';
document.querySelector('.images').appendChild(slide);

//  Определяем массив слайдов с нумерацией в имени файлов
var imgNum = [];
var imgSlides = [];
for (var i = 1; i < 7; i++) {
    imgNum.push(i);
}

for (var j = 0; j < 6; j++) {
    imgSlides.push('item-' + imgNum[j] + '.jpg');
}

console.log('imgNum: ' + imgNum);
console.log('imgSlides: ' + imgSlides);

// событие для кнопки Вперед
function toRight(id) {
    var slide = document.getElementById(id);
    if (imgInd == imgSlides.length - 1) {
        imgInd = 0;
    } else {
        imgInd++;
    }
    slide.src = 'img/' + imgSlides[imgInd];
}

// событие для кнопки Назад
function toLeft(id) {
    var slide = document.getElementById(id);
    if (imgInd == 0) {
        imgInd = imgSlides.length - 1;
    } else {
        imgInd--;
    }
    slide.src = 'img/' + imgSlides[imgInd];
}
