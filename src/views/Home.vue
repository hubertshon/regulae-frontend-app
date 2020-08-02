<template>
  <div class="home">
    <h1 :style="{color: this.catColor}">{{ message }}</h1>
    <div>
      <img :src="icon_url">
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 3em;
}

circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>

<script>
import axios from "axios";

export default {
  components: {},
  data: function () {
    return {
      message: "Regulae",
      icon_url: "",
      catColor: "magenta",
    };
  },
  created: function () {
    // axios.get("/icons").then((response) => {
    //   this.icon_url = response.data;
    //   console.log(response.data);
    // });
  },
  mounted: function () {},
  methods: {},
};
</script>
