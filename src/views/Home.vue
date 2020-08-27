<template>
  <div class="home">
    <div class="container">

      <h2 class="display-4">Regulae</h2>
      <h3>Craft your rule of life</h3>
      <div class="row">
        <div class="col-lg-4 col-md-4 pt30 pb30 text-center">
          <div class="icon-bg">
            <i class="icon-Leafs fa-4x mb20"></i>
            <h2>A Plan of Life</h2>
            <p>
                Regulae is an app that helps plan your "rule of life". This is a long enduring practice that is helpful towards anybody. It helps center the person on a regular rhythm.
            </p>
              <a href="/categories/new" class="btn btn-white-outline">
                Start Here
            </a>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 pt30 pb30 text-center">
          <div class="icon-bg" id="home-2">
            <i class="icon-Tactic fa-4x mb20"></i>
            <h2>Set a Course</h2>
            <p>
                Start by identifying the areas of life. Then identify the areas you need to grow in to become that person. What are the habits you need to do daily, weekly, monthly in order to see that growth fully realized?
            </p>
            <a href="/categories" class="btn btn-white-outline">
                Categories
            </a>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 pt30 pb30 text-center">
          <div class="icon-bg" id="home-3">
            <i class="icon-Flag-3 fa-4x mb20"></i>
            <h2>Evaluate</h2>
            <p>
                Regulae is designed to acknowledge when you are hitting your stride - not punish you for missing a mark. Evaluate how you are approaching goals and adjust. 
            </p>
            <a href="/habits" class="btn btn-white-outline">
                Habits Map
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home .container {
  width: 90 hmax;
}

.home .row {
  height: 485px;
}

.home h3 {
  font-weight: 200;
  color: #2b3a67;
}

.home .display-4 {
  font-family: "Libre Baskerville", serif;
  color: #62d075;
}

.icon-bg {
  border-radius: 15px;
  background-color: #65b96e;
}

#home-2 {
  background-color: #f3d268;
}
#home-3 {
  background-color: #54a3c8;
}
.icon-bg h2 {
  color: white;
  font-weight: 700;
}

.icon-bg p {
  line-height: 1.6em;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {};
  },
  created: function () {},
  mounted: function () {},

  methods: {},
};
</script>
