<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheMain from "@/components/TheMain.vue";
import TheSide from "@/components/TheSide.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <the-header />
  <div class="main-wrapper">
    <div class="container">
      <the-main />
      <the-side />
    </div>
  </div>
  <the-footer />
</template>


<style lang="scss" scoped>
.main {
  &-wrapper {
    .container {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    padding: 60px 0;
  }
}
</style>