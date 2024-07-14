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
  name: "",
  email: "",
  status: "active",
  role: "admin",
});

// const isPasswordShow = ref(false);
const isUserUpdated = ref(false);
const loadingUpdate = ref(false);
const user = ref({});

const getUser = async () => {
  try {
    const response = await axios.get(
      `http://task.loc.com/api/users/${route.params.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    user.value = response.data.data;
    Object.assign(form.value, user.value);
    console.log(response);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const updateUser = async () => {
  if (compareObjects(user.value, form.value)) {
    isUserUpdated.value = true;
    const time = setTimeout(() => {
      isUserUpdated.value = false;
      clearTimeout(time, 5000);
    }, 5000);
    return;
  }

  loadingUpdate.value = true;

  let newData = {
    name: form.value.name,
    email: form.value.email,
    status: form.value.status,
    role: form.value.role,
  };

  try {
    const response = await axios.put(
      `http://task.loc.com/api/users/${route.params.id}`,
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
    Object.assign(form.value, response.data.data);

    router.push({ name: "admin-users" });
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
  getUser();
});
</script>

<template>
  <div class="overflow-y-scroll">
    <div class="mt-6 p-6 bg-white rounded-md">
      <h3 class="font-semibold text-2xl">Редактировать пользователя</h3>
      <form
        @submit.prevent="updateUser()"
        class="mt-4 flex flex-col w-full gap-6"
      >
        <div class="flex gap-4 w-full">
          <div class="w-full">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
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
        <!-- <div class="w-full">
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
      </div> -->
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
            <label
              for="role"
              class="block mb-2 text-sm font-medium text-gray-900"
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
            <h3 v-if="!loadingUpdate">Сохранить</h3>
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
  </div>

  <Notification :show="isUserUpdated" @close="isUserUpdated = false">
    Вы ещё не внесли изменения
  </Notification>
</template>

<style lang="scss" scoped>
</style>