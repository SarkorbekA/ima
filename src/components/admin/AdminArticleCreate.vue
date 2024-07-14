<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Notification from "@/components/Notification.vue";
import Loading from "@/components/Loading.vue";

const router = useRouter();

const form = ref({
  title: "",
  alias: "",
  is_active: 1,
  side: "right",
});

const isCategoryCreate = ref(false);
const isCategoryFault = ref(false);
const loadingCreate = ref(false);

const submitForm = async () => {
  loadingCreate.value = true;
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }

  try {
    const response = await axios.post(
      "http://task.loc.com/api/articles",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );

    form.value = {
      title: "",
      alias: "",
      status: 1,
      side: "right",
    };

    router.push({ name: "admin-articles" });
    console.log("Response:", response.data);
  } catch (error) {
    isCategoryFault.value = true;
    const time = setTimeout(() => {
      isCategoryFault.value = false;
      clearTimeout(time, 5000);
    }, 5000);

    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    loadingCreate.value = false;
  }
};
</script>

<template>
  <div class="mt-6 p-6 bg-white rounded-md">
    <h3 class="font-semibold text-2xl">Добавить категорию</h3>
    <form
      @submit.prevent="submitForm()"
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
          <h3 v-if="!loadingCreate">Сохранить</h3>
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
  <!-- <Notification :show="isCategoryCreate" @close="isCategoryCreate = false">
    Категорию создана успешно
  </Notification> -->
  <Notification :show="isCategoryFault" @close="isCategoryFault = false">
    Не удалось создать категорию
  </Notification>
</template>

<style lang="scss" scoped>
</style>