<template>
  <div class="habits-index">
    <p>Habits Map</p>

    <div id="my_dataviz"></div>
  </div>
</template>

<style></style>


<script>
import axios from "axios";
// import Habitschart from "/components/Habitchart.js";
import * as d3 from "d3";

export default {
  data: function () {
    return {
      habits: [],
    };
  },
  created: function () {
    axios.get("/api/habits").then((response) => {
      this.habits = response.data;
      console.log(response.data);
      var margin = { top: 30, right: 30, bottom: 30, left: 170 },
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Data Methods
      var dates = [];
      this.habits.forEach(function (habit) {
        habit.completes.forEach(function (complete) {
          var rawDate = new Date(complete.date);
          dates.push(complete.date);
        });
      });

      function myDate(s) {
        var a = s.split(/-|\//);
        return new Date(a[0], a[1] - 1, a[2]);
      }
      function dmyOrdD(a, b) {
        return myDate(a) - myDate(b);
      }

      dates.sort(dmyOrdD);
      var myGroups = dates;

      var names = [];
      this.habits.forEach(function (habit) {
        names.push(habit.name);
      });
      var myVars = names;

      var finalData = [];

      this.habits.forEach(function (habit) {
        habit.completes.forEach(function (complete) {
          var newObject = {
            name: habit.name,
            factor: habit.factor,
            category_id: habit.category_id,
            color: habit.color,
            interval: Math.round(habit.factor / habit.frequency),
            date: complete.date,
          };
          finalData.push(newObject);
        });
        finalData = finalData.sort((a, b) => b.date - a.date);
      });

      // Build X scales and axis:
      var x = d3
        .scaleBand()
        .range([5, width])
        .domain(myGroups.sort())
        .padding(0.05);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("stroke-opacity", 0.25)
        .style("font-size", "11");

      // Build Y scales and axis:
      var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.1);
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .style("font-size", "14")
        .attr("stroke-width", 0);

      // Build color scale
      // var myColor = d3.scaleLinear()
      //   .range(["white", "#69b3a2"])
      //   .domain([1,100])

      //Enters the data
      svg
        .selectAll()
        .data(finalData, function (d) {
          return (
            d.date +
            ":" +
            d.name +
            ":" +
            d.factor +
            ":" +
            d.color +
            ":" +
            d.interval
          );
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.date);
        })
        .attr("y", function (d) {
          return y(d.name);
        })
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("width", function (d) {
          if (d.factor === 1) {
            return x.bandwidth() * d.interval;
          } else if (d.factor === 4) {
            return x.bandwidth() * d.interval;
          } else if (d.factor === 28) {
            return x.bandwidth() * d.interval;
          }
        })
        .attr("height", y.bandwidth())
        .style("stroke-width", 2)
        .style("stroke", "white")
        .style("fill-opacity", 0.2)
        .style("fill", function (d) {
          if (d) {
            return d.color;
          } else {
            return "gray";
          }
        });

      svg
        .selectAll("rect")
        .on("mouseover", function (d) {
          d3.selectAll("rect")
            .filter(function (e) {
              return e.name === d.name;
            })
            .transition("50")
            .style("fill-opacity", "1");
        })
        .on("mouseout", function (d) {
          d3.selectAll("rect")
            .filter(function (e) {
              return e.name === d.name;
            })
            .transition("100")
            .style("fill-opacity", 0.2);
        });
    });
  },
  methods: {},
  computed: {},
};
</script>

