const API_URL = 'http://127.0.0.1:3000/'

Vue.component('good-card', {
  template: `<div class="good-card" @click="onClick">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  },
  methods: {
    onClick() {
      fetch(API_URL + "addToCart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({ product_name: this.title, price: this.price })
      })
      this.$emit('add', this.good);
      //this.$root.loadCart();
    }
  }
})


Vue.component('goods-list', {
  template: `<div class="goods-list">
    <good-card 
      v-for="good of list" 
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
    ></good-card>
  </div>`,
  props: {
    list: Array
  }
})

Vue.component('search', {
  template: `<div class="search">
    <input type="text" v-model="searchString" class="goods-search" />
    <button class="search-button" type="button" v-on:click="onClick">Искать</button>
  </div>`,
  data() {
    return {
      searchString: ''
    }
  },
  methods: {
    onClick() {
      console.log('work')
      this.$emit('search', this.searchString)
    }
  }
})

//  две добавки
Vue.component('cart-item', {
  template: `<div class="good-card">
    <h2>{{ good.product_name }}</h2>
    <p>$ {{ good.price }}</p>
    <button v-on:click="onRemove">Х</button>
  </div>`,

  props: {
    good: Object
  },
  methods: {
    onRemove() {
      fetch(API_URL + "removeFromCart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({ product_name: this.title, price: this.price })
      })
      this.$emit('remove', this.good);
    }
  }
})

Vue.component('cart', {
  template: `<div class="modal">
    <span class="close" v-on:click="onClose">x</span>

    <div class="goods-list">
      <cart-item  v-for="good of cart" v-bind:value="good.id_product" v-bind:good="good" v-on:remove="onRemove" ></cart-item>
    </div>
  </div>`,

  data() {
    return {
      isVisibleCart: 'false'

    }
  },

  props: {
    cart: Array
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onRemove(good) {
      this.$emit('remove', good)
    }
  }
})

new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    //searchLine: '',
    //  две добавки
    cart: [],
    isVisibleCart: false
  },
  methods: {
    loadGoods() {
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    //  добавки
    loadCart() {
      fetch(`${API_URL}cart`)
        .then((request) => request.json())
        .then((data) => {
          //this.cart = data.contents;
          this.cart = data;
        })
    },
    onToggleCart() {
      this.isVisibleCart = !this.isVisibleCart
    },
    addToCart(good) {
      fetch(`${API_URL}addToCart`)
        .then(() => {
          this.cart.push(good)
        })
        .then(() => {
          this.loadCart()
        })
    },
    removeFromCart(good) {
      fetch(`${API_URL}removeFromCart`)
        .then(() => {
          const index = this.cart.findIndex((item) => item.id_product === good.id_product)
          this.cart.splice(index, 1)
        })
    },
    //  конец добавок

    onSearch(searchString) {
      console.log(searchString)
      const regex = new RegExp(searchString, 'i');
      this.filteredGoods = this.goods.filter((good) => regex.test(good.product_name))
    },
    // beforeUpdate() {
    //   this.loadCart();
    // },
  },
  mounted() {
    this.loadGoods();
    //  добавка
    this.loadCart();

  }
})