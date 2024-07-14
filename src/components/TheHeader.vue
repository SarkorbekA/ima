
<script setup>
import warnIcon from "../assets/img/warn.svg";
import phoneIcon from "../assets/icons/IconPhone.vue";
import mailIcon from "../assets/icons/IconMail.vue";
import glassIcon from "../assets/img/glass.svg";
import smartphoneIcon from "../assets/img/smartphone.svg";
import searchIcon from "../assets/img/search.svg";
import instaIcon from "../assets/img/insta.svg";
import facebookIcon from "../assets/img/facebook.svg";
import tgIcon from "../assets/img/tg.svg";
import flagUz from "../assets/img/flag.png";
import arrowIcon from "../assets/img/bottom-arrow.svg";
import arrowLightIcon from "../assets/img/light-arrow.svg";
import logo from "../assets/img/logo.svg";
import burgerMenu from "../assets/img/burger-menu.svg";
import { ref, computed, onMounted, watch } from "vue";

import { useMainStore } from "@/stores/main";

const store = useMainStore();

const articles = computed(() => store.articles);

import TheDropdown from "@/components/TheDropdown.vue";

const { changeItemActive, getArticles } = store;

const dropdownList = computed(() => store.articles);

const features = [
  {
    img: glassIcon,
    title: "Махсус имкониятлар",
  },
  {
    img: smartphoneIcon,
    title: "Мобил версия",
  },
  {
    img: searchIcon,
    title: "Излаш",
  },
];
const socialList = [
  {
    title: "instagram icon",
    img: instaIcon,
    link: "https://www.instagram.com/",
  },
  {
    title: "facebook icon",
    img: facebookIcon,
    link: "https://www.facebook.com/",
  },
  {
    title: "telegram icon",
    img: tgIcon,
    link: "https://web.telegram.org/",
  },
];

const openDropdown = (id) => {
  changeItemActive(id);
};

onMounted(() => {
  // getArticles();
});

// watch(articles, (el) => {
//   console.log(el);
// });
</script>



<template>
  <div>
    <header class="header">
      <div class="header-top">
        <div class="container">
          <div class="header__warn">
            <div class="header__warn-img">
              <img :src="warnIcon" alt="warn icon" />
            </div>
            <h3 class="header__warn-title">Сайт тест режимида ишламоқда</h3>
          </div>
          <div class="header__contact">
            <a href="#" class="header__contact-box header__contact-phone">
              <div class="header__contact-img">
                <phone-icon :color="'#06496E'" />
              </div>
              <div class="header__contact-title">+ (998) 71-232-50-53</div>
            </a>
            <a href="#" class="header__contact-box header__contact-mail">
              <div class="header__contact-img">
                <mail-icon :color="'#06496E'" />
              </div>
              <div class="header__contact-title">info@ima.uz</div>
            </a>
          </div>
        </div>
      </div>
      <div class="header-main">
        <div class="container">
          <div class="header-container">
            <a href="#" class="header__logo">
              <div class="header__logo-img">
                <img :src="logo" alt="logo" />
              </div>
              <div class="header__logo-box">
                <div class="header__logo-subtitle">
                  ЎЗБEКИСТОН РEСПУБЛИКАСИ АДЛИЯ ВАЗИРЛИГИ ҲУЗУРИДАГИ
                </div>
                <div class="header__logo-title">
                  «ИНТEЛЛEКТУАЛ МУЛК МАРКАЗИ» ДАВЛАТ МУАССАСАСИ
                </div>
              </div>
            </a>
            <ul class="features__list">
              <li
                v-for="(item, index) in features"
                :key="index"
                class="features__list-item"
              >
                <div class="features-img">
                  <img :src="item.img" alt="icon" />
                </div>
                <h3 class="features-title">
                  {{ item.title }}
                </h3>
              </li>
              <li class="features__list-item">
                <div class="features-img features__lang-img">
                  <img :src="flagUz" alt="flag image" />
                </div>
                <div class="features__lang-box">
                  <div class="features-title features__lang-title">Ўзбекча</div>
                  <div class="features__lang-arrow">
                    <img :src="arrowIcon" alt="arrow icon" />
                  </div>
                </div>
              </li>
              <li class="features__list-item social">
                <ul class="social__list">
                  <li
                    v-for="(item, index) in socialList"
                    :key="index"
                    class="social__list-item"
                  >
                    <a :href="item.link" class="social__list-link">
                      <img :src="item.img" :alt="item.title" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="header-nav">
        <div class="container">
          <button class="header-nav__btn">
            <img :src="burgerMenu" alt="burger menu btn" />
          </button>
          <nav class="nav">
            <ul class="nav__list">
              <li
                v-for="item in dropdownList"
                :key="item.id"
                class="nav__list-item"
              >
                <div v-if="item.items.length">
                  <div @click="openDropdown(item.id)" class="nav__list-box">
                    <h3 class="nav__item-title">{{ item.title }}</h3>
                    <div class="nav__item-icon">
                      <img :src="arrowLightIcon" alt="arrow icon" />
                    </div>
                  </div>
                  <the-dropdown
                    :class="{
                      active: item.isOpen,
                      left: item.side == 'left',
                      right: item.side == 'right',
                      center: item.side == 'center',
                    }"
                    v-if="item.items"
                    :list="item.items"
                    :id="item.id"
                  />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.header {
  &-top {
    width: 100%;
    background: #f5f8fa;
    padding: 16px 0;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__warn {
    display: flex;
    gap: 8px;
    align-items: center;
    &-img {
      width: 24px;
      height: 24px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-title {
      color: #262c34;
      font-size: 18px;
      font-weight: 500;
      line-height: 140%;
      vertical-align: center;
    }
  }
  &__contact {
    display: flex;
    gap: 40px;
    align-items: center;
    &-box {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    &-img {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-title {
      color: #838890;
      font-size: 18px;
      font-weight: 400;
      line-height: 140%;
    }
  }
  &-container {
    padding: 32px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  &__logo {
    display: flex;
    gap: 12px;
    align-items: center;
    &-img {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    &-subtitle {
      color: #838890;
      font-size: 20px;
      font-weight: 400;
      line-height: 150%;
    }
    &-title {
      color: #11161e;
      font-size: 24px;
      font-weight: 700;
      line-height: 150%;
    }
  }
  &-nav {
    padding: 21px 0;
    background: #06496e;
    background-image: url("../assets/img/bg.png");
    background-repeat: no-repeat;
    background-position: right;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }
    &__btn {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }
}
.features {
  &__list {
    display: flex;
    align-items: center;
    gap: 12px;
    &-item {
      cursor: pointer;
      box-sizing: border-box;
      border: 1px solid #dde2ea;
      border-radius: 12px;
      background: #f5f8fa;
      padding: 11px 16px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  &-img {
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &-title {
    color: #838890;
    font-size: 19px;
    font-weight: 400;
    line-height: 27px;
  }
  &__lang {
    &-title {
      color: #262c34;
    }
    &-img {
      border-radius: 4px;
    }
    &-arrow {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-box {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
}
.social {
  cursor: default;
  &__list {
    display: flex;
    align-items: center;
    gap: 8px;
    &-item {
      display: flex;
      align-items: center;
      width: 24px;
      height: 24px;
    }
    &-link {
      display: flex;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
.nav {
  &__list {
    display: flex;
    align-items: center;
    gap: 24px;
    &-item {
      position: relative;
    }
    &-box {
      display: flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;
    }
  }
  &__item {
    &-title {
      color: #ffffff;
      font-size: 19px;
      font-weight: 400;
      line-height: 26.6px;
    }
    &-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
}
</style>