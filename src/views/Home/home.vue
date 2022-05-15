<template>
  <div class="content">
    <Card/>
    <Sale/>
  </div>
</template>
<script>
import Card from "./Card/index.vue";
import Sale from './Sale/index.vue'
export default { components: { Card, Sale } };
</script>

<style lang="scss" scoped>
</style>