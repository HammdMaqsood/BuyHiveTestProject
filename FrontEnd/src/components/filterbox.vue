<template>
  <div id="spacebw">
    <h3 id="productscount">Products</h3>
    <h3 id="productscount2">({{ products.count }} Products)</h3>
  </div>

  <div class="leftbox">
    <morecategory></morecategory>
    <h3 class="label">Price</h3>
    <div class="container">
      <div id="numberinputdiv">
        <input
          type="number"
          :placeholder="certData.priceStart"
          id="numberinput"
          v-model="pricest"
        />
        <input type="number" placeholder="$" id="numberinputdollar" />
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
        <input type="number" placeholder="$" id="numberinputdollar" />
        
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
    <h3 class="label">Product Certifications</h3>
    <div class="container">
      <div id="pcertouter">
        <input
          v-model="pcertsearch"
          type="text"
          placeholder="Search Categories.."
          id="numberinputpcert"
        />
      </div>
    </div>
    <div class="customspace"></div>
    <div class="scrollbar" :style="{ height: pcertshowAll ? 'auto' : '50px', overflowY: pcertshowAll ? 'hidden' : 'scroll' }"> <div id="checkboxes" v-for="item in certData.pCertData">
      <input
        type="checkbox"
        :value="item"
        v-model="pcert"
        class="labelselect"
      />
      <label class="labelselect">{{ item }}</label>
    </div></div>
    <P class="labelseeall" @click="pcertshowAll=true" v-if="!pcertshowAll">Show all</P>
    <P class="labelseeall" @click="pcertshowAll=false" v-if="pcertshowAll">Show Less</P>

    
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
    <div class="scrollbar" :style="{ height: scertshowAll ? 'auto' : '50px', overflowY: scertshowAll ? 'hidden' : 'scroll' }"> 

    <div id="checkboxes" v-for="item in certData.sCertData">
      <input
        type="checkbox"
        v-bind:value="item"
        v-model="scert"
        class="labelselect"
      />
      <label class="labelselect">{{ item }}</label>
    </div></div>
    <P class="labelseeall" @click="scertshowAll=true" v-if="!scertshowAll">Show all</P>
    <P class="labelseeall" @click="scertshowAll=false" v-if="scertshowAll">Show Less</P>
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
    <div class="scrollbar" :style="{ height: mlocationshowAll ? 'auto' : '50px', overflowY: mlocationshowAll ? 'hidden' : 'scroll' }"> 


    <div id="checkboxes" v-for="item in certData.MlocationData">
      <input
        type="checkbox"
        v-bind:value="item"
        v-model="Mlocation"
        class="labelselect"
      />
      <label class="labelselect">{{ item }}</label>
    </div>
  </div>
  <P class="labelseeall" @click="mlocationshowAll=true" v-if="!mlocationshowAll">Show all</P>
    <P class="labelseeall" @click="mlocationshowAll=false" v-if="mlocationshowAll">Show Less</P>
    <h3 class="label">Stock Availability</h3>

    <div id="checkboxes">
      <input type="checkbox" v-model="isUsa" class="labelselect" value="true"/>
      <label class="labelselect">USA</label>
    </div>
  </div>
</template>
<script setup>
import morecategory from "./morecategory.vue";
</script>

<script>
export default {
  data() {
    return {
      McatSearch: "",
      pricest: "",
      priceed: "",
      pcert: [],
      scert: [],
      scertData: [],
      Mlocation: [],
      MlocationData: [],
      MOQ: "",
      moqstr: "Less Than",
      pcertsearch: "",
      scertsearch: "",
      MlocationSearch: "",
      McatSearch: "",
      McatData: [],
      Mcat: [],
      Mcatbol: false,
      isUsa: false,
      pcertshowAll:false,
      scertshowAll:false,
      mlocationshowAll:false,
    };
  },
  watch: {
    changebol: function (newVal, oldVal) {
      //   console.log("clicked");
      //   console.log("scert==", this.scertData);
      //   this.pcertData = this.products.pCertData;
      //   this.scertData = this.products.sCertData;
      //   this.MlocationData = this.products.MlocationData;
      //   this.pricestart = this.products.priceStart;
      //   this.priceend = this.products.priceEnd;
    },
    pcert: function (newVal, oldVal) {
      this.updateProducts();
    },
    isUsa: function (newVal, oldVal) {
      console.log("watch is active...");
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
    page() {
      return this.$store.state.page;
    },
    certData() {
      return this.$store.state.cert;
    },
    Uri() {
      return this.$store.state.Url;
    },
  },

  methods: {
    updateProducts() {
  let baseSlug = this.Uri;
  if (baseSlug.indexOf("?") === -1) {
    console.log("length?",baseSlug.length);
    baseSlug += "?";
    
  }
  else if(baseSlug.length !=30)
  {
    console.log("length&",baseSlug.length);
    baseSlug += "&";

  }


  function createParamString(name, values) {
    if (values.length > 0) {
      return `${name}=${values.join(",")}`;
    }
    return "";
  }

  let pcertParams = createParamString("Pcert_name", this.pcert);
  let scertParams = createParamString("Scert_name", this.scert);
  let mlocationParams = createParamString("MLocation_name", this.Mlocation);
  let priceStartParam = this.pricest ? `pricestart=${this.pricest}` : "";
  let priceEndParam = this.priceed ? `pricefinal=${this.priceed}` : "";
  let moqParam = this.MOQ ? `moqfilt=${this.MOQ}` : "";

  let queryParams = [
    pcertParams,
    scertParams,
    mlocationParams,
    priceStartParam,
    priceEndParam,
    moqParam,
  ]
  .filter(Boolean)
  .join("&");

  let slugi = `${baseSlug}${queryParams ? `${queryParams}` : ""}`;
  if(this.isUsa)
  {
    console.log('trueee');
    if (slugi.length === 29) {
    console.log("length?",slugi.length);
    slugi += "?";
    
  }
  else
  {
    slugi += "&";

  }
  
    // console.log("length&",slugi.length);
    // slugi += "&";

  
  slugi=slugi+"Usabol="+this.isUsa;
  }
  console.log("slugiii==", slugi);


  if (slugi == "http://localhost:5000/Products") {
    console.log("not slugiii");
    this.$store.dispatch("fetchProducts", slugi);
    this.$store.dispatch("storeLatestSlug", slugi);

    this.products = data;
    this.pcertData = [];
    this.pcertData = this.products.pCertData;
    this.scertData = [];
    this.scertData = this.products.sCertData;
    this.MlocationData = [];
    this.MlocationData = this.products.MlocationData;
    this.pricestart = this.products.priceStart;
    this.priceend = this.products.priceEnd;
  } else {
        
    

    this.$store.dispatch("fetchProducts", slugi);
    this.$store.dispatch("storeLatestSlug", slugi);
  }
},

  },
  //   computed: {},
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
.labelselect {
  margin-left: 25px;
}

.label {
  margin-left: 18px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.labelseeall {
  margin-left: 25px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #4CAF50;
  text-decoration: underline;
  cursor: pointer;
}

#catcontainer {
  display: flex;
  flex-direction: column;
}
.leftbox {
  border: 1px solid #e2e8f0;
 
  width: 24%;
  /* height: 1000px; */
  margin-top: 5px;
  float: left;
  margin-left: 2px;
}

#numberinputpcert {
  width: 87%;
  border-radius: 20px;
  height: 32px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid transparent;
  margin: 2px auto auto 1px;
  outline: 0px;
  text-align: center;
  vertical-align: middle;
  font-size: 100%;
  color: black;
}
/* .scrollbar
{
  overflow-y: scroll;
  height: 50px;  
} */
.scrollbar::-webkit-scrollbar {
  width: 5px;
  background-color: rgba(242, 242, 242, 1)
}

/* Thumb */
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border-radius: 10px;
}

/* Border */
/* .scrollbar {
   
  "height: seeAll ? 'auto' : '200px', overflowY: seeAll ? 'hidden' : 'scroll' 
} */

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
  /* text-align: center; */
  /* font-size: 100%; */
  color: black;
}
#numberinputdollar {
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
  /* border: 1px solid black; */
}
#productscount {
  margin: auto 4px auto 0px;
}
#productscount2 {
  margin: auto auto auto 5px;

  color: #b9b8b8;
}

/* .leftbox {
  border: 1px solid #e2e8f0;
  width: 24%;
  height: 1000px;

  float: left;
  margin-left: 2px;
} */
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  
  /* text-align: center;
          vertical-align:auto; */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Your CSS here */
</style>
