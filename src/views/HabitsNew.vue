<template>
  <div class="habits-new">
    <form v-on:submit.prevent="createHabit()" class="new-habit">

      <div class="form-group">
      *Name:<input class="form-control" type="text" v-model="newHabitName" required>
      Notes:<input class="form-control" type="text" v-model="newHabitNotes">
      *Frequency:<input class="form-control" type="number" v-model="newHabitFrequency" required>

        <label for="factorSelect">Time Length:</label>
        <select class="form-control" id="factorSelect" v-model="newHabitFactor" required>
          <option v-bind:value="28">per Day</option>
          <option v-bind:value="4">per Week</option>
          <option v-bind:value="1">per Month</option>
        </select>
      </div>


      <div class="form-group">
        <div class="form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="durationOrDate">
          <label class="form-check-label" for="inlineRadio1">Number of Months</label>
        </div>
        <div class="form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" v-model="durationOrDate">
          <label class="form-check-label" for="inlineRadio2">Complete By Date</label>
        </div>
        <div class="form-group">
        Duration:<input type="text" v-model="newHabitDuration" :disabled="durationOrDate == 2 || !!newHabitCompleteBy">
        Complete By:<input type="date" v-model="newHabitCompleteBy" :disabled="durationOrDate == 1 || !!newHabitDuration">
        </div>
      </div>

      <div class="form-group">
        <label for="categorySelect">*Category:</label>
        <select class="form-control" id="categorySelect" v-model="newHabitCategoryId" required>
          <option v-for="category in categories" v-bind:value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <p v-for="error in errors">{{ error }}</p>
      <input type="submit" value="Create Habit">
    </form>
  </div>
</template>

<style>
#factorSelect {
  width: 225px;
}
.form-group {
  width: 55%;
}
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
      durationOrDate: "1",
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
    setDurationOrDate: function (number) {
      this.durationOrDate = number;
      console.log(this.durationOrdate);
    },
    // durationOrDate: function () {
    //   if ()
    // }
  },
};
</script>