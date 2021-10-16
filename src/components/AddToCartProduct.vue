<template>
  <div class="addToCart">
    <button
      class="btn btn-primary btn-block m-0"
      data-toast
      data-toast-type="success"
      data-toast-position="topRight"
      data-toast-icon="icon-check-circle"
      data-toast-title="Product"
      data-toast-message="successfuly added to cart!"
      @click="addToCart"
    >
      <i class="icon-bag"></i>
      Add To Cart
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AddToCart",
  props: [
    "offeringCODE",
    "offeringType",
    "variationID",
    "quantity",
    "image",
    "name",
    "variationName",
  ],
  data() {
    return {
      item: {
        variationId: "",
        productName: "",
        productImage: "",
        Quantity: "",
        offeringCode: "",
        offeringType: "",
        variationName: "",
      },
    };
  },
  methods: {
    addToCart() {
      this.item = {
        variationId: this.variationID,
        productName: this.name,
        productImage: this.image,
        Quantity: parseInt(this.quantity, 10),
        offeringCode: this.offeringCODE,
        offeringType: this.offeringType,
        variationName: this.variationName,
      };
      console.log("ITEM", this.item);
      this.$store.commit("addToCart", this.item);
      this.$emit("addedToCart", "");
      console.log("Cart variationID::: ", this.variationID);
      console.log("Cart quantity::: ", this.quantity);
    },
  },
};
</script>
