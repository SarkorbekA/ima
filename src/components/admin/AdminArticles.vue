<script setup>
import IconDelete from "@/assets/icons/IconDelete.vue";
import IconEdit from "@/assets/icons/IconEdit.vue";
import { reactive, ref, watch, computed, onMounted } from "vue";
import IconPlus from "@/assets/icons/IconPlus.vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useRouter } from "vue-router";
import Notification from "@/components/Notification.vue";
import axios from "axios";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();

const { getArticles, changeActiveArticle } = store;

const articles = computed(() => store.articles);
const isError = computed(() => store.isError);

const isStatusChanged = ref(false);
const isArticleDelete = ref(false);
const isItemDelete = ref(false);

const router = useRouter();

const editArticle = (id) => {
  router.push(`/admin/articles/edit/${id}`);
};

const editItem = (id) => {
  router.push(`/admin/item/edit/${id}`);
};

const changeArticleStatus = async (id) => {
  try {
    const response = await axios.put(
      `http://task.loc.com/api/articles/change-status/${id}`,
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
    console.log(response.data.message);
    console.log("Category status changed:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isStatusChanges.value = true;
    getArticles();
    const time = setTimeout(() => {
      isStatusChanges.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

const changeItemStatus = async (id) => {
  try {
    const response = await axios.put(
      `http://task.loc.com/api/items/change-status/${id}`,
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
    console.log(response.data.message);
    console.log("Item status changed:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isStatusChanged.value = true;
    getArticles();
    const time = setTimeout(() => {
      isStatusChanged.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

const createItem = (id) => {
  router.push({ name: `item-create` });
  changeActiveArticle(id);
};

const deleteArticle = async (id) => {
  const isConfirmed = confirm("Are you sure you want to delete this article?");
  if (!isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(
      `http://task.loc.com/api/articles/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    console.log("Article deleted:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isArticleDelete.value = true;
    getArticles();
    const time = setTimeout(() => {
      isArticleDelete.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

const deleteItem = async (id) => {
  const isConfirmed = confirm("Are you sure you want to delete this item?");
  if (!isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(`http://task.loc.com/api/items/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    console.log("Item deleted:", response.data.message);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  } finally {
    isItemDelete.value = true;
    getArticles();
    const time = setTimeout(() => {
      isItemDelete.value = false;
      clearTimeout(time, 5000);
    }, 5000);
  }
};

onMounted(() => {
  getArticles();
});
</script>

<template>
  <div class="py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button
        @click="router.push({ name: 'category-create' })"
        type="button"
        class="bg-[#ffffff26] w-[34px] h-[34px] flex items-center justify-center rounded-lg"
      >
        <icon-plus :color="'#ffffff'" />
      </button>
      <h3 class="text-2xl text-white leading-6">Артикли</h3>
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
                  class="px-3 w-[72%] py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Заголовок
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
          </table>
          <div
            v-if="articles !== null && articles?.length"
            class="divide-y divide-gray-200 bg-white"
          >
            <div v-for="el in articles" :key="el.id" class="w-full">
              <div
                :class="{
                  active: el.isOpen,
                }"
                class="relative table-item w-full flex items-center justify-between"
              >
                <div
                  @click="el.isOpen = !el.isOpen"
                  class="w-[74%] flex items-center"
                  :class="{
                    'cursor-pointer': el.items.length,
                  }"
                >
                  <div
                    class="w-[4%] whitespace-nowrap py-2 pl-3 pr-2 text-xs font-medium text-[#313131]"
                  >
                    {{ el.id }}
                  </div>
                  <div
                    class="relative whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                  >
                    {{ el.title }}
                    <span
                      class="py-1 px-2 rounded-md bg-blue-50 absolute text-xs font-medium top-1/2 translate-x-6 ring-1 ring-inset ring-blue-700/10 -translate-y-1/2 right-0"
                      >{{ el.items.length }}</span
                    >
                  </div>
                </div>
                <div
                  class="w-[10%] whitespace-nowrap px-3 py-2 text-xs text-[#313131]"
                >
                  <div
                    @click="changeArticleStatus(el.id)"
                    class="table-status"
                    :class="{
                      active: !el.is_active == true,
                    }"
                  >
                    {{ el.is_active == true ? "Active" : "Inactive" }}
                  </div>
                </div>
                <div
                  class="w-[16%] relative flex gap-2 justify-end whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                >
                  <button
                    @click="editArticle(el.id)"
                    type="button"
                    class="py-1 px-2 rounded-md bg-blue-200"
                  >
                    <icon-edit />
                  </button>
                  <button
                    @click="deleteArticle(el.id)"
                    type="button"
                    class="py-1 px-2 rounded-md bg-red-200"
                  >
                    <icon-delete />
                  </button>
                </div>
              </div>
              <div
                class="table-inner"
                :class="{
                  active: el.isOpen,
                }"
              >
                <div
                  v-for="item in el.items"
                  :key="item.id"
                  class="relative w-full flex items-center justify-between"
                >
                  <div
                    class="w-[3%] whitespace-nowrap py-2 pl-3 pr-2 text-xs font-medium text-[#313131]"
                  >
                    {{ item.id }}
                  </div>
                  <div
                    class="w-[71%] whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    class="w-[10%] whitespace-nowrap px-3 py-2 text-xs text-[#313131]"
                  >
                    <div
                      @click="changeItemStatus(item.id)"
                      class="table-status"
                      :class="{
                        active: !item.is_active == true,
                      }"
                    >
                      {{ item.is_active == true ? "Active" : "Inactive" }}
                    </div>
                  </div>
                  <div
                    class="w-[16%] relative flex gap-2 justify-end whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button
                      @click="editItem(item.id)"
                      type="button"
                      class="py-1 px-2 rounded-md bg-blue-200"
                    >
                      <icon-edit />
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      type="button"
                      class="py-1 px-2 rounded-md bg-red-200"
                    >
                      <icon-delete />
                    </button>
                  </div>
                </div>
                <div
                  @click="createItem(el.id)"
                  class="relative w-full flex items-center justify-center py-2.5 cursor-pointer"
                >
                  <icon-plus :color="'#000000'" />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="articles == null"
            class="divide-y divide-gray-200 bg-white"
          >
            <div class="flex items-center" v-for="el in 5" :key="el">
              <div
                class="w-[4%] whitespace-nowrap py-2 pl-3 pr-2 text-xs font-medium text-[#313131]"
              >
                <SkeletonLoader class="w-full h-[28px]" />
              </div>
              <div
                class="w-[70%] whitespace-nowrap px-3 py-2 text-lg font-semibold text-[#313131]"
              >
                <SkeletonLoader class="w-full h-[28px]" />
              </div>

              <div
                class="w-[10%] whitespace-nowrap px-3 py-2 text-xs text-[#313131]"
              >
                <SkeletonLoader class="w-full h-[28px]" />
              </div>
              <div
                class="w-[16%] relative flex gap-2 justify-end whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
              >
                <SkeletonLoader class="w-full h-[28px]" />
              </div>
            </div>
          </div>
          <div
            class="bg-white w-full h-32 relative"
            v-else-if="!articles?.length"
          >
            <div
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              Пусто
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Notification :show="isStatusChanged" @close="isStatusChanged = false">
    Статус измёнён успешно
  </Notification>
  <Notification :error="true" :show="isError" @close="isError = false">
    Не удалось загрузить данные
  </Notification>
  <Notification :show="isArticleDelete" @close="isArticleDelete = false">
    Артикль удалён успешно
  </Notification>
  <Notification :show="isItemDelete" @close="isItemDelete = false">
    Статья удалена успешно
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
  &-inner {
    height: 0;
    overflow: hidden;
    &.active {
      height: 100%;
    }
  }
  &-item {
    &.active {
      background-color: rgba(126, 255, 109, 0.2);
    }
  }
}
</style>