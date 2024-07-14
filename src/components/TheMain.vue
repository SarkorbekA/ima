<script setup>
import arrowIcon from "../assets/icons/IconArrow.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/main";

const articles = computed(() => store.articles);
const route = useRoute();

const activeContent = computed(() => {
  store.activeContent;
});

const store = useMainStore();
const {
  getInnerRoute,
  getMainRoute,
  changeItemActive,
  getArticles,
  getContent,
} = store;

function disActive() {
  changeItemActive(store.isAnyActive.id);
}

const newRoute = computed(() => store.mainRoute);
const newRouteInner = computed(() => store.innerRoute);

onMounted(async () => {
  await getArticles();
  getMainRoute(route.params.id);
  getInnerRoute(route.params.id, route.params.itemId);
  getContent();
  // console.log(activeContent.value);

  // console.log(getContent());
  // activeContent.value.map((el) => console.log(el.isOpen));
  // console.log(activeContent.value.find((el) => el.isOpen === true));
});
</script>


<template>
  <div
    @click="disActive()"
    class="filter"
    :class="{
      active: store.isAnyActive?.is_active ? true : false,
    }"
  ></div>
  <section class="main">
    <div class="route">
      <div class="route__list">
        <div class="route__list-link">Асосий саҳифа</div>
        <div class="route__list-arrow">
          <arrow-icon :color="'#C3CBD9'" />
        </div>
        <div class="route__list-link">{{ newRoute }}</div>
        <div class="route__list-arrow">
          <arrow-icon :color="'#C3CBD9'" />
        </div>
        <div class="route__list-link last">
          {{ newRouteInner }}
        </div>
      </div>
    </div>
    <h1 class="main-title">{{ newRouteInner }}</h1>
    <article class="article">
      <div v-html="activeContent"></div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.filter {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  display: none;
  &.active {
    display: block;
  }
}
.main {
  width: calc(100% - 340px - 16px);
  &-title {
    font-size: 32px;
    font-weight: 600;
    line-height: 44.8px;
    color: #11161e;
    margin-top: 16px;
  }
}

.article {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  &-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 33.6px;
    color: #003c5d;
  }
  &__list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    &-item {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #262c34;
      list-style-type: disc;
    }
  }
}

.route {
  &__list {
    display: flex;
    gap: 8px;
    align-items: center;
    &-link {
      font-size: 18px;
      font-weight: 300;
      line-height: 25.2px;
      color: #a0a4aa;
      &.last {
        color: #585c64;
      }
    }
    &-arrow {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-90deg);
    }
  }
}
</style>

