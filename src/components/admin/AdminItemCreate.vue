<script setup>
import Editor from "@tinymce/tinymce-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Loading from "../Loading.vue";
import Notification from "../Notification.vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";
import axios from "axios";

const store = useAdminStore();
const { getCategoryIds } = store;

const ids = computed(() => store.categoryIds);

const router = useRouter();

const form = ref({
  title: "",
  content: "",
  alias: "",
  side: "right-inner",
  is_active: true,
  category_id: "",
});

const loadingCreate = ref(false);
const isItemCreate = ref(false);
const isContentFilled = ref(false);
const isCategoryFault = ref(false);

const submitForm = async () => {
  if (!form.value.content.trim()) {
    isContentFilled.value = true;
    return;
  }

  loadingCreate.value = true;
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }

  try {
    const response = await axios.post(
      "http://task.loc.com/api/items",
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
      content: "",
      alias: "",
      side: "right-inner",
      is_active: true,
      category_id: store.activeArticle ? store.activeArticle : "",
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

onMounted(() => {
  form.value.category_id = store.activeArticle;

  getCategoryIds();
});
</script>

<template>
  <div class="overflow-y-scroll item-create">
    <div class="p-6 bg-white mt-6 rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Добавить артикль</h2>
      <form @submit.prevent="submitForm()" class="w-full flex flex-col gap-4">
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
  </div>

  <!-- <Notification :show="isItemCreate" @close="isItemCreate = false">
    Артикль создан успешно
  </Notification> -->
  <Notification
    :error="true"
    :show="isContentFilled"
    @close="isContentFilled = false"
  >
    Поле Content обьязательное
  </Notification>
  <Notification
    :error="true"
    :show="isCategoryFault"
    @close="isCategoryFault = false"
  >
    Не удалось создать статью, повторите попытку
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

