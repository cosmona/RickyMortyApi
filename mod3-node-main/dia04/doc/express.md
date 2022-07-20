# Express

El módulo nativo _http_ de Node se usa para crear servidores web y es muy potente pero no destaca por su simplicidad. Por ello, vamos a usar [express](https://www.npmjs.com/package/express), un framework para construir servidores web en Node. Existen otros frameworks similares a **express** como [koa](https://www.npmjs.com/package/koa), [fastify](https://www.npmjs.com/package/fastify), o [nest.js](https://www.npmjs.com/package/@nestjs/core), que también son muy interesantes y potentes. Todos tienes sus ventajas y desventajas, pero **express** es sin duda el de uso más extendido.

El módulo express es una extensión del módulo `http` por lo que realmente cuando lo usamos, por detrás express está usando el módulo `http` para realizar las acciones. Para instalarlo:

```
npm i express
```

Ejemplo de servidor web en express:

```javascript
const express = require("express");
const app = express();

app.use((req, res) => res.send("Hello express!"));

app.listen(3000); // indicamos a express que escuche el puerto 3000
```

Como apunte, indicar que aquí se le indica a **express** que espere requests en el puerto 3000, pero podría ser cualquier otro puerto de nuestra máquina siempre que no esté en uso por otro proceso. También hay que tener en cuenta que la función `app.listen` acepta como segundo argumento un callback, que será ejecutado inmediatamente después de que el servidor haya arrancado. Por ejemplo:

```javascript
app.listen(4000, () =>
  console.log("Servidor listo, escuchando en localhost:4000")
);
```

---

## Middleware

Para entender **express** es imprescindible entender el concepto de **middleware**. Express, al igual que el **core module** `http` de Node, recibe una _request_ y genera una _response_. La diferencia con el módulo `http`, es que **express** hace que todas las request pasen por un _array_ configurable de funciones. Cada una de estas funciones por las que pasan los objetos _request_ y _response_ es lo que llamamos **middlewares**.

![Express middleware](https://miro.medium.com/max/1400/1*ptNjzuT0m2BQ9YpQTVwVLg.png)

- Los middlewares pueden ser funciones propias o funciones de módulos instalados mediante npm.
- El array de middlewares está ordenado, se ejecutarán siguiendo siempre el flujo de código.
- Cada middleware tiene acceso a la _request_ y la _response_, por lo que podrá leerlas y modificarlas.
- Opcionalmente puede tener acceso a un objeto `err`, que contendrá un posible `Error` tirado por el middleware anterior.
- Cada middleware tiene acceso a la función `next()`, una función especial de **express** que transfiere el control al siguiente middleware del array.

El beneficio de tener las operaciones de un servidor web definidas como en una cadena de funciones, es la reutilización de código y la predictibilidad. Por ejemplo, imaginemos que los usuarios nos mandan un _string_ para identificarse en cada _request_, podríamos definir un _middleware_ que procesase esa identificación, dejando pasar la request al siguiente _middleware_ sólo si la identificación es correcta, y si no lo es, redirigir la request a otro _middleware_ que se encargase de gestionar los errores. Una vez tenemos esos dos _middlewares_ podemos indicarle a **express** que queremos usarlos en cada ruta de nuestro servidor, y nos ahorramos escribir el mismo código una y otra vez.

Para asignar middlewares a la app usamos `app.use(<function>)`, donde `<function>` sería el _middleware_ que queremos ejecutar.

```javascript
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware número 1");
  next(); //pasamos al siguiente middleware
});

app.use((req, res, next) => {
  if (req.headers.authorization === "superSecreto") {
    next();
  } else {
    res.statusCode = 401;
    res.end("Identificación incorrecta");
  }
});

app.use((req, res) => {
  res.statusCode = 200;
  console.log("Middleware número 2");
  res.end("Bienvenido!");
});

app.listen(3000);
```

Como se comentó anteriormente también hay módulos instalables mediante **npm** que se pueden usar como middleware. Por ejemplo con el módulo `morgan`, es un logger, es decir, un software que se encarga de procesar de forma automática información de todos los eventos que ocurren en un servidor web. Puede usarse para imprimir por pantalla datos de cada petición sin tener que hacer un `console.log`, o `console.warn`, o `console.err`, explícitos. Para instalarlo:

```
npm i morgan
```

```javascript
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined")); // formato: combined, tiny, etc. (ver docs)

// Rutas del servidor Express, las vemos en el siguiente apartado
app.get("/api/saludos/mundo", (req, res) => {
  res.send({ mensaje: "Hola mundo!" });
});

app.get("/api/saludos/express", (req, res) => {
  res.send("Hola Express");
});

app.listen(3000, () => console.log("Escuchando!"));
```

---

## Rutas

Las **rutas** (también conocidas como _URLs_, _endpoints_, etc.) son unos middlewares especiales que sólo responden a peticiones HTTP realizadas a una determinada URL (o patrón) y con un determinado método. Por lo general procesan información entrante y envían una respuesta al cliente.

Por ejemplo, un servidor web que tenga una página principal en la ruta `/`, una página de contacto en la ruta `/contact` y el resto de las rutas queremos que den un 404.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.end("Portada!");
});

app.get("/contact", (req, res) => {
  res.statusCode = 200;
  res.end("Contacto");
});

// Sólo se ejecuta si no entra en ninguna de las rutas anteriores
app.use((req, res) => {
  res.statusCode = 404;
  res.end("Not found :(");
});

app.listen(3000);
```

Cabe señalar también, que cada ruta puede definir varios middlewares, que se aplicarán secuencialmente. Por ejemplo, una ruta con un único middleware puede definirse como:

```javascript
const handler = () => {
  console.log("Función middleware 1");
  next();
};

app.get("/api/ruta", handler);
```

Y una ruta con varios middlewares:

```javascript
const express = require("express");
const app = express();

const handler = (req, res, next) => {
  console.log("Función middleware 1");
  next();
};

const handler2 = (req, res, next) => {
  console.log("Función middleware 2");
  next();
};

const handler3 = (req, res) => {
  console.log("Función middleware 3");
  res.send();
};

app.get("/api/ejemplo", handler, handler2, handler3);

app.listen(3000);
```

Esto aplicaría secuencialmente el primer _middleware_, que haría uso de la función `next` para indicar a _express_ que debe transferir el flujo de ejecucion a la siguiente función configurada como _middleware_ para la ruta, que volvería a llamar a `next`, para llegar finalmente la tercera función _middleware_ que como vemos finalmente envía la respuesta al cliente con `res.send()`.

---

## Objetos Request y Response

Vamos a ver algunas propiedades útiles que **express** añade automáticamente a `req` y `res` (Request y Response):

```javascript
req.ip; // dirección ip desde donde se originó la petición
req.path; // ruta de la url (sin querystring)

res.end(); // función que finaliza y envía una respuesta sin body al cliente
res.status(code); // función que establece el estado HTTP de la respuesta (200, 404, etc...)
res.send(content); // función que finaliza la respuesta y envía un objeto al cliente
res.sendFile(path); // función que envía el contenido del fichero en ese path
res.set(header, value); // función establece headers de la respuesta
```

A modo de resumen, podemos decir que las formas más habituales que usa un cliente para enviar información al servidor son:

- Mediante **path params** en la URL
- Mediante **query params** (o **querystring**) en la URL
- Mediante el **body** de la _request_

### Path params

Otra característica importante de las rutas es que se pueden definir rutas variables (patrones) definiendo parte de las mismas como parámetros, por ejemplo en **express** se puede definir una ruta así (imaginemos que _handler_ es una referencia al _middleware_ encargado de gestionar la ruta):

```javascript
app.get("/news/:year/:month", handler);
```

En este caso `:year` y `:month` son lo que se conoce como **path params**. Es decir, lo definimos como variables cuyos valores serán definidos por la propia ruta, por ejemplo, en la ruta anterior se procesarían request cuya ruta fuese algo como:

```
/news/2020/3
/news/2020/april
/news/2021/myFavoriteMonth
/news/thisYear/6
```

Como vemos, simplemente estamos definiendo los nombres de las variables cuyos valores se rellenan con los strings que forman la ruta real enviada por el cliente. No por ello estamos validando que el primer _path param_ sea un número, ni que el segundo esté en entre el 1 y 12, etc. simplemente establecemos una correspondencia clave-valor. (Más adelante veremos como validar datos de entrada)

```javascript
app.get("/users/:userId/fotos/:category", (req, res) => {
  console.log(req.params);
});
```

Si hacemos un GET a `/users/34/fotos/naturaleza`, obtendremos, en `req.params`, un objeto así:

```javascript
{
  userId: '34',
  category: 'naturaleza'
}
```

### Query params

En caso de los datos que llegan por query params, es posible acceder a su contenido usando la propiedad `.query` del objeto _request_:

```javascript
// GET /search?tema=noticias&since=2010

app.get("/search", (req, res) => {
  res.send(req.query); // { tema: 'noticias', since: '2010' }
});
```

### Request body

Hemos visto que por defecto el _body_ de la _request_ está vacío en **express**. Para procesar un _body_ de tipo JSON, en lugar de como lo gestionamos con el módulo `http` usando eventos y buffers, desde la versión 4.16 de Express podemos usar una función muy útil: `express.json()` (antes de esta versión de Express se acostumbraba a instalar un paquete externo, [body-parser](https://www.npmjs.com/package/body-parser)). Veamos un ejemplo:

```javascript
const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(3000);
```

Simplemente estamos configurando la función `express.json()` como un _middleware_ a nivel de aplicación. Es decir, todas las _requests_ que se hagan al servidor pasan por esta función.
