<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.firstName"
              :rules="[rules.required]"
              label="Имя"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.lastName"
              :rules="[rules.required]"
              label="Фамилия"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.middleName"
              label="Отчество"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.position"
              :rules="[rules.required]"
              label="Должность"
            ></v-text-field>
            <v-checkbox
              v-model="editedItem.employmentBookSubmitted"
              label="Трудовая книжка сдана"
            ></v-checkbox>
            <v-text-field
              v-model="editedItem.salary"
              :rules="[rules.required]"
              label="Оклад"
              type="number"
            ></v-text-field>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.employmentDate"
                  label="Дата выхода на работу"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedItem.employmentDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
            <v-select
              v-model="editedItem.fullTime"
              :items="['Полная', 'Половина']"
              label="Ставка"
            ></v-select>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types";

@Component
export default class EmployeeForm extends Vue {
  dialog = false;
  valid = true;
  menu = false;
  editedItem: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    position: "",
    employmentBookSubmitted: false,
    salary: 0,
    employmentDate: new Date(),
    fullTime: true,
  };

  rules = {
    required: (value: string) => !!value || "Обязательное поле.",
  };

  get formTitle() {
    return this.editedItem.id === 0
      ? "Новый сотрудник"
      : "Редактировать сотрудника";
  }

  close() {
    this.dialog = false;
  }

  save() {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    if (form.validate()) {
      if (this.editedItem.id === 0) {
        this.editedItem.id = Date.now();
        this.$store.dispatch("addEmployee", this.editedItem);
      } else {
        this.$store.dispatch("editEmployee", this.editedItem);
      }
      this.close();
    }
  }

  validate() {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    return form.validate();
  }

  edit(employee: Employee) {
    this.editedItem = { ...employee };
    this.dialog = true;
  }

  openForm(employee: Employee) {
    this.editedItem = { ...employee };
    this.dialog = true;
    this.$nextTick(() => {
      (this.$refs.form as any).reset();
    });
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  max-width: 600px;
}

.v-card {
  &__title {
    span {
      color: #424242;
      font-weight: bold;
    }
  }

  &__text {
    padding: 20px;
  }

  &__actions {
    .v-spacer {
      flex-grow: 1;
    }

    .v-btn {
      color: #1976d2;

      &:hover {
        color: darken(#1976d2, 10%);
      }
    }
  }

  .v-form {
    .v-text-field,
    .v-checkbox,
    .v-menu,
    .v-select {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.v-menu {
  &:not(.v-menu--is-active) .v-picker__date-display {
    display: none;
  }
}
</style>
