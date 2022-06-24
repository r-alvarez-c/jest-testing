# Projecto de Testing con Node y Jest INF-331
## Descripción
Este proyecto consta de un CRUD básico en el cual es posible agregar, editar y eliminar usuarios en una aplicación basada en node conectada a una base de datos MySQL.
## Instalación
Se requiere NPM 8.5.5 o superior. 

Se requiere de una base de datos local de tipo MySQL. 

Para configurar la base de datos se es necesario que esta se llame `bd` con el siguiente usuario: 
- `user: "root"`
- `password: "123qweasd"`

Se debe crear la siguiente tabla respectiva con el siguiente DLL:

```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname1` varchar(20) NOT NULL,
  `lastname2` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`id`)
) 
```
e ingresar la siguiente instrucción para crear la base de datos respectiva.

Una vez lista la base de datos solo se requiere preparar el entorno, con lo cual se deben realizar los siguientes comandos:
- `npm install` para instalar las dependencias.
- `nodemon app` para ejecutar el servidor de manera local con la aplicación.
- Ingresar a http://localhost:3000 para utilizar la aplicación.
- `npm test` permite realizar los test realizados en la aplicación.

## Creación de pruebas

Las pruebas, en este caso unitarias se realizaron por medio de Jest para tres partes especificas de la aplicación las cuales son las siguientes:

### Index o página principal de la aplicación en donde se muestran los usuarios

En esta ocación se busca probar la existencia de la tabla cuando existan usuarios entregados por la base de datos por lo cual se desprenderán dos casos posibles.
- Que exista algún dato en la base de datos respectiva y por ende revisar que la información entregada en la tabla sea coherente
- Que no exista ningun dato en la base de datos y muestre el mensaje "No hay usuarios disponibles"

### Creación de usuario
Aquí se presentaron problemas en la manipulación del formulario en el testing por lo cual no fue posible probar las mensajes respectivo cuando los formatos de datos no eran validos, sin embargo se logró verificar la correcta renderización del formulario respectivo

### Edición de usuario
Al igual que el caso anterior, la manipulación de datos no fue posible de revisar pero si fue posible realizar la verificación del formulario y que este trajera los datos respectivos del usuario a revisar, o el otro caso posible de que el usuario a editar no existiera en la base de datos respectivamente.

`OJO: De todas formas quedo programada la lógica respectiva de los test, solo fueron inhabilitados por su nulo funcionamiento`

## Resultados testing

```
user@device jest-testing % npm test

> crud@1.0.0 test
> jest --verbose

 PASS  views/create.test.js
  Página de Creación de Usuario
    ✓ Revisar existencia de formulario (20 ms)
    ○ skipped Validación de campo Nombre
    ○ skipped Validación de campo Primer apellido
    ○ skipped Validación de campo Segundo apellido
    ○ skipped Validación de campo Email
    ○ skipped Validación de campo Telefono

 PASS  views/index.test.js
  Página Principal
    ✓ Revisar existencia de tabla con datos dentro (35 ms)
    ✓ Revisar mensaje de no existencia de usuario (7 ms)

 PASS  views/edit.test.js
  Página de Edición de Usuario
    ✓ Id ingresada no válida (17 ms)
    ✓ Revisar existencia de formulario (5 ms)
    ✓ Revisar coherencia de formulario (4 ms)
    ○ skipped Validación de campo Nombre
    ○ skipped Validación de campo Primer apellido
    ○ skipped Validación de campo Segundo apellido
    ○ skipped Validación de campo Email
    ○ skipped Validación de campo Telefono

Test Suites: 3 passed, 3 total
Tests:       10 skipped, 6 passed, 16 total
Snapshots:   0 total
Time:        1.836 s
Ran all test suites.
```

## Video
Dado las dificultades del desarrollo no se logro concretar la realización del video

## Cómo contribuir
- Crea tu _fork_ directamente.
- Sigue el procedimiento clásico: crea tu _branch_, confirma tus cambios por medio de _commits_ y realiza _push_ a tu _branch_.
- Envía un _pull request_ con los cambios realizados.


## Licencia
The MIT License (MIT)  
Copyright (c) 2022 Raúl Álvarez Cortés
