<script setup>
import { computed, onMounted, ref } from "vue";
import IconArrow from "@/assets/icons/IconArrow.vue";
import IconProfile from "@/assets/icons/IconProfile.vue";
import IconLogOut from "@/assets/icons/IconLogOut.vue";
import { useAdminStore } from "@/stores/admin";

import { useRouter, useRoute, RouterView } from "vue-router";

const store = useAdminStore();

const router = useRouter();
const route = useRoute();

const { getProfileUser } = store;

const user = computed(() => store.profile);

const time = ref("");
const dayOfWeek = ref("");
const formattedDate = ref("");
const profileDropdown = ref(false);

const daysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  time.value = `${hours}:${minutes}:${seconds}`;

  const dayIndex = now.getDay();
  dayOfWeek.value = daysOfWeek[dayIndex];

  const day = String(now.getDate()).padStart(2, "0");
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  formattedDate.value = `${day}-${month}, ${year} Год`;
};

const logOut = () => {
  localStorage.removeItem("access_token");
  router.push("/login");
};

onMounted(() => {
  getProfileUser();
  // console.log(router.getRoutes());
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="main">
    <header class="header">
      <div class="header__time">
        <div class="header-clock">
          {{ time }}
        </div>
        <div class="header__time-line"></div>
        <div class="header__date">
          <h3 class="header__date-day">
            {{ dayOfWeek }}
          </h3>
          <div class="header__date-info">
            {{ formattedDate }}
          </div>
        </div>
      </div>
      <div
        @mouseover="profileDropdown = true"
        @mouseleave="profileDropdown = false"
        @click="profileDropdown = !profileDropdown"
        class="header__profile"
      >
        <button class="header__profile-box">
          <div class="header__profile-image"></div>
          <div class="header__profile-title">{{ user.name }}</div>
          <div class="header__profile-arrow">
            <icon-arrow :color="'#ffffff'" />
          </div>
        </button>
        <div
          :class="{
            active: profileDropdown,
          }"
          class="header__profile-dropdown"
        >
          <ul class="dropdown__list">
            <li class="dropdown__list-item">
              <div class="dropdown-img">
                <icon-profile :color="'#2563eb'" />
              </div>
              <div class="dropdown-title">Профиль</div>
            </li>
            <li @click="logOut()" class="dropdown__list-item">
              <div class="dropdown-img">
                <icon-log-out :color="'#dc2626'" />
              </div>
              <div class="dropdown-title">Выход</div>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="main-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
}

.header {
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__profile {
    position: relative;
    &-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: red;
    }
    &-arrow {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 16px;
        height: 16pxА;
      }
    }
    &-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      color: #fff;
      margin-left: 10px;
    }
    &-box {
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 44px;
      padding: 6px;
      background: rgba(255, 255, 255, 0.15);
      z-index: 2;
      position: relative;
    }
    &-dropdown {
      position: absolute;
      right: 0;
      width: 200px;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
      background: #ffffff;
      padding: 8px;
      border-radius: 8px;

      transition: 0.3s all;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-5px);
      z-index: 1;
      &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
  }
  &__time {
    display: flex;
    align-items: center;
    gap: 12px;
    &-line {
      width: 1px;
      height: 24px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &__date {
    display: flex;
    flex-direction: column;
    &-day {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
    }
    &-info {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
      opacity: 0.8;
    }
  }
  &-clock {
    width: 120px;
    font-weight: 300;
    font-size: 32px;
    color: #ffffff;
  }
}

.dropdown {
  &__list {
    display: flex;
    flex-direction: column;
    &-item {
      padding: 8px;
      display: flex;
      gap: 12px;
      justify-content: flex-start;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s all;
      &:hover {
        background-color: rgb(248, 250, 252);
      }
    }
  }
  &-img {
    border: 1px solid rgb(226, 232, 255);
    border-radius: 4px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-title {
    font-size: 14px;
    color: #1e293b;
  }
}
</style>