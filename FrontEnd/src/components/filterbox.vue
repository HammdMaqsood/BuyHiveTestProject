<template>
  <div id="spacebw">
    <h3 id="productscount">Products</h3>
    <h3 id="productscount2">({{ products.count }} Products)</h3>
  </div>
  <div class="leftbox">
    <morecategory />
    <h3 class="label">Price</h3>
    <div class="container">
      <div id="numberinputdiv">
        <input
          type="number"
          :placeholder="certData.priceStart"
          id="numberinput"
          v-model="pricest"
        />
        <input type="number" placeholder="$" id="numberinputdollar" readonly />
      </div>
      <div class="vl2"></div>
      <h3>--</h3>

      <div class="vl2"></div>
      <div id="numberinputdiv">
        <input
          type="number"
          v-bind:placeholder="certData.priceEnd"
          id="numberinput"
          v-model="priceed"
        />
        <input type="number" placeholder="$" id="numberinputdollar" readonly />
      </div>
    </div>

    <h3 class="label">MOQ</h3>

    <div class="container">
      <input
        type="number"
        :placeholder="moqstr"
        id="numberinputMOQ"
        v-model="MOQ"
      />
    </div>

    <category_input_comp
      v-bind:Data="certData.pCertData"
      label="Product Certification"
      @data-emitted="pcertreceiveData"
    ></category_input_comp>
    <category_input_comp
      v-bind:Data="certData.sCertData"
      label="Supplier Certification"
      @data-emitted="scertreceiveData"
    ></category_input_comp>
    <category_input_comp
      v-bind:Data="certData.MlocationData"
      label="Manufacture Location"
      @data-emitted="MLocationreceiveData"
    ></category_input_comp>
    <h3 class="label">Stock Availability</h3>

    <div id="checkboxes">
      <input type="checkbox" v-model="isUsa" class="labelselect" value="true" />
      <label class="labelselect">USA</label>
    </div>
  </div>
</template>
<script setup>
import category_input_comp from "./category_input_comp.vue";
import morecategory from "./morecategory.vue";
</script>

<script>
export default {
  data() {
    return {
      pricest: "",
      priceed: "",
      MOQ: "",
      moqstr: "Less Than",
      isUsa: false,
      pcert: "",
      scert: "",
      Mlocation: "",
    };
  },
  watch: {
    changebol: function (newVal, oldVal) {},
    pcert: function (newVal, oldVal) {
      this.updateProducts();
    },
    isUsa: function (newVal, oldVal) {
      this.updateProducts();
    },
    pricest: function (newVal, oldVal) {
      this.updateProducts();
    },
    priceed: function (newVal, oldVal) {
      this.updateProducts();
    },
    MOQ: function (newVal, oldVal) {
      this.updateProducts();
    },
    scert: function (newVal, oldVal) {
      this.updateProducts();
    },
    Mlocation: function (newVal, oldVal) {
      this.updateProducts();
    },
  },

  created() {},
  computed: {
    changebol() {
      return this.$store.state.changebol;
    },
    products() {
      return this.$store.state.products;
    },
    certData() {
      return this.$store.state.cert;
    },
    Uri() {
      return this.$store.state.Url;
    },
  },

  methods: {
    pcertreceiveData(data) {
      this.pcert = data;
    },
    scertreceiveData(data) {
      this.scert = data;
    },
    MLocationreceiveData(data) {
      this.Mlocation = data;
    },
    updateProducts() {
      let baseSlug = this.Uri;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug += "?";
      } else if (baseSlug.length != 30) {
        baseSlug += "&";
      }
      let priceStartParam = this.pricest ? `pricestart=${this.pricest}` : "";
      let priceEndParam = this.priceed ? `pricefinal=${this.priceed}` : "";
      let moqParam = this.MOQ ? `moqfilt=${this.MOQ}` : "";
      let queryParams = [
        this.pcert,
        this.scert,
        this.Mlocation,
        priceStartParam,
        priceEndParam,
        moqParam,
      ]
        .filter(Boolean)
        .join("&");

      let slugi = `${baseSlug}${queryParams ? `${queryParams}` : ""}`;
      if (this.isUsa) {
        if (slugi.length === 29) {
          slugi += "?";
        } else {
          slugi += "&";
        }
        slugi = slugi + "Usabol=" + this.isUsa;
      }
      this.$store.dispatch("fetchProducts", slugi);
      this.$store.dispatch("storeLatestSlug", slugi);
    },
  },
};
</script>

<style scoped>
.vl2 {
  width: 1%;
}

#labelcat {
  margin-left: 35px;
  font-size: 95%;
}

.label {
  margin-left: 18px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.leftbox {
  border: 1px solid #e2e8f0;

  width: 24%;
  margin-top: 5px;
  float: left;
  margin-left: 2px;
}

#numberinput {
  width: 50%;
  border-radius: 20px;
  height: 38px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid transparent;
  outline: 0px;

  text-align: center;
  font-size: 100%;
  color: black;
  margin: auto 0px auto auto;
}

#numberinputdiv {
  width: 40%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid #e7e7e7;
  outline: 0px;
  text-align: center;
  color: black;
}
#numberinputdollar {
  cursor:auto;
  width: 20%;
  border-radius: 20px;
  height: 38px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid transparent;
  outline: 0px;
  text-align: end;
  color: black;
}
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
#spacebw {
  display: flex;
  flex-direction: row;
  height: 95px;
}
.labelselect {
  margin-left: 25px;
}

.label {
  margin-left: 18px;
  margin-top: 40px;
  margin-bottom: 20px;
}
#productscount {
  margin: auto 4px auto 0px;
}
#productscount2 {
  margin: auto auto auto 5px;

  color: #b9b8b8;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
