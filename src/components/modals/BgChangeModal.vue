<script setup>
import IconExit from "@/assets/icons/IconExit.vue";

import { onMounted, computed } from "vue";

import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();

const bgItems = computed(() => store.bgList);

const { changeActiveBg } = store;

const emit = defineEmits(["closeModal"]);

defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="modal" v-if="isActive">
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3 class="modal-title">Темы</h3>
        <div @click="emit('closeModal')" class="modal-exit">
          <icon-exit :color="'#000000'" />
        </div>
      </div>
      <div class="modal-body">
        <ul class="theme__list">
          <li
            @click="changeActiveBg(item.id)"
            v-for="item in bgItems"
            :key="item.id"
            class="theme__list-item"
          >
            <img :src="item.route" alt="theme image" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  &-wrapper {
    padding: 16px 24px;
    margin: auto;
    background-color: #ffffff;
    width: 100%;
    border-radius: 4px;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &-exit {
    cursor: pointer;
    width: 24px;
    height: 24px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
.theme {
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    gap: 16px;
    &-item {
      width: calc(100% / 4 - 4px);
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>