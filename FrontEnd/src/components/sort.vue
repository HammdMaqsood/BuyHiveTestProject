<template>
  <div id="container">
    <div id="right">
      
    </div>
    <div id="left">

      <div id="sortcontainer">
        <div class="dropdown">
          <div class="dropdown-toggle" @mouseenter="isOpen = true">
            <p id="selected">{{ selectedOption }}</p>
          </div>
          <div class="dropdown-menu" v-show="isOpen">
            <ul>
              <li
                @click="
                  sorting('Relevance');
                  selectedOption = 'Relevance';
                "
              >
                Relevance
              </li>
              <li
                @click="
                  sorting('lh');
                  selectedOption = 'Price Low to High';
                "
              >
                Price Low to High
              </li>
              <li
                @click="
                  sorting('hl');
                  selectedOption = 'Price High to Low';
                "
              >
                Price High to Low
              </li>
              <li
                @click="
                  sorting('MOQ');
                  selectedOption = 'MOQ Low to High';
                "
              >
                Price MOQ Low to High
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="customspace"></div>
      <div id="pagecontainer">
        <div class="arrowouter" @click="previouspage">
          <div>
            <img id="leftimg" src="../assets/left-arrow-line-symbol.png" />
          </div>
        </div>
        <div id="pagestartouter">
          <div>{{ products.currentPage }}</div>
        </div>
        <div id="pageendouter">
          <div>of {{ products.totalPages }}</div>
        </div>

        <div class="arrowouter" @click="nextpage">
          <div><img id="leftimg" src="../assets/next.png" /></div>
        </div>
      </div>
    </div>
    <div class="dropdown-wrapper"></div>
  </div>
  <!-- <button @click="nexpage">next</button> -->
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      sort: "default",
      selectedOption: "Relevance",
      isOpen: true,
      leftarrow: "<",
    };
  },
  watch: {},
  methods: {
    sorting(val) {
      this.isOpen = false;
      let baseSlug = this.slug;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug = baseSlug + "?page=" + this.page + "&sort=" + val;
        console.log("if");
      } else {
        console.log("else");
        baseSlug = baseSlug + "&page=" + this.page + "&sort=" + val;
      }
      console.log("this.selected==", val);

      this.$store.dispatch("fetchProducts", baseSlug);
      console.log("wtf?=", baseSlug);
    },
    nextpage() {
      this.page++;

      let baseSlug = this.slug;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug = baseSlug + "?page=" + this.page;
        console.log("if");
      } else {
        console.log("else");
        baseSlug = baseSlug + "&page=" + this.page;
      }
      console.log("this.selected==", this.page);

      this.$store.dispatch("fetchProducts", baseSlug);
      console.log("wtf?=", baseSlug);
    },
    previouspage() {
      this.page--;

      let baseSlug = this.slug;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug = baseSlug + "?page=" + this.page;
        console.log("if");
      } else {
        console.log("else");
        baseSlug = baseSlug + "&page=" + this.page;
      }
      console.log("this.selected==", this.page);

      this.$store.dispatch("fetchProducts", baseSlug);
      console.log("wtf?=", baseSlug);
    },
  },
  mounted() {},
  computed: {
    slug() {
      return this.$store.state.LatestSlug;
    },
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style>
#leftimg {
  width: 15px;
  height: 15px;
  margin: auto;
}

#selected {
  margin-left: 10px;
  margin-top: 6px;
}
/* #moreleft{
  text-align: end;
} */
.arrowouter {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 150px;
  background-color: rgba(242, 242, 242, 1);
  align-items: center;
}
#pagestartouter {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 37px;
  width: 30%;
  border-radius: 30px;
  background-color: rgba(242, 242, 242, 1);
  align-items: center;
  margin-left: 5px;
  border: 1px solid #e7e7e7;
}
#pageendouter {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 37px;
  width: 18%;

  align-items: center;
}
#sortcontainer
{
  /* border:2px solid black; */
  width: 50%;
}

#pagecontainer
{
  /* border:2px solid black; */
  float: left;
width: 50%;
  


}
#container {
  /* border: 2px solid black; */
  height: 100px;
  width: 90%;
}
.dropdown {
  position: relative;
}
#arrow {
  font-size: larger;
}
li {
  font-size: smaller;
}

.dropdown-toggle {
  display: inline-block;

  width: 100%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid #e7e7e7;
  outline: 0px;
  /* text-align: center; */
  /* font-size: 100%; */
  text-align: start;
  /* vertical-align: middle; */
  /* vertical-align: middle; */
  color: black;
}

.dropdown-toggle::after {
  font-size: smaller;
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #333;
  border-right: 2px solid #333;
  margin: auto;
  align-self: center;
}
.dropdown-menu {
  display: none;
  position: absolute;

  left: 0;
  z-index: 1;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;

  width: 100%;
  margin-top: 5px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  color: #29b574;
}
/* p{
  font-size: large;
} */
#right {
  width: 50%;
  height: 80px;

  /* background-color: black; */
  /* border: 2px solid black; */
  float: left;
}
#left {
  display: flex;
  flex-direction: row;
  float: left;
  width: 50%;
  height: 80px;
}
#customspace
{
  width: 5%;
}
</style>
