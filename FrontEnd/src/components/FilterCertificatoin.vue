<template>
  <h3 class="label">{{ this.label }}</h3>
  <div class="container">
    <div id="certouter">
      <InputBox :label="label" @data-emitted-search="recsearch"></InputBox>
    </div>
  </div>
  <div class="customspace"></div>
  <div
    class="scrollbar"
    :style="{
      height: certshowAll ? 'auto' : '50px',
      overflowY: certshowAll ? 'hidden' : 'scroll',
    }"
  >
    <div id="checkboxes" v-for="item in DATA">
      <input type="checkbox" :value="item" v-model="cert" class="labelselect" />
      <label class="labelselect">{{ item }}</label>
    </div>
  </div>
  <div v-if="showbol">
    <P class="labelseeall" @click="certshowAll = true" v-if="!certshowAll"
      >Show all</P
    >
    <P class="labelseeall" @click="certshowAll = false" v-if="certshowAll"
      >Show Less</P
    >
  </div>
</template>
<script setup>
import InputBox from "./InputBox.vue";
</script>

<script>
export default {
  props: ["Data", "label"],
  data() {
    return {
      cert: [],
      certsearch: "",
      certshowAll: false,
      pcertParams: "",
      scertParams: "",
      MLocationparam: "",
    };
  },
  watch: {
    cert: function (newVal, oldVal) {
      this.updateProducts();
    },
  },
  created() {},
  computed: {
    Uri() {
      return this.$store.state.Url;
    },
    DATA() {
      if (this.certsearch != "") {
        return this.Data.filter((el) => {
          return el.match(this.certsearch);
        });
      } else {
        return this.Data;
      }
    },
    datalength() {
      return this.Data.length;
    },
    showbol() {
      if (this.DATA && this.DATA.length > 2) {
        return true;
      } else return false;
    },
  },

  methods: {
    sendData(val) {
      this.$emit("data-emitted", val);
    },
    recsearch(data) {
      this.certsearch = data;
    },
    updateProducts() {
      function createParamString(name, values) {
        if (values.length > 0) {
          return `${name}=${values.join(",")}`;
        }
        return "";
      }

      if (this.label == "Product Certification") {
        this.pcertParams = createParamString("Pcert_name", this.cert);
        this.sendData(this.pcertParams);
      }
      if (this.label == "Supplier Certification") {
        this.scertParams = createParamString("Scert_name", this.cert);
        this.sendData(this.scertParams);
      }
      if (this.label == "Manufacture Location") {
        this.MLocationparam = createParamString("MLocation_name", this.cert);
        this.sendData(this.MLocationparam);
      }
    },
  },
};
</script>

<style scoped>
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
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
}
#numberinputcert {
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
.scrollbar::-webkit-scrollbar {
  width: 5px;
  background-color: rgba(242, 242, 242, 1);
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #4caf50;
  border-radius: 10px;
}
.customspace {
  height: 12px;
}
#certouter {
  width: 85%;
  border-radius: 20px;
  height: 40px;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid #e2e8f0;
  outline: 0px;
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
