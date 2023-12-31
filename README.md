
# Приложение для управления персоналом

## Описание проекта

Данное приложение представляет собой систему управления персоналом компании, разработанную на Vue 2 с использованием библиотеки компонентов Vuetify.

## Функциональные возможности

- Отображение списка сотрудников в табличном виде. Поля в таблице: Имя, Фамилия, Отчество, Должность.
- Добавление сотрудника через форму в модальном окне. Поля в форме: Имя, Фамилия, Отчество, Должность, Трудовая книжка сдана (галочка), Оклад, Дата выхода на работу, Ставка (полная, половина).
- Редактирование данных сотрудника через форму в модальном окне.
- Удаление сотрудника из списка с запросом подтверждения действия.
- Просмотр детальной информации о сотруднике на отдельной странице.
- Все данные сохраняются в Local Storage.

## Установка и запуск

```bash
# установите зависимости
npm install

# запустите приложение в режиме разработки на localhost:8080
npm run serve

# соберите проект для продакшена
npm run build 
```

## Используемые технологии и инструменты
- Vue 2
- Vuetify
- Vuex
- Vuex Persist
- TypeScript
- ESLint
- Prettier

## Известные проблемы и предупреждения
- `Предупреждение ESLint:` На данный момент есть проблема с типизацией в одном из компонентов (EmployeeForm.vue), где используется тип any.

- `Предупреждение Dart Sass:` Использование / для деления вне calc() является устаревшим и будет удалено в Dart Sass 2.0.0. Необходимо заменить на функцию math.div() или использовать calc(). Эта проблема связана с использованием Vue 2 и Vuetify, которые в текущей версии все еще используют устаревший синтаксис деления.