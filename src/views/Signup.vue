<template>
  <div class="signup">
    <div class="container">
      <h1>Account Signup</h1>
      <p class="text-danger" v-for="error in errors">{{ error }}</p>
      <p>{{ message }}</p>
      <div class="form-group">
        <form v-on:submit.prevent='submit()'>
   
          <label>First Name:</label>
          <input type="text" class="form-control" v-model="first_name" required>
          <label>Last Name:</label>
          <input type="text" class="form-control" v-model="last_name" required>
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" required>
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" required>
          <label>Password Confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" required></li>
          <input type="submit" class="btn btn-primary" value="Submit">

        </form>
      </div>

    </div>
  </div>
</template>

<style>
.signup .container h1 {
  color: "slategray";
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      message: "",
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.message = "Account Created";
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>