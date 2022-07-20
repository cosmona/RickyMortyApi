---

### Ejercicio 1
* Servidor web que escucha cualquier request en el puerto 3000, y devuelve siempre status `200 OK` con el body:
```javascript
{
  curso: 'backend'
}
```

---

### Ejercicio 2

- Servidor web que escucha en el puerto 3000.
- Cuando se llama a la ruta `/curso`, devuelve status `200 OK` con el body:

```javascript
{
  curso: "backend";
}
```

- Cuando se llama a cualquier ruta distinta devuelve status `200 OK` con el body:

```javascript
{
  message: "Hello world!";
}
```

---

### Ejercicio 3

- Servidor web que escucha en el puerto 3000.
- Cuando se llama al _endpoint_ `/curso`, devuelve status `200 OK` con el body:

```javascript
{
  curso: "backend";
}
```

- Cuando se llama al _endpoint_ `/message`, devuelve status `200 OK` con el body:

```javascript
{
  message: "Hello world!";
}
```

- Cuando se llama a cualquier otro _endpoint_, devuelve status `404 NOT FOUND` con el body:

```javascript
{
  message: "No lo encuentro";
}
```

---

### Ejercicio 4

- Servidor que se comporta igual que el del ejercicio 3, pero además imprime por pantalla el _método_ y la _URL_ de cada request.

---

### Ejercicio 5

- Servidor web que escucha cualquier request.
- Cuando la request es un `POST` a `/data`, se devuelve el _JSON_ recibido.
- Cuando es otra request cualquiera, se responde `404 NOT FOUND` sin body.

---

### Ejercicio 6

- Servidor web que gestiona objetos del tipo:

```javascript
{
  email: 'pepito@gmail.com',
  message: 'Hola soy Pepito',
}
```

- Internamente usará un fichero `database.json` donde se almacenarán datos. Este archivo se sitúa en el directorio `/database` dentro de la raiz del servidor.
- Cuando la request es un `GET` a `/api/messages`, se sirven al cliente con todos los datos que hay en el _JSON_ de almacenamiento.
- Cuando la request es un `POST` a `/api/messages`, se incluye el objeto recibido en el _JSON_ de almacenamiento, y se responde al cliente con todos los datos que hay en el _JSON_ de almacenamiento.
- Cuando es otra request cualquiera, se responde `404 NOT FOUND` sin body.
