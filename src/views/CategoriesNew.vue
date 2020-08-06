<template>
  <div class="category-new">
    <h2 class="display-4">New Category</h2>
    <form v-on:submit.prevent="createCategory()" class="new-category">
      <label>Name:</label><input class="form-control" type="text" v-model="newCategoryName" required><p class="text-muted">Required</p>
      <label>Statement:</label><input type="text" class="form-control"  v-model="newCategoryStatement">
      <label>Image:</label><input type="file" id="file-input" class="form-control"  v-on:change="setFile($event)" ref="fileInput">


      <div class="form-group">
        <label for="colorSelect">Color:</label>
        <select class="form-control" id="colors" v-model="newCategoryColor">
          <p class="text-muted">Required</p>
            <option value="#54A3C8">"Maximum Blue"</option>
            <option value="#DE6F4C">"Burnt Sienna (Red)"</option>
            <option value="#65B96E">"Bud Green"</option>
            <option value="#F3D268">"Orange Yellow Crayola"</option>
            <option value="#B16AB2">"Pearly Purple"</option>
            <option value="#626262">Dim Gray"</option>
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
.category-new {
  width: 60%;
  margin: auto;
  margin-top: 15vh;
}

.category-new label {
  font-size: 1.8em;
  font-weight: 400;
}

.category-new .form-control {
  margin-bottom: 1.5rem;
  background-color: rgba(255 255 255 0.25);
}

.category-new .file-input {
  width: 100px;
}

.category-help {
  margin-top: 5vh;
}
p {
  color: black;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCategoryName: "",
      newCategoryStatement: "",
      newCategoryImage: "",
      newCategoryColor: "",
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
      formData.append("color", this.currentCategory.color);

      axios.post("/api/categories", formData).then((response) => {
        console.log("Success", response.data);
        this.$router.push(`/categories`);
      });
    },
  },
};
</script>