<script setup>
import TheDropdown from "./TheDropdown.vue";
import arrowRightIcon from "../assets/icons/IconRightArrow.vue";

import { useMainStore } from "@/stores/main";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useMainStore();
const { changePage, getMainRoute, getInnerRoute } = store;
defineProps({
  list: {
    type: Array,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  idInner: {
    type: Number,
    required: false,
  },
});

const changeRoute = (id, item) => {
  changePage(id, item);
  getMainRoute(id);
  getInnerRoute(id, item.id);
};
</script>


<template>
  <div class="dropdown">
    <div class="dropdown-line"></div>
    <ul class="dropdown__list">
      <li v-for="item in list" :key="item.id" class="dropdown__list-item">
        <div
          @click="changeRoute(id, item)"
          :class="{
            'hover-effect': !item.innerList,
          }"
          class="dropdown__list-box"
        >
          <h3 class="dropdown__list-title">{{ item.title }}</h3>
          <div v-if="item.innerList" class="dropdown__list-icon">
            <arrow-right-icon :color="'#6ECDF0'" />
          </div>
        </div>
        <the-dropdown
          :class="{
            active: item.is_active,
            left: item.side == 'left',
            right: item.side == 'right',
            center: item.side == 'center',
            'left-inner': item.side == 'left-inner',
            'right-inner': item.side == 'right-inner',
          }"
          v-if="item.innerList"
          :list="item.innerList"
          :id="id"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  max-width: 350px;
  width: 350px;
  background: #06496e;
  padding: 26px 40px 20px 20px;
  position: absolute;
  top: 100%;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s all;
  &.center {
    left: 50%;
    transform: translateX(-50%) translateY(15px);
  }
  &.left {
    left: 0;
    transform: translateY(15px);
  }
  &.left-inner {
    top: 0;
    left: calc(-100% - 10px);
  }
  &.right-inner {
    top: 0;
    right: calc(-100% - 10px);
  }
  &.right {
    right: 0;
    transform: translateY(15px);
  }
  &.active {
    opacity: 1;
    visibility: visible;
  }
  &::after {
    top: 0;
    left: 0;
    content: "";
    position: absolute;
    height: 6px;
    width: 100%;
    background: #6ecdf0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-item {
      cursor: pointer;
    }
    &-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.hover-effect {
        transition: 0.2s all;
        position: relative;
        &::before {
          content: "";
          width: 0;
          height: 2px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: #6ecdf0;
          transition: 0.2s all;
        }
        &:hover {
          padding-left: 20px;
          &::before {
            width: 12px;
          }
        }
      }
    }
    &-icon {
      width: 20px;
      height: 20px;
      svg {
        width: 100%;
        height: 100%;
        transform: translateX(20px);
      }
    }
    &-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
    }
  }
}
</style>