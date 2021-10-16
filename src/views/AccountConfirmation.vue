<template>
  <div class="OrderConfirmation">
    <div class="container padding-bottom-3x mb-2">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="alert alert-success fade show margin-bottom-1x">
            <!-- <span class="alert-close" data-dismiss="alert"></span> -->
            <h3>Your request for access has been recorded!</h3>
            <hr />
            <h5>An email containing the status of your application will be sent to you immediately our administrators review it.</h5>
          </div>
          <div class="column">
            <router-link :to="{name: 'Login'}" class="btn btn-outline-secondary">
              <i class="icon-arrow-left"></i>
              &nbsp;Back to Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
