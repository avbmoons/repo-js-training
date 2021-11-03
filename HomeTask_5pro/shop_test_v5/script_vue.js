//  задаем адрес сервера с API
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        cart: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        loadGoods() {
            fetch(`${API_URL}catalogData.json`)
                .then((request) => request.json())
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                })
        },
        loadCart() {
            fetch(`${API_URL}getBasket.json`)
                .then((request) => request.json())
                .then((data) => {
                    this.cart = data.contents;
                })
        },
        addToCart(good) {
            fetch(`${API_URL}addToBasket.json`)
                .then(() => {
                    this.cart.push(good)
                })
        },
        removeFromCart(good) {
            fetch(`${API_URL}deleteFromBasket.json`)
                .then(() => {
                    const index = this.cart.findIndex((item) => item.id_product !== good.id_product)
                    this.cart.splice(index + 1, 1)
                })
        },
        onSearch() {
            const reg = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter((good) => reg.test(good.product_name))
        },
        onToggleCart() {
            this.isVisibleCart = !this.isVisibleCart
        }
    },
    mounted() {
        this.loadGoods();
        this.loadCart();
    },
});

const form = document.getElementById('form');
const name = document.getElementById('nname');
const phone = document.getElementById('pphone');
const email = document.getElementById('eemail');
const eerror = document.getElementById('eerror');

//кнопка для отображения формы отправки сообщения

function onMailForm() {
    let mailForm = document.getElementById('mail-form');
    mailForm.style.display = 'block';
}

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


