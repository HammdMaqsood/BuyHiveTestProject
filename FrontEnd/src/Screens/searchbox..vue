<template>
  <div>
    <div id="searchbox">
      <div
        id="catbtn"
        v-on:click="showModal = !showModal"
        :style="{ backgroundColor: catbtnColor }"
      >
        <P
          ><img
            id="searchimg"
            src="https://img.icons8.com/material-outlined/24/0096FF/four-squares.png"
          />
        </P>

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
      <button_comp
        id="searchbtn"
        type="search"
        @data-emitted="fs"
      ></button_comp>
      <button class="searchbtn2" v-on:click="fs">
        <img id="searchimg" src="../assets/icons8-search-50.png" alt="" />
      </button>
    </div>
  </div>
  <modal
    :showModal="showModal"
    :Cat="Cat"
    @data-emitted-main="handle_main"
    @data-emitted-sub="handle_sub"
  ></modal>
</template>
<script setup>
import Button_comp from "../components/Button.vue";
import modal from "../components/modal.vue";
</script>

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
  watch: {
    bol: function (newVal, oldVal) {
      this.fs();
      console.log("watch is actibe");
    },
  },
  computed: {
    Cat() {
      return this.$store.state.Category;
    },
    catbtnColor() {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        return this.showModal
          ? "rgba(242, 242, 242, 255)"
          : "rgba(242, 242, 242, 255)";
      } else {
        return this.showModal
          ? "rgba(255,255,255,1)"
          : "rgba(242, 242, 242, 255)";
      }
    },
    catbtnborder() {
      return this.showModal ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)";
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
      this.selected = "All Categories";
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
      console.log("fsss");
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
.searchbtn2 {
    display: none;

  }

  #searchimg
  {
    height: 25px;
    margin: auto;
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
margin-left: 8px;}
#catimg
{

  height: 25px;

  margin: 3px 0px auto 20px;
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


@media screen and (max-width: 1023px) {
  .searchbtn2{
    display: block;
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
  #searchbtn
  {
    display: none;
  }
  #searchbtn2
  {
    display: none;
  }
#searchbox {
width: 100%;
height: auto;
margin: 10px 0;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
padding: 10px;
}
#catbtn {
position: absolute;
top: 100%;
left: 0;
width: 90%;
text-align: center;
margin-top: 10px;
margin-left: 20px;
z-index: 999;
border: 4px solid;
border-color: rgba(255,255,255,1);
}
#searchouter {
width: 80%;
height: auto;
margin-bottom: 10px;
}
#search {
width: 100%;
}
.dropdown {
display: none;
}
.vl
{
  display: none;
}
}
</style>
