<template>
  <div class="offerings">
    <!-- Page Content-->
    <!-- Request Unavailable Item Modal-->
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

    <!-- Featured Services-->
    <section
      class="container padding-top-2x padding-bottom-1x mb-2"
      id="services"
    >
      <h2 class="h3 pb-3 text-center">Equipment</h2>
      <div class="row" v-if="servicesFetched">
        <div v-if="services.length > 0">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="col-lg-3 col-md-4 col-sm-6"
          >
            <div class="product-card mb-30">
              <a class="product-thumb" href>
                <img
                  style="width: 309; height:206px"
                  :src="service.images.split(',')[0]"
                  :alt="service.name"
                />
              </a>
              <div class="product-card-body">
                <h3 class="product-title">
                  <a href="#">{{ service.name }}</a>
                </h3>

                <!-- Dynamic price display -->
                <!-- <h4
                v-if="service.variations.length > 0"
                class="product-price"
              >&#8358;{{ service.variations[0].price }}</h4>-->
                <!-- <h4 v-else class="product-price">&#8358;{{ service.price }}</h4> -->
                <p>{{ `${service.description.substring(0, 30)} ....` }}</p>
              </div>
              <div class="product-button-group">
                <a
                  class="product-button"
                  v-bind:href="'/serviceOffer/' + service.code"
                  data-toast
                  data-toast-type="success"
                  data-toast-position="topRight"
                  data-toast-icon="icon-check-circle"
                  data-toast-title="Product"
                  data-toast-message="successfuly added to cart!"
                >
                  <i class="icon-shopping-cart"></i>
                  <span>Book</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h4>No equipment found :-(</h4>
        </div>
      </div>
    </section>
    <button
      class="btn btn-outline-primary"
      type="button"
      data-toggle="modal"
      data-target="#modalDefault"
    >
      Request a machine that isn't listed
    </button>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "Offerings",
  props: {},
  data() {
    return {
      services: [],
      servicesFetched: false,
      requestItem: "",
      requestItemQuantity: "",
      requestItemDescription: "",
      user: JSON.parse(localStorage.getItem("user")),
      requestItemSuccessful: false,
    };
  },
  mounted() {
    this.getServices();
  },
  methods: {
    async getServices() {
      // this.$vs.loading({ type: "material" });
      // this.axios
      //   .get(
      //     `${axios.axios.defaults.baseURL}/organisation/${this.user.organisation.code}/offering/SERVICE/`,
      //     {
      //       headers: {
      //         Authorization: "Bearer " + this.user.token,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     this.services = response.data.data;
      //     this.servicesFetched = true;
      //     this.$vs.loading.close();
      //     console.log(this.services);
      //   })
      //   .catch((error) => {
      //     console.log(error.response);
      //   });

      try {
        this.$vs.loading({ type: "material" });
        let response = await this.axios.get(
          `${axios.axios.defaults.baseURL}/organisation/${this.user.organisation.code}/offering/SERVICE/`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        );
        this.services = await response.data.data;
        this.servicesFetched = true;
        this.$vs.loading.close();
        console.log(this.services);
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
          title: "Fields must not be empty",
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
                text: "Item request submitted",
                position: "top right",
              });
              this.requestItemSuccessful = true;
            } else {
              // TODO Display error message
              this.$notify({
                group: "foo",
                type: "error",
                title: "Something went wrong",
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
