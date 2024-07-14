<script setup>
import Editor from "@tinymce/tinymce-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Loading from "../Loading.vue";
import Notification from "../Notification.vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminStore } from "@/stores/admin";
import axios from "axios";

const store = useAdminStore();
const { getCategoryIds } = store;

const ids = computed(() => store.categoryIds);

const router = useRouter();
const route = useRoute();

const form = ref({
  title: "",
  content: "",
  alias: "",
  side: "right-inner",
  is_active: true,
  category_id: "",
});

const isItemUpdated = ref(false);
const isItemUpdate = ref(false);
const isItemFault = ref(false);
const loadingUpdate = ref(false);
const isContentFilled = ref(false);
const item = ref({});

const getItem = async () => {
  try {
    const response = await axios.get(
      `http://task.loc.com/api/items/${route.params.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    item.value = response.data.data;
    console.log(item.value);
    Object.assign(form.value, item.value);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const updateItem = async () => {
  if (compareObjects(item.value, form.value)) {
    isItemUpdated.value = true;
    const time = setTimeout(() => {
      isItemUpdated.value = false;
      clearTimeout(time, 5000);
    }, 5000);
    return;
  }

  loadingUpdate.value = true;

  let newData = {
    title: form.value.title,
    content: form.value.content,
    alias: form.value.alias,
    side: form.value.side,
    is_active: form.value.is_active ? "1" : "0",
    category_id: form.value.category_id,
  };

  console.log(newData);

  try {
    const response = await axios.put(
      `http://task.loc.com/api/items/${route.params.id}`,
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

    router.push({ name: "admin-articles" });

  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    isItemFault.value = true;
    const time = setTimeout(() => {
      isItemFault.value = false;
      clearTimeout(time, 5000);
    }, 5000);
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
  getCategoryIds();
  getItem();
});
</script>

<template>
  <div class="overflow-y-scroll item-create">
    <div class="p-6 bg-white mt-6 rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Обновить артикль</h2>
      <form @submit.prevent="updateItem()" class="w-full flex flex-col gap-4">
        <div>
          <label
            for="title"
            class="block mb-2 text-sm text-gray-500 font-medium"
            >Title</label
          >
          <input
            v-model.trim="form.title"
            required
            type="text"
            name="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            id="title"
          />
        </div>
        <div>
          <label
            for="content"
            class="block mb-2 text-sm text-gray-500 font-medium"
            >Content</label
          >
          <Editor
            v-model="form.content"
            api-key="i5yor6ilc8xh687j1qs38d1ph46f1qlau7ssfrfco5ol2l20"
            :init="{
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes autocorrect typography inlinecss',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | addcomment showcomments | spellcheckdialog typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            }"
          />
        </div>
        <div class="flex w-full gap-4">
          <div class="w-full">
            <label
              for="alias"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Alias
            </label>
            <input
              id="alias"
              v-model.trim="form.alias"
              required
              type="text"
              class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />
          </div>
          <div class="w-full">
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Category ID
            </label>
            <select
              placeholder="Выберите категорию"
              id="category"
              required
              v-model="form.category_id"
              class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            >
              <option disabled hidden :value="null" selected>
                Выберите категорию
              </option>
              <option v-for="item in ids" :key="item" :value="item" selected>
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div class="w-full">
          <label for="side" class="block mb-2 text-sm font-medium text-gray-900"
            >Side
          </label>
          <select
            id="side"
            v-model="form.side"
            class="border border-gray-300 text-gray-900 text-sm placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          >
            <option value="right-inner" selected>Right</option>
            <option value="left-inner">Left</option>
          </select>
        </div>

        <div class="flex gap-4 w-full">
          <div class="w-full">
            <SwitchGroup as="div" class="flex flex-col items-start">
              <SwitchLabel as="span" class="text-sm">
                <span class="block mb-2 text-sm text-gray-500 font-medium"
                  >Status</span
                >
              </SwitchLabel>
              <Switch
                v-model="form.is_active"
                :class="[
                  form.is_active ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparen transition-colors duration-200 ease-in-out',
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    form.is_active ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out',
                  ]"
                />
              </Switch>
            </SwitchGroup>
          </div>
        </div>
        <div class="mt-1 flex gap-3 items-center">
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
  </div>

  <!-- <Notification :show="isItemUpdate" @close="isItemUpdate = false">
    Статья обновлена успешно
  </Notification> -->
  <Notification
    :error="true"
    :show="isContentFilled"
    @close="isContentFilled = false"
  >
    Поле Content обьязательное
  </Notification>
  <Notification :error="true" :show="isItemFault" @close="isItemFault = false">
    Не удалось обновить статью, повторите попытку
  </Notification>
  <Notification :show="isItemUpdated" @close="isItemUpdated = false">
    Вы ещё не внесли изменения
  </Notification>
</template>

<style lang="scss" scoped>
.item {
  &-create {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

