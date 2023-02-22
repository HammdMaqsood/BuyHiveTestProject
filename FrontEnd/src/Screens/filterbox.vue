<template>
  <div id="spacebw">
    <h3 id="productscount">Products</h3>
    <h3 id="productscount2">({{ products.productcount }} Products)</h3>
  </div>
  <div id="box">
    <div id="catbtn" @click="filter.showfilter = !filter.showfilter">
      Filters
    </div>
    <div v-if="filter.showfilter" class="leftbox">
      <MoreCategory />
      <h3 class="label">Price</h3>
      <div class="container">
        <div id="numberinputdiv">
          <input
            type="number"
            :placeholder="certData.priceStart"
            id="numberinput"
            v-model="filter.pricest"
          />
          <input
            type="number"
            placeholder="$"
            id="numberinputdollar"
            readonly
          />
        </div>
        <div class="vl2"></div>
        <h3>--</h3>

        <div class="vl2"></div>
        <div id="numberinputdiv">
          <input
            type="number"
            v-bind:placeholder="certData.priceEnd"
            id="numberinput"
            v-model="filter.priceed"
          />
          <input
            type="number"
            placeholder="$"
            id="numberinputdollar"
            readonly
          />
        </div>
      </div>

      <h3 class="label">MOQ</h3>

      <div class="container">
        <InputBox
          :label="moqstr"
          @data-emitted="moqdata"
          type="number"
        ></InputBox>
      </div>

      <FilterCertificatoin
        v-bind:Data="certData.pCertData"
        label="Product Certification"
        @data-emitted="pcertreceiveData"
      ></FilterCertificatoin>
      <FilterCertificatoin
        v-bind:Data="certData.sCertData"
        label="Supplier Certification"
        @data-emitted="scertreceiveData"
      ></FilterCertificatoin>
      <FilterCertificatoin
        v-bind:Data="certData.MlocationData"
        label="Manufacture Location"
        @data-emitted="MLocationreceiveData"
      ></FilterCertificatoin>
      <h3 class="label">Stock Availability</h3>
      <div id="checkboxes">
        <input
          type="checkbox"
          v-model="filter.isUsa"
          class="labelselect"
          value="true"
        />
        <label class="labelselect">USA</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import InputBox from "../components/InputBox.vue";
import MoreCategory from "../components/MoreCategory.vue";
import FilterCertificatoin from "../components/FilterCertificatoin.vue";
</script>

<script>
export default {
  data() {
    return {
      filter: {
        pricest: "",
        priceed: "",
        MOQ: "",
        pcert: "",
        scert: "",
        Mlocation: "",
        isUsa: false,
        showfilter: true,
      },
      moqstr: "Less Than",
    };
  },
  watch: {
    "filter.pcert": function (newVal, oldVal) {
      console.log("pricese==", this.filter.pricest);
      this.updateProducts();
    },
    "filter.isUsa": function (newVal, oldVal) {
      this.updateProducts();
    },
    "filter.pricest": function (newVal, oldVal) {
      this.updateProducts();
    },
    "filter.priceed": function (newVal, oldVal) {
      this.updateProducts();
    },
    "filter.MOQ": function (newVal, oldVal) {
      this.updateProducts();
    },
    "filter.scert": function (newVal, oldVal) {
      this.updateProducts();
    },
    "filter.Mlocation": function (newVal, oldVal) {
      this.updateProducts();
    },
  },

  created() {},
  computed: {
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
      this.filter.pcert = data;
    },

    scertreceiveData(data) {
      this.filter.scert = data;
    },
    MLocationreceiveData(data) {
      this.filter.Mlocation = data;
    },
    moqdata(data) {
      this.filter.MOQ = data;
      console.log("moq==", data);
    },
    updateProducts() {
      let baseSlug = this.Uri;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug += "?";
      } else if (baseSlug.length != 30) {
        baseSlug += "&";
      }
      let priceStartParam = this.filter.pricest
        ? `pricestart=${this.filter.pricest}`
        : "";
      let priceEndParam = this.filter.priceed
        ? `pricefinal=${this.filter.priceed}`
        : "";
      let moqParam = this.filter.MOQ ? `moqfilt=${this.filter.MOQ}` : "";
      let queryParams = [
        this.filter.pcert,
        this.filter.scert,
        this.filter.Mlocation,
        priceStartParam,
        priceEndParam,
        moqParam,
      ]
        .filter(Boolean)
        .join("&");

      let slugi = `${baseSlug}${queryParams ? `${queryParams}` : ""}`;
      if (this.filter.isUsa) {
        if (slugi.length === 29) {
          slugi += "?";
        } else {
          slugi += "&";
        }
        slugi = slugi + "Usabol=" + this.filter.isUsa;
      }
      console.log("Slugiii==", slugi);
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
  padding-bottom: 20px;
  margin-bottom: 50px;
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
  cursor: auto;
  width: 20%;
  border-radius: 20px;
  height: 38px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid transparent;
  outline: 0px;
  text-align: end;
  color: black;
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
#catbtn {
  display: none;
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

@media screen and (max-width: 1109px) {
  .leftbox {
    border: 1px solid #e2e8f0;
    width: 80%;
    margin-top: 5px;
    float: left;
    margin-left: 2px;
    padding-bottom: 20px;
    margin-bottom: 50px;
  }
  #productscount {
    display: none;
  }
  #productscount2 {
    display: none;
  }
  #catbtn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    height: 45px;
    width: 80%;
    border-radius: 30px;
    color: black;
    background-color: white;
    border: 0;
    outline: 0;
    font-size: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-self: center;
    border: 2px solid rgba(242, 242, 242, 1);
  }
  #box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
