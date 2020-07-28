<template>
  <div class="habits-new">
    <form v-on:submit.prevent="createHabit()" class="new-habit">
      Name:<input type="text" v-model="newHabitName">
      Notes:<input type="text" v-model="newHabitNotes">
      Frequency:<input type="number" v-model="newHabitFrequency">
      Factor:<input type="text" v-model="newHabitFactor">
      Duration:<input type="text" v-model="newHabitDuration">
      Complete By:<input type="date" v-model="newHabitCompleteBy">
      <div class="form-group">
        <label for="categorySelect">Category:</label>
        <select class="form-control" id="categorySelect" v-model="newHabitCategoryId">
          <option v-for="category in categories" v-bind:value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <p v-for="error in errors">{{ error }}</p>
      <input type="submit" value="Create Habit">
    </form>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newHabitName: "",
      newHabitNotes: "",
      newHabitStatement: "",
      newHabitFrequency: "",
      newHabitFactor: "",
      newHabitDuration: "",
      newHabitCompleteBy: "",
      newHabitCategoryId: "",
      categories: [],
      errors: [],
    };
  },
  created: function () {
    axios.get(`/api/categories`).then((response) => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },
  methods: {
    createHabit: function () {
      var params = {
        name: this.newHabitName,
        notes: this.newHabitNotes,
        statement: this.newHabitStatement,
        frequency: this.newHabitFrequency,
        factor: this.newHabitFactor,
        duration: this.newHabitDuration,
        complete_by: this.newHabitCompleteBy,
        category_id: this.newHabitCategoryId,
        // user_id: getUserId(),
        // category_id: this.newCategoryId
      };
      axios
        .post("/api/habits", params)
        .then((response) => {
          console.log("Success", response.data);
          this.$router.push(`/categories/${this.newHabitCategoryId}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>