//  Определяем массив слайдов с нумерацией в имени файлов
//  Длина массива по количеству размещаемых товаров

var items = document.getElementsByClassName('item');
var itemsCount = items.length;
console.log(itemsCount);
console.log(items);

var arrItem = [];
var arrCatalog = [];

for (i = 0; i < itemsCount; i++) {
    //  определяем массив свойств отдельного товара
    var itemImg = document.getElementById('item_' + (i + 1)).src;
    arrItem.push(itemImg);

    var itemHead = document.getElementById('head_' + (i + 1)).innerText;
    arrItem.push(itemHead);

    var itemPrice = document.getElementById('price_' + (i + 1)).value;
    arrItem.push(itemPrice);

    //  console.log(arrItem); //    визуальная проверка массива очередного товара

    arrCatalog.push(arrItem);   //  записываем товар в каталог
    arrItem = [];      // очистка товара для следующей итерации
}

console.log(arrCatalog);    // просмотр каталога
var totCatalog = arrCatalog.length;
console.log('Всего товаров в каталоге: ' + totCatalog);

// Добавляем товар в козину
var clickNumber = [];
var arrCartItem = [];
var arrCartCatalog = [];

function addToCart(e) {
    //console.log('Нажали кнопку!');
    console.log('В корзину товар № ' + e);

    var toProduct = arrCatalog[(e - 1)][1];
    arrCartItem.push(toProduct);
    console.log('Название товара № ' + e + ': ' + toProduct);
    var toPrice = arrCatalog[(e - 1)][2];
    arrCartItem.push(toPrice);
    console.log('Цена товара № ' + e + ': ' + toPrice);
    //  сюда счётчик товара с проверкой, сейчас линейно
    var i = 1;
    clickNumber.push(i);

    //var toQuantity = clickNumber.length;
    var toQuantity = i;
    arrCartItem.push(toQuantity);
    console.log('Количество товара № ' + e + ': ' + toQuantity);
    //  Вычисляем стоимость товара
    var toAmount = toPrice * toQuantity;
    console.log('Стоимость товара № ' + e + ' всего: ' + toAmount);

    //  Добавляем в корзину
    var ap = document.getElementById('cart-top');

    var app = document.createElement('div');
    app.className = 'cart-item';
    app.innerHTML = '';
    ap.appendChild(app);
    //  добавляем Product - название товара
    var appProduct = document.createElement('div');
    appProduct.className = 'item-product';
    app.appendChild(appProduct);
    appProduct.innerHTML = '';
    var a = document.createElement('input');
    a.className = 'item-product-input';
    a.value = toProduct;
    appProduct.appendChild(a);
    a.innerHTML;
    console.log('Product: ' + a.value);

    //  добавляем Quantity - количество товара
    var appQuantity = document.createElement('div');
    appQuantity.className = 'item-quantity';
    app.appendChild(appQuantity);
    appQuantity.innerHTML = '';
    var b = document.createElement('input');
    b.className = 'item-quantity-input';
    b.value = toQuantity;
    appQuantity.appendChild(b);
    b.innerHTML;
    console.log('Quantity: ' + b.value);

    //  добавляем Amount - стоимость товара
    var appAmount = document.createElement('div');
    appAmount.className = 'item-amount';
    app.appendChild(appAmount);
    appAmount.innerHTML = '';
    var c = document.createElement('input');
    c.className = 'item-amount-input';
    c.value = toAmount;
    appAmount.appendChild(c);
    c.innerHTML;
    //arrCartItem.push(c);
    console.log('Amount: ' + c.value);

    //  добавляем Currency - валюту
    var appCurr = document.createElement('p');
    appCurr.className = 'currency';
    appAmount.appendChild(appCurr);
    appCurr.innerHTML = '&#8381;';
    console.log('Currency: ' + appCurr.textContent);

    arrCartCatalog.push(arrCartItem);
    var totCart = arrCartCatalog.length;
    console.log('Всего товаров в корзине: ' + totCart);

    q = document.getElementById('total-quantity');
    q.value = totCart;

    totSumm = 0;
    for (k = 0; k < totCart; k++) {
        totSumm = totSumm + Number(arrCartCatalog[k][1]);
    }
    console.log(totSumm);   //  просмотр общей суммы в корзине

    s = document.getElementById('total-amount');
    s.value = totSumm;

    arrCartItem = [];

}

console.log(arrCartCatalog);    // просмотр корзины
//var totCart = arrCartCatalog.length;
//console.log('Всего товаров в корзине: ' + arrCartCatalog.length);

/*console.log(arrCartCatalog);   //  просмотр массива корзины
var tot = arrCartCatalog.length;
console.log(tot);
var totalQuantity = arrCartCatalog.length;
console.log('Всего товаров в корзине: ' + totalQuantity);*/
