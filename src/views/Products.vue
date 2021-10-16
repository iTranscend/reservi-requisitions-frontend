<template>
  <div class="offerings">
    <!-- Page Content-->
    <!-- Default Modal-->
    <div class="modal fade" id="modalDefault" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Request for unavailable items</h4>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="card">
              <div class="card-body">
                <!-- <h4 class="margin-bottom-1x">Request for unavailable items</h4> -->
                <div class="form-group row">
                  <label class="col-3 col-form-label" for="req-item"
                    >Item</label
                  >
                  <input
                    class="col-9 form-control"
                    type="text"
                    name="requestItem"
                    id="req-item"
                    placeholder="Moon-shaped test tubes"
                    v-model="requestItem"
                  />
                </div>
                <div class="form-group row">
                  <label class="col-3 col-form-label" for="req-quantity"
                    >Quantity</label
                  >
                  <input
                    class="col-9 form-control"
                    type="number"
                    name="requestItemQuantity"
                    id="req-quantity"
                    placeholder="100"
                    v-model="requestItemQuantity"
                  />
                </div>
                <div class="form-group row">
                  <label class="col-3 col-form-label" for="req-description"
                    >Description</label
                  >
                  <textarea
                    class="col-9 form-control"
                    type="number"
                    name="requestItemQuantity"
                    id="req-description"
                    rows="5"
                    v-model="requestItemDescription"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-danger btn-sm"
              type="button"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="makeItemRequest"
              class="btn btn-primary btn-sm"
              type="button"
            >
              Make request
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Available products-->
    <section
      class="container padding-top-0 padding-bottom-1x mb-1"
      id="products"
    >
      <h2 class="h3 pb-3 text-center">{{ pageHeader }}</h2>
      <div class="row">
        <div class="col-lg-9 order-lg-2">
          <!-- Products Grid-->
          <!-- <div class="row">
            <div class="col-md-4 col-sm-6 col-lg-3">
              <div class="product-card mb-30">
                <div class="product-badge bg-danger">Sale</div>
                <a class="product-thumb" href="shop-single.html"
                  ><img src="img/shop/products/01.jpg" alt="Product"
                /></a>
                <div class="product-card-body">
                  <div class="product-category"><a href="#">Smart home</a></div>
                  <h3 class="product-title">
                    <a href="shop-single.html">Echo Dot (2nd Generation)</a>
                  </h3>
                  <h4 class="product-price"><del>$62.00</del>$49.99</h4>
                </div>
                <div class="product-button-group">
                  <a class="product-button btn-wishlist" href="#"
                    ><i class="icon-heart"></i><span>Wishlist</span></a
                  ><a class="product-button btn-compare" href="#"
                    ><i class="icon-repeat"></i><span>Compare</span></a
                  ><a
                    class="product-button"
                    href="#"
                    data-toast
                    data-toast-type="success"
                    data-toast-position="topRight"
                    data-toast-icon="icon-check-circle"
                    data-toast-title="Product"
                    data-toast-message="successfuly added to cart!"
                    ><i class="icon-shopping-cart"></i><span>To Cart</span></a
                  >
                </div>
              </div>
            </div>
          </div> -->
          <div class="row">
            <!-- <div v-if="!dataChanging && productsFetched"> -->
            <!-- <div v-if="products.length > 0"> -->
            <div
              v-for="(product, index) in products"
              :key="index"
              class="col-lg-3 col-md-4 col-sm-6"
            >
              <div class="product-card mb-30">
                <a class="product-thumb" href>
                  <img
                    style="width: 309; height:206px"
                    :src="product.images.split(',')[0]"
                    :alt="product.name"
                  />
                </a>
                <div class="product-card-body">
                  <h3 class="product-title">
                    <a href="#">{{ product.name }}</a>
                  </h3>
                  <!-- Dynamic price display -->
                  <!-- <h4
                        v-if="product.variations.length > 0"
                        class="product-price"
                      >
                        &#8358;{{ product.variations[0].price }}
                      </h4> -->
                  <!-- <h4 v-else class="product-price">&#8358;{{ product.price }}</h4> -->
                  <p>
                    {{ `${product.description.substring(0, 30)} ....` }}
                  </p>
                </div>
                <div class="product-button-group">
                  <a
                    class="product-button"
                    v-bind:href="'/productOffer/' + product.code"
                  >
                    <i class="icon-shopping-cart"></i>
                    <span>Book</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!-- <div v-else> -->
            <!-- <h4>No products found :-(</h4> -->
            <!-- </div> -->
            <!-- </div> -->
            <!-- <div v-else> -->
            <!-- <img src="img/loading.gif" /> -->
            <!-- </div> -->
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-lg-3 order-lg-1">
          <div class="sidebar-toggle position-left">
            <i class="icon-filter"></i>
          </div>
          <aside class="sidebar sidebar-offcanvas position-left">
            <span class="sidebar-close"><i class="icon-x"></i></span>
            <!-- Widget Categories-->
            <section class="widget widget-categories">
              <h3 class="widget-title">Shop Categories</h3>
              <ul>
                <li class="has-children expanded">
                  <a href="#">Products</a><span>({{ products.length }})</span>
                  <ul>
                    <li v-for="(category, index) in categories" :key="index">
                      <a @click="getProductsInCategory(category.code)">{{
                        category.name
                      }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </section>

    <button
      class="btn btn-outline-primary"
      type="button"
      data-toggle="modal"
      data-target="#modalDefault"
    >
      Request a product that isn't listed
    </button>
  </div>
</template>

<script>
import EventBus from "../eventBus";
import axios from "../axios";

export default {
  name: "Products",
  props: {},
  data() {
    return {
      categories: [],
      categories_fetched: false,
      products: [],
      productsFetched: false,
      requestItem: "",
      requestItemQuantity: "",
      requestItemDescription: "",
      user: JSON.parse(localStorage.getItem("user")),
      requestItemSuccessful: false,
      pageHeader: "Products",
      dataChanging: false,
    };
  },
  mounted() {
    this.getProducts();
    this.getCategories();
    EventBus.$on("SEARCHING", (searchResults) => {
      this.products = searchResults;
      // this.pageHeader = "Search Results";
    });
    EventBus.$on("DATA_CHANGING", (value) => {
      this.dataChanging = true;
      console.log("Changing........", value);
    });
  },
  methods: {
    getCategories() {
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/productcategory/${this.user.organisation.code}`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.categories = response.data.data.data;
          this.categories_fetched = true;
        })
        .then(() => {
          console.log(this.categories);
        });
    },
    getProducts() {
      this.$vs.loading({ type: "material" });
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/organisation/${this.user.organisation.code}/offering/PRODUCT/`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.products = response.data.data;
          this.productsFetched = true;
          this.$vs.loading.close();
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async getProductsInCategory(category) {
      try {
        this.$vs.loading({ type: "material" });
        let response = await this.axios.get(
          `${axios.axios.defaults.baseURL}/product?organisation=ACEGID&category=${category}&skip=0&take=10`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        );
        this.products = await response.data.data.data;
        this.$vs.loading.close();
      } catch (error) {
        console.log(error.response);
      }
    },
    makeItemRequest() {
      if (
        this.requestItem == "" ||
        this.requestItemQuantity == "" ||
        this.requestItemDescription == ""
      ) {
        console.log("Fields must not be empty....");
        // TODO : Respond with toast
        this.$notify({
          group: "foo",
          type: "error",
          title: "Fields must not be empty!",
          position: "top right",
        });
      } else {
        this.$vs.loading({ type: "material" });
        console.log("Sending request....");
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/order/requisition`,
            {
              Email: this.user.email,
              LastName: this.user.lastName,
              FirstName: this.user.firstName,
              Item: this.requestItem,
              Quantity: parseInt(this.requestItemQuantity, 10),
              Description: this.requestItemDescription,
              Organisation: this.user.organisation.code,
            },
            {
              headers: {
                Authorization: "Bearer " + this.user.token,
              },
            }
          )
          .then(async (response) => {
            console.log(response.data);
            if (response.data.succeded == true) {
              this.$vs.loading.close();
              console.log("Item request successful..");
              // TODO display success toast
              this.$notify({
                group: "foo",
                type: "success",
                title: "Successful!",
                text: "Item request Submitted",
                position: "top right",
              });
              this.requestItemSuccessful = true;
            } else {
              // TODO Display error message
              this.$notify({
                group: "foo",
                type: "error",
                title: "Something went wrong",
                text: "Please check your request and try again",
                position: "top right",
              });
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
};
</script>
