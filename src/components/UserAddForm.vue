<template>
  <div>
    <Form
      v-slot="{ meta }"
      class="flex space-x-4"
      @submit="submitForm"
      :validation-schema="schema"
    >
      <UiInput
        v-model="form.name"
        label="Name"
        name="name"
        type="text"
        class="flex-1"
      />

      <UiInput
        v-model="form.email"
        label="Email"
        name="email"
        type="text"
        class="flex-1"
      />

      <UiInput
        v-model="form.phone"
        v-maska="'+(###) ## ###-##-##'"
        label="Phone"
        name="phone"
        type="text"
        class="flex-1"
      />

      <UiButton
        class="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 self-end px-8"
        type="submit"
        :disabled="!meta.valid"
      >
        Add
      </UiButton>
    </Form>
  </div>
</template>

<script>
import UiInput from "./ui/Ui.Input.vue";
import UiButton from "./ui/Ui.Button.vue";

import { Form, defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";

import { mapActions } from "vuex";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

const schema = {
  name: "required",
  phone: "required|min:19",
  email: "email",
};

export default {
  name: "UserAddForm",

  components: {
    Form,
    UiInput,
    UiButton,
  },

  data() {
    return {
      schema,
      form: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },

  methods: {
    ...mapActions(["addUser"]),

    submitForm() {
      this.addUser(this.form);
    },
  },
};
</script>
