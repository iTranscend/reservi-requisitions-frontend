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
  name: "AddToCartService",
  // props: [
  //   email,
  //   firstname,
  //   lastname,
  //   serviceCode,
  //   org,
  //   type,
  //   variationID,
  //   price,
  //   name,
  //   image,
  //   quantity,
  //   startDateTime,
  //   endDateTime,
  // ],
  props: {
    email: String,
    firstname: String,
    lastname: String,
    serviceCode: String,
    org: String,
    type: String,
    variationId: Number,
    price: Number,
    name: String,
    image: String,
    quantity: Number,
    // schedules: Array,
    startDateTime: String,
    endDateTime: String,
  },
  data() {
    return {
      item: {
        Email: this.email,
        FirstName: this.firstname,
        LastName: this.lastname,
        offeringCode: this.serviceCode,
        organisation: this.org,
        offeringType: this.type,
        VariationId: this.variationId,
        productName: this.name,
        productPrice: this.price,
        productImage: this.image,
        productQuantity: this.quantity,
        // schedules: [this.startDateTime, this.endDateTime]
        serviceStartDateTime: this.startDateTime,
        serviceEndDateTime: this.endDateTime,
      },
    };
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.item);
    },
  },
};
</script>
