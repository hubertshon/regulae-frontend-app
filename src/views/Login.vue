<template>
  <div class="login">
    <h2>Login</h2>
    <p class="text-danger" v-for="error in errors">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
    <form v-on:submit.prevent="submit()" v-else>
      <label>Email:</label>
      <input type="email" v-model="email" />
      <label>Password:</label>
      <input type="password" v-model="password" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
      message: "",
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password"];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
