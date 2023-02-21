<template>
  <input
    :type="type"
    :placeholder="label"
    id="numberinputMOQ"
    v-model="change"
  />
</template>
<script setup></script>
<script>
export default {
  props: ["label", "type"],
  data() {
    return {
      change: "",
    };
  },
  watch: {
    change: function (newVal, oldVal) {
      this.update();
    },
  },
  methods: {
    update() {
      if (this.label == "Less Than") {
        this.sendData(this.change);
      } else {
        this.sendSearch(this.change);
      }
    },
    sendData(val) {
      this.$emit("data-emitted", val);
    },
    sendSearch(val) {
      console.log("oh niceee---");

      this.$emit("data-emitted-search", val);
    },
  },

  created() {},
  computed: {},
};
</script>

<style scoped>
#numberinputMOQ {
  width: 85%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid #e2e8f0;
  outline: 0px;
  text-align: center;
  font-size: 100%;
  color: black;
  float: left;
}
</style>
