<template>
  <div class="product" v-for="(item, index) in products.products">
    <div @mouseover="hover = index" @mouseleave="hover = -1">
      <div style="align-items: center"><img v-bind:src="item.Image[0]" /></div>
      <p id="title">{{ item.name }}</p>
      <p id="moq">MOQ {{ item.MOQ }} {{ item.piece }}</p>
      <p id="price">$ {{ item.price }} / {{ item.piece }}</p>
      <Button_comp type="add-to-cart" v-if="hover === index"></Button_comp>
    </div>
  </div>
</template>
<script setup>
import Button_comp from "./Button.vue";
</script>
<script>
export default {
  props: ["products"],
  data() {
    return {
      hover: -1,
    };
  },
  methods: {},
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  border-width: 1px;
  margin-left: 20px;
  border: 2px solid transparent;
  width: 28%;
  height: 330px;
  margin-top: 5px;
  border-radius: 10px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  background-color: white;
  z-index: 0;
  cursor: pointer;
}
.product:hover {
  box-shadow: 1px 1px 2px 2px gray;
}
img {

  width: 70%;
  height: 180px;
  margin: 20px auto auto 40px;
  /* margin: auto; */
}
#title {
  text-transform: capitalize;
  margin-left: 5px;
  text-decoration: none;
  color: inherit;
}

#moq {
  text-transform: capitalize;
  white-space: nowrap;
  color: rgb(105, 105, 105);
  margin-left: 5px;
}

#price {
  text-transform: capitalize;
  margin-left: 5px;
  font-weight: bold;
}
@media screen and (max-width: 1109px) {
  .product {
    width: 30%;
  }
}
@media screen and (max-width: 681px) {
  .product {
    width: 45%;
  }
  @media screen and (max-width: 491px) {
    .product {
    width: 40%;
  }
  img {
  
  width: 75%;
  height: 180px;
  margin: 20px auto auto 20px;
}
}
}


</style>
