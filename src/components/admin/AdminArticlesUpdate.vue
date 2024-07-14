<script setup>
import { onMounted, ref, watch } from "vue";
import IconEye from "@/assets/icons/IconEye.vue";
import IconEyeSlash from "@/assets/icons/IconEyeSlash.vue";
import Loading from "@/components/Loading.vue";
import Notification from "@/components/Notification.vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const form = ref({
  title: "",
  alias: "",
  is_active: 1,
  side: "right",
});

const isArticleUpdated = ref(false);
const loadingUpdate = ref(false);
const article = ref({});

const getArticle = async () => {
  try {
    const response = await axios.get(
      `http://task.loc.com/api/articles/${route.params.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    article.value = response.data.data;
    Object.assign(form.value, article.value);
    // console.log(response);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const updateArticle = async () => {
  if (compareObjects(article.value, form.value)) {
    isArticleUpdated.value = true;
    const time = setTimeout(() => {
      isArticleUpdated.value = false;
      clearTimeout(time, 5000);
    }, 5000);
    return;
  }

  loadingUpdate.value = true;

  let newData = {
    title: form.value.title,
    side: form.value.side,
    alias: form.value.alias,
    is_active: form.value.is_active,
  };

  console.log(newData);

  try {
    const response = await axios.put(
      `http://task.loc.com/api/articles/${route.params.id}`,
      newData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    router.push({ name: "admin-articles" });

    Object.assign(form.value, response.data.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    loadingUpdate.value = false;
  }
};

const compareObjects = (obj1, obj2) => {
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

onMounted(() => {
  getArticle();
});
</script>

<template>
  <div class="mt-6 p-6 bg-white rounded-md">
    <h3 class="font-semibold text-2xl">Редактировать артикль</h3>
    <form
      @submit.prevent="updateArticle()"
      class="mt-4 flex flex-col w-full gap-3"
    >
      <div class="flex gap-4 w-full">
        <div class="w-full">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
            >Заголовок</label
          >
          <input
            id="name"
            v-model="form.title"
            required
            type="text"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
        <div class="w-full">
          <label
            for="alias"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Alias
          </label>
          <input
            id="alias"
            v-model="form.alias"
            required
            type="text"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
      </div>
      <div class="flex gap-4 w-full">
        <div class="w-full">
          <label
            for="status"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Статус</label
          >
          <select
            id="status"
            v-model="form.is_active"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          >
            <option value="1" selected>Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div class="w-full">
          <label for="role" class="block mb-2 text-sm font-medium text-gray-900"
            >Side
          </label>
          <select
            id="role"
            v-model="form.side"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          >
            <option value="right" selected>Right</option>
            <option value="left">Left</option>
          </select>
        </div>
      </div>
      <div class="mt-1 flex gap-3">
        <button
          class="text-sm w-[105px] flex justify-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          type="submit"
        >
          <h3 v-if="!loadingUpdate">Сохранить</h3>
          <Loading v-else class="w-5 h-5" />
        </button>
        <button
          @click="router.push({ name: 'admin-articles' })"
          class="text-sm flex py-2 px-4 bg-red-600 hover:bg-red-800 text-white rounded-md"
          type="button"
        >
          Отменить
        </button>
      </div>
    </form>
  </div>

  <Notification :show="isArticleUpdated" @close="isUserUpdated = false">
    Вы ещё не внесли изменения
  </Notification>
</template>

<style lang="scss" scoped>
</style>
