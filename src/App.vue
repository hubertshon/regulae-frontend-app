<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link> |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link><router-link v-if="isLoggedIn()" to="/logout" >Logout</router-link> |
      <router-link v-if="isLoggedIn()" to="/categories">Categories</router-link> | 
      <router-link v-if="isLoggedIn()" to="/categories/new">Add Category</router-link> | 
      <router-link v-if="isLoggedIn()" to="/habits/new">Add Habit</router-link> 
      <button v-if="isLoggedIn()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Account Info
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="User Info" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="User Info">Account Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              First Name: <input class="form-control" type ="text" v-model="user_info.first_name" required>
              Last Name: <input class="form-control" type ="text" v-model="user_info.last_name" required>
              Email: <input class="form-control" type ="text" v-model="user_info.email" required>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" style="color:red" class="btn btn-link" v-on:click="deleteUser()" data-dismiss="modal">Delete Account</button>
            <button type="button" class="btn btn-secondary" v-on:click="editUser()" data-dismiss="modal"> Save Changes</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<style>
/* #app { */
/* font-family: Avenir, Helvetica, Arial, sans-serif;
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

h1,
h2 {
  font-family: "PT Serif", serif;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
<script>
import axios from "axios";
export default {
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
