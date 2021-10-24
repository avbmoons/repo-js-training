const PART = {   //  части бургера
    BURGER: 'burger',
    STUFFING: 'stuffing',
    OPTION: 'option',
};

const BURGERS = {   //  бургеры
    SMALL: {
        type: PART.BURGER,
        name: 'small',
        price: 50,
        calorie: 20,
    },
    BIG: {
        type: PART.BURGER,
        name: 'big',
        price: 100,
        calorie: 40,
    },
};

const STUFFINGS = { //  начинка
    CHEESE: {
        type: PART.STUFFING,
        name: 'cheese',
        price: 10,
        calorie: 20,
    },
    SALAD: {
        type: PART.STUFFING,
        name: 'salad',
        price: 20,
        calorie: 5,
    },
    POTAPO: {
        type: PART.STUFFING,
        name: 'potato',
        price: 15,
        calorie: 10,
    },
};

const OPTIONS = {   //  опции-приправы
    SPICE: {
        type: PART.OPTION,
        name: 'spice',
        price: 15,
        calorie: 0,
    },
    SAUCE: {
        type: PART.OPTION,
        name: 'sauce',
        price: 20,
        calorie: 5,
    },
};

const order = [{}];
const prices = [];
const calories = [];

class Choise {
    constructor({ type, name, price, calorie }) {
        this._type = type;
        this._name = name;
        this._price = price;
        this._calorie = calorie;
    };
    getType() {
        return this._type;
    };
    getName() {
        return this._name;
    };
    getPrice() {
        return this._price;
    };
    getCalorie() {
        return this._calorie;
    };
};

//console.log(BURGERS);

//  функция подсчета итога

function getTotal(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }

    console.log('всего сумма' + sum);
    return sum;
}

//  функция подсчета количества позиций в заказе

function getQuantity(array) {
    return array.length;
}

//  функция выбора БУРГЕРА по кнопке "Выбрать"
function getBurger(burgerPart) {
    console.log('выбор бургера: ' + burgerPart);
    if (burgerPart == BURGERS.SMALL.name) {
        //const choiseBurger = new Choise(BURGERS.SMALL)
        var choiseBurger = new Choise(BURGERS.SMALL)
        console.log(choiseBurger);
        order.push(choiseBurger);
        prices.push(BURGERS.SMALL.price);
        calories.push(BURGERS.SMALL.calorie);

    } else {
        var choiseBurger = new Choise(BURGERS.BIG)
        console.log(BURGERS.BIG);
        order.push(choiseBurger);
        prices.push(BURGERS.BIG.price);
        calories.push(BURGERS.BIG.calorie);
    }
    //  добавляем выбранную позицию в корзину
    setCartInput('order-part', 'type', choiseBurger.getType(), 'type-box');
    setCartInput('order-part', 'name', choiseBurger.getName(), 'name-box');
    setCartInput('order-part', 'price', choiseBurger.getPrice(), 'price-box');
    setCartInput('order-part', 'calorie', choiseBurger.getCalorie(), 'calorie-box');

    var len = prices.length;
    console.log('всего позиций' + len);

    let priceTotal = getTotal(prices);   //  считаем цену всего
    let calorieTotal = getTotal(calories); //  считаем каллорий всего
    let quantityTotal = getQuantity(prices);    //  считаем позиций заказа всего
    setTotals(priceTotal, calorieTotal, quantityTotal);    //  выводим итоги на страницу

    //  открываем для выбора начинки
    document.getElementById('stuffing').style.display = 'block';
    //  открываем корзину
    document.getElementById('order').style.display = 'block';
};

//  функция выбора НАЧИНКИ по кнопке "Выбрать"
function getStuffing(burgerPart) {
    console.log('выбор начинки: ' + burgerPart);
    if (burgerPart == STUFFINGS.CHEESE.name) {
        var choiseStuffing = new Choise(STUFFINGS.CHEESE);
        console.log(choiseStuffing);
        order.push(choiseStuffing);
        prices.push(STUFFINGS.CHEESE.price);
        calories.push(STUFFINGS.CHEESE.calorie);
    } else if (burgerPart == STUFFINGS.SALAD.name) {
        var choiseStuffing = new Choise(STUFFINGS.SALAD);
        console.log(choiseStuffing);
        order.push(choiseStuffing);
        prices.push(STUFFINGS.SALAD.price);
        calories.push(STUFFINGS.SALAD.calorie);
    } else {
        var choiseStuffing = new Choise(STUFFINGS.POTAPO);
        console.log(choiseStuffing);
        order.push(choiseStuffing);
        prices.push(STUFFINGS.POTAPO.price);
        calories.push(STUFFINGS.POTAPO.calorie);
    }

    //  добавляем выбранную позицию в корзину
    setCartInput('order-part', 'type', choiseStuffing.getType(), 'type-box');
    setCartInput('order-part', 'name', choiseStuffing.getName(), 'name-box');
    setCartInput('order-part', 'price', choiseStuffing.getPrice(), 'price-box');
    setCartInput('order-part', 'calorie', choiseStuffing.getCalorie(), 'calorie-box');

    var len = prices.length;
    console.log('всего позиций' + len);

    let priceTotal = getTotal(prices);   //  считаем цену всего
    let calorieTotal = getTotal(calories); //  считаем каллорий всего
    let quantityTotal = getQuantity(prices);    //  считаем позиций заказа всего
    setTotals(priceTotal, calorieTotal, quantityTotal);    //  выводим итоги на страницу

    //  открываем для выбора приправы

    document.getElementById('options').style.display = 'block';
};

//  функция выбора ПРИПРАВЫ по кнопке "Выбрать"
function getOption(burgerPart) {
    console.log('выбор приправы: ' + burgerPart);
    if (burgerPart == OPTIONS.SPICE.name) {
        var choiseOption = new Choise(OPTIONS.SPICE)
        console.log(choiseOption);
        order.push(choiseOption);
        prices.push(OPTIONS.SPICE.price);
        calories.push(OPTIONS.SPICE.calorie);
    } else {
        var choiseOption = new Choise(OPTIONS.SAUCE)
        console.log(choiseOption);
        order.push(choiseOption);
        prices.push(OPTIONS.SAUCE.price);
        calories.push(OPTIONS.SAUCE.calorie);
    }

    //  добавляем выбранную позицию в корзину
    setCartInput('order-part', 'type', choiseOption.getType(), 'type-box');
    setCartInput('order-part', 'name', choiseOption.getName(), 'name-box');
    setCartInput('order-part', 'price', choiseOption.getPrice(), 'price-box');
    setCartInput('order-part', 'calorie', choiseOption.getCalorie(), 'calorie-box');

    var len = prices.length;
    console.log('всего позиций' + len);

    let priceTotal = getTotal(prices);   //  считаем цену всего
    let calorieTotal = getTotal(calories); //  считаем каллорий всего
    let quantityTotal = getQuantity(prices);    //  считаем позиций заказа всего
    setTotals(priceTotal, calorieTotal, quantityTotal);    //  выводим итоги на страницу

    //document.getElementById('options').style.display = 'block';
};

// console.log(order);
// console.log(prices);
// console.log(calories);


//  функция добавления инпутов позиций заказа в строку корзины
function setCartInput(inputClass, inputId, inputValue, parentDiv) {

    let appDiv = document.getElementById(parentDiv);
    let appInput = document.createElement('input');
    appInput.className = inputClass;
    appInput.id = inputId;
    appInput.value = inputValue;
    appDiv.appendChild(appInput);
    appInput.innerHTML;
    console.log('тест-type: ' + appInput.value);

};

//  функция вывода итогов

function setTotals(totalPrice, totalCalorie, totalQuantity) {
    var appTotPrice = document.getElementById('price-total');
    appTotPrice.value = totalPrice;
    var appTotCalorie = document.getElementById('calorie-total');
    appTotCalorie.value = totalCalorie;
    var appTotQuantity = document.getElementById('quantity-total');
    appTotQuantity.value = totalQuantity;
};



