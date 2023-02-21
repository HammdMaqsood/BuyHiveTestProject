<template>
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
            MOQ Low to High
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sort: "default",
      selectedOption: "Relevance",
      isOpen: true,
    };
  },
  watch: {},
  methods: {
    sorting(val) {
      this.isOpen = false;
      let baseSlug = this.slug;
      if (baseSlug.indexOf("?") === -1) {
        baseSlug = baseSlug + "?sort=" + val;
      } else {
        baseSlug = baseSlug + "&sort=" + val;
      }

      this.$store.dispatch("fetchProducts", baseSlug);
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
#selected {
  margin-left: 10px;
  margin-top: 6px;
}

#sortcontainer {
  width: 50%;
}
.dropdown {
  position: relative;
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
  text-align: start;
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
  margin-top: 3px;
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
</style>
