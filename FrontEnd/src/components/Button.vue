<template>
  <button :class="buttonClass" v-on:click="handleClick">
    {{ label }}
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: function (value) {
        return ["search", "add-to-cart"].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    buttonClass: function () {
      if (this.type === "search") {
        return "searchbtn";
      } else if (this.type === "add-to-cart") {
        return "cart";
      }
    },
    label: function () {
      if (this.type === "search") {
        return "Search";
      } else if (this.type === "add-to-cart") {
        return "Add to Cart";
      }
    },
  },
  methods: {
    handleClick: function () {
      if (this.type == "search") {
        this.sendData();
      }
    },
    sendData() {
      console.log("sent");
      var bol = 1;
      this.$emit("data-emitted", bol);
    },
  },
};
</script>

<style>
.searchbtn {
  cursor: pointer;
  height: 45px;
  width: 10%;
  border-radius: 30px;
  color: white;
  background-color: rgba(0, 179, 200, 255);
  border: 0;
  outline: 0;
  font-size: 100%;
  margin-right: auto;
}

.cart {
  height: 30px;
  width: 98%;
  cursor: pointer;
  align-self: center;
  border-radius: 10px;
  border-color: transparent;
  color: white;
  background-color: rgb(4, 180, 204);
  text-align: center;
  margin-left: 2px;
  margin-top: 5px;
}
</style>
