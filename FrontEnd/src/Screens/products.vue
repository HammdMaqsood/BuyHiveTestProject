<template>
  <sort></sort>
  <div class="containerright">
    <productCardComp v-bind:products="products"> </productCardComp>
  </div>
</template>
<script setup>
import sort from "../components/SortingPaging.vue";
import productCardComp from "../components/ProductCard.vue";
</script>

<script>
export default {
  data() {
    return {
      hover: -1,
    };
  },
  methods: {},
  mounted() {},
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style>
.containerright {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
