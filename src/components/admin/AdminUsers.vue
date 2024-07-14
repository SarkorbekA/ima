<script setup>
import IconDelete from "@/assets/icons/IconDelete.vue";
import IconEdit from "@/assets/icons/IconEdit.vue";
import IconPlus from "@/assets/icons/IconPlus.vue";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";
import Notification from "@/components/Notification.vue";
import axios from "axios";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const store = useAdminStore();

const { getUsers } = store;

const users = computed(() => store.users);
const isError = computed(() => store.isError);

const router = useRouter();

const isProductDelete = ref(false);
const isStatusChanges = ref(false);

const changeUserActive = async (id) => {
  try {
    const response = await axios.put(
      `http://task.loc.com/api/users/change-status/${id}`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    console.log("User status changed:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isStatusChanges.value = true;
    getUsers();
    const time = setTimeout(() => {
      isStatusChanges.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

const deleteUser = async (id) => {
  const isConfirmed = confirm("Are you sure you want to delete this user?");
  if (!isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(`http://task.loc.com/api/users/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    console.log("User deleted:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isProductDelete.value = true;
    getUsers();
    const time = setTimeout(() => {
      isProductDelete.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

const editUser = (id) => {
  router.push(`/admin/users/edit/${id}`);
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button
        @click="router.push({ name: 'user-create' })"
        type="button"
        class="bg-[#ffffff26] w-[34px] h-[34px] flex items-center justify-center rounded-lg"
      >
        <icon-plus :color="'#ffffff'" />
      </button>
      <h3 class="text-2xl text-white leading-6">Пользователи</h3>
    </div>
  </div>
  <div class="flow-root">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg"
        >
          <table class="min-w-full bg-white">
            <thead class="bg-[#eff7ff]">
              <tr>
                <th
                  scope="col"
                  class="py-2 w-[2%] pl-3 pr-2 text-left text-sm font-semibold text-gray-900"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-3 w-[30%] py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Имя
                </th>
                <th
                  scope="col"
                  class="px-3 w-[42%] py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 w-[10%] py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Статус
                </th>
                <th scope="col" class="w-[16%] relative py-2 pl-3 pr-4"></th>
              </tr>
            </thead>
            <tbody
              v-if="users !== null && users?.length"
              class="divide-y divide-gray-200 bg-white"
            >
              <tr v-for="person in users" :key="person.id">
                <td
                  class="whitespace-nowrap py-2 pl-3 pr-2 text-xs font-medium text-[#313131]"
                >
                  {{ person.id }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                >
                  {{ person.name }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                >
                  {{ person.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-2 text-xs text-[#313131]">
                  <div
                    @click="changeUserActive(person.id)"
                    class="table-status"
                    :class="{
                      active: !person.status,
                    }"
                  >
                    {{ person.status == true ? "Active" : "Inactive" }}
                  </div>
                </td>
                <td
                  class="relative flex gap-2 justify-end whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                >
                  <button
                    @click="editUser(person.id)"
                    type="button"
                    class="py-1 px-2 rounded-md bg-blue-200"
                  >
                    <icon-edit />
                  </button>
                  <button
                    @click="deleteUser(person.id)"
                    type="button"
                    class="py-1 px-2 rounded-md bg-red-200"
                  >
                    <icon-delete />
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody
              v-if="users == null"
              class="divide-y divide-gray-200 bg-white"
            >
              <tr v-for="person in 5" :key="person">
                <td
                  class="whitespace-nowrap py-2 pl-3 pr-2 text-xs font-medium text-[#313131]"
                >
                  <SkeletonLoader class="w-full h-[28px] h-full" />
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                >
                  <SkeletonLoader class="w-full h-[28px] h-full" />
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                >
                  <SkeletonLoader class="w-full h-[28px] h-full" />
                </td>
                <td class="whitespace-nowrap px-3 py-2 text-xs text-[#313131]">
                  <SkeletonLoader class="w-full h-[28px] h-full" />
                </td>
                <td
                  class="relative flex gap-2 justify-end whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                >
                  <SkeletonLoader class="w-full h-[28px] h-full" />
                </td>
              </tr>
            </tbody>
            <tbody class="w-full h-32 relative" v-else-if="!users.length">
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                Пусто
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Notification :show="isProductDelete" @close="isProductCreate = false">
    Пользователь удалён успешно
  </Notification>
  <Notification :show="isStatusChanges" @close="isStatusChanges = false">
    Статус измёнён успешно
  </Notification>
  <Notification :error="true" :show="isError" @close="isError = false">
    Не удалось загрузить данные
  </Notification>
</template>

<style lang="scss" scoped>
.table {
  &-status {
    width: fit-content;
    color: #ffffff;
    background-color: rgb(34, 197, 94);
    padding: 4px 8px;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    &.active {
      background-color: rgb(248, 113, 113);
    }
  }
}
</style>