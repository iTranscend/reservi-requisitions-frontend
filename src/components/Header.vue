<template>
  <div class="header">
    <!-- Header-->
    <!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page.-->
    <header class="site-header navbar-sticky">
      <!-- Topbar-->
      <div class="topbar d-flex justify-content-between">
        <!-- Logo-->
        <div class="site-branding d-flex">
          <a class="site-logo align-self-center" href="index.html">
            <img src="/img/logo/acegid_logo.png" alt="Reservi" />
          </a>
        </div>
        <!-- Search / Categories-->
        <div v-if="loggedIn" class="search-box-wrap d-flex">
          <div class="search-box-inner align-self-center">
            <div class="search-box d-flex">
              <div class="btn-group categories-btn">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="icon-menu text-lg"></i>&nbsp;{{ currentCategory }}
                </button>
                <div class="dropdown-menu mega-dropdown">
                  <div class="row justify-content-center">
                    <div class="col-sm-3">
                      <!-- <router-link
                        :to="{ name: 'Services' }"
                        @click="setSearchBarToEquipment"
                        class="d-block navi-link text-center mb-30"
                      >
                      </router-link> -->
                      <a
                        class="d-block navi-link text-center mb-30"
                        href="/services"
                        @click="setSearchBarCategory('Equipment')"
                      >
                        <img
                          class="d-block"
                          src="/img/shop/header-categories/01.jpg"
                        />
                        <span class="text-gray-dark">Equipment</span>
                      </a>
                    </div>
                    <div class="col-sm-3">
                      <!-- <router-link
                        :to="{ name: 'Products' }"
                        @click="setSearchBarToProducts"
                        class="d-block navi-link text-center mb-30"
                      >
                      </router-link> -->
                      <a
                        class="d-block navi-link text-center mb-30"
                        href="/products"
                        @click="setSearchBarCategory('Products')"
                      >
                        <img
                          class="d-block"
                          src="/img/shop/header-categories/02.jpg"
                        />
                        <span class="text-gray-dark">Products</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <form class="input-group" method="get">
                <span class="input-group-btn">
                  <button type="submit">
                    <i class="icon-search"></i>
                  </button>
                </span>
                <input
                  @input="search()"
                  v-model="searchParameter"
                  class="form-control"
                  type="search"
                  placeholder="Search for anything"
                  :disabled="searchIsDisabled"
                />
              </form>
            </div>
          </div>
        </div>
        <!-- Toolbar-->
        <div class="toolbar d-flex">
          <div v-if="loggedIn" class="toolbar-item">
            <a href="/cart">
              <div>
                <span class="cart-icon"
                  ><i class="icon-shopping-cart"></i
                  ><span class="count-label">{{ numberOfItems }} </span></span
                ><span class="text-label">Cart</span>
              </div></a
            >
            <div
              class="toolbar-dropdown cart-dropdown widget-cart hidden-on-mobile"
            >
              <!-- Entry-->
              <div class="entry">
                <div class="entry-thumb">
                  <a href="shop-single.html"
                    ><img src="img/shop/widget/04.jpg" alt="Product"
                  /></a>
                </div>
                <div class="entry-content">
                  <h4 class="entry-title">
                    <a href="shop-single.html"
                      >Canon EOS M50 Mirrorless Camera</a
                    >
                  </h4>
                  <span class="entry-meta">1 x &#8358;910.00</span>
                </div>
                <div class="entry-delete"><i class="icon-x"></i></div>
              </div>
              <!-- Entry-->
              <div class="text-right">
                <p class="text-gray-dark py-2 mb-0">
                  <span class="text-muted">Subtotal:</span>
                  &nbsp;&#8358;2,548.50
                </p>
              </div>
              <div class="d-flex">
                <div class="pr-2 w-50">
                  <!-- <a class="btn btn-secondary btn-sm btn-block mb-0" href="cart.html">Expand Cart</a> -->
                  <router-link
                    :to="{ name: 'Cart' }"
                    class="btn btn-secondary btn-sm btn-block mb-0"
                    >Expand Cart</router-link
                  >
                </div>
                <div class="pl-2 w-50">
                  <a
                    class="btn btn-primary btn-sm btn-block mb-0"
                    href="checkout.html"
                    >Checkout</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="loggedIn"
            class="toolbar-item visible-on-mobile mobile-menu-toggle"
          >
            <a href="#">
              <div>
                <i class="icon-menu"></i>
                <span class="text-label">Menu</span>
              </div>
            </a>
          </div>
          <div v-if="loggedIn" class="toolbar-item hidden-on-mobile">
            <a @click="logout">
              <div>
                <i class="icon-user"></i>
                <span class="text-label">Logout</span>
              </div>
            </a>
          </div>
          <!-- <div class="toolbar-item visible-on-mobile">
            <a @click="logout">
              <div>
                <i class="icon-logout"></i>
                <span class="text-label">Logout</span>
              </div>
            </a>
          </div>-->
        </div>
        <!-- Mobile Menu-->
        <div class="mobile-menu">
          <!-- Search Box-->
          <div class="mobile-search">
            <form class="input-group" method="get">
              <span class="input-group-btn">
                <button type="submit">
                  <i class="icon-search"></i>
                </button>
              </span>
              <input
                class="form-control"
                type="search"
                placeholder="Search site"
              />
            </form>
          </div>
          <!-- Toolbar-->
          <div class="toolbar">
            <div class="toolbar-item">
              <a @click="logout">
                <div>
                  <i class="icon-logout"></i>
                  <span class="text-label">Logout</span>
                </div>
              </a>
            </div>
          </div>
          <!-- Slideable (Mobile) Menu-->
          <nav v-if="loggedIn" class="slideable-menu">
            <ul class="menu" data-initial-height="385">
              <li
                @click="setAsActive('offerings')"
                :class="{ active: activeTab == 'offerings' }"
              >
                <span>
                  <router-link :to="{ name: 'Offerings' }"
                    >Offerings</router-link
                  >
                </span>
              </li>
              <li
                @click="setAsActive('products')"
                :class="{ active: activeTab == 'products' }"
              >
                <span>
                  <router-link :to="{ name: 'Products' }">Products</router-link>
                </span>
              </li>
              <li
                @click="setAsActive('services')"
                :class="{ active: activeTab == 'services' }"
              >
                <span>
                  <router-link :to="{ name: 'Services' }"
                    >Equipment</router-link
                  >
                </span>
              </li>
              <li
                @click="setAsActive('cart')"
                :class="{ active: activeTab == 'cart' }"
              >
                <span>
                  <router-link :to="{ name: 'Cart' }">Cart</router-link>
                </span>
              </li>
              <li
                @click="setAsActive('orders')"
                :class="{ active: activeTab == 'orders' }"
              >
                <span>
                  <router-link :to="{ name: 'Orders' }"
                    >Requisitions</router-link
                  >
                </span>
              </li>
              <li
                @click="setAsActive('reservations')"
                :class="{ active: activeTab == 'reservations' }"
              >
                <span>
                  <router-link :to="{ name: 'Reservations' }"
                    >Reservations</router-link
                  >
                </span>
              </li>
              <li
                @click="setAsActive('complaints')"
                :class="{ active: activeTab == 'complaints' }"
              >
                <span>
                  <router-link :to="{ name: 'Complaints' }"
                    >Complaints</router-link
                  >
                </span>
              </li>
              <!-- <li class>
                <span>
                  <a href="/search">Search</a>
                </span>
              </li>-->
            </ul>
          </nav>
        </div>
      </div>
      <!-- Navbar-->
      <div class="navbar">
        <!-- <div v-if="loggedIn" class="btn-group categories-btn">
          <button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
            <i class="icon-menu text-lg"></i>&nbsp;Categories
          </button>
          <div class="dropdown-menu mega-dropdown">
            <div class="row">
              <div class="col-sm-3">
                <a class="d-block navi-link text-center mb-30" href="shop-grid-ls.html">
                  <img class="d-block" src="/img/shop/header-categories/01.jpg" />
                  <span class="text-gray-dark">Services</span>
                </a>
              </div>
              <div class="col-sm-3">
                <a class="d-block navi-link text-center mb-30" href="shop-grid-ls.html">
                  <img class="d-block" src="/img/shop/header-categories/02.jpg" />
                  <span class="text-gray-dark">Products</span>
                </a>
              </div>
            </div>
          </div>
        </div>-->
        <!-- Main Navigation-->
        <nav v-if="loggedIn" class="site-menu">
          <ul>
            <li
              @click="setAsActive('offerings')"
              :class="{ active: activeTab == 'offerings' }"
            >
              <router-link :to="{ name: 'Offerings' }">Offerings</router-link>
            </li>
            <li
              @click="setAsActive('products')"
              :class="{ active: activeTab == 'products' }"
            >
              <router-link :to="{ name: 'Products' }">Products</router-link>
            </li>
            <li
              @click="setAsActive('services')"
              :class="{ active: activeTab == 'services' }"
            >
              <router-link :to="{ name: 'Services' }">Equipment</router-link>
            </li>
            <li
              @click="setAsActive('cart')"
              :class="{ active: activeTab == 'cart' }"
            >
              <router-link :to="{ name: 'Cart' }">Cart</router-link>
            </li>
            <li
              @click="setAsActive('orders')"
              :class="{ active: activeTab == 'orders' }"
            >
              <router-link :to="{ name: 'Orders' }">Requisitions</router-link>
            </li>
            <li
              @click="setAsActive('reservations')"
              :class="{ active: activeTab == 'reservations' }"
            >
              <router-link :to="{ name: 'Reservations' }"
                >Reservations</router-link
              >
            </li>
            <li
              @click="setAsActive('complaints')"
              :class="{ active: activeTab == 'complaints' }"
            >
              <router-link :to="{ name: 'Complaints' }">Complaints</router-link>
            </li>
          </ul>
        </nav>
        <div class="toolbar">
          <div class="toolbar-item">
            <a @click="logout">
              <div>
                <i class="icon-logout"></i>
                <span class="text-label">Logout</span>
              </div>
            </a>
          </div>
        </div>
        <!-- Toolbar ( Put toolbar here only if you enable sticky navbar )-->
      </div>
    </header>
  </div>
</template>

<script>
import EventBus from "../eventBus";
import axios from "../axios";

export default {
  name: "Header",
  data() {
    return {
      loggedIn: false,
      user: JSON.parse(localStorage.getItem("user")),
      searchParameter: "",
      searchResults: null,
      activeTab: null,
    };
  },
  mounted() {
    EventBus.$on("LOGGED_IN", () => {
      this.loggedIn = true;
    });
    EventBus.$on("LOGGED_OUT", () => {
      this.loggedIn = false;
    });
    this.isAuthenticated();
  },
  computed: {
    numberOfItems() {
      return this.$store.getters.numberOfItems;
    },
    currentCategory() {
      return this.$store.getters.currentCategory;
    },
    searchIsDisabled() {
      if (this.currentCategory == "Categories") return true;
      return false;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      EventBus.$emit("LOGGED_OUT");
      this.$router.push({ name: "Login" });
    },
    isAuthenticated() {
      // user = JSON.parse(localStorage.getItem("user"));
      if (JSON.parse(localStorage.getItem("user"))) {
        this.loggedIn = true;
      }
    },
    async search() {
      EventBus.$emit("DATA_CHANGING", "changing");
      try {
        let endpoint =
          this.$store.getters.currentCategory == "Products"
            ? "product"
            : "service";
        let response = await this.axios.get(
          `${axios.axios.defaults.baseURL}/${endpoint}?organisation=ACEGID&name=${this.searchParameter}&status=&skip=0&take=10`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        );
        this.searchResults = await response.data.data.data;
        EventBus.$emit("SEARCHING", this.searchResults);
        console.log(this.searchResults);
      } catch (error) {
        console.log(error.response);
      }
    },
    setSearchBarCategory(category) {
      this.$store.commit("setCurrentCategory", category);
    },
    setAsActive(tab) {
      this.activeTab = tab;
      console.log(this.activeTab);
    },
  },
};
</script>

<style></style>
