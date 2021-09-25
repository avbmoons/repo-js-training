function init() {
    var images = document.getElementsByTagName('img');    //  объект Nodelist
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = changeBigPicture;     //  событие для смены картинки 
    }
}
function imgError() {
    alert('Ошибка! "Большая" картинка не найдена.');
}

function changeBigPicture(eventObj) {   //  функция для обновления большой картинки
    var appDiv = document.getElementById('big');
    appDiv.innerHTML = '';
    var eventElement = eventObj.target;

    var imageNameParts = eventElement.id.split('_');
    var src = 'img/big/' + imageNameParts[1] + '.jpg';
    var imageDomElement = document.createElement('img');
    imageDomElement.src = src;
    imageDomElement.onerror = imgError;
    appDiv.appendChild(imageDomElement);
    console.log(eventObj);

}
window.onload = init;