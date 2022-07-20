---

### Ejercicio 1
* Servidor que escucha en `localhost:3000` y cuande se hace una request `GET` a `/hola` responde `200 OK` con el body:
```json
{
  "mensaje": "Hola mundo!"
}
```

---

### Ejercicio 2

- Servidor que escucha en `localhost:3000` y cuande se hace una request `GET` a `/hola` responde `200 OK` con el body:

```json
{
  "mensaje": "Hola mundo!"
}
```

- El servidor responde el texto `Hola Express` cuando se le envía una petición `GET` a `/express`
- Además, para cualquier petición, muestra por pantalla la url usando un middleware.

---

### Ejercicio 3

- Mismas funcionalidades que el ejercicio 2, pero en esta ocasión usando `morgan` para _loggear_ los eventos.

---

### Ejercicio 4

- Mismas funcionalidades que el ejercicio 2, pero añadiendo un nuevo middleware entre el primer middleware y las rutas.
- Ahora el primer middleware deberá meter en la request la property `timestamp` que contiene la fecha actual, concretamente en `req.timestamp`.
- El segundo middleware deberá imprimir por pantalla el valor de `timestamp` antes de transferir el control a la ruta correspondiente.

---

### Ejercicio 5

- Mismas funcionalidades que el ejercicio 4, pero ahora las rutas deberán añadir en el body de la response el valor de `req.timestamp`.
- Es decir, la response tendrá una forma parecida a:

```json
{
  "timestamp": "...",
  "message": "..."
}
```

---

### Ejercicio 6

- Servidor que escucha en `localhost:3000` y responde con el contenido del archivo `imagen.jpg` cuando se hace una petición `GET http://localhost:3000/imagen.jpg`

---

### Ejercicio 7

- Servidor que escucha en `localhost:3000` y tiene un endpoint `GET /api/users/:userId/photos/:id`.
- Este endpoint obtiene los _path params_ de la ruta, y devuelve una respuesta con la forma:

```json
{
  "user": 34,
  "photo": 67
}
```

---

### Ejercicio 8

- Servidor que escucha en `localhost:3000` y tiene un endpoint `GET /api/users` que acepta `name` y `email` como _query params_.
- Este endpoint obtiene los _query params_ de la ruta, y devuelve una respuesta con la forma:

```json
{
  "name": "Fulanito",
  "email": "fulanito@gmail.com"
}
```
