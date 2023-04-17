[![Netlify Status](https://api.netlify.com/api/v1/badges/911bfdcb-e048-45c5-8fc1-ee87dcd15bff/deploy-status)](https://app.netlify.com/sites/musicstringtheory/deploys)

# String Theory

TODO : Add project description

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Create mobile application

This project use [Capacitor](https://capacitorjs.com/) to create a cross-platform native application

To create a buildable mobile application run the following command
```sh
vite build && cap sync
```

To launch application on android device
```sh
cap run android
```
To launch application on iOS device
```sh
cap run ios
```