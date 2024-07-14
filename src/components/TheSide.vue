<script setup>
import { useMainStore } from "@/stores/main";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useMainStore();

const { changePageRoute, getMainRoute, getInnerRouteList } = store;

// const newRoute = computed(() => getMainRoute(route.params.id));
const routeList = computed(() => {
  return getInnerRouteList(route.params.id);
});

function changeRoute(id) {
  changePageRoute(newRoute.value.id, id);
}
</script>


<template>
  <aside class="side">
    <!-- <div class="side-title">{{ newRoute.title }}</div> -->
    <div class="side-line"></div>
    <ul class="side__list">
      <li
        v-for="item in routeList"
        @click="changeRoute(item.id)"
        :class="{
          active: item.id == route.params.itemId,
        }"
        :key="item.id"
        class="side__list-item"
      >
        {{ item.title }}
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.side {
  border-radius: 12px;
  width: 340px;
  border: 1px solid #eaeef5;
  background: #ffffff;
  box-shadow: 0px 4px 20px 0px #06496e1a;
  padding: 20px;
  &-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 33.6px;
    color: #06496e;
    text-transform: uppercase;
  }
  &-line {
    margin: 20px 0;
    height: 1px;
    background: #dde2ea;
    width: 100%;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-item {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #11161e;
      position: relative;
      transition: 0.2s all;
      &::before {
        transition: 0.2s all;
        content: "";
        width: 0;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 2px;
        background-color: #06496e;
      }
      &.active {
        padding-left: 20px;
        color: #06496e;
        &::before {
          width: 12px;
        }
      }
    }
  }
}
</style>