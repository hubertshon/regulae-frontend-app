<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
h1 {
  font-size: 3em;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Regulae",
    };
  },
  created: function () {},
  methods: {},
};
</script>
