<template>
  <div class="row">
    <div class="col-3">
      <input
        type="text"
        aria-label="Search"
        name="Search"
        placeholder="Name"
        class="form-control mr-2"
        style="line-height: 1.3"
        v-model="searchterm"
        @keyup.enter="getFilter()"
      />
    </div>
    <div class="col-2">
      <v-select
        v-model="selectedType"
        :options="types"
        placeholder="Types"
      ></v-select>
    </div>
    <div class="col-3">
      <v-select
        v-model="selectedRarity"
        :options="rarities"
        placeholder="Rarities"
      ></v-select>
    </div>
    <div class="col-3">
      <v-select
        v-model="selectedSet"
        label="name"
        :options="sets"
        :reduce="(option) => option.id"
        placeholder="Sets"
      ></v-select>
    </div>

    <div class="col-1">
      <b-button
        variant="outline-primary"
        style="line-height: 1.3"
        @click="getFilter()"
      >
        <b-icon icon="search"></b-icon
      ></b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
//use Bootstrap Icons
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.component("v-select", vSelect);
export default {
  data() {
    return {
      searchterm: "",
      selectedSet: null,
      selectedType: null,
      selectedRarity: null,
      types: [],
      rarities: [],
      sets: [],
    };
  },
  mounted() {
    this.getTypes();
    this.getRarities();
    this.getSets();
  },
  methods: {
    //get Pokemon Types
    getTypes() {
      Vue.axios.get(`https://api.pokemontcg.io/v2/types`).then((resp) => {
        console.warn(resp);
        this.types = resp.data.data;
      });
    },
    //get Pokemon Rarities
    getRarities() {
      Vue.axios.get(`https://api.pokemontcg.io/v2/rarities`).then((resp) => {
        console.warn(resp);
        this.rarities = resp.data.data;
      });
    },
    //get Pokemon Sets
    getSets() {
      Vue.axios.get(`https://api.pokemontcg.io/v2/sets`).then((resp) => {
        console.warn(resp);
        this.sets = resp.data.data;
      });
    },
    //set filters for searching pokemon passing it to the Pokemon List Component
    getFilter() {
      const searchUrl = `${
        this.searchterm != "" ? `&name=${this.searchterm}` : ""
      }${this.selectedType != null ? `&types=${this.selectedType}` : ""}${
        this.selectedRarity != null ? `&rarities=${this.selectedRarity}` : ""
      }${this.selectedSet != null ? `&q=set.id:${this.selectedSet}` : ""}`;
      this.$emit("searching", searchUrl);
    },
  },
};
</script>

<style scoped></style>
