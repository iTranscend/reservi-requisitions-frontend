<template>
  <div class="cart">
    <div class="container padding-bottom-3x mb-1">
      <!-- Shopping Cart-->
      <!-- <h4>{{ quantity }}</h4> -->
      <div class="table-responsive shopping-cart">
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">
                <a
                  class="btn btn-sm btn-outline-danger"
                  @click="$store.commit('emptyCart')"
                  >Clear Cart</a
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <td>
                <div class="product-item mb-0 pt-0">
                  <img
                    style="width: 60px; height: 65px; padding: 0px 0px 0px 0px"
                    :src="item.productImage"
                    alt="Product"
                  />
                  <div class="product-info" style="padding: 0px 0px 0px 0px">
                    <h4 class="product-title">
                      <a v-bind:href="'/productOffer/' + item.offeringCode"
                        >{{ item.productName }} ({{ item.variationName }})</a
                      >
                    </h4>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div class="count-input">
                  <input
                    type="number"
                    class="form-control"
                    :placeholder="item.Quantity"
                    name
                    id
                  />
                </div>
              </td>
              <!-- <td class="text-center text-lg">${{ item.productPrice }}</td> -->
              <td class="text-center">
                <a
                  class="remove-from-cart"
                  @click="$store.commit('removeFromCart', item)"
                  href="#"
                  data-toggle="tooltip"
                  title="Remove item"
                >
                  <i class="icon-x"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="shopping-cart-footer">
        <div class="column text-lg">
          <span class="text-muted">Subtotal:&nbsp;</span>
          <span class="text-gray-dark">${{ $store.getters.totalPrice }}</span>
        </div>
      </div> -->
      <div v-if="!orderBeingModified" class="form-group mb-0">
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
      </div>
      <div class="shopping-cart-footer">
        <div class="column">
          <router-link
            :to="{ name: 'Products' }"
            class="btn btn-outline-secondary"
            ><i class="icon-arrow-left"></i>&nbsp;Back to Products</router-link
          >
          <!-- <a class="btn btn-outline-secondary" href="/">
            <i class="icon-arrow-left"></i>&nbsp;Back to Products
          </a> -->
        </div>
        <div class="column">
          <a
            class="btn btn-secondary"
            href="#"
            data-toast
            data-toast-type="success"
            data-toast-position="topRight"
            data-toast-icon="icon-check-circle"
            data-toast-title="Your cart"
            data-toast-message="is updated successfully!"
            >Update Cart</a
          >
          <a
            v-if="!orderBeingModified"
            class="btn btn-primary"
            style="color: white;"
            @click="checkout"
            >Make Order</a
          >
          <a
            v-if="orderBeingModified"
            class="btn btn-primary"
            style="color: white;"
            @click="checkoutModifiedOrder"
            >Submit Modified Order</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "Cart",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      reason: null,
    };
  },
  mounted() {},
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    currentOrderForModification() {
      console.log(
        "ORDERNUMBER",
        this.$store.getters.currentOrderForModification
      );
      return this.$store.getters.currentOrderForModification;
    },
    orderBeingModified() {
      return this.$store.getters.orderBeingModified;
    },
  },
  methods: {
    checkout() {
      this.$vs.loading({ type: "material" });
      this.axios
        .post(
          `${axios.axios.defaults.baseURL}/order`,
          {
            Email: this.user.email,
            FirstName: this.user.firstName,
            LastName: this.user.lastName,
            Description: this.reason,
            organisation: this.user.organisation.code,
            items: this.$store.state.cart,
          },
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          console.log("Successful: ", response.data);
          console.log("Order submitted");
          // TODO : Display success toast
          this.$notify({
            group: "foo",
            type: "success",
            text: "Order submitted!",
          });
          this.$store.commit("emptyCart");
          this.$vs.loading.close();
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(error.response);
          // TODO : Display error toast
          this.$notify({
            group: "foo",
            type: "error",
            title: "Something went wrong",
            text: "Check your cart and try again",
            speed: 150,
            position: "top right",
          });
        });
    },
    checkoutModifiedOrder() {
      this.$vs.loading({ type: "material" });
      console.log({
        Email: this.user.email,
        organisation: this.user.organisation.code,
        orderNumber: this.currentOrderForModification,
        items: this.$store.state.cart,
      });
      this.axios
        .put(
          `${axios.axios.defaults.baseURL}/order`,
          {
            Email: this.user.email,
            organisation: this.user.organisation.code,
            orderNumber: this.currentOrderForModification,
            items: this.$store.state.cart,
          },
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          console.log("Successful: ", response.data);
          console.log("Modified Order submitted");
          // TODO : Display success toast
          this.$notify({
            group: "foo",
            type: "success",
            text: "Modified Order submitted!",
          });
          this.$store.commit("emptyCart");
          this.$store.commit("toggleOrderBeingModified", false);
          this.$store.commit("setCurrentOrderForModification", null);
          this.$vs.loading.close();
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(error.response);
          // TODO : Display error toast
          this.$notify({
            group: "foo",
            type: "error",
            title: "Something went wrong",
            text: "Check your cart and try again",
            speed: 150,
            position: "top right",
          });
        });
    },
  },
};
</script>
