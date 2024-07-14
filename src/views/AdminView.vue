<script setup>
import IconLogOut from "@/assets/icons/IconLogOut.vue";

import TheArticles from "@/components/TheArticles.vue";
import TheAdminSide from "@/components/TheAdminSide.vue";
import AdminMain from "@/components/AdminMain.vue";
import AdminMenu from "@/components/AdminMenu.vue";

import { onMounted, ref, computed, watch } from "vue";
import { useRouter, RouterView } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();

const router = useRouter();

const isMenuActive = ref(false);

const backgroundImageUrl = ref({
  backgroundImage: `url(${store.activeBgUrl})`,
});

function logOut() {
  localStorage.removeItem("acces_token");
  router.push(`/login`);
}

onMounted(() => {
  const activeBg = localStorage.getItem("active_bg");
  if (activeBg) {
    backgroundImageUrl.value = {
      backgroundImage: `url(${activeBg})`,
    };
  }
});

watch(
  () => store.activeBgUrl,
  (newUrl) => {
    backgroundImageUrl.value = {
      backgroundImage: `url(${newUrl})`,
    };
  }
);
</script>

<template>
  <div class="admin" :style="backgroundImageUrl">
    <admin-menu
      :class="{
        active: isMenuActive,
      }"
      :menuIsActive="isMenuActive"
      @menuChangeActive="isMenuActive = !isMenuActive"
      class="admin-menu"
    />
    <div
      :class="{
        active: isMenuActive,
      }"
      class="admin-wrapper"
    >
      <admin-main />
      <router-view></router-view>
    </div>
    <the-admin-side />
  </div>
</template>


<style lang="scss" scoped>
.admin {
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-position: center;
  background-size: cover;
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: calc(100% - 70px - 290px);
    height: 100vh;
    padding: 20px 15px;
    transition: 0.3s all;
    &.active {
      width: calc(100% - 70px - 76px);
    }
  }
  &-menu {
    width: 290px;
    height: 100%;
    transition: 0.3s all;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &.active {
      align-items: center;
      // width: 76px;
      width: 76px;
    }
  }
  &-title {
    color: #ffffff;
    font-size: 24px;
  }
  &-exit {
    width: 28px;
    height: 28px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 12px;
    background: #06496e;
  }
  &-content {
    display: flex;
    align-items: flex-start;
  }
  &-side {
    height: 100vh;
    padding: 20px 12px 20px 8px;
    width: 300px;
    background: #eff3f9;
  }
}

.side {
  &__list {
    display: flex;
    flex-direction: column;
    &-item {
      cursor: pointer;
      padding: 10px 16px;
      border-radius: 4px;
      color: #ffffff;
      width: 100%;
      background: #585c64;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 0;
        left: 8px;
        height: 2px;
        background: #06496e;
        top: 50%;
        transform: translateY(-50%);
      }
      &.active {
        padding-left: 28px;
        background: #a0a4aa;
        &::before {
          width: 12px;
        }
      }
    }
  }
}
</style>