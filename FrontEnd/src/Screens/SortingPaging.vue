<template>
  <div id="container">
    <div id="right"></div>
    <div id="left">
      <sort></sort>
      <div id="customspace"></div>
      <paging></paging>
    </div>
  </div>
</template>
<script setup>
import Sort from "../components/Sort.vue";
import paging from "../components/paging.vue";
</script>
<script>
export default {
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {},
  computed: {},
};
</script>
<style>
#container {
  height: 100px;
  width: 90%;
}

#right {
  width: 50%;
  height: 80px;
  float: left;
}
#left {
  display: flex;
  flex-direction: row;
  float: left;
  width: 50%;
  height: 80px;
}
#customspace {
  width: 5%;
}
@media screen and (max-width: 1109px) {
  #right
  {
    display: none;
  }
}
</style>
