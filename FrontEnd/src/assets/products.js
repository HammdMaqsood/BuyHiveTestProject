// Import Vuex
import { createStore } from "vuex";

// Create a new Vuex store
const store = createStore({
  state: {
    products: [],
    Category: [],
    changebol: false,
    page: 1,
    cert: [],
    Mainbol: false,
    Subbol: false,
    Sub_Subbol: false,
    modalbol: false,
    McatSelected: "",
    Url: "http://localhost:5000/Products",
    LatestSlug: "http://localhost:5000/Products",
  },
  mutations: {
    setProducts(state, products) {
      // console.log("ppp==", products);
      state.products = products;
      console.log("state==", this.state.products.products.name);
    },
    setUrl(state, products) {
      // console.log("ppp==", products);
      state.Url = products;
      // console.log("Ur==l", this.state.Url);
    },
    setMainboltrue(state) {
      state.Mainbol = true;
      console.log("Mainbol==", this.state.Mainbol);
    },
    setMainbolfalse(state) {
      state.Mainbol = false;
      console.log("Mainbol==", this.state.Mainbol);
    },
    setSubboltrue(state) {
      state.Subbol = true;
      console.log("Mainbol==", this.state.Subbol);
    },
    setSubbolfalse(state) {
      state.Subbol = false;
      console.log("Mainbol==", this.state.Subbol);
    },
    setSub_Subboltrue(state) {
      state.Sub_Subbol = true;
      console.log("Mainbol==", this.state.Sub_Subbol);
    },
    setSub_Subbolfalse(state) {
      state.Sub_Subbol = false;
      console.log("Mainbol==", this.state.Sub_Subbol);
    },
    setLatestSlug(state, products) {
      // console.log("ppp==", products);
      state.LatestSlug = products;
      console.log("nice", this.state.LatestSlug);
    },
    setMcatSelected(state, products) {
      // console.log("ppp==", products);
      state.McatSelected = products;
    },
    setmodalfase(state) {
      // console.log("ppp==", products);
      state.modalbol = false;
      // console.log("false==", this.state.modalbol);
      // console.log("state==", this.state.products);
    },
    setmodaltrue(state) {
      // console.log("ppp==", products);
      state.modalbol = true;
      console.log("tue==", this.state.modalbol);
    },
    setchangebol(state) {
      state.changebol = !state.changebol;
    },
    changepage(state, pg) {
      state.page = pg;
    },
    setCategory(state, Category) {
      // console.log("ppp==", Category);
      state.Category = Category;
      // console.log("state==CAT", this.state.Category);
    },
    setcert(state, Category) {
      // console.log("ppp==", Category);
      state.cert = Category;
      // console.log("modal", this.state.cert);
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    removeProduct(state, productId) {
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  actions: {
    fetchProducts({ commit }, url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          commit("setProducts", data);
        });
    },
    fetchCategory({ commit }, url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          commit("setCategory", data);
        });
    },
    fetchcert({ commit }, url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          commit("setcert", data);
        });
    },
    storeMcatSelected({ commit }, data) {
      commit("setMcatSelected", data);
    },
    storeLatestSlug({ commit }, url) {
      commit("setLatestSlug", url);
    },
    ChangeUrl({ commit }, data) {
      commit("setUrl", data);
    },
    inversebol({ commit }) {
      commit("setchangebol");
    },
    setpage({ commit }, pg) {
      commit("changepage", pg);
    },
  },
});

// Export the store
export default store;
