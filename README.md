# e-commerce-api

## Requerimientos
- node v14.15.4
- yarn v1.22.5

## Comandos
- Para correr en produccion: ```yarn start```
- Para correr en desarrollo: ```yarn start:dev```
- Para correr en modo debug: ```yarn start:debug```
- Crear transpilado de ts a js: ```yarn build```
- Para revisar sintaxis del codigo: ```yarn lint```
- Para arrecglar sintaxis del codigo: ```yarn lint:fix```
- Sirve para correr los test: ```yarn test```
- Sirve para ejecutar la migraciones: ```yarn migration:up```
- Sirve para crear migraciones: ```yarn migration:create```
- Sirve para retroceder el ultimo bloque de migraciones: ```yarn migration:rollback```
- Sirve para limpiar todas las tablas de la base de datos: ```yarn migration:rollback:all```
- Lista las migraciones: ```yarn migrate:list```
- Sirve para crear seeders: ```yarn seed:create```
- Sirve para lanzar todos los datos semilla: ```yarn seed:run```
- Sirve para correr todos los test de la aplicacion: ```yarn test```
- Sirve para estar pendiente a cambios en los test: ```yarn test:watch```
- Sirve para hacer debug de los test: ```yarn test:debug```

## Manejar eslint VScode
- Menu de comandos: ```Ctrl + Shift + P```
- Seleccionamos la siguiente opcion: ```ESLint: Fix all auto-fixable Problems"```
- Auto formatea nuestro codigo