<template>
  <div class="Orders">
    <!-- Page Content-->
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
              href="#currentReservations"
              data-toggle="tab"
              role="tab"
              ref="currentReservationsRef"
            >
              <i class="icon-shopping-bag"></i>Current Reservations
              <span
                v-if="reservations != null"
                class="badge badge-warning badge-pill"
                >{{ reservations.length }}</span
              >
            </a>
            <a
              class="list-group-item with-badge text-left"
              href="#previousReservations"
              data-toggle="tab"
              role="tab"
            >
              <i class="icon-user"></i>Previous Reservations
              <span
                v-if="reservations != null"
                class="badge badge-success badge-pill"
                >{{ reservations.length }}</span
              >
            </a>
          </nav>
        </div>
        <div class="col-lg-8">
          <div class="padding-top-2x mt-2 hidden-lg-up"></div>
          <div class="tab-content">
            <div class="tab-pane fade" id="currentReservations" role="tabpanel">
              <div class="row">
                <div
                  class="col-sm-6 margin-bottom-2x pb-3"
                  v-for="(order, index) in reservations"
                  :key="index"
                >
                  <!-- <hr class="margin-bottom-1x" /> -->
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Card title</h4>
                      <p class="card-text">
                        You have reserved this machine from 12:30am to 2:30pm on
                        Wednesday, 17th of December, 2020.
                      </p>
                      <a
                        class="btn btn-danger btn-sm"
                        href="#"
                        style="color:white"
                        @click="cancelReservation(reservation.id)"
                        >Cancel Reservation</a
                      >
                    </div>
                    <img
                      class="card-img-bottom"
                      src="/img/components/img05.jpg"
                      alt="Card image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="previousReservations"
              role="tabpanel"
            >
              <div class="row">
                <div
                  class="col-sm-6 margin-bottom-2x pb-3"
                  v-for="(order, index) in reservations"
                  :key="index"
                >
                  <hr class="margin-bottom-1x" />
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a
                        class="btn btn-danger btn-sm"
                        href="#"
                        style="color:white"
                        @click="cancelReservation(reservation.id)"
                        >Cancel Reservation</a
                      >
                    </div>
                    <img
                      class="card-img-bottom"
                      src="/img/components/img05.jpg"
                      alt="Card image"
                    />
                  </div>
                </div>
              </div>
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
      reservations: null,
      // currentReservations: null,
      // previousReservations: null,
      reservationsLoaded: false,
      focusReservation: null,
      feedbackMessage: "",
    };
  },
  async mounted() {
    await this.getReservations();
    // await this.getCurrentReservations();
    this.$refs["currentReservationsRef"].click();
    // await this.getPreviousReservations();
    this.reservationsLoaded = true;
  },
  methods: {
    formatDate(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
    // getReservation
    async getReservations() {
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/order?organisation=${this.user.organisation.code}&customer=${this.user.email}&product=&status=&orderType=Service&dateRange=&skip=0&take=`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.reservations = response.data.data.data;
          console.log("Current: ", this.reservations);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getCurrentReservations() {
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/order?organisation=ACEGID&customer=${this.user.email}&service=&status=awaiting&dateRange=&skip=0&take=20`,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.reservations = response.data.data.data;
          console.log("Current: ", this.reservations);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    // getPreviousReservations() {
    //   this.axios
    //     .get(
    //       `${axios.axios.defaults.baseURL}/order?organisation=ACEGID&customer=${this.user.email}&product=&status=approved&dateRange=&skip=0&take=20`,
    //       {
    //         headers: {
    //           Authorization: "Bearer " + this.user.token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.previousReservations = response.data.data.data;
    //       console.log("Previous: ", this.previousReservations);
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // },
    setFocusOrder(orderNumber) {
      this.focusReservation = orderNumber;
    },
    submitFeedback() {
      this.axios
        .patch(
          `${axios.axios.defaults.baseURL}/order/feedback`,
          {
            orderNumber: this.focusReservation,
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
            console.log("Item verified as collected");
            // TODO display success toast
            this.$notify({
              group: "foo",
              type: "success",
              title: "Successful!",
              text: "Item verified as collected",
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
    },
    cancelReservation(reservationNumber) {
      this.$vs.loading({ type: "material" });
      console.log("Cancelling Reservation....");
      this.axios
        .post(
          `${axios.axios.defaults.baseURL}/order/cancel`,
          {
            orderNumber: reservationNumber,
            Email: this.user.email,
            OrganisationCode: this.user.organisation.code,
          },
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then(async (response) => {
          console.log(response.data);
          this.$vs.loading.close();
          console.log("Reservation cancelled successfully!");
          // TODO display success toast
          this.$notify({
            group: "foo",
            type: "success",
            title: "Message",
            text: "Reservation cancelled successfully!",
            position: "top right",
          });
          this.complaintSuccessful = true;
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(error.response);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Something went wrong",
            text: "Please try again",
            speed: 150,
            position: "top right",
          });
        });
    },
  },
};
</script>
