import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    users:
      (localStorage.getItem("users") &&
        JSON.parse(localStorage.getItem("users"))) ||
      [],
    loading: false,
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
      localStorage.setItem("users", JSON.stringify(users));
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },

  actions: {
    async fetchUsers({ commit }, params = {}) {
      commit("setLoading", true);

      const response = await axios.get("", { params });

      commit("setUsers", response.data);
      commit("setLoading", false);
    },

    addUser({ commit }, userData) {
      const users = this.state.users;

      const newUser = { id: users[users.length - 1].id + 1, ...userData };

      users.push(newUser);

      commit("setUsers", users);
    },

    removeUsers({ commit }, userIds) {
      let users = this.state.users;

      users = users.filter((user) => userIds.indexOf(user.id) === -1);

      commit("setUsers", users);
    },
  },
});

export default store;
