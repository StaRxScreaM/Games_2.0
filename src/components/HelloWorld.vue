<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'Bienvenido a Games Opinion'
    }
  }
};
</script>

<style scoped>
.hello {
  padding: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
