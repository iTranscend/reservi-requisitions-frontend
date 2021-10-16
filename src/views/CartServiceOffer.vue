<template>
  <div class="serviceOffer">
    <div class="container padding-bottom-3x">
      <div class="row" v-if="isServiceReady">
        <div class="col-md-6">
          <Calendar :events="events" />
          <!-- :events="service.variations[0].schedules" -->
        </div>
        <div class="col-md-6">
          <!-- Poduct Gallery-->
          <div class="product-gallery">
            <div class="product-carousel owl-carousel gallery-wrapper">
              <!-- Product Info-->
              <div
                v-for="(serviceImage, index) in service.images.split(',')"
                :key="index"
                class="gallery-item"
                :data-hash="serviceImage"
              >
                <a :href="serviceImage" data-size="1000x667">
                  <img :src="serviceImage" alt="Service" />
                </a>
              </div>
            </div>
            <ul class="product-thumbnails">
              <li
                v-for="(serviceImage, index) in service.images.split(',')"
                :key="index"
                class="active"
              >
                <a :href="serviceImage">
                  <img :src="serviceImage" alt="Service" />
                </a>
              </li>
            </ul>
          </div>

          <div class="padding-top-2x mt-2 hidden-md-up"></div>
          <div class="sp-categories pb-3">
            <i class="icon-tag"></i>
            <a href="#">Reagents</a>
          </div>
          <h2 class="mb-3">{{ service.name }}</h2>
          <span class="h3 d-block" v-if="service.variations.length == 0"
            >&#36;{{ service.price }}</span
          >
          <span class="h3 d-block" v-else-if="service.variations.length > 0"
            >&#36;{{ price }} vID: {{ serviceID }}</span
          >
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
                    >{{ variation.name }} : {{ variation.price }}</option
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
          <div class="form-group row padding-top-0x mb-o">
            <label class="col-2 col-form-label" for="end-date-time-input"
              >End: Date and time</label
            >
            <div class="col-10">
              <input
                v-model="endDateTime"
                class="form-control"
                type="datetime-local"
                id="end-date-time-input"
                name="end"
              />
            </div>
            <p>{{ endDateTime }}</p>
          </div>

          <div class="row align-items-end pb-4 justify-content-center">
            <div class="col-sm-6">
              <div class="pt-4 hidden-sm-up"></div>
              <AddToCartService
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
              />
            </div>
          </div>
          <hr class="mb-2" />
        </div>
      </div>
      <div v-else>
        <img src="/img/loading.gif" />
      </div>
    </div>

    <!-- Photoswipe container-->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button
              class="pswp__button pswp__button--close"
              title="Close (Esc)"
            ></button>
            <button
              class="pswp__button pswp__button--share"
              title="Share"
            ></button>
            <button
              class="pswp__button pswp__button--fs"
              title="Toggle fullscreen"
            ></button>
            <button
              class="pswp__button pswp__button--zoom"
              title="Zoom in/out"
            ></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
          >
            <div class="pswp__share-tooltip"></div>
          </div>
          <button
            class="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
          ></button>
          <button
            class="pswp__button pswp__button--arrow--right"
            title="Next (arrow right)"
          ></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartService from "../components/AddToCartService.vue";
import Calendar from "../components/Calendar.vue";
import axios from "../axios";

export default {
  name: "ServiceOffer",
  props: {},
  components: {
    AddToCartService,
    Calendar,
  },
  data() {
    return {
      service: null,
      isServiceReady: false,
      selected: null,
      price: null,
      events: null,
      serviceID: null,
      email: "bonashola@gmail.com",
      firstName: "Bona",
      lastName: "Shola",
      quantity: null,
      startDateTime: null,
      endDateTime: null,
    };
  },
  mounted() {
    this.getService();
  },
  computed: {},
  methods: {
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
        obj.name = "Centrifugal test";
        obj.details = "Spinning till infinity";
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
          `${axios.axios.defaults.baseURL}/organisation/ZEN-PHARMACEUTICAL/offering/SERVICE/` +
            this.$route.params.serviceCode,
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbmlzYXRpb24iOiJOb25lIiwiYWNjb3VudFR5cGUiOiJBbm9ueW1vdXMiLCJlbWFpbCI6Ik5vbmUiLCJuYmYiOjE1OTQwODM5NjAsImV4cCI6MTU5Njc2MjM2MCwiaWF0IjoxNTk0MDgzOTYwfQ.bUBNZ7Jcr0_dP0gNeb-7id6vwkhbymVwxV0WUtGt8Jg",
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
            this.events = this.service.schedules;
            this.serviceID = this.service.code;
          }
          // let schedules = [];
          // schedules = this.service.variations.schedules;

          // Code to set a default Variation to display
          if (this.service.variations.length > 0) {
            this.serviceID = this.service.variations[0].id;
            this.selected = this.service.variations[0].id;
            this.price = this.service.variations[0].price;
            this.service.variations[0].schedules.forEach((obj) => {
              obj.name = "Hot Massage";
              obj.details = "Steaming all the way";
              obj.start = obj.date.slice(0, 10) + " " + obj.startTime;
              obj.end = obj.date.slice(0, 10) + " " + obj.endTime;
              obj.color = "#ff4575";
              delete obj.startTime;
              delete obj.endTime;
              delete obj.date;
            });
            this.events = this.service.variations[0].schedules;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function() {},
};
</script>
