<template>
  <div class="Orders">
    <!-- Page Content-->
    <!-- Hidden button to trigger Order Details Modal -->
    <button
      style="display:none;"
      class="btn btn-outline-primary"
      type="button"
      data-toggle="modal"
      data-target="#detailsModal"
      ref="orderDetailsModal"
    >
      Details Modal
    </button>
    <!-- Feedback Modal -->
    <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Submit Feedback</h4>
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
                <!-- <h4 class="margin-bottom-1x">Submit Feedback</h4> -->
                <div class="form-group row">
                  <label class="col-3 col-form-label" for="feedback-message"
                    >Feedback or comments regarding this order</label
                  >
                  <textarea
                    class="col-9 form-control"
                    type="number"
                    name="requestItemQuantity"
                    id="feedback-message"
                    rows="5"
                    v-model="feedbackMessage"
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
              @click="submitFeedback"
              class="btn btn-primary btn-sm"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modification order warning Modal-->
    <div class="modal fade" id="modalCentered" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">WARNING!!!</h4>
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
              This action will overwrite whatever you have in the cart. Are you
              sure you want to continue?
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary btn-sm"
              type="button"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              @click="submitOrderForModification"
            >
              Yes, Modify Order
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Order Details Modal-->
    <div
      v-if="focusOrderForDetailsModal != null"
      class="modal fade"
      id="orderDetails"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ focusOrderForDetailsModal.orderNumber }}
            </h5>
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
            <div class="table-responsive shopping-cart mb-0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in focusOrderForDetailsModal.items"
                    :key="index"
                  >
                    <td>
                      <div class="product-item">
                        <a class="product-thumb" href="shop-single.html"
                          ><img
                            :src="getImage(item)"
                            alt="Product"
                            style="width:50px; height: 60px;"
                        /></a>
                        <div class="product-info">
                          <h4 class="product-title">
                            <a href="shop-single.html">{{
                              item.product.name
                            }}</a>
                          </h4>
                          <span v-if="item.variation"
                            ><em>Variation:</em> {{ item.variation.name }}</span
                          ><span><em>Quantity:</em> {{ item.quantity }} </span>
                          <!-- {{ item.product.unitOfMeasure.unit }} -->
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr class="mb-3" />
            <div
              v-if="orderType == 'modificationOrders'"
              class="d-flex flex-wrap justify-content-between align-items-center pb-2"
            >
              <div class="px-2 py-1">
                <span class="text-muted"></span>
                <span class="text-gray-dark"></span>
              </div>
              <div class="px-2 py-1">
                <span class="text-muted"></span>
                <span class="text-gray-dark"></span>
              </div>
              <div class="px-2 py-1">
                <span class="text-muted"></span>
                <span class="text-gray-dark"></span>
              </div>
              <!-- <div class="text-lg px-2 py-1"><span class='text-muted'>Total:</span> <span class='text-gray-dark'>$2,584.72</span></div> -->
              <div class="text-lg px-2 py-1">
                <a
                  class="btn btn-primary"
                  style="color: white;"
                  data-toggle="modal"
                  data-target="#modalCentered"
                  >Modify Order</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container padding-bottom-3x mb-2">
      <div class="row">
        <div class="col-lg-4">
          <aside class="user-info-wrapper">
            <div
              class="user-cover"
              style="background-image: url(img/account/user-cover-img.jpg);"
            ></div>
            <div class="user-info">
              <!-- <div class="user-avatar">
                <a class="edit-avatar" href="#"></a>
                <img src="img/account/user-ava.jpg" alt="User" />
              </div>-->
              <div class="user-data">
                <h4 class="h5">{{ user.firstName }} {{ user.lastName }}</h4>
                <span>Joined February 06, 2017</span>
              </div>
            </div>
          </aside>
          <nav class="list-group" role="tablist">
            <a
              class="list-group-item with-badge text-left"
              href="#pendingOrders"
              data-toggle="tab"
              role="tab"
              ref="pendingOrdersRef"
              @click="getOrders('pendingOrders', 'awaiting')"
            >
              <i class="icon-shopping-bag"></i>Pending Requisitions
              <span class="badge badge-warning badge-pill">{{
                pendingOrders.length
              }}</span>
            </a>
            <a
              class="list-group-item with-badge text-left"
              href="#approvedOrders"
              data-toggle="tab"
              role="tab"
              @click="getOrders('approvedOrders', 'approved')"
            >
              <i class="icon-user"></i>Approved Requisitions
              <span class="badge badge-success badge-pill">{{
                approvedOrders.length
              }}</span>
            </a>
            <a
              class="list-group-item with-badge text-left"
              href="#declinedOrders"
              data-toggle="tab"
              role="tab"
              @click="getOrders('declinedOrders', 'declined')"
            >
              <i class="icon-map-pin"></i>Declined Requisitions
              <span class="badge badge-danger badge-pill">{{
                declinedOrders.length
              }}</span>
            </a>
            <a
              class="list-group-item with-badge text-left"
              href="#modificationOrders"
              data-toggle="tab"
              role="tab"
              @click="getOrders('modificationOrders', 'modify')"
            >
              <i class="icon-map-pin"></i>Requisitions for Modification
              <span class="badge badge-danger badge-pill">{{
                modificationOrders.length
              }}</span>
            </a>
          </nav>
        </div>
        <div class="col-lg-8">
          <div class="padding-top-2x mt-2 hidden-lg-up"></div>
          <div class="tab-content">
            <div class="tab-pane fade" id="pendingOrders" role="tabpanel">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date of Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(order, index) in pendingOrders"
                      :key="index"
                      style="text-align: left;"
                    >
                      <td>
                        <a
                          class="navi-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#orderDetails"
                          @click="
                            showOrderDetails(order.orderNumber, 'pendingOrders')
                          "
                          >#{{ order.orderNumber }}</a
                        >
                      </td>
                      <td>{{ formatDate(order.createdDate) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade" id="approvedOrders" role="tabpanel">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date of Order</th>
                      <th>Other</th>
                    </tr>
                  </thead>
                  <tbody v-if="approvedOrders != null">
                    <tr
                      v-for="(order, index) in approvedOrders"
                      :key="index"
                      style="text-align: left;"
                    >
                      <td>
                        <a
                          class="navi-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#orderDetails"
                          @click="
                            showOrderDetails(
                              order.orderNumber,
                              'approvedOrders'
                            )
                          "
                          >{{ order.orderNumber }}</a
                        >
                      </td>
                      <td>{{ formatDate(order.createdDate) }}</td>
                      <td>
                        <button
                          @click="confirmCollected(order.orderNumber)"
                          class="btn btn-sm btn-outline-primary"
                          type="button"
                        >
                          <i class="icon-check-circle"></i>&nbsp;Item Collected
                        </button>
                        <button
                          class="btn btn-outline-primary"
                          type="button"
                          data-toggle="modal"
                          data-target="#feedbackModal"
                          @click="setFocusOrder(order.orderNumber)"
                        >
                          Submit Feedback
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <hr />
              <div class="text-right">
                <a class="btn btn-link-primary margin-bottom-none" href="#">
                  <i class="icon-download"></i>&nbsp;Order Details
                </a>
              </div>-->
            </div>
            <div class="tab-pane fade" id="declinedOrders" role="tabpanel">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date of Order</th>
                    </tr>
                  </thead>
                  <tbody v-if="declinedOrders != null">
                    <tr
                      v-for="(order, index) in declinedOrders"
                      :key="index"
                      style="text-align: left;"
                    >
                      <td>
                        <a
                          class="navi-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#orderDetails"
                          @click="
                            showOrderDetails(
                              order.orderNumber,
                              'declinedOrders'
                            )
                          "
                          >{{ order.orderNumber }}</a
                        >
                      </td>
                      <td>{{ formatDate(order.createdDate) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade" id="modificationOrders" role="tabpanel">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date of Order</th>
                    </tr>
                  </thead>
                  <tbody v-if="modificationOrders != null">
                    <tr
                      v-for="(order, index) in modificationOrders"
                      :key="index"
                      style="text-align: left;"
                    >
                      <td>
                        <a
                          class="navi-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#orderDetails"
                          @click="
                            showOrderDetails(
                              order.orderNumber,
                              'modificationOrders'
                            )
                          "
                          >{{ order.orderNumber }}</a
                        >
                      </td>
                      <td>{{ formatDate(order.createdDate) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <hr />
              <div class="text-right">
                <a class="btn btn-link-primary margin-bottom-none" href="#">
                  <i class="icon-download"></i>&nbsp;Order Details
                </a>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "../axios";

export default {
  name: "Orders",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      pendingOrders: [],
      approvedOrders: [],
      declinedOrders: [],
      modificationOrders: [],
      ordersLoaded: false,
      focusOrder: null,
      feedbackMessage: "",
      focusOrderForDetailsModal: null,
      orderType: null,
    };
  },
  async mounted() {
    await this.getOrders("pendingOrders", "awaiting");
    await this.getOrders("approvedOrders", "approved");
    await this.getOrders("declinedOrders", "declined");
    await this.getOrders("modificationOrders", "modify");
    this.$refs["pendingOrdersRef"].click();
    console.log(this.pendingOrders);
    this.ordersLoaded = true;
  },
  computed: {},
  methods: {
    formatDate(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
    async getOrders(orderType, status) {
      if (this.$data[orderType].length == 0) {
        try {
          this.$vs.loading({ type: "material" });
          let response = await this.axios.get(
            `${axios.axios.defaults.baseURL}/order?organisation=ACEGID&customer=${this.user.email}&product=&status=${status}&dateRange=&skip=0&take=20`,
            {
              headers: {
                Authorization: "Bearer " + this.user.token,
              },
            }
          );
          this.$data[orderType] = await response.data.data.data;
          this.$vs.loading.close();
        } catch (error) {
          console.log(error.response);
        }
      }
    },
    confirmCollected(orderNumber) {
      this.$vs.loading({ type: "material" });
      this.axios
        .patch(
          `${axios.axios.defaults.baseURL}/order/collect`,
          {
            orderNumber: orderNumber,
            customerEmail: this.user.email,
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
            console.log("Item verified as collected");
            // TODO display success toast
            this.$notify({
              group: "foo",
              type: "success",
              title: "Success!",
              text: "Item verified as collected!",
              position: "top right",
            });
            this.requestItemSuccessful = true;
          } else {
            // TODO Display error message
            this.$notify({
              group: "foo",
              type: "success",
              title: "Something went wrong",
              position: "top right",
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    setFocusOrder(orderNumber) {
      this.focusOrder = orderNumber;
    },
    submitFeedback() {
      this.axios
        .patch(
          `${axios.axios.defaults.baseURL}/order/feedback`,
          {
            orderNumber: this.focusOrder,
            message: this.feedbackMessage,
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
            console.log("Feedback Submitted");
            // TODO display success toast
            this.$notify({
              group: "foo",
              type: "success",
              title: "Success!",
              text: "Feeedback Submitted",
              position: "top right",
            });
            this.requestItemSuccessful = true;
          } else {
            // TODO Display error message
            this.$notify({
              group: "foo",
              type: "error",
              title: "Something went wrong",
              text: "Feedback submission failed",
              position: "top right",
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    showOrderDetails(orderNumber, orderType) {
      this.orderType = orderType;
      this.focusOrderForDetailsModal = this.$data[orderType].find(
        (element) => element.orderNumber == orderNumber
      );
      console.log("Details focus order", this.focusOrderForDetailsModal);
      this.$refs["orderDetailsModal"].click();
    },
    getImage(item) {
      if (item.offeringType == "Product") {
        return item.product.images.split(",")[0];
      }
      return item.service.images.split(",")[0];
    },
    async submitOrderForModification() {
      this.$store.commit("toggleOrderBeingModified", true);
      this.$store.commit(
        "setCurrentOrderForModification",
        this.focusOrderForDetailsModal.orderNumber
      );
      let cart = [];
      await this.focusOrderForDetailsModal.items.forEach((element) => {
        let item = {
          variationId: element.variation ? element.variation.id : null,
          productName: element.product.name,
          productImage: element.product.images,
          Quantity: element.quantity,
          offeringCode: element.product.code,
          offeringType: element.offeringType,
          variationName: element.variation ? element.variation.name : null,
        };
        cart.push(item);
      });

      this.$store.commit("replaceCartWithModificationOrder", cart);
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
