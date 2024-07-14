<script setup>
import { onMounted, ref, watch } from "vue";
import IconEye from "@/assets/icons/IconEye.vue";
import IconEyeSlash from "@/assets/icons/IconEyeSlash.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Notification from "@/components/Notification.vue";
import Loading from "@/components/Loading.vue";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  status: 1,
  role: "user",
  password: "",
});

const isUserCreate = ref(false);
const isUserFault = ref(false);
const loadingCreate = ref(false);

const isPasswordShow = ref(false);

const submitForm = async () => {
  loadingCreate.value = true;
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }

  try {
    const response = await axios.post(
      "http://task.loc.com/api/users",
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
      name: "",
      email: "",
      status: 1,
      role: "user",
      password: "",
    };

    isUserCreate.value = true;
    const time = setTimeout(() => {
      isUserCreate.value = false;
      clearTimeout(time, 5000);
    }, 5000);

    router.push({ name: "admin-users" });

    console.log("Response:", response.data);
  } catch (error) {
    isUserFault.value = true;
    const time = setTimeout(() => {
      isUserFault.value = false;
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
    <h3 class="font-semibold text-2xl">Добавить пользователя</h3>
    <form
      @submit.prevent="submitForm()"
      class="mt-4 flex flex-col w-full gap-3"
    >
      <div class="flex gap-4 w-full">
        <div class="w-full">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
            >Имя</label
          >
          <input
            id="name"
            v-model="form.name"
            required
            type="text"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
        <div class="w-full">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Электронная почта
          </label>
          <input
            id="email"
            v-model="form.email"
            required
            type="email"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
      </div>
      <div class="w-full">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Пароль</label
        >
        <div class="relative">
          <input
            v-model="form.password"
            required
            :type="!isPasswordShow ? 'password' : 'text'"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            id="password"
          />
          <button
            @click="isPasswordShow = !isPasswordShow"
            type="button"
            class="absolute right-2 top-3 z-5 w-5 h-5 flex items-center justify-center"
          >
            <icon-eye v-if="!isPasswordShow" />
            <icon-eye-slash v-if="isPasswordShow" />
          </button>
        </div>

        <div></div>
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
            v-model="form.status"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          >
            <option value="1" selected>Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div class="w-full">
          <label for="role" class="block mb-2 text-sm font-medium text-gray-900"
            >Роли
          </label>
          <select
            id="role"
            v-model="form.role"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          >
            <option value="admin" selected>Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
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
          @click="router.push({ name: 'admin-users' })"
          class="text-sm flex py-2 px-4 bg-red-600 hover:bg-red-800 text-white rounded-md"
          type="button"
        >
          Отменить
        </button>
      </div>
    </form>
  </div>
  <Notification :show="isUserCreate" @close="isUserCreate = false">
    Пользователь создан успешно
  </Notification>
  <Notification :show="isUserFault" @close="isUserFault = false">
    Не удалось создать пользователя
  </Notification>
</template>

<style lang="scss" scoped>
</style>