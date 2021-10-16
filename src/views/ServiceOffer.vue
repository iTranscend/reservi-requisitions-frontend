<template>
  <div class="serviceOffer">
    <div class="container padding-bottom-3x">
      <div class="row" v-if="isServiceReady">
        <div class="col-md-6">
          <Calendar :events="events" />
          <!-- :events="service.variations[0].schedules" -->
        </div>
        <div class="col-md-6">
          <!-- Image Carousel -->
          <div class="col-md-12">
            <Carousel :images="service.images.split(',')" />
          </div>

          <div class="padding-top-2x mt-2 hidden-md-up"></div>

          <h2 class="mb-3">{{ service.name }}</h2>
          <!-- Price display -->
          <!-- <span class="h3 d-block" v-if="service.variations.length == 0">&#8358;{{ service.price }}</span> -->
          <!-- <span class="h3 d-block" v-else-if="service.variations.length > 0">&#8358;{{ price }}</span> -->
          <p class="text-muted">{{ service.description }}</p>
          <div class="row margin-top-1x justify-content-center">
            <div v-if="service.variations.length > 0" class="col-sm-6">
              <div class="form-group">
                <label for="size">Choose Variation</label>
                <select
                  @change="changeVariation($event)"
                  v-model="selected"
                  class="form-control"
                  id="variation"
                >
                  <option
                    v-for="(variation, index) in service.variations"
                    :key="index"
                    id="service_price"
                    :value="variation.id"
                    >{{ variation.name }}</option
                  >
                </select>
              </div>
            </div>
            <!-- <div v-if="service.concurrency > 1" class="col-sm-6">
              <div class="form-group">
                <label for="quantity">Quantity</label>
                <input
                  v-model.number="quantity"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>-->
          </div>
          <div
            class="form-group row justify-content-center padding-top-0x mb-0"
          >
            <h6 class="mt-0 mb-0 pt-0 pb-0">
              Book a time slot
              <span class style="color:grey;"
                >(Check for available time slots in the calendar)</span
              >
            </h6>
            <p class="mb-0">
              This service runs for
              <b>{{ service.duration }}</b>
            </p>
          </div>
          <div class="form-group row padding-top-0x mb-0">
            <label class="col-2 col-form-label" for="start-date-time-input"
              >Start: Date and time</label
            >
            <div class="col-10">
              <input
                v-model="startDateTime"
                class="form-control"
                type="datetime-local"
                id="start-date-time-input"
                name="start"
              />
            </div>
          </div>
          <div class="form-group mb-0">
            <label class="form-label" for="textarea-input"
              >Reason for request:</label
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
          <div class="row align-items-end pb-4 justify-content-center">
            <div class="col-sm-6">
              <div class="pt-4 hidden-sm-up"></div>
              <button
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
                Reserve Time Slot
              </button>
              <!-- <AddToCartService
                :email="email"
                :firstname="firstName"
                :lastname="lastName"
                :serviceCode="service.code"
                :org="service.organisation"
                :type="service.offeringType"
                :variationId="serviceID"
                :price="price"
                :name="service.name"
                :image="getImage(service.images)"
                :quantity="quantity"
                :startDateTime="startDateTime"
                :endDateTime="endDateTime"
              />-->
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
// import AddToCartService from "../components/AddToCartService.vue";
import Calendar from "../components/Calendar.vue";
import Carousel from "../components/Carousel.vue";
import axios from "../axios";

export default {
  name: "ServiceOffer",
  props: {},
  components: {
    // AddToCartService,
    Calendar,
    Carousel,
  },
  data() {
    return {
      service: null,
      isServiceReady: false,
      selected: null,
      price: null,
      events: null,
      serviceID: null,
      user: JSON.parse(localStorage.getItem("user")),
      quantity: null,
      startDateTime: null,
      endDateTime: null,
      reason: null,
      // orderSuccess: false,
    };
  },
  mounted() {
    this.getService();
  },
  computed: {},
  methods: {
    makeOrder() {
      console.log({
        Email: this.user.email,
        LastName: this.user.lastName,
        FirstName: this.user.firstName,
        offeringCode: this.service.code,
        organisation: this.service.organisation,
        offeringType: this.service.offeringType,
        VariationId: this.serviceID,
        Description: this.reason,
        Schedules: [
          {
            StartTime: this.startDateTime.slice(11, 16),
            Date: this.startDateTime.slice(0, 10),
          },
        ],
      });
      //loader
      this.$vs.loading({ type: "material" });
      console.log(this.$vs);
      if (this.service.variations.length == 0) {
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/order`,
            {
              Email: this.user.email,
              LastName: this.user.lastName,
              FirstName: this.user.firstName,
              offeringCode: this.service.code,
              organisation: this.service.organisation,
              offeringType: this.service.offeringType,
              Description: this.reason,
              Schedules: [
                {
                  StartTime: this.startDateTime.slice(11, 16),
                  Date: this.startDateTime.slice(0, 10),
                },
              ],
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
            // this.orderSuccess = true;
            this.$vs.loading.close();
            this.$router.push("/confirmOrder");
            // V.$router.push({ name: "ConfirmOrder" });
          })
          .catch((error) => {
            this.$vs.loading.close();
            console.log(error.response);
          });
      } else if (this.service.variations.length > 0) {
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/order`,
            {
              Email: this.user.email,
              LastName: this.user.lastName,
              FirstName: this.user.firstName,
              offeringCode: this.service.code,
              organisation: this.service.organisation,
              offeringType: this.service.offeringType,
              VariationId: this.serviceID,
              Description: this.reason,
              Schedules: [
                {
                  StartTime: this.startDateTime.slice(11, 16),
                  Date: this.startDateTime.slice(0, 10),
                },
              ],
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
    getImage(images) {
      return images.split(",")[0];
    },
    changeVariation(event) {
      // Getting selected variation and setting the corresponding price
      this.selected = `${event.target.value}`;
      for (var i = 0, iLen = this.service.variations.length; i < iLen; i++) {
        if (this.service.variations[i].id == event.target.value) {
          this.price = this.service.variations[i].price;
          this.serviceID = this.service.variations[i].id;
        }
      }

      // Handle Schedules
      for (var j = 0, jLen = this.service.variations.length; j < jLen; j++) {
        if (this.service.variations[j].id == event.target.value) {
          this.events = this.service.variations[j].schedules;
        }
      }

      this.events.forEach((obj) => {
        obj.name = this.service.name;
        obj.details = this.service.description;
        obj.start = obj.date.slice(0, 10) + " " + obj.startTime;
        obj.end = obj.date.slice(0, 10) + " " + obj.endTime;
        obj.color = "#ff4575";
        delete obj.startTime;
        delete obj.endTime;
        delete obj.date;
      });
      console.log(this.events);
    },
    getService() {
      console.log("Getting service...");
      console.log(this.$route.params.serviceCode);
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/organisation/ACEGID/offering/SERVICE/` +
            this.$route.params.serviceCode,
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.service = response.data.data;
          console.log(this.service);
          this.isServiceReady = true;

          // Handling schedules for services without variations
          if (this.service.variations.length == 0) {
            this.price = this.service.price;
            // this.events = this.service.schedules;
            this.events = this.service.schedules.forEach((obj) => {
              obj.name = this.service.name;
              obj.details = this.service.description;
              obj.start = obj.date.slice(0, 10) + " " + obj.startTime;
              obj.end = obj.date.slice(0, 10) + " " + obj.endTime;
              obj.color = "#ff4575";
              delete obj.startTime;
              delete obj.endTime;
              delete obj.date;
            });
            // this.events = this.service.schedules;
            this.serviceID = this.service.code;
          }
          // let schedules = [];
          // schedules = this.service.variations.schedules;

          // Code to set a default Variation to display
          if (this.service.variations.length > 0) {
            this.serviceID = this.service.variations[0].id;
            this.selected = this.service.variations[0].id;
            this.price = this.service.variations[0].price;
            this.events = this.service.variations[0].schedules.forEach(
              (obj) => {
                obj.name = this.service.name;
                obj.details = this.service.description;
                obj.start = obj.date.slice(0, 10) + " " + obj.startTime;
                obj.end = obj.date.slice(0, 10) + " " + obj.endTime;
                obj.color = "#ff4575";
                delete obj.startTime;
                delete obj.endTime;
                delete obj.date;
              }
            );
            // this.events = this.service.variations[0].schedules;
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created: function() {},
};
</script>
