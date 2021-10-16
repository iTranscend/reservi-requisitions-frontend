import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let cart = window.localStorage.getItem("cart");
let currentCategory = window.localStorage.getItem("currentCategory");
let orderBeingModified = window.localStorage.getItem("orderBeingModified");
let currentOrderForModification = window.localStorage.getItem(
  "currentOrderForModification"
);

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    currentCategory: currentCategory
      ? JSON.parse(currentCategory)
      : "Categories",
    currentOrderForModification: currentOrderForModification
      ? JSON.parse(currentOrderForModification)
      : null,
    orderBeingModified: orderBeingModified
      ? JSON.parse(orderBeingModified)
      : false,
  },
  getters: {
    // totalPrice: (state) => {
    //   let total = 0;
    //   state.cart.filter((item) => {
    //     total += item.productPrice * item.productQuantity;
    //   });
    //   return total;
    // },
    cart: (state) => state.cart,
    numberOfItems: (state) => {
      let quantity = state.cart.length;
      return quantity;
    },
    currentCategory: (state) => state.currentCategory,
    currentOrderForModification: (state) => state.currentOrderForModification,
    orderBeingModified: (state) => state.orderBeingModified,
  },
  mutations: {
    addToCart(state, item) {
      console.log("Store Item", item);
      let found = state.cart.find(
        (product) =>
          product.variationId == item.variationId &&
          product.offeringCode == item.offeringCode
      );
      if (found) {
        found.Quantity += item.Quantity;
      } else {
        state.cart.push(item);
      }
      this.commit("saveData");
    },

    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
      window.localStorage.setItem(
        "currentCategory",
        JSON.stringify(state.currentCategory)
      );
      window.localStorage.setItem(
        "orderBeingModified",
        JSON.stringify(state.orderBeingModified)
      );
      window.localStorage.setItem(
        "currentOrderForModification",
        JSON.stringify(state.currentOrderForModification)
      );
    },

    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      this.commit("saveData");
    },

    emptyCart(state) {
      state.cart = [];
      this.commit("saveData");
    },
    updateCart() {},
    setCurrentCategory(state, category) {
      state.currentCategory = category;
      this.commit("saveData");
    },
    setCurrentOrderForModification(state, orderNumber) {
      state.currentOrderForModification = orderNumber;
      this.commit("saveData");
    },
    replaceCartWithModificationOrder(state, orders) {
      state.cart = orders;
      this.commit("saveData");
    },
    toggleOrderBeingModified(state, modified) {
      state.orderBeingModified = modified;
      this.commit("saveData");
    },
  },
  actions: {
    addItem(context, id) {
      context.commit("ADD_Item", id);
    },

    removeItem(context, index) {
      context.commit("REMOVE_Item", index);
    },
  },
});
