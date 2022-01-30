<template>
  <div class="header-container">
    <span @click="home" class="title">Youtube</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    home() {
      this.$router.push("/Home");
    },

  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(100, 94, 97);
  padding: 10px 20px;
  margin-top: 50px;
  width: 100%;
}


.title {
  color: rgba(17, 106, 148, 0.876);
  font-size: 30px;
  font-weight: 700;
}
.title:hover {
  transform: scale(1.2);
  color: rgb(100, 26, 129);
}
</style>