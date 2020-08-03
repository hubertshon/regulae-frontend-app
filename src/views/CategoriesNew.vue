<template>
  <div class="categories-new">
    <form v-on:submit.prevent="createCategory()" class="new-category">
      *Name:<input class="form-control" type="text" v-model="newCategoryName" required>
      Statement:<input type="text" class="form-control"  v-model="newCategoryStatement">
      Image URL:<input type="file" class="form-control"  v-on:change="setFile($event)" ref="fileInput">

      <div class="form-group">
        <label for="colorSelect">Color:</label>
        <select class="form-control" id="colors">
          <option>Blue</option>
          <option>Red</option>
          <option>Gray</option>
          <option>Green</option>
          <option>Orange</option>
          <option>Magenta</option>
        </select>
      </div>
      
      <input type="submit" class="btn btn-success btn" value="Create Category">
    </form>

    <div class="category-help">
      <h5> How would you like to develop? </h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut consequat. Odio euismod lacinia at quis risus. Imperdiet proin fermentum leo vel. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Risus quis varius quam quisque id diam. Auctor elit sed vulputate mi sit amet. Eu nisl nunc mi ipsum faucibus. Massa eget egestas purus viverra accumsan in nisl. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Molestie a iaculis at erat pellentesque.</p><br>

      <h5>Arcu dictum varius duis at consectetur.</h5> 
      <p>Lectus sit amet est placerat in. Fusce ut placerat orci nulla pellentesque dignissim. Congue eu consequat ac felis donec et. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Commodo nulla facilisi nullam vehicula. Sed blandit libero volutpat sed cras ornare arcu. Et ultrices neque ornare aenean euismod. </p>

    
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCategoryName: "",
      newCategoryStatement: "",
      newCategoryImage: "",
    };
  },
  methods: {
    setFile: function () {
      if (event.target.files.length > 0) {
        this.newCategoryImage = event.target.files[0];
      }
    },
    createCategory: function () {
      var formData = new FormData();
      formData.append("name", this.newCategoryName);
      formData.append("statement", this.newCategoryStatement);
      formData.append("image_file", this.newCategoryImage);
      formData.appen("color", this.currentCategory.color);

      axios.post("/api/categories", formData).then((response) => {
        console.log("Success", response.data);
        this.$router.push(`/categories`);
      });
    },
  },
};
</script>