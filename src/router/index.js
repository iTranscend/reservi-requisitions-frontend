import Vue from "vue";
import VueRouter from "vue-router";
import Offerings from "../views/Offerings.vue";
import Products from "../views/Products.vue";
import Services from "../views/Services.vue";
// import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Orders from "../views/Orders.vue";
import Reservations from "../views/Reservations.vue";
import Complaints from "../views/Complaints.vue";
import ProductOffer from "../views/ProductOffer.vue";
import ServiceOffer from "../views/ServiceOffer.vue";
import Search from "../views/Search.vue";
import OrderConfirmation from "../views/OrderConfirmation.vue";
import AccountConfirmation from "../views/AccountConfirmation.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    next();
    return;
  }
  next({ name: "Offerings" });
};

const ifAuthenticated = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    next();
    return;
  }
  next({ name: "Login" });
};
const routes = [
  {
    path: "/",
    name: "Offerings",
    component: Offerings,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/productOffer/:productCode",
    name: "ProductOffer",
    component: ProductOffer,
    props: true,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/serviceOffer/:serviceCode",
    name: "ServiceOffer",
    component: ServiceOffer,
    props: true,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/reservations",
    name: "Reservations",
    component: Reservations,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/complaints",
    name: "Complaints",
    component: Complaints,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/confirmOrder",
    name: "ConfirmOrder",
    component: OrderConfirmation,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/confirmAccount",
    name: "AccountConfirmation",
    component: AccountConfirmation,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
