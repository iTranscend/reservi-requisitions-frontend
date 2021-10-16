<template>
  <v-app id="app">
    <v-content>
      <Header />
      <notifications group="foo" />
      <router-view />

      <Footer />
    </v-content>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    notify(type, text) {
      this.$notify({
        group: "foo",
        type: type,
        text: text,
      });
    },
  },
};
</script>
