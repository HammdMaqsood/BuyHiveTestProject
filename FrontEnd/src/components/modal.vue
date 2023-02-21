<template>
  <div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <div id="transcontainer" v-for="item in Cat.MainCategories">
          <h3 id="transhmain" @click="handle_main(item.MainCategory_name)">
            {{ item.MainCategory_name }}
          </h3>
          <p
            v-for="item in item.subcategories"
            id="transub"
            @click="handle_sub(item.subcategory_name)"
          >
            {{ item.subcategory_name }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup></script>

<script>
export default {
  props: ["showModal", "Cat"],

  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handle_main: function (val) {
      this.$emit("data-emitted-main", val);
    },
    handle_sub: function (val) {
      this.$emit("data-emitted-sub", val);
    },
  },
};
</script>

<style scoped>
#transcontainer {
  width: 10%;

  margin: 10px 0px 6px 30px;
  text-align: left;
  z-index: 1;
}
#transhmain {
  font-size: smaller;

  font-weight: bold;
  cursor: pointer;
}
#transhmain:hover {
  color: #29b574;
}
#transub:hover {
  color: #29b574;
}

#transub {
  cursor: pointer;
  width: 100%;
  margin: 2px 0px 0px 0px;
  font-size: x-small;
}
html {
  height: 100%;
  background: rgba(242, 242, 242, 255);
  color: #000;
  font-size: 62.5%;
}

body {
  min-height: 100%;
  margin: 0;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}
.modal {
  transform: none;
  background-color: rgba(242, 242, 242, 255);
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
  margin: 0px auto 0px 70px;
  z-index: 2;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: "";

  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0.6;
  cursor: pointer;
}
</style>
