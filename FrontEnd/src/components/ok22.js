<template>
<div id="main">
    <i class="icon-boxMenu text-blue text-2.5xl"></i>
    <div id="searchbox">
      <button v-on:click="showModal = true" id="catbtn">Categories</button>
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
            v-for="item in Category.MainCategories"
            v-bindvalue="item.MainCategory_name"
          >
            {{ item.MainCategory_name }}
          </option>
        </select>
      </div>
      <button id="searchbtn" v-on:click="fs">Search</button>
    </div>
    <div>
      <!-- <button @click="showModal = true" class="button">Show Modal</button> -->
      <transition name="dropdown" appear>
        <div class="modal" role="dialog" v-if="showModal">
          <!-- this.Category.categories[0].categories[0].Category_name -->
          <div id="transcontainer" v-for="item in Category.MainCategories">
            <h3 id="transh3" @click="handle_main(item.MainCategory_name)">
              {{ item.MainCategory_name }}
            </h3>
            <h3
              style="margin-left: 20px"
              v-for="item in item.subcategories"
              @click="handle_sub(item.subcategory_name)"
            >
              {{ item.subcategory_name }}
            </h3>
          </div>
        </div>
      </transition>
    </div>
    <div class="leftspace">
      <!-- <div  v-for="(item, index) in filtblog[0]"
            :key="item.id"><h3> {{ item.name }}</h3></div> -->
    </div>
  </div>
  <div class="leftbox">
    <div v-if="Mcatbol">
      <div class="customspace"></div>
      <div class="container">
        <div id="pcertouter">
          <input
            type="text"
            v-model="McatSearch"
            placeholder="More Categories"
            id="numberinputpcert"
          />
        </div>
      </div>
      <div class="customspace"></div>
      <div id="catcontainer">
        <label id="labelcat"> {{ this.McatData[0].MainCategory_name }}</label>
        <label id="labelcat" v-for="item in McatData[0].subcategories">
          {{ item.subcategory_name }}
          <label
            id="labelcat"
            v-for="item in item.sub_subcategories"
            @click="handle_sub_sub(item.sub_subcategory_name)"
          >
            -> {{ item.sub_subcategory_name }}</label
          >
        </label>
      </div>
    </div>

    <div>
      <h3 class="label">Price</h3>
      <div class="container">
        <input
          type="number"
          v-bind:placeholder="pricestart"
          id="numberinput"
          v-model="pricestart"
        />
        <div class="vl2"></div>
        <h3>--</h3>

        <div class="vl2"></div>
        <input
          type="number"
          v-bind:placeholder="priceend"
          id="numberinput"
          v-model="priceend"
        />
      </div>

      <h3 class="label">MOQ</h3>

      <div class="container">
        <input
          type="number"
          placeholder="Less Than"
          id="numberinputMOQ"
          v-model="filtmoq"
        />
      </div>
      <h3 class="label">Product Certifications</h3>
      <div class="container">
        <div id="pcertouter">
          <input
            type="text"
            v-model="pcertsearch"
            placeholder="Search Categories.."
            id="numberinputpcert"
          />
        </div>
      </div>
      <div class="customspace"></div>

      <div id="checkboxes" v-for="item in pcertData">
        <input
          type="checkbox"
          :value="item"
          v-model="pcert"
          class="labelselect"
        />
        <label class="labelselect" @click="oncl">{{ item }}</label>
      </div>
      <h3 class="label">Supplier Certifications</h3>
      <div class="container">
        <div id="pcertouter">
          <input
            type="text"
            placeholder="Supplier Certifications.."
            v-model="scertsearch"
            id="numberinputpcert"
          />
        </div>
      </div>
      <div class="customspace"></div>

      <div id="checkboxes" v-for="item in scertData">
        <input
          type="checkbox"
          v-bind:value="item"
          v-model="scert"
          class="labelselect"
        />
        <label class="labelselect" @click="oncl">{{ item }}</label>
      </div>
      <h3 class="label">Manufacturer Location</h3>
      <div class="container">
        <div id="pcertouter">
          <input
            type="text"
            placeholder="Manufacturer Location.."
            id="numberinputpcert"
            v-model="MlocationSearch"
          />
        </div>
      </div>
      <div class="customspace"></div>

      <div id="checkboxes" v-for="item in MlocationData">
        <input
          type="checkbox"
          v-bind:value="item"
          v-model="Mlocation"
          class="labelselect"
        />
        <label class="labelselect">{{ item }}</label>
      </div>
    </div>
  </div>
  <div class="Rightbox">
    <div class="containerright">
      <div
        class="product"
        v-for="(item, index) in products.products"
        :key="item.id"
      >
        <div @mouseover="hover = index" @mouseleave="hover = -1">
          <router-link
            v-bind:to="'/' + item.slug.slice(22)"
            style="text-decoration: none; color: inherit"
          >
            <div><img v-bind:src="item.Image[0]" /></div>

            <p id="title">{{ item.name }}</p>

            <p id="moq">MOQ {{ item.MOQ }} {{ item.piece }}</p>
            <p id="price">$ {{ item.price }} / {{ item.piece }}</p>
            <button id="cart" v-if="hover === index">Add to Cart</button>
          </router-link>
        </div>
      </div>
      <!-- <div
            class="product"
            v-for="(item, index) in searchres"
            :key="item.id"
            v-if="searchbol"
          >
          
            <div @mouseover="hover = index" @mouseleave="hover = -1">
              <router-link
                v-bind:to="'/' + item.slug.slice(22)"
                style="text-decoration: none; color: inherit"
              >
                <div><img v-bind:src="item.Image[0]" /></div>
                <p id="title">search</p>
  
                <p id="moq">MOQ {{ item.MOQ }} {{ item.piece }}</p>
                <p id="price">$ {{ item.price }} / {{ item.piece }}</p>
                <button id="cart" v-if="hover === index">Add to Cart</button>
              </router-link>
            </div>
            
        </div> -->
    </div>
  </div>
</template>

<script setup>
import modal from "./modal.vue";
import morecats from "./morecats.vue";
</script>

<script>
export default {
  data() {
    return {
      showModal: false,
      products: [],
      producttemp: [],
      search: "",
      hover: -1,
      searchres: [],
      searchbol: false,
      selected: "All Categories",
      prices: 0,
      pricef: 1,
      pricestart: 0,
      priceend: 1000,
      pcert: [],
      pcertData: [],
      scert: [],
      scertData: [],
      Mlocation: [],
      MlocationData: [],
      filtmoq: 200000,
      Category: [],
      Categorytemp: [],
      pcertsearch: "",
      scertsearch: "",
      MlocationSearch: "",
      McatSearch: "",
      McatData: [],
      Mcat: [],
      Mcatbol: false,
      catclick: false,
      page: 1,
      slug: "http://localhost:5000/products",

      tempcat: true,
    };
  },
  watch: {
    pcert: function (newVal, oldVal) {
      this.updateProducts();
    },
    scert: function (newVal, oldVal) {
      this.updateProducts();
    },
    Mlocation: function (newVal, oldVal) {
      this.updateProducts();
    },
  },
  methods: {
    pcertfilter: function () {
      console.log("function is called");
      this.products.products = this.products.products.filter((product) => {
        return (
          (product.price > this.pricestart &&
            product.price < this.priceend &&
            product.MOQ < this.filtmoq) ||
          this.pcert.includes(product.P_cert)

          // this.pcert.includes(product.P_cert) ||
          // this.scert.includes(product.S_cert)
        );
      });
    },
    repeat: function () {
      console.log("repeat...");
      this.pcertData = ["BV", "InterTak", "ISO"];
      this.scertData = ["DUNS", "DRS", "BSCI"];
      this.MlocationData = ["China", "India", "Pakistan"];
      this.pricestart = 0;
      this.priceend = 1000;
      //  console.log("repeat ==");
      fetch("http://localhost:5000/products/")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          this.products = data;
          console.log("productsss==", this.products);
          // this.productstemp=data;
          // console.log("productss", this.products.products[0].slug.slice(21));
        });
      fetch("http://localhost:5000/Category/")
        .then((response) => response.json())
        .then((data) => {
          //console.log("Category ==",data.categories);
          this.Category = data;
          console.log("Category ==", this.Category);
          //   this.Categorytemp=data;
          //console.log("productss", this.Category.categories[0].MainCategory_name);
        });
    },
    handle_main: function (val) {
      console.log("ok?jans");
      this.McatData = this.Category.MainCategories.filter((el) => {
        return el.MainCategory_name == val;
      });
      this.Mcatbol = true;
      this.slug =
        "http://localhost:5000/products/?page=" +
        this.page +
        "&MainCategory_name=" +
        val;

      this.Mcatbol = true;
      fetch(this.slug)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          // this.products = data;
          console.log("data=====", data);

          this.products = data;
          this.pcertData = [];
          this.pcertData = this.products.pCertData;
          this.scertData = [];
          this.scertData = this.products.sCertData;
          this.MlocationData = [];
          this.MlocationData = this.products.MlocationData;
          this.pricestart = this.products.priceStart;
          this.priceend = this.products.priceEnd;
          console.log("pcert==", this.pcert[0]);
          // console.log("productss", this.products.products[0].slug.slice(21));
        });

      // console.log("value==", val);
    },
    handle_sub: function (val) {
      console.log("ok?jans");
      this.McatData = this.Category.MainCategories.filter((category) => {
        return category.subcategories.some(
          (subcategory) => subcategory.subcategory_name === val
        );
      });

      console.log(this.McatData);
      this.Mcatbol = true;
      this.slug =
        "http://localhost:5000/products/?page=" +
        this.page +
        "&subcategory_name=" +
        val;

      this.Mcatbol = true;
      fetch(this.slug)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          // this.products = data;
          console.log("data=====", data);

          this.products = data;
          this.pcertData = [];
          this.pcertData = this.products.pCertData;
          this.scertData = [];
          this.scertData = this.products.sCertData;
          this.MlocationData = [];
          this.MlocationData = this.products.MlocationData;
          this.pricestart = this.products.priceStart;
          this.priceend = this.products.priceEnd;
          console.log("pcert==", this.pcert[0]);
          // console.log("productss", this.products.products[0].slug.slice(21));
        });

      // console.log("value==", val);
    },
    handle_sub_sub: function (val) {
      console.log(this.McatData);
      this.Mcatbol = true;
      this.slug =
        "http://localhost:5000/products/?page=" +
        this.page +
        "&sub_subcategory_name=" +
        val;

      this.Mcatbol = true;
      fetch(this.slug)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          // this.products = data;
          console.log("data=====", data);

          this.products = data;
          console.log("pcert==", this.pcert[0]);
          // console.log("productss", this.products.products[0].slug.slice(21));
        });

      // console.log("value==", val);
    },
    updateProducts() {
      let pageParam = "page=" + this.page;
      let baseSlug = "http://localhost:5000/Products";
      let pcertParams = this.pcert.map((cert) => `P_cert=${cert}`).join("&");
      let scertParams =
        this.scert.length > 0 ? `S_cer=${this.scert.join(",")}` : "";
      let mlocationParams =
        this.Mlocation.length > 0
          ? `ManufactureLocation=${this.Mlocation.join(",")}`
          : "";
      let queryParams = [pcertParams, scertParams, mlocationParams]
        .filter(Boolean)
        .join("&");
      let slugi = `${baseSlug}${
        queryParams ? `?${queryParams}&${pageParam}` : `?${pageParam}`
      }`;
      console.log("slugiii==", slugi);

      if (slugi == "http://localhost:5000/Products?page=1") {
        console.log("not slugiii");
        fetch(this.slug)
          .then((response) => response.json())
          .then((data) => {
            this.products = data;
            this.pcertData = [];
            this.pcertData = this.products.pCertData;
            this.scertData = [];
            this.scertData = this.products.sCertData;
            this.MlocationData = [];
            this.MlocationData = this.products.MlocationData;
            this.pricestart = this.products.priceStart;
            this.priceend = this.products.priceEnd;

            console.log("Data", this.products.pCertData);
          });
      } else {
        fetch(slugi)
          .then((response) => response.json())
          .then((data) => {
            this.products = data;
            console.log("productsss==", this.products);
          });
      }
    },

    fs: function () {
      console.log("pcet===", this.pcert);
      this.Mcatbol = false;
      // console.log("pok", this.pcert, this.pcert[0]);
      // console.log(
      //   "isir ok?=====",
      //   "http://localhost:5000/products/?page=1&P_cert=" + this.pcert[0] + ""
      // );

      // if(this.search=='' && this.selected=='All Categories')
      // {
      //   console.log('nothing');
      // }
      // else if(this.search != '')
      // {
      //   this.slug

      // }
      this.slug = "http://localhost:5000/products?page=" + this.page;

      if (this.search != "" && this.selected != "All Categories") {
        this.McatData = this.Category.MainCategories.filter((el) => {
          return el.MainCategory_name == this.selected;
        });
        this.Mcatbol = true;
        this.slug =
          this.slug +
          "&name=" +
          this.search +
          "&MainCategory_name=" +
          this.selected;
        console.log("mCAT data=", this.McatData);
      } else if (this.search != "") {
        this.slug = this.slug + "&name=" + this.search;
      } else if (this.selected != "All Categories") {
        this.McatData = this.Category.MainCategories.filter((el) => {
          return el.MainCategory_name == this.selected;
        });
        this.Mcatbol = true;
        this.slug = this.slug + "&MainCategory_name=" + this.selected;
        console.log("mCAT data=", this.McatData[0].subcategories);
      }

      fetch(this.slug)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          // this.products = data;

          this.products = data;
          this.pcertData = [];
          this.pcertData = this.products.pCertData;
          this.scertData = [];
          this.scertData = this.products.sCertData;
          this.MlocationData = [];
          this.MlocationData = this.products.MlocationData;
          this.pricestart = this.products.priceStart;
          this.priceend = this.products.priceEnd;

          console.log("Data", this.products.pCertData);
        });

      //  this.repeat();
    },
  },

  created() {
    fetch("http://localhost:5000/products/?page=" + this.page)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        // this.products = data;

        this.products = data;
        this.pcertData = [];
        this.pcertData = this.products.pCertData;
        this.scertData = [];
        this.scertData = this.products.sCertData;
        this.MlocationData = [];
        this.MlocationData = this.products.MlocationData;
        this.pricestart = this.products.priceStart;
        this.priceend = this.products.priceEnd;

        console.log("Data", this.products.pCertData);
      });
    fetch("http://localhost:5000/MainCategory")
      .then((response) => response.json())
      .then((data) => {
        //  console.log("Category ==",data.categories[0].MainCategory_name);
        this.Category = data;

        console.log("category", this.Category);
      });
  },
  computed: {
    slugg: function () {
      console.log("ok");
      let baseSlug = "http://localhost:5000/Products";
      let pcertParams = this.pcert.map((cert) => `P_cert=${cert}`).join("&");
      return pcertParams ? `${baseSlug}?${pcertParams}` : baseSlug;
    },

    filtblog: function () {
      console.log("Filt blog");
    },
  },
};
</script>

<style scoped>
#searchbtn {
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

#catbtn {
  height: 45px;
  width: 10%;
  border-radius: 30px;
  color: black;
  background-color: rgba(242, 242, 242, 255);
  border: 0;
  outline: 0;
  font-size: 100%;
  margin: auto;
}

option {
  color: black;
}

.dropdown {
  width: 25%;
  /* customize Select tag(DropDown options) with id="alphalist" */
  display: inline-block;
  background-color: white;
  border-radius: 10px;
  outline: none;
  transition: all 0.5s ease;
  position: relative;
  vertical-align: center;
  font-size: 15px;
  margin-left: 4px;
  color: rgba(232, 237, 244, 255);

  height: 30px;
  border-color: white;
  border: 0;
  outline: 0;
}

/* input { border: 0;
               background-color: #F5F5F5;
               border-radius: 10px;
               -webkit-appearance: none;
               -moz-appearance: none;
               -ms-appearance: none;
               -o-appearance: none;
               appearance: none;
               text-align: left;
               width: 100%;
               height: 32px;        
             } */
#search {
  background-color: white;
  /* display: flex;
          align-self: center; */
  width: 73%;
  height: 30px;
  /* border-radius: 20px; */
  /* margin-top: 50px; */
  border-color: white;
  border: 0;
  outline: 0;
  text-align: left;
  margin-left: 3px;
  font-size: 100%;

  /* margin: 20px 0 20px 0; */
}

.vl {
  border-left: 2px solid rgba(232, 237, 244, 255);
  height: 30px;
  margin-left: 2px;
}

#searchouter {
  width: 75%;
  /* Can be in percentage also. */
  height: 50px;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  background-color: white;
  border-radius: 30px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.containerright {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

#cart {
  height: 35px;
  width: 98%;
  align-self: center;
  border-radius: 10px;
  border-color: transparent;
  color: white;
  /* font-size: 32px; */
  background-color: rgb(4, 180, 204);
  text-align: center;
  /* margin-bottom: 15px; */
  margin-left: 2px;
  margin-top: 5px;
}

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

  /* float: left; */

  /* align-items: center; */
}

.product:hover {
  box-shadow: 2px 2px 2px 4px gray;

  /* transform: translateY(-2px); */
}

#title {
  text-transform: capitalize;
  margin-left: 5px;
  text-decoration: none;
  color: inherit;
}

#moq {
  /* margin-top: -40px; */
  text-transform: capitalize;
  /* font-size: 30px; */
  white-space: nowrap;
  color: rgb(105, 105, 105);
  margin-left: 5px;
}

#price {
  text-transform: capitalize;
  margin-left: 5px;
  /* margin-top: -15px;
        font-size: 40px; */
  font-weight: bold;
}

img {
  max-width: 90%;
  max-height: 180px;
  margin: 20px 20px 0 20px;
  align-self: center;
}

/* #main {
        
      } */

.leftbox {
  border: 2px solid #e2e8f0;
  width: 24%;
  height: 1000px;
  margin-top: 5px;
  float: left;
  margin-left: 2px;
}

.leftspace {
  width: 5%;
  height: 1000px;
  margin-top: 5px;
  float: left;
}

#searchbox {
  background-color: rgba(242, 242, 242, 255);
  width: 90%;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0px auto;
  border-radius: 10px;
}

.Rightbox {
  /* border: 2px solid black; */
  width: 70%;
  height: 1000px;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
}

router-link {
  background-color: transparent;
}

.customspace {
  height: 12px;
}

.vl2 {
  width: 1%;
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

#numberinputMOQ {
  width: 85%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 2px solid #e2e8f0;
  outline: 0px;
  text-align: center;
  font-size: 100%;
  color: black;
  float: left;
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

vl2container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* text-align: center;
          vertical-align:auto; */
}

.label {
  margin-left: 25px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.labelselect {
  margin-left: 25px;
}

#labelcat {
  margin-left: 35px;
  font-size: 95%;
}

#catcontainer {
  display: flex;
  flex-direction: column;
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
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  /* background:rgba(242, 242, 242, 255); */
  z-index: 999;
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
  z-index: 998;

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
