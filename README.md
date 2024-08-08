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

### Best Practice:

1. Cтруктура для компонентов
```
/
├── src
│   ├── components
│   │   ├── CreateFamily
│   │   │   ├── CreateFamily.vue
│   │   │   ├── CreateFamily.scss     // иногда выносят стили в отдельный файл
│   │   │   └── CreateFamily.test.vue // для тестов
```

2. Структура `store`
```
/
├── src
│   ├── store 
│   │   ├── auth
│   │   │   ├── store
│   │   │   │   ├── authStore.ts
│   │   │   │   └── authStore.test.ts
│   │   │   ├── types
│   │   │   │   └── authStoreTypes.ts
```

### TODO-s

1. Библиотека для нотификаций: toast

   https://www.npmjs.com/package/react-toastify

2. others:
   1.  TODO add HOC (high order component) (Users + Categories)
