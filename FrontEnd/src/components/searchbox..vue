<template>
  <div>
    <div id="searchbox">
      <div
        id="catbtn"
        v-on:click="showModal = !showModal"
        :style="{ backgroundColor: catbtnColor }"
      >
        <img
          src="https://img.icons8.com/material-outlined/24/0096FF/four-squares.png"
        />
        <p>Categories</p>
      </div>
      <div id="searchouter">
        <input
          id="search"
          type="text"
          v-model="search"
          placeholder="  What are you looking for?"
        />
        <div class="vl"></div>
        <select class="dropdown" id="alphalist" v-model="selected">
          <option selected>All Categories</option>
          <option
            v-for="item in Cat.MainCategories"
            v-bindvalue="item.MainCategory_name"
          >
            {{ item.MainCategory_name }}
          </option>
        </select>
      </div>

      <button id="searchbtn" v-on:click="fs">Search</button>
    </div>
  </div>
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

<script>
export default {
  data() {
    return {
      products: [],
      slug: "",

      selected: "All Categories",
      search: "",
      showModal: false,
    };
  },
  computed: {
    Cat() {
      return this.$store.state.Category;
    },
    catbtnColor() {
      return this.showModal
        ? "rgba(255,255,255,1)"
        : "rgba(242, 242, 242, 255)";
    },
  },
  methods: {
    handle_main: function (val) {
      (this.showModal = false), (this.selected = val);
      this.McatData = this.Cat.MainCategories.filter((el) => {
        return el.MainCategory_name == val;
      });
      this.$store.dispatch("storeMcatSelected", this.McatData);

      this.slug = "http://localhost:5000/products?MainCategory_name=" + val;
      this.$store.commit("setmodaltrue");

      this.$store.dispatch("fetchProducts", this.slug);
      this.$store.dispatch("fetchcert", this.slug);
      this.$store.dispatch("ChangeUrl", this.slug);
      this.$store.dispatch("storeLatestSlug", this.slug);
    },
    handle_sub: function (val) {
      this.showModal = false;
      this.McatData = this.Cat.MainCategories.filter((category) => {
        return category.subcategories.some(
          (subcategory) => subcategory.subcategory_name === val
        );
      });
      this.$store.dispatch("storeMcatSelected", this.McatData);
      this.slug = "http://localhost:5000/products?subcategory_name=" + val;
      this.$store.commit("setmodaltrue");
      this.$store.dispatch("fetchProducts", this.slug);
      this.$store.dispatch("storeLatestSlug", this.slug);
      this.$store.dispatch("fetchcert", this.slug);
      this.$store.dispatch("ChangeUrl", this.slug);
    },
    fs() {
      this.$store.commit("setmodalfase");

      this.slug = "http://localhost:5000/products";

      if (this.search != "" && this.selected != "All Categories") {
        this.$store.commit("setmodaltrue");
        this.slug =
          this.slug +
          "?name=" +
          this.search +
          "&MainCategory_name=" +
          this.selected;
      } else if (this.search != "") {
        this.slug = this.slug + "?name=" + this.search;
      } else if (this.selected != "All Categories") {
        this.McatData = this.Cat.MainCategories.filter((el) => {
          return el.MainCategory_name == this.selected;
        });
        this.$store.dispatch("storeMcatSelected", this.McatData);

        this.$store.commit("setmodaltrue");

        this.slug = this.slug + "?MainCategory_name=" + this.selected;
      }
      this.$store.dispatch("fetchProducts", this.slug);
      this.$store.dispatch("storeLatestSlug", this.slug);
      this.$store.dispatch("fetchcert", this.slug);
      this.$store.dispatch("ChangeUrl", this.slug);
    },
  },
};
</script>

<style scoped>
#searchbox {
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
}
#searchouter {
  width: 75%;
  height: 40px;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  background-color: white;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.vl {
  border-left: 2px solid rgba(232, 237, 244, 255);
  height: 20px;
  margin-left: 2px;
}
#catbtn {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 45px;
  width: 12%;
  border-radius: 30px;
  color: black;
  background-color: rgba(242, 242, 242, 255);
  border: 0;
  outline: 0;
  font-size: 100%;
  align-items: center;
  justify-content: center;

  text-align: center;
  margin: auto;
}
p{
  margin: auto auto auto auto;
}
img
{
  align-self: flex-start;
  width: 20%;

  margin: auto 0px auto 20px;
}
#transcontainer
{
  width: 10%;


  margin: 10px 0px 6px 30px;
  text-align: left;
  z-index: 1;





}
#transhmain
{
  font-size: smaller;

  font-weight: bold;
  cursor: pointer;

}
#transhmain:hover
{
  color: #29b574;
}
#transub:hover
{
  color: #29b574;
}

#transub
{
  cursor: pointer;
  width: 100%;
  margin: 2px 0px 0px 0px;
  font-size: x-small;
}


.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
}
#search {
  background-color: white;

  width: 73%;
  height: 20px;

  border-color: white;
  border: 0;
  outline: 0;
  text-align: left;
  margin-left: 3px;
  font-size: 100%;
}

#searchbtn {
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
.dropdown {
  width: 25%;
  --text-opacity:1,
  display: inline-block;
  background-color: white;
  border-radius: 10px;
  outline: none;
  transition: all 0.5s ease;
  position: relative;
  vertical-align: center;
  font-size: 15px;
  margin-left: 4px;
  color: rgba(203,213,224,var(--text-opacity));
  height: 20px;
  border-color: white;
  border: 0;
  outline: 0;
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

.button {
  border: none;
  color: rgba(242, 242, 242, 255);
  background: #42b983;
  appearance: none;
  font: inherit;
  font-size: 1.8rem;
  padding: 0.5em 1em;
  border-radius: 0.3em;
  cursor: pointer;
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

  margin: 0px auto 0px 62px;
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
