<template>
  <div id="main">
    <div id="headertop">  <headertop></headertop></div>
   
    <!-- <i class="icon-boxMenu text-blue text-2.5xl"></i> -->
    

      <div><searchbox></searchbox></div>
     
   
    <div class="leftspace">
      <!-- <div  v-for="(item, index) in filtblog[0]"
              :key="item.id"><h3> {{ item.name }}</h3></div> -->
    </div>
  </div>
  <div>
    <filterboxVue></filterboxVue>
  </div>
  <div class="Rightbox">
    <products></products>
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
    return {
      productName: "",
      productPrice: "",
      pp: [],
    };
  },
  computed: {
    products() {
      // const products = this.$store.state.products;
      // console.log("o?", products);
      // console.log("products==", this.$store.state.products);
      // this.pp = this.$store.state.products;
      // console.log("pp=", this.pp);

      return this.$store.state.products;
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("fetchProducts", "http://localhost:5000/Products");
    this.$store.dispatch("storeLatestSlug", "http://localhost:5000/Products");
    this.$store.dispatch("fetchCategory", "http://localhost:5000/MainCategory");
    this.$store.dispatch("fetchcert", "http://localhost:5000/Products");
    // this.$store.commit("setmodalfase");
    // this.$store.commit("setmodaltrue");

    // const cat = this.$store.state.products;
    // console.log("categ", cat);
    // const cat = this.$store.state.Category;
    // console.log("categ", cat);
    // this.products = this.$store.state.products;
    // console.log("nice", this.products);
  },
};
</script>
<style scoped>
/* #main {
        
      } */

.leftbox {
  border: 2px solid #e2e8f0;
  width: 24%;
  height: 1000px;
  margin-top: 20px;
  float: left;
  margin-left: 2px;
}
#headertop
{
  width: 100%;
  height: 73px;
  /* border: 2px solid black; */
}

.leftspace {
  width: 5%;
  height: 1000px;
  margin-top: 5px;
  float: left;
}

/* #searchbox {
  background-color: rgba(242, 242, 242, 255);
  width: 90%;
  height: 70px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0px auto;
  border-radius: 10px;
  border: 2px solid black;
 
} */

.Rightbox {
  /* border: 2px solid black; */
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

.modal {
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  /* background:rgba(242, 242, 242, 255); */
 
  transform: none;
  background-color: rgba(242, 242, 242, 255);
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px auto 0px 62px;
  border-radius: 10px;
  position: fixed;
   z-index:1000;
}

.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  opacity: 0.6;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
