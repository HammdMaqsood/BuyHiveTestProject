<template>
  <div v-if="Catbol">
    <div class="customspace"></div>
    <div class="container">
      <div id="pcertouter">
        <inputComp
          label="More Categories...."
          @data-emitted-search="recsearch"
        ></inputComp>
      </div>
    </div>
    <div class="customspace"></div>
    <div id="catcontainer">
      <label
        @click="Fetch_Main(McatData[0].MainCategory_name)"
        id="labelcatMain"
      >
        {{ McatData[0].MainCategory_name }}</label
      >
      <div v-for="item in Mcatfilt">
        <label @click="Fetch_Sub(item.subcategory_name)" id="labelcat">
          {{ item.subcategory_name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import inputComp from "./InputBox.vue";
</script>

<script>
export default {
  data() {
    return {
      McatSearch: "",
      Mcat: [],
      Mcatbol: true,
      Maincat: "",
    };
  },
  watch: {},

  created() {},
  computed: {
    Catbol() {
      return this.$store.state.modalbol;
    },
    products() {
      return this.$store.state.products;
    },
    McatData() {
      return this.$store.state.McatSelected;
    },
    Mcatfilt() {
      if (this.McatSearch != "") {
        return this.McatData[0].subcategories.filter((el) => {
          return el.subcategory_name.match(this.McatSearch);
        });
      } else {
        return this.McatData[0].subcategories;
      }
    },
    Cat() {
      return this.$store.state.Category;
    },
    McatSelected() {
      return this.$store.state.McatSelected;
    },
  },
  methods: {
    recsearch(data) {
      this.McatSearch = data;
    },
    Fetch_Main: function (val) {
      val = val.replace(/ /g, "_");

      const mainslug =
        "http://localhost:5000/Products?MainCategory_name=" + val;
      this.$store.dispatch("fetchProducts", mainslug);
      this.$store.dispatch("storeLatestSlug", mainslug);
      this.$store.dispatch("ChangeUrl", mainslug);
      this.$store.dispatch("fetchcert", mainslug);
    },
    Fetch_Sub: function (val) {
      val = val.replace(/ /g, "_");
      const mainslug = "http://localhost:5000/Products?subcategory_name=" + val;
      this.$store.dispatch("ChangeUrl", mainslug);
      this.$store.dispatch("storeLatestSlug", mainslug);

      this.$store.dispatch("fetchProducts", mainslug);
      this.$store.dispatch("fetchcert", mainslug);
    },
  },
};
</script>

<style scoped>
#labelcat {
  margin-left: 45px;
  font-size: smaller;
}
#labelcatMain {
  margin-left: 35px;
  font-size: 95%;
  color: black;
  font-weight: bold;
}
#labelsubcatcontainer {
  display: flex;
}

#labelsubcat {
  margin-left: 45px;
  font-size: smaller;
}

#catcontainer {
  display: flex;
  flex-direction: column;
}

#numberinputpcert {
  width: 87%;
  border-radius: 20px;
  height: 32px;
  background-color: rgba(242, 242, 242, 1);
  border: 2px solid transparent;
  margin: 2px auto auto 1px;
  outline: 0px;
  text-align: center;
  vertical-align: middle;
  font-size: 100%;
  color: black;
}

.customspace {
  height: 12px;
}
#pcertouter {
  width: 85%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid #e2e8f0;
  outline: 0px;
  font-size: 100%;
  color: black;
}
#numberinput {
  width: 40%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 2px solid #e2e8f0;
  outline: 0px;
  text-align: center;
  font-size: 100%;
  color: black;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
