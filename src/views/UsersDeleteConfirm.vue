<template>
  <div class="usersdeleteconfirm">
    <p>The account has been deleted</p>
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
    return {};
  },
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.router.push("/");
  },
};
</script>