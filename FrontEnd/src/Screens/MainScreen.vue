<template>
  <div id="main">
    <div id="headertop"><headertop></headertop></div>
    <div><searchbox></searchbox></div>
    <div>
      <div class="leftspace"></div>
      <div>
        <filterboxVue></filterboxVue>
      </div>
      <div v-if="p_length != 0" class="Rightbox">
        <products></products>
      </div>
      <div v-else>
        <div class="product-not-found">
          <h2>Product not found</h2>
          <p>
            We're sorry, the product you are looking for is not available at
            this time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import products from "./products.vue";
import searchbox from "./searchbox..vue";
import filterboxVue from "./filterbox.vue";
import headertop from "./header.vue";
</script>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    p_length() {
      console.log("count==", this.products.productcount);
      return this.products.productcount;
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("fetchProducts", "http://localhost:5000/Products");
    this.$store.dispatch("storeLatestSlug", "http://localhost:5000/Products");
    this.$store.dispatch("fetchCategory", "http://localhost:5000/MainCategory");
    this.$store.dispatch("fetchcert", "http://localhost:5000/Products");
  },
};
</script>
<style scoped>
#headertop {
  width: 100%;
  height: 73px;
}

.leftspace {
  width: 5%;
  height: 1000px;
  margin-top: 5px;
  float: left;
}

.Rightbox {
  width: 70%;
  height: 1000px;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
}
#pcertouter {
  width: 85%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 2px solid #e2e8f0;
  outline: 0px;
  font-size: 100%;
  color: black;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.product-not-found {
  padding: 20px;
  text-align: center;
  margin: 100px auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 70%;
}
.product-not-found h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: red;
}
.product-not-found p {
  font-size: 16px;
  line-height: 1.5;
}
@media screen and (max-width: 1109px) {
  .leftspace {
    display: none;
  }
}
</style>
