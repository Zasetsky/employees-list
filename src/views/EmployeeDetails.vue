<template>
  <v-card>
    <v-card-title>
      <span class="headline"
        >{{ employee.firstName }} {{ employee.lastName }}
        {{ employee.middleName }}</span
      >
    </v-card-title>

    <v-card-text>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Должность: {{ employee.position }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Трудовая книжка сдана:
            {{
              employee.employmentBookSubmitted ? "Да" : "Нет"
            }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Оклад: {{ employee.salary }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Дата выхода на работу:
            {{ employee.employmentDate }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Ставка:
            {{ employee.fullTime ? "Полная" : "Половина" }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="$router.push('/')">Вернуться к списку</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types";

interface StoreState {
  employees: Employee[];
}

@Component
export default class EmployeeDetails extends Vue {
  employee: Employee = {
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

  created() {
    const id = parseInt(this.$route.params.id);
    const employee = (this.$store.state as StoreState).employees.find(
      (employee: Employee) => employee.id === id
    );
    if (employee) this.employee = employee;
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    text-align: center;
    padding-top: 20px;
  }

  &__text {
    font-size: 1.2rem;
    color: #34495e;
    line-height: 1.5;
    padding: 20px 30px;

    .v-list-item {
      &__title {
        color: #7f8c8d;
        font-size: 1.1rem;
        line-height: 1.7;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;

    .v-btn {
      font-size: 1.1rem;
      padding: 10px 30px;
      background-color: #1976d2;
      color: #fff; /* Обновленный цвет текста */
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2980b9;
      }
    }
  }
}
</style>
