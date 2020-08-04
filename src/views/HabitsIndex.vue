<template>
  <div class="habits-index">
    <p>Habits Map</p>

  <div id="my_dataviz"></div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      habits: [],
    };
  },
  created: function () {
    axios.get("/habits").then((response) => {
      this.habits = response.data;
      console.log(response.data);
    });
  },
};
</script>
