<script setup>
import Editor from "@tinymce/tinymce-vue";
import { reactive, ref, watch } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const form = ref({
  title: "",
  alias: "",
  status: true,
});

watch(form, (newVal) => {
  console.log(newVal);
});
</script>

<template>
  <div>
    <div class="p-6 bg-white mt-6 rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Редактировать артикль</h2>
      <form class="w-full flex flex-col gap-4">
        <div>
          <label
            for="title"
            class="block mb-2 text-sm text-gray-500 font-medium"
            >Title</label
          >
          <input
            v-model="form.title"
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
        <div class="flex gap-4 w-full">
          <div class="w-full">
            <SwitchGroup as="div" class="flex flex-col items-start">
              <SwitchLabel as="span" class="text-sm">
                <span class="block mb-2 text-sm text-gray-500 font-medium"
                  >Status</span
                >
              </SwitchLabel>
              <Switch
                v-model="form.status"
                :class="[
                  form.status ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparen transition-colors duration-200 ease-in-out',
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    form.status ? 'translate-x-5' : 'translate-x-0',
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

  <!-- <Notification :show="isArticleUpdated" @close="isUserUpdated = false">
    Вы ещё не внесли изменения
  </Notification> -->
</template>

<style lang="scss" scoped>
</style>

