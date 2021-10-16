<template>
  <div class="login">
    <!-- Page Title-->
    <!-- <div class="page-title">
      <div class="container">
        <div class="column">
          <h1>Register Account</h1>
        </div>
      </div>
    </div>-->
    <!-- Page Content-->
    <div class="container padding-bottom-3x mb-2">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="padding-top-3x hidden-md-up"></div>
          <h3 class="margin-bottom-1x">Register</h3>
          <p>
            Registration will give you full control over your reservations once
            your account has been approved.
          </p>
          <form class="row">
            <div class="col-sm-6 justify-content-md-center">
              <div class="form-group">
                <label for="reg-fn">First Name</label>
                <input
                  v-model="firstname"
                  name="firstname"
                  class="form-control"
                  type="text"
                  id="reg-fn"
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="reg-ln">Last Name</label>
                <input
                  v-model="lastname"
                  name="lastname"
                  class="form-control"
                  type="text"
                  id="reg-ln"
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="reg-email">E-mail Address</label>
                <input
                  v-model="email"
                  name="email"
                  class="form-control"
                  type="email"
                  id="reg-email"
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="reg-phone">Phone Number</label>
                <input
                  v-model="phone"
                  name="phone"
                  class="form-control"
                  type="text"
                  id="reg-phone"
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="reg-pass">Password</label>
                <input
                  v-model="password"
                  name="password"
                  class="form-control"
                  type="password"
                  id="reg-pass"
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="reg-pass-confirm">Confirm Password</label>
                <input
                  v-model="passwordConfirm"
                  class="form-control"
                  type="password"
                  id="reg-pass-confirm"
                  required
                />
              </div>
            </div>
            <div
              class="d-flex flex-wrap justify-content-between padding-bottom-1x"
            >
              <div class="custom-control custom-checkbox">
                <p>
                  Already registered?
                  <a href="/login">Login here</a>
                </p>
              </div>
              <!-- <a class="navi-link" href="account-password-recovery.html">Forgot password?</a> -->
            </div>
            <div class="col-12 text-center text-sm-right">
              <!-- <button
                class="btn btn-primary margin-bottom-none"
                style="color:white;"
                @click="register"
              >Register</button>-->
              <a
                class="btn btn-primary margin-bottom-none"
                style="color:white;"
                @click="register"
                >Register</a
              >
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="registrationFailed"
        class="alert alert-danger alert-dismissible fade show text-center margin-bottom-1x"
      >
        <span class="alert-close" data-dismiss="alert"></span>
        <i class="icon-slash"></i>&nbsp;&nbsp; Customer account already exists.
        <span class="text-medium">
          <a href="/login">Login</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "Register",
  data() {
    return {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirm: "",
      registrationFailed: false,
    };
  },
  methods: {
    register() {
      if (
        this.firstname == "" ||
        this.lastname == "" ||
        this.phone == "" ||
        this.email == "" ||
        this.password == ""
      ) {
        console.log("Fields must not be empty....");
      } else {
        this.$vs.loading({ type: "material" });
        console.log("Submitting info....");
        this.axios
          .post(`${axios.axios.defaults.baseURL}/account`, {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            countrycode: "NGN",
            phone: this.phone,
            password: this.password,
            Organisation: "ACEGID",
            AccountType: "Customer",
          })
          .then((response) => {
            console.log(response.data);
            console.log("Validating response....");
            if (response.data.succeded == true) {
              this.$vs.loading.close();
              this.$router.push({ name: "AccountConfirmation" });
            } else {
              console.log(response.data.errors);
              this.registrationFailed = true;
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
