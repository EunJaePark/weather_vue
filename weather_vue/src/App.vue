<template>
  <div id="app">
      <SearchCity></SearchCity>
      <router-view></router-view>
  </div>
</template>


<script>
import SearchCity from './components/SearchCity'
export default {
  components: { 
    SearchCity 
  }
}
</script>
<style>

</style>
