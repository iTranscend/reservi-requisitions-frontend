<template>
  <div class="complaints">
    <div class="page-title">
      <div class="container">
        <div class="column">
          <h1>Lab Maintenance</h1>
        </div>
      </div>
    </div>
    <section
      class="container padding-top-2x padding-bottom-1x mb-2"
      id="services"
    >
      <div class="form-group row">
        <label class="col-2 col-form-label" for="textarea-input"
          >Complaint</label
        >
        <div class="col-10">
          <textarea class="form-control" id="textarea-input" rows="6">
The workbench in lab 2 is cracked</textarea
          >
        </div>
      </div>
      <button
        @click="submitComplaint"
        class="btn btn-primary btn-sm"
        type="button"
      >
        Submit Complaint
      </button>
    </section>
  </div>
</template>

<script>
import axios from "../axios";
// import notify from "../notify.js";

export default {
  name: "Complaints",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      complaint: "",
      complaintSuccessful: false,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    submitComplaint() {
      if (this.complaint == "") {
        console.log("Fields must not be empty....");
        // TODO : Respond with toast
        this.$notify({
          group: "foo",
          type: "error",
          text: "Complaint field must not be empty!",
          speed: 150,
          position: "top right",
        });
        // notify("warning", "Complaint field must not be empty!");
      } else {
        this.$vs.loading({ type: "material" });
        console.log("Sending complaint....");
        this.axios
          .post(
            `${axios.axios.defaults.baseURL}/complaint`,
            {
              customerEmail: this.user.email,
              Message: this.complaint,
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
            console.log("Complaint submitted successfully!");
            // TODO display success toast
            this.$notify({
              group: "foo",
              type: "success",
              title: "Message",
              text: "Complaint submitted successfully!",
              position: "top right",
            });
            this.complaintSuccessful = true;
          })
          .catch((error) => {
            console.log(error.response);
            // TODO Display error message
            this.$vs.loading.close();
            this.$notify({
              group: "foo",
              type: "error",
              title: "Something went wrong",
              speed: 150,
              position: "top right",
            });
          });
      }
    },
  },
};
</script>
