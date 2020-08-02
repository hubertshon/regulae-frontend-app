<template>
  <div class="categories-new">
    <form v-on:submit.prevent="createCategory()" class="new-category">
      *Name:<input class="form-control" type="text" v-model="newCategoryName" required>
      Statement:<input type="text" class="form-control"  v-model="newCategoryStatement">
      Image URL:<input type="text" class="form-control"  v-model="newCategoryImageUrl">
      <input type="submit" class="btn btn-success btn" value="Create Category">
    </form>

    <div class="category-help">
      <h5> How would you like to develop? </h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut consequat. Odio euismod lacinia at quis risus. Imperdiet proin fermentum leo vel. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Risus quis varius quam quisque id diam. Auctor elit sed vulputate mi sit amet. Eu nisl nunc mi ipsum faucibus. Massa eget egestas purus viverra accumsan in nisl. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Molestie a iaculis at erat pellentesque.</p><br>

      <h5>Arcu dictum varius duis at consectetur.</h5> 
      <p>Lectus sit amet est placerat in. Fusce ut placerat orci nulla pellentesque dignissim. Congue eu consequat ac felis donec et. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Commodo nulla facilisi nullam vehicula. Sed blandit libero volutpat sed cras ornare arcu. Et ultrices neque ornare aenean euismod. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Lectus nulla at volutpat diam ut. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. At augue eget arcu dictum varius. Velit euismod in pellentesque massa placerat. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Dui nunc mattis enim ut tellus elementum. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Auctor elit sed vulputate mi sit amet. Egestas pretium aenean pharetra magna.</p><br>

      <h5>Amet consectetur adipiscing elit pellentesque habitant morbi.</h5> 
      <p>Mauris a diam maecenas sed enim. Enim ut sem viverra aliquet. Pretium aenean pharetra magna ac placerat vestibulum lectus. Sed augue lacus viverra vitae congue eu consequat ac. Faucibus vitae aliquet nec ullamcorper sit amet risus. Tortor condimentum lacinia quis vel. Nec ullamcorper sit amet risus nullam eget. Ullamcorper eget nulla facilisi etiam dignissim diam. Proin fermentum leo vel orci. At auctor urna nunc id. Amet cursus sit amet dictum sit. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Sociis natoque penatibus et magnis dis. Tortor vitae purus faucibus ornare. Nec ullamcorper sit amet risus nullam eget felis eget. </p><br>

      <h5>Et ultrices neque ornare aenean.</h5> 
      <p>Diam vel quam elementum pulvinar etiam non quam. Eget velit aliquet sagittis id consectetur. Enim sit amet venenatis urna cursus eget nunc scelerisque. Mauris nunc congue nisi vitae suscipit tellus. Pellentesque nec nam aliquam sem et tortor consequat id. Vulputate ut pharetra sit amet. Tellus orci ac auctor augue mauris augue. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Dui id ornare arcu odio ut sem nulla.</p>
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
      newCategoryImageUrl: "",
    };
  },
  methods: {
    createCategory: function () {
      var params = {
        name: this.newCategoryName,
        statement: this.newCategoryStatement,
        image_url: this.newCategoryImageUrl,
      };
      axios.post("/api/categories", params).then((response) => {
        console.log("Success", response.data);
        this.$router.push(`/categories`);
      });
    },
  },
};
</script>