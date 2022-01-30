<template>
  <div class="products-container">
    <div
      class="images"
      @click="navigateToWatchPage"
      @mouseover="over"
      @mouseout="down"
      :id="product.id"
    >
      <img
        class="image"
        :src="product.coverImage"
        :alt="product.description"
        :style="{ ...image }"
      />
      <img
        class="image1"
        :src="product.hoverImage"
        :alt="product.description"
        :style="{ ...image1 }"
      />
    </div>
    <div class="title-container">
      <img class="ownerImage" :src="product.ownerImage" />
      <span class="title">{{ product.title }}</span>
    </div>
    <div class="ownerName-container">
      <span class="ownerName">{{ product.ownerName }}</span>
    </div>
    <div class="count-Date-container">
      <div class="count-date">
        <span class="count">{{ product.viewCount }} views</span>
        <span class="date">{{ product.publishDateInMonth }} months ago</span>
      </div>
    </div>
    <div class="fav">
      <span>Favorilere Ekle</span>
      <input type="checkbox" @change="this.checked" :id="product.id" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
  data() {
    return {
      image: { display: "block" },
      image1: { display: "none" },
    };
  },

  methods: {
    over() {
      this.image.display = "none";
      this.image1.display = "block";
    },
    down() {
      this.image.display = "block";
      this.image1.display = "none";
    },
    navigateToWatchPage() {
      this.$router.push("/watch/" + this.product.id);
    },
    checked(event) {
      if (event.target.checked == true) {
        this.$store.state.favoritesList.push(this.product);
      } else {
        this.$store.state.favoritesList.splice(
          this.$store.state.favoritesList.indexOf(this.product),
          1
        ); //delete not change
      }
    },
  },
};
</script>

<style scoped>
.image,
.image1 {
  width: 360px;
  height: 200px;
}

.products-container {
  margin-top: 60px;
  box-shadow: 0px 0px 1px 0px gray;
}
.products-container:hover {
  background-color: rgb(69, 11, 77);
  color: whitesmoke;
}
.title-container {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 7px;
}
.ownerImage {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  margin-right: 4px;
}

.title {
  width: 320px;
  font-size: 16px;
  font-weight: 700;
}
.ownerName-container {
  display: flex;
  justify-content: end;
  margin-top: 5px;
}
.ownerName {
  font-size: 14px;
  font-weight: 300;
  width: 320px;
  color: gray;
}
.count-Date-container {
  display: flex;
  justify-content: end;
  margin-top: 5px;
}

.count-date {
  font-size: 14px;
  font-weight: 300;
  width: 320px;
  text-align: start;
  color: gray;
}
.date {
  margin-left: 10px;
}
.fav {
  display: flex;
  font-size: 12px;
  align-items: center;
  margin-top: 10px;
  justify-content: end;
  color: gray;
}
</style>