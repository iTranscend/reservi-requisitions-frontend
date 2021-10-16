<template>
  <div class="productOffer">
    <div class="container padding-bottom-3x">
      <div class="row" v-if="isProductReady">
        <!-- Poduct Gallery-->
        <div class="col-md-6">
          <div class="product-gallery">
            <!-- <div class="gallery-wrapper"> -->
            <!-- prettier-ignore -->
            <!-- <div class="gallery-item video-btn text-center">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-type="video"
                  data-video="&lt;div class=&quot;wrapper&quot;&gt;&lt;div class=&quot;video-wrapper&quot;&gt;&lt;iframe class=&quot;pswp__video&quot; width=&quot;960&quot; height=&quot;640&quot; src=&quot;https://www.youtube.com/embed/CjNjcrQZtd8&quot; frameborder=&quot;0&quot; allowfullscreen&gt;&lt;/iframe&gt;&lt;/div&gt;&lt;/div&gt;"
                  title="Watch video"
                ></a>
            </div>-->
            <!-- </div> -->
            <div class="product-carousel owl-carousel gallery-wrapper">
              <div
                v-for="(productImage, index) in product.images.split(',')"
                :key="index"
                class="gallery-item"
                :data-hash="productImage"
              >
                <a :href="productImage" data-size="1000x667">
                  <img :src="productImage" alt="Product" />
                </a>
              </div>
            </div>
            <ul class="product-thumbnails">
              <li
                v-for="(productImage, index) in product.images.split(',')"
                :key="index"
                class="active"
              >
                <a :href="productImage">
                  <img :src="productImage" alt="Product" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Product Info-->
        <div class="col-md-6">
          <div class="padding-top-2x mt-2 hidden-md-up"></div>
          <div class="sp-categories pb-3">
            <i class="icon-tag"></i>
            <a href="#">Reagents</a>
          </div>
          <h2 class="mb-3">{{ product.name }}</h2>
          <span class="h3 d-block" v-if="product.variations.length == 0"
            >&#36;{{ product.price }}</span
          >
          <span class="h3 d-block" v-else-if="product.variations.length > 0"
            >&#36;{{ price }}</span
          >
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
                    >{{ variation.value }} => {{ variation.price }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group mb-0">
                <label for="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  class="form-control"
                  :placeholder="product.unitOfMeasure.unit"
                />
              </div>
            </div>
          </div>
          <div class="row align-items-end pb-4 justify-content-center">
            <div class="col-sm-6">
              <div class="pt-4 hidden-sm-up"></div>
              <AddToCartProduct :price="product.price" :name="product.name" />
            </div>
          </div>
          <hr class="mb-2" />
        </div>
      </div>
      <div v-else>
        <img src="/img/loading.gif" />
      </div>
    </div>
    <!-- Product Details-->
    <!-- <div class="bg-secondary padding-top-3x padding-bottom-2x mb-3" id="details">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3 class="h4">Details</h3>
            <p class="mb-4">jssks</p>
            <h3 class="h4">Features</h3>
            <ul class="list-icon mb-4">
              <li>
                <i class="icon-check text-success"></i>Capture 4K30 Video and
                12MP Photos
              </li>
              <li>
                <i class="icon-check text-success"></i>Game-Style Controller
                with Touchscreen
              </li>
              <li>
                <i class="icon-check text-success"></i>View Live Camera Feed
              </li>
              <li>
                <i class="icon-check text-success"></i>Full Control of HERO6
                Black
              </li>
              <li>
                <i class="icon-check text-success"></i>Use App for Dedicated
                Camera Operation
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h3 class="h4">Specifications</h3>
            <ul class="list-unstyled mb-4">
              <li>
                <strong>Weight:</strong> 35.5oz (1006g)
              </li>
              <li>
                <strong>Maximum Speed:</strong> 35 mph (15 m/s)
              </li>
              <li>
                <strong>Maximum Distance:</strong> Up to 9,840ft (3,000m)
              </li>
              <li>
                <strong>Operating Frequency:</strong> 2.4GHz
              </li>
              <li>
                <strong>Manufacturer:</strong> GoPro, USA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>-->
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
import AddToCartProduct from "../components/AddToCartProduct.vue";
import axios from "../axios";

export default {
  name: "ProductOffer",
  props: {},
  components: {
    AddToCartProduct,
  },
  data() {
    return {
      product: null,
      isProductReady: false,
      selected: null,
      price: null,
    };
  },
  computed: {},
  mounted() {
    this.getProduct();
  },
  methods: {
    changeVariation(event) {
      this.selected = `${event.target.value}`;
      for (var i = 0, iLen = this.product.variations.length; i < iLen; i++) {
        if (this.product.variations[i].id == event.target.value) {
          this.price = this.product.variations[i].price;
        }
      }
    },
    getProduct() {
      this.axios
        .get(
          `${axios.axios.defaults.baseURL}/organisation/ZEN-PHARMACEUTICAL/offering/PRODUCT/` +
            this.$route.params.productCode,
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbmlzYXRpb24iOiJOb25lIiwiYWNjb3VudFR5cGUiOiJBbm9ueW1vdXMiLCJlbWFpbCI6Ik5vbmUiLCJuYmYiOjE1OTQwODM5NjAsImV4cCI6MTU5Njc2MjM2MCwiaWF0IjoxNTk0MDgzOTYwfQ.bUBNZ7Jcr0_dP0gNeb-7id6vwkhbymVwxV0WUtGt8Jg",
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
            this.price = this.product.variations[0].price;
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
