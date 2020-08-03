<template>
  <div>
    
    <svg
      :height="75 * 2"
      :width="75 * 2"
     >
       <circle
      stroke="darkgray"
         :stroke-dasharray="circumference + ' ' + circumference"
         :style="{strokeDashoffset: strokeDashoffset }"
         :stroke-width="2"
         fill="transparent"
         :r="normalizedRadius"
         :cx="75"
         :cy="75"
      />
    </svg>
  
  </div>
</template>

<style>
circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>

<script>
export default {
  name: "progress-ring",
  props: {
    radius: Number,
    progress: Number,
    stroke: Number,
  },
  data: function () {
    const normalizedRadius = 75 - 2 * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    return {
      // progress: "",
      normalizedRadius,
      circumference,
    };
  },

  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference;
    },
  },
};
</script>

