//  задаем адрес сервера с API
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

const searchInput = document.querySelector('.goods-search');
const searchBtn = document.querySelector('.search-button');

//var mailForm = document.querySelector('.mail-form-box');
// const form = document.querySelector('#fform')

// const name = document.querySelector('#nname')
// const phone = document.querySelector('#pphone')
// const email = document.querySelector('#eemail')

// const error = document.querySelector('#eerror')

const form = document.getElementById('form');
const name = document.getElementById('nname');
const phone = document.getElementById('pphone');
const email = document.getElementById('eemail');
const eerror = document.getElementById('eerror');

//  пишем функцию для класса XMLHttpRequest
function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 60000) {
    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };

    xhr.open(method, url, true);


    headers.forEach((header) => {
        xhr.setRequestHeader(header.key, header.value);
    });

    xhr.timeout = timeout;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400) {
                onError(xhr.statusText);
            } else {
                onSuccess(xhr.responseText)
            };
        };
    };

    xhr.send(data);
};

//  Создаем класс для карточки товара и отображаем карточку товара на странице
class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    };

    render() {
        return `<div data-id="${this.id}" class="goods-item">
        <h3 class="h3-item">${this.title}</h3>
        <p class="p-item">${this.price}</p>
        </div>`;
    };
};

//  Создаем класс для каталога товаров с методом получения списка товаров и методом отображения списка товаров на странице
class GoodsList {
    constructor(cart) {
        this.goods = [];
        this.filtred = [];
        this._cart = cart;
        this._el = document.querySelector('.goods-list');
        this._el.addEventListener('click', this._onClick.bind(this));

        this._btn = document.querySelector('.search-button');
        this._btn.addEventListener('click', this._onFiltredList.bind(this));
    };

    filter(searchString) {
        searchString = searchString.trim()
        if (searchString.length === 0) {
            this.filtred = this.goods;
            this.render();
            return
        }
        const reg = new RegExp(searchString, 'i');
        this.filtred = this.goods.filter((good) => reg.test(good.title));
        this.render();
    }

    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = request.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
                this.filtred = this.goods;
                this.render();
            })
            .catch((err) => {
                console.log(err.text);
            })
    };

    _onClick(e) {
        //const name = e.target.getAttribute('name');

        const id = e.target.getAttribute('data-id');
        console.log(id);
        if (id) {
            fetch(`${API_URL}addToBasket.json`)
                .then(() => {
                    this._cart.add(this.goods.find((good) => good.id == id))
                })
        }
    }

    _onFiltredList() {
        let listHtml = '';
        this.filtred.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        this._el.innerHTML = listHtml;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        // this.filtred.forEach(good => {
        //     const goodItem = new GoodsItem(good.title, good.price, good.id);
        //     listHtml += goodItem.render();
        // });
        this._el.innerHTML = listHtml;
        //document.querySelector('.goods-list').innerHTML = listHtml;
    };

};

//  Создаем класс для товара в корзине
class CartItem extends GoodsItem {
    constructor(id, title, price) {
        super(id, title, price)
    }
}

//  Создаем класс для корзины с методом получения от сервера списка товаров в корзине
class Cart {
    constructor() {
        this._list = [];
        this._btn = document.querySelector('.cart-button')
        this._el = document.querySelector('.cart')
        this._btn.addEventListener('click', this._onTogglCart.bind(this))
        this._el.addEventListener('click', this._onClick.bind(this))
    }

    add(good) {
        this._list.push(good);
        this.render();
    }

    _onClick(e) {
        const id = e.target.getAttribute('data-id');
        fetch(`${API_URL}deleteFromBasket.json`)
            .then(() => {
                const index = this._list.findIndex((good) => good.id == id)
                this._list.splice(index, 1)
                this.render()
            })
    }

    _onTogglCart() {
        this._el.classList.toggle('active')
    }

    render() {
        let listHtml = '';
        this._list.forEach(good => {
            const goodItem = new CartItem(good.title, good.price, good.id);
            console.log(goodItem);
            listHtml += goodItem.render();
        });
        this._el.innerHTML = listHtml;
    }

    load() {
        fetch(`${API_URL}getBasket.json`)
            .then((response) => {
                return response.json()
            })
            .then((goods) => {
                this._list = goods.contents.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
                this.render();
            })
    }

}

//  вызываем функции формирования и отображения кадалога товаров
const cart = new Cart();
const list = new GoodsList(cart);

searchInput.addEventListener('input', () => {
    list.filter(searchInput.value);
})

document.querySelector('.goods-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('goods-item')) {
        const id = e.target.getAttribute('data-id');
        console.log(id);
    }
})


//кнопка для отображения формы отправки сообщения

function onMailForm() {
    let mailForm = document.getElementById('mail-form');
    mailForm.style.display = 'block';
}


list.fetchGoods();
cart.load();
//list.render();

//  проверка и отправка формы связи

function sendError(input, text) {
    input.style.border = '1px solid red'
    eerror.textContent = text
}

function clear() {
    const inputs = form.querySelectorAll('input')

    inputs.forEach((input) => {
        input.style.border = 'inherit'
    })

}

function checkName() {
    const regexp = /^[a-zA-Zа-яА-Я]+$/
    if (!regexp.test(nname.value.trim())) {
        sendError(nname, 'Имя может содержать только буквы')
    }
}

function checkPhone() {
    console.log(2)
    const regexp = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/
    if (!regexp.test(pphone.value)) {
        sendError(pphone, 'Телефон должен иметь формат +7(000)000-0000')
    }
}

function checkEmail() {
    const regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
    console.log(eemail.value)
    if (!regexp.test(email.value.trim())) {
        sendError(eemail, 'Недействительный адрес эл-почты')
    }
}

function onSubmit(e) {
    clear();
    checkName() || e.preventDefault();
    checkPhone() || e.preventDefault();
    checkEmail() || e.preventDefault();

    this.disabled = false;

    // let submitBtn = document.getElementById('submit');
    // submitBtn.disabled = false;
};

form.addEventListener('submit', onSubmit);

//  очистка формы
function onReset(e) {
    form.clear = true;
    let errorText = document.getElementById('eerror');
    errorText.textContent = '';
    clear();
    let submitBtn = document.getElementById('submit');
    submitBtn.disabled = false;
    submitBtn.style.border = '1px solid grey';

};


