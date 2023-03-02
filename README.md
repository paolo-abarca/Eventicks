# Eventicks

Este es un proyecto para la gestión de eventos en línea. Permite a los usuarios crear, editar y borrar eventos, y a los asistentes registrarse para participar. El proyecto se desarrolla en JavaScript, utilizando React para la interfaz de usuario y Mysql para el almacenamiento de datos y autenticación.

## Instalación
Para utilizar el proyecto, primero debes clonar el repositorio de GitHub:

```
git clone https://github.com/paolo-abarca/Eventicks.git

```

Luego, debes instalar las dependencias de Node.js con el comando:

```
npm install
```

Por último, puedes iniciar la aplicación con el comando:

```
npm start
```
La aplicación se ejecutará en el puerto 3000 de tu máquina local.

## Uso
Una vez iniciada la aplicación, puedes crear una cuenta de usuario para empezar a crear eventos y registrarte para asistir a ellos. La aplicación se encarga de gestionar la autenticación y el almacenamiento de datos, de manera que puedes acceder a tus eventos desde cualquier dispositivo.


# Eventicks Back-End


Este repositorio contiene el código fuente del back-end de Eventicks, una aplicación web para la gestión de eventos.

## Tecnologías utilizadas
- Python 3.9
- Flask 2.1.0
- MySQL 14.1

## Estructura del proyecto

- app.py: archivo principal de la aplicación Flask.
- config.py: archivo de configuración de la aplicación.
- models.py: definición de los modelos de la base de datos.
- views.py: definición de las vistas de la aplicación.

## Endpoints

- /events: permite la creación de un evento (POST) y la lista de todos los eventos (GET).
- /events/<int:event_id>: permite la edición (PUT) y eliminación (DELETE) de un evento específico.
- /events/<int:event_id>/register: permite el registro de un participante (POST) y la lista de todos los participantes registrados en un evento (GET).
- /events/<int:event_id>/send-email: permite enviar un correo electrónico a todos los participantes registrados en un evento (POST).

# API para aplicación de eventos

Esta API permite crear, editar y eliminar usuarios y eventos, así como acceder a información sobre los mismos. También cuenta con una ruta para permitir el ingreso a la aplicación.

## Rutas de Login

### POST /api/login

Permite el ingreso a la aplicación. Recibe un email y password, y retorna un ID del usuario.

```
curl -X POST http://0.0.0.0:5000/api/login -H "Content-Type: application/json" -d '{"email": "STR", "password": "STR"}'
```

## Rutas de Users
### POST /api/users
Crea un usuario con los datos proporcionados.
```
curl -X POST http://0.0.0.0:5000/api/users -H "Content-Type: application/json" -d '{"name_user": "STR", "last_name": "STR", "email": "CORREO VALIDO", "password": "STR", "phone": 0, "country": "STR", "city": "STR", "gender": "STR"}'

```

## GET /api/users/{id}
Obtiene los datos de un usuario con el ID proporcionado, excepto la contraseña.
```
curl -X GET http://0.0.0.0:5000/api/users/ID DE USUARIO

```

## PUT /api/users/{id}
Actualiza los datos de un usuario con el ID proporcionado.
```
curl -X PUT http://0.0.0.0:5000/api/users/ID DE USUARIO -H "Content-Type: application/json" -d '{"CUALQUIER DATO QUE DESEEN CAMBIAR": SU VALOR}'

```

## PUT /api/users/{id}/password
Actualiza la contraseña de un usuario con el ID proporcionado.

```
curl -X PUT http://0.0.0.0:5000/api/users/ID DE USUARIO/password -H "Content-Type: application/json" -d '{"password": "STR"}'
```

## DELETE /api/users/{id}
Elimina un usuario con el ID proporcionado.
```
curl -X DELETE http://0.0.0.0:5000/api/users/AQUI VA UN ID DE USUARIO
```

![ApiMaps](https://res.cloudinary.com/cloud-eventicks/image/upload/v1677643076/eventicks/image_dykzvz.png)


# Eventicks Front-End

Este repositorio contiene el código fuente del front-end de Eventicks, una aplicación web para la gestión de eventos.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript
- React.js 3.2.6

## Configuración del entorno

Para configurar el entorno de desarrollo, siga los siguientes pasos:

- Clonar este repositorio.
- Instalar Node.js y npm.
- Ejecutar npm install para instalar las dependencias.

# Estructura del proyecto

- public/: archivos públicos de la aplicación.
- src/: archivos fuente de la aplicación.
- assets/: recursos estáticos como imágenes y estilos CSS.
- components/: componentes Vue reutilizables.
- views/: vistas de la aplicación que utilizan los componentes.
- router.js: configuración del router de Vue.
- main.js: punto de entrada de la aplicación Vue.