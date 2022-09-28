<template>
  <div class="mt-4 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="pl-3 py-3">
                  <div class="flex justify-center items-center">
                    <input
                      v-model="allSelected"
                      name="selectAll"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      @click="selectAll"
                    />
                  </div>
                </th>
                <th
                  v-for="header in headers"
                  :key="header.title"
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  <span>{{ header.title }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="item in entity" :key="item.id">
                <td class="pl-3 py-3 whitespace-nowrap">
                  <div class="flex justify-center items-center">
                    <input
                      v-model="selectedItems"
                      :value="item.id"
                      @change="$emit('itemsSelected', selectedItems)"
                      type="checkbox"
                      class="focus:ring-indigo-700 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                </td>
                <slot name="item" :item="item"></slot>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiTable",

  props: {
    headers: {
      type: Array,
      required: true,
    },

    entity: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    selectedItems: [],
    allSelected: false,
  }),

  methods: {
    selectAll() {
      this.selectedItems = [];

      for (const item of this.entity) {
        this.selectedItems.push(item.id);
      }

      this.$emit("itemsSelected", this.selectedItems);
    },
  },
};
</script>
