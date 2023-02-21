import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    products: [],
    Category: [],
    changebol: false,
    page: 1,
    cert: [],
    modalbol: false,
    McatSelected: "",
    Url: "http://localhost:5000/Products",
    LatestSlug: "http://localhost:5000/Products",
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setUrl(state, products) {
      state.Url = products;
    },
    setLatestSlug(state, products) {
      state.LatestSlug = products;
    },
    setMcatSelected(state, products) {
      state.McatSelected = products;
    },
    setmodalfase(state) {
      state.modalbol = false;
    },
    setmodaltrue(state) {
      state.modalbol = true;
    },
    setchangebol(state) {
      state.changebol = !state.changebol;
    },
    changepage(state, pg) {
      state.page = pg;
    },
    setCategory(state, Category) {
      state.Category = Category;
    },
    setcert(state, Category) {
      state.cert = Category;
    },
  },
  actions: {
    async fetchProducts({ commit }, url) {
      try {
        const response = await axios.get(url);
        commit("setProducts", response.data);
      } catch (error) {
        console.log(error);
        res.status(404).json({
          error: error,
        });
      }
    },
    async fetchCategory({ commit }, url) {
      try {
        const response = await axios.get(url);
        commit("setCategory", response.data);
      } catch (error) {
        console.log(error);
        res.status(404).json({
          error: error,
        });
      }
    },
    async fetchcert({ commit }, url) {
      try {
        const response = await axios.get(url);
        commit("setcert", response.data);
      } catch (error) {
        console.log(error);
        res.status(404).json({
          error: error,
        });
      }
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

export default store;
