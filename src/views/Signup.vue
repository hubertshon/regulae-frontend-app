<template>
  <div class="signup">
    <h1>Account Signup</h1>
    <p class="text-danger" v-for="error in errors">{{ error }}</p>
    <p>{{ message }}</p>
    <form v-on:submit.prevent='submit()'>
      <ul>
      <li><label>First Name:</label>
      <input type="text" v-model="first_name" required></li>
      <li><label>Last Name:</label>
      <input type="text" v-model="last_name" required></li>
      <li><label>Email:</label>
      <input type="email" v-model="email" required></li>
      <li><label>Password:</label>
      <input type="password" v-model="password" required></li>
      <li><label>Password Confirmation:</label>
      <input type="password" v-model="passwordConfirmation" required></li>
      <li><input type ="submit" value="Submit"></li>
      </ul>
    </form>

  </div>
</template>

<style>
.text-danger {
  color: red;
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