<template>
  <div class="habits-new">
    <form v-on:submit.prevent="createHabit()" class="new-habit">
      Name:<input type="text" v-model="newHabitName">
      Notes:<input type="text" v-model="newHabitNotes">
      Frequency:<input type="number" v-model="newHabitFrequency">
      Factor:<input type="text" v-model="newHabitFrequency">
      Duration:<input type="text" v-model="newHabitFrequency">
      Complete By:<input type="date" v-model="newHabitFrequency">
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
      newHabitStatement: "",
      newHabitFrequency: "",
      newHabitFactor: "",
      newHabitDuration: "",
      NewHabitCompleteBy: "",
    };
  },
  methods: {
    createHabit: function () {
      var params = {
        name: this.newHabitName,
        statement: this.newHabitStatement,
        frequency: this.newHabitFrequency,
        factor: this.newHabitFactor,
        duration: this.newHabitDuration,
        complete_by: this.NewHabitCompleteBy,
        // user_id: getUserId(),
        // category_id: this.newCategoryId
      };
      axios.post("/api/habits", params).then((response) => {
        console.log("Success", response.data);
        this.$router.push(`/habits/${response.data.id}`);
      });
    },
  },
};
</script>