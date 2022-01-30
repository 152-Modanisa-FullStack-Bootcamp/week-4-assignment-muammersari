<template>
  <div>
    <Header></Header>
    <div id="product-list-container">
      <Product
        v-for="product in this.$store.state.products"
        :product="product"
        :key="product.id"
      />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Product from "@/components/Product.vue";

import axios from "axios";

export default {
  name: "ProductListingPage",
  components: {
    Header,
    Product,
  },

  mounted() {
    axios
      .get(
        "https://my-json-server.typicode.com/modanisa/bootcamp-video-db/videos"
      )
      .then((response) => {
        this.$store.state.products = response.data;
        console.log(response.data);
        console.log(this.$store.state.products);
      })
      .catch((error) => {
        this.errors.push(error);
      });
  },
};
</script>

<style scoped>
#product-list-container {
  display: flex;
  justify-content: space-between;
  width: 1475px;
  flex-wrap: wrap;
  padding: 10px 20px;
}
</style>