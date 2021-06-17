# tutoring

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

firebase deploy --only hosting:msj-tutor

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

firebase emulators:start --only functions
firebase deploy --only functions

curl -d '{"email": "david.dw.guo@gmail.com"}' -H "Content-Type: application/json" -X POST localhost:5001/msj-tutor/us-central1/addAdminRole
