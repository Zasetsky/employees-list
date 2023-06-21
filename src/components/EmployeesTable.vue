<template>
  <div>
    <v-data-table
      :items="employees"
      :headers="headers"
      class="elevation-1 mt-4"
    >
      <template slot="item.action" slot-scope="{ item }">
        <v-icon small class="mr-2" @click="editEmployee(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="viewDetails(item)">mdi-eye</v-icon>
        <v-icon small class="mr-2" @click="confirmDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="headline">Удалить сотрудника</v-card-title>
        <v-card-text>
          Вы действительно хотите удалить этого сотрудника?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Отмена</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteEmployee"
            >Удалить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div style="display: flex; justify-content: center">
      <v-btn color="primary" dark class="mt-4" @click="emitAddEmployee">
        Добавить сотрудника
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types";

@Component
export default class EmployeeTableRow extends Vue {
  dialog = false;
  selectedEmployee: Employee | null = null;

  headers: { text: string; value: string; sortable?: boolean }[] = [
    { text: "Имя", value: "firstName" },
    { text: "Фамилия", value: "lastName" },
    { text: "Отчество", value: "middleName" },
    { text: "Должность", value: "position" },
    { text: "Действия", value: "action", sortable: false },
  ];

  get employees() {
    return this.$store.state.employees;
  }

  confirmDelete(employee: Employee) {
    this.selectedEmployee = employee;
    this.dialog = true;
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      this.$store.dispatch("deleteEmployee", this.selectedEmployee);
      this.dialog = false;
    }
  }

  editEmployee(employee: Employee) {
    this.$emit("edit", employee);
  }

  emitAddEmployee() {
    this.$emit("addEmployee");
  }

  viewDetails(employee: Employee) {
    this.$router.push({
      name: "details",
      params: { id: employee.id.toString() },
    });
  }
}
</script>

<style lang="scss" scoped>
.elevation-1 {
  max-width: 800px;
  margin: 20px auto 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);

  .v-data-table {
    &__wrapper {
      overflow-x: auto;
    }

    &__head {
      background-color: #34495e;
      color: #fff;

      .v-data-table-header {
        &__icon {
          color: #fff;
        }
      }
    }

    &__row {
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}

::v-deep .v-dialog {
  top: 10% !important;
  position: fixed !important;
}

.v-dialog {
  position: fixed !important;
  top: 10% !important;

  .v-card {
    border-radius: 10px;
    overflow: hidden;
  }
}

.v-btn {
  font-size: 1.1rem;
  padding: 10px 30px;
  transition: background-color 0.3s ease;
  display: block;
}

.mt-4 {
  margin-top: 20px;
}

.mb-2 {
  background-color: #3498db;
  color: #fff;

  &:hover {
    background-color: #2980b9;
  }
}
</style>
