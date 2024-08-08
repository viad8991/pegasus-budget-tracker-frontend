# test

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### TODO-s

1. Cтруктура для компонентов
```
// структура для компонентов примерно такая

├──CreateFamily
│   ├── CreateFamily.vue
│   ├── CreateFamily.scss // иногда выносят стили в отдельный файл
│   └── CreateFamily.test.vue // для тестов

// показал примеры со стилями и тестами, чтобы показать почему нужна отдельная папка под компонент
```

2. Отличия UserStore и AuthStore:
    1. UserStore - обычно за данные пользователя отвечает пользовательский стор UserStore
    2. AuthStore - за данные по авторизации AuthStore, там хранят username, password из формы


3. Структура для типов:
```
// типы выносятся в отдельный файл, чтобы не засорять данные, в котором итак много логики будет помимо типов
// структура обычно такая:

├── auth
│   ├── store
│   │   ├── authStore.ts
│   │   └── authStore.test.ts
│   ├── types
│   │   └── authStoreTypes.ts
```

4. Библиотека для нотификаций: toast

https://www.npmjs.com/package/react-toastify

5. others:

```
// вижу, что ты тут хранить данные пользователя
// обычно за данные пользователя отвечает пользовательский стор UserStore
// а за данные по авторизации AuthStore, там хранят username, password из формы

// типы выносятся в отдельный файл, чтобы не засорять данные, в котором итак много логики будет помимо типов
// структура обычно такая:
// auth
//      store
//         authStore.ts
//          authStore.test.ts
//      types
//          authStoreTypes.ts

// именование файлов для сторов принято вести с приставкой authStore
// хз почему так, но много где видел
```
// TODO add HOC (high order component) (Users + Categories)
