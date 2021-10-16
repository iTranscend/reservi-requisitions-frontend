<template>
  <div class="productOffer">
    <button
      style="display:none;"
      class="btn btn-outline-primary"
      type="button"
      data-toggle="modal"
      data-target="#modalDefault"
      ref="addedToCartModal"
    >
      Default Modal
    </button>
    <!-- Add To Cart Modal-->
    <div class="modal fade" id="modalDefault" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Product Added to cart</h4>
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
            <p>
              Do you want to continue making requisitions, or proceed to your
              cart?
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary btn-sm"
              type="button"
              data-dismiss="modal"
            >
              Continue
            </button>
            <!-- <button class="btn btn-primary btn-sm" type="button">
              Proceed to Cart
            </button> -->
            <router-link
              data-dismiss="modal"
              :to="{ name: 'Cart' }"
              class="btn btn-primary btn-sm"
              style="color: white;"
              >Proceed to Cart</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container padding-bottom-3x">
      <div class="row" v-if="isProductReady">
        <div class="col-md-6">
          <Carousel :images="product.images.split(',')" />
        </div>
        <!-- Product Info-->
        <div class="col-md-6">
          <div class="padding-top-2x mt-2 hidden-md-up"></div>
          <h2 class="mb-3">{{ product.name }}</h2>
          <!-- Dynamic Price display -->
          <!-- <span class="h3 d-block" v-if="product.variations.length == 0">&#8358;{{ product.price }}</span>
          <span class="h3 d-block" v-else-if="product.variations.length > 0">&#8358;{{ price }}</span>-->
          <p class="text-muted">{{ product.description }}</p>
          <div class="row margin-top-1x justify-content-center">
            <div v-if="product.variations.length > 0" class="col-sm-6">
              <div class="form-group">
                <label for="size">Choose Variation</label>
                <select
                  class="form-control"
                  id="variation"
                  @change="changeVariation($event)"
                  v-model="selected"
                >
                  <option
                    selected
                    v-for="(variation, index) in product.variations"
                    :key="index"
                    id="product_price"
                    :value="variation.id"
                    >{{ variation.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group mb-0">
                <label for="quantity">
                  Quantity (Measured in:
                  {{ product.unitOfMeasure.unit }})
                </label>
                <input
                  type="number"
                  v-model="quantity"
                  name="quantity"
                  id="quantity"
                  class="form-control col-lg-12"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-end pb-4 ">
            <div class="col-sm-12">
              <div class="pt-4 hidden-sm-up"></div>
              <!-- <div class="form-group mb-0">
                <label class="form-label" for="textarea-input"
                  >Reason for request</label
                >
                <div class="col-12">
                  <textarea
                    class="form-control"
                    id="textarea-input"
                    rows="5"
                    v-model="reason"
                  ></textarea>
                </div>
              </div> -->
              <div class="row align-items-end pb-4 justify-content-center">
                <div class="col-sm-6">
                  <div class="pt-4 hidden-sm-up"></div>
                  <!-- <button
                    class="btn btn-primary btn-block m-0"
                    data-toast
                    data-toast-type="success"
                    data-toast-position="topRight"
                    data-toast-icon="icon-check-circle"
                    data-toast-title="Product"
                    data-toast-message="successfuly added to cart!"
                    @click="makeOrder"
                  >
                    <i class="icon-bag"></i>
                    Order Product
                  </button> -->
                  <AddToCartProduct
                    @addedToCart="triggerAddToCartModal"
                    :offeringCODE="product.code"
                    :offeringType="product.offeringType"
                    :variationID="productID"
                    :image="getImage(product.images)"
                    :quantity="quantity"
                    :name="product.name"
                    :variationName="variationName"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr class="mb-2" />
        </div>
      </div>
      <div v-else>
        <img src="/img/loading.gif" />
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartProduct from "../components/AddToCartProduct.vue";
import Carousel from "../components/Carousel.vue";
import axios from "../axios";

export default {
  name: "ProductOffer",
  props: {},
  components: {
    AddToCartProduct,
    Carousel,
  },
  data() {
    return {
      product: null,
      isProductReady: false,
      selected: null,
      price: null,
      productID: null,
      variationName: "",
      user: JSON.parse(localStorage.getItem("user")),
      quantity: null,
      orderSuccess: false,
      reason: null,
    };
  },
  computed: {},
  mounted() {
    this.getProduct();
  },
  methods: {
    makeOrder() {
      console.log({
        Email: this.user.email,
        FirstName: this.user.firstName,
        LastName: this.user.lastName,
        offeringCode: this.product.code,
        organisation: this.product.organisation,
        offeringType: this.product.offeringType,
        VariationId: this.productID,
        Quantity: parseInt(this.quantity, 10),
        Description: this.reason,
      });
      this.$vs.loading({ type: "material" });
      if (this.product.variations.length == 0) {
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/order`,
            {
              Email: this.user.email,
              FirstName: this.user.firstName,
              LastName: this.user.lastName,
              offeringCode: this.product.code,
              organisation: this.product.organisation,
              offeringType: this.product.offeringType,
              Quantity: parseInt(this.quantity, 10),
              Description: this.reason,
            },
            {
              headers: {
                Authorization: "Bearer " + this.user.token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log("Order submitted");
            this.orderSuccess = true;
            this.$vs.loading.close();
            this.$router.push("/confirmOrder");
          })
          .catch((error) => {
            this.$vs.loading.close();
            console.log(error.response);
          });
      } else if (this.product.variations.length > 0) {
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/order`,
            {
              Email: this.user.email,
              FirstName: this.user.firstName,
              LastName: this.user.lastName,
              offeringCode: this.product.code,
              organisation: this.product.organisation,
              offeringType: this.product.offeringType,
              VariationId: this.productID,
              Quantity: parseInt(this.quantity, 10),
              Description: this.reason,
            },
            {
              headers: {
                Authorization: "Bearer " + this.user.token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log("Order submitted");
            this.orderSuccess = true;
            this.$vs.loading.close();
            this.$router.push("/confirmOrder");
          })
          .catch((error) => {
            this.$vs.loading.close();
            console.log(error.response);
          });
      }
    },
    changeVariation(event) {
      this.selected = `${event.target.value}`;
      // for (var i = 0, iLen = this.product.variations.length; i < iLen; i++) {
      for (var i = 0; i <= this.product.variations.length - 1; i++) {
        if (this.product.variations[i].id == event.target.value) {
          // this.price = this.product.variations[i].price;
          this.productID = this.product.variations[i].id;
          this.variationName = this.product.variations[i].name;
          console.log(this.productID);
        }
      }
    },
    getProduct() {
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/organisation/ACEGID/offering/PRODUCT/` +
            this.$route.params.productCode,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.product = response.data.data;
          console.log(this.product);
          this.isProductReady = true;
          // Code to set a default Variation to display
          if (this.product.variations.length > 0) {
            this.selected = this.product.variations[0].id;
            this.productID = this.product.variations[0].id;
            this.variationName = this.product.variations[0].name;
            // this.price = this.product.variations[0].price;
          }
        })
        .catch((error) => {
          console.log("Error response", error.response);
          console.log("Error", error);
        });
    },
    getImage(images) {
      return images.split(",")[0];
    },
    triggerAddToCartModal() {
      this.$refs["addedToCartModal"].click();
    },
    // getVariationName(variationID) {
    //   let variation = this.findWithAttr(
    //     this.product.variations,
    //     "id",
    //     variationID
    //   );
    //   return this.product.variations[variation].name;
    // },
    // findWithAttr(array, attr, value) {
    //   for (var i = 0; i < array.length; i += 1) {
    //     if (array[i][attr] === value) {
    //       return i;
    //     }
    //   }
    //   return -1;
    // },
  },
  created: function() {},
};
</script>
