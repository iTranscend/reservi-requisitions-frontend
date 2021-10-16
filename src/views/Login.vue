<template>
  <div class="login">
    <!-- Page Title-->
    <!-- <div class="page-title">
      <div class="container">
        <div class="column">
          <h1>Login</h1>
        </div>
      </div>
    </div>-->
    <!-- Page Content-->
    <div class="container padding-bottom-3x mb-2">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="card" method="post">
            <div class="card-body">
              <h4 class="margin-bottom-1x">Sign-In using form below</h4>
              <div class="form-group input-group">
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  v-model="email"
                />
                <span class="input-group-addon">
                  <i class="icon-mail"></i>
                </span>
              </div>
              <div class="form-group input-group">
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  v-model="password"
                />
                <span class="input-group-addon">
                  <i class="icon-lock"></i>
                </span>
              </div>
              <div
                class="d-flex flex-wrap justify-content-between padding-bottom-1x"
              >
                <div class="custom-control custom-checkbox">
                  <p>
                    No account?
                    <a href="/register">Register here</a>
                  </p>
                </div>
                <!-- <a class="navi-link" href="account-password-recovery.html">Forgot password?</a> -->
              </div>
              <div class="text-center text-sm-right">
                <!-- <button
                  class="btn btn-primary margin-bottom-none"
                  style="color:white;"
                  @click="login"
                >Login</button>-->
                <a
                  class="btn btn-primary margin-bottom-none"
                  style="color:white;"
                  @click="login"
                  >Login</a
                >
                <!-- <button
                  class="btn btn-primary margin-bottom-none"
                  type="submit"
                >
                  Login
                </button>-->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../eventBus";
import axios from "../axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    EventBus.$on("LOGGED_OUT", () => {
      this.loggedIn = false;
    });
  },
  methods: {
    login() {
      if (this.email == "" || this.password == "") {
        console.log("Fields must not be empty....");
        // TODO : Display error toast
        this.$notify({
          group: "foo",
          type: "error",
          title: "Note!",
          text: "Fields must not be empty!",
          position: "top right",
        });
      } else {
        this.$vs.loading({ type: "material" });
        console.log("Logging in....");
        this.axios
          .post(`${axios.axios.defaults.baseURL}/authenticate/`, {
            email: this.email,
            password: this.password,
            organisation: "ACEGID",
            accountType: "Customer",
          })
          .then(async (response) => {
            console.log(response.data);
            console.log(response.data.data);
            console.log("Validating response....");
            if (response.data.succeded == true) {
              localStorage.setItem("user", JSON.stringify(response.data.data));
              this.$vs.loading.close();
              EventBus.$emit("LOGGED_IN");
              this.$router.push({ name: "Offerings" });
            } else {
              this.$vs.loading.close();
              // TODO : Display error toast
              this.$notify({
                group: "foo",
                type: "error",
                title: "Login failed",
                text: "Please check your email and password!",
                position: "top right",
              });
            }
          })
          .catch((error) => {
            this.$vs.loading.close();
            console.log(error);
            this.$notify({
              group: "foo",
              type: "error",
              title: "Login failed",
              text: error,
              position: "top right",
            });
          });
      }
    },
  },
};
</script>
