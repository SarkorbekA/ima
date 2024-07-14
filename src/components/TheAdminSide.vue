<script setup>
import IconStars from "@/assets/icons/IconStars.vue";
import BgChangeModal from "@/components/modals/BgChangeModal.vue";

import { ref } from "vue";

function closeBgModal() {
  modalIsActive.value = !modalIsActive.value;
}

const modalIsActive = ref(false);
</script>


<template>
  <aside class="sidebar">
    <div class="sidebar-wrapper">
      <ul class="sidebar__list">
        <li @click="modalIsActive = !modalIsActive" class="sidebar__list-item">
          <div class="sidebar__list-img">
            <icon-stars :color="'#ffffff'" />
          </div>
        </li>
      </ul>
    </div>
  </aside>
  <bg-change-modal @closeModal="closeBgModal" :isActive="modalIsActive" />
  <div
    class="filter"
    @click="closeBgModal()"
    :class="{
      active: modalIsActive,
    }"
  ></div>
</template>


<style lang="scss" scoped>
.filter {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  z-index: 9;
  visibility: hidden;
  transition: 0.1s all;
  &.active {
    visibility: visible;
    opacity: 1;
  }
}

.sidebar {
  width: 70px;
  height: 100%;
  padding: 20px 0;
  &-wrapper {
    height: 100%;
    padding: 0 15px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
  }
  &__list {
    display: flex;
    flex-direction: column;
    &-item {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      cursor: pointer;
    }
    &-img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 24px;
        height: 24p;
      }
    }
  }
}
</style>