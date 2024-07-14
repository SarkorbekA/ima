<script setup>
import { useAdminStore } from "@/stores/admin";
import { ref, onMounted } from "vue";
const store = useAdminStore();

const backgroundImageUrl = ref({
  backgroundImage: `url(${store.activeBgUrl})`,
});

onMounted(() => {
  const activeBg = localStorage.getItem("active_bg");
  if (activeBg) {
    backgroundImageUrl.value = {
      backgroundImage: `url(${activeBg})`,
    };
  }
});
</script>

<template>
  <div :style="backgroundImageUrl" class="not__found">
    <div class="not__found-wrapper">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not__found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  &-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 768px;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    padding: 70px 0;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #000000;
  }
  p {
    font-size: 1.25rem;
    color: #000000;
  }
}
</style>