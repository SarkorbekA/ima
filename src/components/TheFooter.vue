<script setup>
import logo from "../assets/img/footer_logo.svg";
import mapIcon from "../assets/icons/IconMap.vue";

import faxIcon from "../assets/icons/IconFax.vue";
import locationIcon from "../assets/icons/IconLocation.vue";
import phoneIcon from "../assets/icons/IconPhone.vue";
import mailIcon from "../assets/icons/IconMail.vue";
</script>


<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <a href="#" class="footer__logo">
          <div class="footer__logo-img">
            <img :src="logo" alt="logo" />
          </div>
          <div class="footer__logo-box">
            <div class="footer__logo-subtitle">
              ЎЗБEКИСТОН РEСПУБЛИКАСИ АДЛИЯ ВАЗИРЛИГИ ҲУЗУРИДАГИ
            </div>
            <div class="footer__logo-title">
              «ИНТEЛЛEКТУАЛ МУЛК МАРКАЗИ» ДАВЛАТ МУАССАСАСИ
            </div>
          </div>
        </a>
        <a href="#" class="footer__map">
          <div class="footer__map-icon">
            <map-icon />
          </div>
          <h3 class="footer__map-title">Сайт харитаси</h3>
        </a>
      </div>
    </div>
    <div class="container">
      <ul class="footer__info">
        <li class="footer__info-item">
          <a href="#" class="footer__info-link">
            <div class="footer__info-icon">
              <phone-icon :color="'#6ECDF0'" />
            </div>
            <h3 class="footer__info-title">
              Тел: <span>+ (998) 71-232-50-53</span>
            </h3>
          </a>
        </li>
        <li class="footer__info-item">
          <a href="#" class="footer__info-link">
            <div class="footer__info-icon">
              <fax-icon />
            </div>
            <h3 class="footer__info-title">
              Факс: <span>+ (998) 71-232-50-53</span>
            </h3>
          </a>
        </li>
        <li class="footer__info-item">
          <a href="#" class="footer__info-link">
            <div class="footer__info-icon">
              <mail-icon :color="'#6ECDF0'" />
            </div>
            <h3 class="footer__info-title">Email: <span>info@ima.uz</span></h3>
          </a>
        </li>
        <li class="footer__info-item">
          <a href="#" class="footer__info-link">
            <div class="footer__info-icon">
              <location-icon />
            </div>
            <h3 class="footer__info-title">
              Манзил: <span>100011, Toshkent shahri, Xadra mavzesi, 33</span>
            </h3>
          </a>
        </li>
      </ul>
      <div class="line"></div>
      <div class="footer-bottom">
        <h4 class="footer-copyright">© 2024 Барча ҳуқуқлар ҳимояланган</h4>
        <div class="footer-creator">
          Сайт яратувчиси: <span>Online Service Group</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #06496e;
  padding-top: 60px;
  padding-bottom: 24px;
  &-main {
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
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
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      font-weight: 400;
      line-height: 150%;
    }
    &-title {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      line-height: 150%;
    }
  }
  &__map {
    display: flex;
    gap: 8px;
    align-items: center;
    &-title {
      color: #ffffff;
      font-size: 18px;
      font-weight: 300;
      line-height: 25.2px;
    }
  }
  &__info {
    margin-top: 32px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    &-link {
      display: flex;
      padding: 10px;
      padding-right: 16px;
      align-items: center;
      gap: 12px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }
    &-icon {
      background-color: rgba(70, 195, 244, 0.15);
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    &-title {
      font-size: 20px;
      font-weight: 300;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.8);
      span {
        color: #ffffff;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #ffffff;
    opacity: 0.2;
    margin: 24px 0;
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-copyright {
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.8);
  }
  &-creator {
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.8);
    span {
      color: #ffffff;
    }
  }
}
</style>

