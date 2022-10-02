<template>
  <div>
    <h1 class="text-2xl mb-4">Users List</h1>
    <UserAddForm />

    <div
      v-if="loading"
      class="w-full text-center pt-20 text-2xl text-gray-700 animate-pulse"
    >
      Loading...
    </div>

    <div v-else>
      <UiTable
        :headers="headers"
        :entity="filteredUsers"
        @sortClicked="sortByColumn"
        @itemsSelected="(ids) => (selectedIds = ids)"
      >
        <template #item="{ item }">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.phone }}
          </td>
        </template>
      </UiTable>

      <div class="mt-4 flex justify-between items-center">
        <UiButton
          @click="deleteUsers"
          class="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-700 px-8"
          >Delete</UiButton
        >

        <div class="flex items-center">
          <UiInput
            v-model="search"
            class=""
            type="text"
            name="search"
            placeholder="Search by name, email, phone of user"
          />

          <span class="ml-4 text-gray-700"
            >users count: {{ filteredUsers.length }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UiTable from "../components/ui/Ui.Table.vue";
import UiInput from "../components/ui/Ui.Input.vue";
import UiButton from "../components/ui/Ui.Button.vue";
import UserAddForm from "../components/UserAddForm.vue";

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Users",

  components: {
    UiTable,
    UiInput,
    UserAddForm,
    UiButton,
  },

  data() {
    return {
      headers: [
        { title: "Name", sortable: true },
        { title: "Email", sortable: true },
        { title: "Phone" },
      ],
      search: "",
      selectedIds: [],
    };
  },

  computed: {
    ...mapState({
      users: (state) => state.users,
      loading: (state) => state.loading,
    }),

    filteredUsers() {
      return this.users.filter((user) => {
        const stringObj = this.convertToString(user);

        return Object.keys(stringObj).some((key) =>
          stringObj[key].includes(this.search.toLowerCase())
        );
      });
    },
  },

  methods: {
    ...mapActions(["fetchUsers", "removeUsers"]),

    sortByColumn(header) {
      const sortBy = header.title.toLowerCase();
      if (header.sortBy === "desc") {
        this.filteredUsers.sort((a, b) => b[sortBy] - a[sortBy]);
      } else {
        this.filteredUsers.sort((a, b) => b[sortBy] - a[sortBy]);
      }
    },

    deleteUsers() {
      this.removeUsers(this.selectedIds);
    },

    convertToString(obj) {
      const { id, ...usertData } = obj;

      Object.keys(usertData).map((key) => {
        usertData[key] = String(usertData[key]).toLowerCase();
      });

      return usertData;
    },
  },

  created() {
    if (
      !localStorage.getItem("users") ||
      !JSON.parse(localStorage.getItem("users")).length
    ) {
      this.fetchUsers();
    }
  },
};
</script>
