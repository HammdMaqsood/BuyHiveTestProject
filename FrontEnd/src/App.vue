<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
router-link {
  text-decoration: none;
  color: inherit;
}
</style>
