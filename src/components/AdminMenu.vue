<script setup>
import IconBurger from "@/assets/icons/IconBurger.vue";
import IconHome from "@/assets/icons/IconHome.vue";
import IconUsers from "@/assets/icons/IconUsers.vue";
import IconArticle from "@/assets/icons/IconArticle.vue";
import { ref, onMounted, markRaw, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const emit = defineEmits(["menuChangeActive"]);
defineProps({
  menuIsActive: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => route,
  (newRoute) => {
    if (newRoute.matched.length > 1 && newRoute.matched[0].name === "admin") {
      menuItem.value.map((el) => (el.active = false));

      let menuItemToActivate = menuItem.value.find(
        (el) => el.name === newRoute.matched[1].name
      );

      if (menuItemToActivate) {
        menuItemToActivate.active = true;
      }
    }
  },
  { deep: true }
);

const tabList = ref([
  {
    id: 1,
    title: "Личный кабинет",
    active: true,
  },
  {
    id: 2,
    title: "Дополнительно",
    active: false,
  },
]);

const menuItem = ref([
  {
    id: 1,
    item: markRaw(IconHome),
    title: "Домашняя страница",
    name: "admin-home",
    color: "#ffffff",
    active: false,
  },
  {
    id: 2,
    item: markRaw(IconUsers),
    title: "Пользователи",
    name: "admin-users",
    color: "#ffffff",
    active: false,
  },
  {
    id: 3,
    item: markRaw(IconArticle),
    title: "Артикли",
    name: "admin-articles",
    color: "#ffffff",
    active: false,
  },
]);

const changeTabActive = (el) => {
  tabList.value.map((el) => (el.active = false));
  el.active = true;
};

const changeRoute = (el) => {
  if (route.matched[1].name == el) {
    return;
  } else {
    router.push({ name: `${el}` });
  }
};

onMounted(() => {
  if (route.matched.length > 1 && route.matched[0].name === "admin") {
    // console.log(route.matched[1].name);
    const menuEl = menuItem.value.find(
      (el) => el.name === route.matched[1].name
    );
    if (menuEl) {
      menuEl.active = true;
    }
  }
});
</script>

<template>
  <div class="menu">
    <div class="menu-top">
      <button type="button" @click="emit('menuChangeActive')" class="menu-btn">
        <IconBurger :color="'#ffffff'" />
      </button>
      <div v-show="!menuIsActive" class="menu-title">Панель Управления</div>
    </div>
    <div
      :class="{
        active: !menuIsActive,
      }"
      class="menu__tab"
    >
      <button
        v-for="item in tabList"
        :key="item.id"
        type="button"
        class="menu__tab-btn"
        :class="{
          active: item.active,
        }"
        @click="changeTabActive(item)"
      >
        {{ item.title }}
      </button>
    </div>
    <ul
      v-if="tabList.find((el) => el.active == true).id == 1"
      class="menu__list"
    >
      <li v-for="item in menuItem" :key="item.id" class="menu__list-item">
        <button
          @click="changeRoute(item.name)"
          class="menu__list-btn"
          :class="{
            active: item.active,
            closed: menuIsActive,
          }"
          type="button"
        >
          <component
            :class="{
              closed: menuIsActive,
            }"
            class="menu__list-icon"
            :color="item.color"
            :is="item.item"
          />
          <h3
            :class="{
              closed: menuIsActive,
            }"
            class="menu__list-title"
          >
            {{ item.title }}
          </h3>
        </button>
      </li>
    </ul>
    <ul v-else class="menu__list">
      <li v-for="item in menuItem" :key="item.id" class="menu__list-item">
        <!-- hello -->
        <!-- <button
          @click="changeRoute(item.name)"
          class="menu__list-btn"
          :class="{
            active: item.active,
          }"
          type="button"
        >
          <component
            class="menu__list-icon"
            :color="item.color"
            :is="item.item"
          />
          <h3 class="menu__list-title">{{ item.title }}</h3>
        </button> -->
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: 20px 16px;
  &-btn {
    width: 24px;
    height: 24px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &-top {
    height: 50px;
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;
  }
  &-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 138%;
    color: #ffffff;
    letter-spacing: 0.75px;
    text-wrap: nowrap;
  }
  &__tab {
    width: 0;
    display: flex;
    height: 42px;
    align-items: center;
    padding: 4px 0;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    // transition-delay: 0;
    // opacity: 0;
    // visibility: hidden;
    overflow: hidden;
    &.active {
      padding: 4px;
      width: 100%;
      // opacity: 1;
      // visibility: visible;
      // transition-delay: 0.2s;
    }
    &-btn {
      width: 50%;
      padding: 8px 0;
      color: #ffffff;
      font-size: 12px;
      border-radius: 8px;
      text-wrap: nowrap;
      &.active {
        background: linear-gradient(180deg, #4ba0f3, #197cdc);
      }
    }
  }
  &__list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    &-item {
      width: 100%;
    }
    &-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 6px;
      position: relative;
      height: 36px;
      &.active {
        background: rgba(255, 255, 255, 0.1);
      }
      &.closed {
        padding: 8px 0;
        justify-content: center;
      }
    }
    &-icon {
      width: 20px;
      height: 20px;
      &.closed {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &-title {
      letter-spacing: 0.8px;
      color: #ffffff;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      text-wrap: nowrap;
      transition-delay: 0.2s;
      &.closed {
        // display: none;
        transition-delay: 0s;
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}
</style>