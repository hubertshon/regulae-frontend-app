<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-light navbar-transparent bg-white fixed-top">
        <a
          class="navbar-brand font700"
          href="/"
          >REGULAE</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-demos"
          aria-controls="navbar-demos"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar-demos">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="/">Welcome</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/logout">Log Out</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/tutorial">Tutorial </a>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <a class="nav-link" href="/habits">Habits Chart</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <a class="nav-link" href="/categories">Categories</a>
            </li>
            <li v-if="isLoggedIn()">
              <a type="button" class="btn btn-success mb5" href="/categories/new">NEW CATEGORY</a>
            </li>
            <li v-if="isLoggedIn()">
              <a type="button" class="btn btn-success mb5" href="/habits/new">NEW HABIT</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn()">
              <a
                href="/login"
                class="btn bg-primary mb5 text-white"
                >Log In</a
              >
            </li>
            <li class="nav-item" v-if="!isLoggedIn()">
              <a         
                href="/signup"
                class="btn btn-success mb5 text-white"
                >Sign Up</a
              >
            </li>
          </ul>
        </div>
    </nav>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="User Info"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="User Info">Account Info</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form v-on:submit.prevent="editUser()">
              <div class="modal-body">
                First Name:
                <input
                  type="text"
                  class="form-control"
                  v-model="user_info.first_name"
                  required
                />
                Last Name:
                <input
                  type="text"
                  class="form-control"
                  v-model="user_info.last_name"
                  required
                />
                Email:
                <input
                  type="text"
                  class="form-control"
                  v-model="user_info.email"
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  style="color:red"
                  class="btn btn-link"
                  data-dismiss="modal"
                >
                  Delete Account
                </button>
                <input
                  type="submit"
                  class="btn btn-secondary"
                  value="Save Changes"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--Main Page-->
      <div id="container">
        <router-view />
      </div>
      <!--Footer-->
      <div class="bg-dark">
        <footer class="container text-left py-5">
          <div class="row">
            <div class="col-12 col-md">
              <h5 class="font500">
                <img src="images/logo-a-light.png" alt="" />
              </h5>
              <small class="d-block mb-3 text-muted"
                >&copy; 2020 Regulae </small
              >
            </div>
            <div class="col-6 col-md">
              <ul class="list-unstyled text-small">
                <li>
                  <a
                    class="btn btn-teal"
                    target="_blank"
                    href="https://wrapbootstrap.com/user/design_mylife"
                    >Support</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <ul class="list-unstyled text-small">
                <li>
                  <span class="text-muted d-block pb-4"
                    >Stay tuned for latest updates</span
                  >
                  <a
                    target="_blank"
                    href="https://www.facebook.com/rakeshdesigns/"
                    ><i class="icon-Facebook fs-2x mr-3"></i
                  ></a>
                  <a target="_blank" href="https://twitter.com/rakesh_wd"
                    ><i class="icon-Twitter fs-2x"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
    </div>
  </div>
</template>

<style>
* {
  font-family: "Raleway", sans-serif;
}
body {
  background-color: rgb(247, 247, 247);
  height: 100vmax;
  margin-top: 5vh;
}

nav .btn {
  margin-right: 1vw;
  font-size: 0.9em;
}
</style>
<script>
import axios from "axios";
import InlineSvg from "vue-inline-svg";

export default {
  components: {
    InlineSvg,
  },
  data: function () {
    return {
      user_info: {},
    };
  },
  created: function () {
    axios
      .get(`/api/users/${localStorage.getItem("user_id")}`)
      .then((response) => {
        this.user_info = response.data;
        console.log(response.data);
      });
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    deleteUser: function () {
      axios.delete(`/api/users/${localStorage.getItem("user_id")}`);
      this.$router.push("/delete_confirm");
    },
    editUser: function () {
      var params = {
        first_name: this.user_info.first_name,
        last_name: this.user_info.last_name,
        email: this.user_info.email,
      };
      axios
        .patch(`/api/users/${localStorage.getItem("user_id")}`, params)
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>
