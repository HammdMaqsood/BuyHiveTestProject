<template>
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
    <div
      class="arrowouter"
      @click="nextpage"
      :disabled="isLastPage || disabled"
    >
      <div><img id="leftimg" src="../assets/next.png" /></div>
    </div>
  </div>
</template>
<script setup></script>
<script>
export default {
  data() {
    return {
      page: 1,
      isOpen: true,
      disabled: false,
    };
  },
  watch: {},
  methods: {
    nextpage() {
      if (this.page != this.products.totalPages) {
        this.page++;
        let baseSlug = this.slug;
        if (baseSlug.indexOf("?") === -1) {
          baseSlug = baseSlug + "?page=" + this.page;
        } else {
          baseSlug = baseSlug + "&page=" + this.page;
        }

        this.$store.dispatch("fetchProducts", baseSlug);
      }
    },
    previouspage() {
      if (this.page != 1) {
        this.page--;

        let baseSlug = this.slug;
        if (baseSlug.indexOf("?") === -1) {
          baseSlug = baseSlug + "?page=" + this.page;
        } else {
          baseSlug = baseSlug + "&page=" + this.page;
        }

        this.$store.dispatch("fetchProducts", baseSlug);
      }
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
    isLastPage() {
      return this.products.currentPage === this.products.totalPages;
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
  cursor: pointer;
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

#pagecontainer {
  float: left;
  width: 50%;
}
#arrow {
  font-size: larger;
}
li {
  font-size: smaller;
}
@media screen and (max-width: 1109px) {
  #pagecontainer {
    display: none;
  }
}
</style>
