<template>
  <v-carousel>
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    images: Array
  },
  data() {
    return {
      items: this.images
    };
  }
};
</script>
