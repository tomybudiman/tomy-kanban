<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Amatic+SC|Roboto:300,400');

input[type="number"] {
    -moz-appearance:textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

html,body {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
