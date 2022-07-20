# HTTP - Hypertext Transfer Protocol

## Cómo funciona Internet

Internet es una red masiva de máquinas interconectadas que intercambian datos siguiendo el protocolo **TCP/IP**. Cada máquina conectada a la red envía a otras máquinas información dividida en pequeños paquetes de datos.

El protocolo **TCP/IP** establece una serie de reglas para la transmisión de esos paquetes de datos. La parte **IP** establece como se divide la información múltiples paquetes y el destino de cada uno de ellos y el protocolo **TCP** se encarga de hacer las comprobaciones necesarias para saber que la transmisión se realizó correctamente.

Podemos usar el comando `traceroute` para ver los nodos del camino que recorre la información que enviamos desde nuestro ordenador para llegar al destino. Estos nodos pueden variar en base a al estado de la red en cada momento.

El tráfico en internet se gestiona mediante una serie de acuerdos de intercambio, que garantizan que la información pueda llegar a cualquier punto de la red aunque un nodo intermedio esté caido.

Como ya hemos dicho, el destino de los paquetes se establece mediante direcciones IP, es decir, una serie de números únicos que determinan inequívocamente una identidad. Por ejemplo: 212.70.125.1 (_IPv4_) o 2607:f0d0:1002:0051:0000:0000:0000:0004 (_IPv6_), este último formato soporta muchas más combinaciones diferentes y se ha hecho necesario en los últimos años porque las direcciones _IPv4_ se están acabando. El proceso de cambio de _IPv4_ a _IPv6_ está actualmente en marcha.

---

## Qué es un DNS (Domain Name System)

Las direcciones IP son poco amigables para los humanos, por ello se estableció desde los primeros tiempos de internet un sistema llamado DNS. Éste establece una relación entre nombres de dominio, formados por palabras, y las direcciones IP. Por ello cuando ponemos un dominio, por ejemplo: `google.com` en nuestro navegador lo primero que hace el ordenador es usar el sistema DNS para convertir ese dominio en la dirección IP asociada y empezar la transferencia de datos usando esa dirección.

El sistema DNS es una base de datos descentralizada de relación entre nombres de dominio y direcciones IP, los servidores DNS tienen una dirección IP a la que los ordenadores le hacen constantemente preguntas sobre las direcciones reales de los dominios.

Este sistema de nombres está organizado en dominios de varios niveles, ordenados de derecha a izquierda. Los dominios de primer nivel son _.com, .net, .org, .es, .gal, etc._, gestionados por la _Internet Assigned Numbers Authority_. Los dominios de segundo nivel está gestionado por diferentes organizaciones y gobiernos de todo el mundo. Los dominios de tercer nivel y siguientes son los llamados genericamente subdominios y están gestionado por el propietario del dominio de segundo nivel.

Ejemplo, en la dirección `https://drive.google.com`, tendríamos los componentes:

- `https://`: define el protocolo que se está usando, en este caso HTTP securizado.
- `drive`: define el dominio de tercer nivel, gestionado internamente por Google.
- `google`: define el dominio de segundo nivel, comprado por Google a un proveedor de direcciones.
- `com`: define el dominio de primer nivel, gestionado por _Internet Assigned Numbers Authority_.

---

## Qué es un host

Un host en internet es llamado a una máquina conectada a la red con una dirección IP, a la cual está asociada un nombre de dominio. Los hosts reciben paquetes de datos. Por lo general usamos el término cliente para referirnos a una máquina (un ordenador, un móvil, un coche, una alarma de incendios, etc.) o al software (un navegador, una aplicación de mensajería, una aplicación que accede a una red social, etc.) que envía peticiones a un host.

Los hosts pueden recibir miles de peticiones de muchos tipos cada segundo. Para ordenarlas usan **puertos**, una convención numérica que establece una serie de entradas posibles de datos y cada entrada normalmente está gestionada por una aplicación, por ejemplo:

| Puerto | Aplicacion                    |
| ------ | ----------------------------- |
| 80     | Servidor web (http)           |
| 443    | Servidor web seguro (https)   |
| 22     | Shell seguro (ssh)            |
| 20/21  | Transmisión de ficheros (ftp) |

---

## Peticiones HTTP

Un servidor web es un programa de software. Este programa se encarga de gestionar peticiones HTTP. Estas peticiones llegan al host a través del puerto 80 o el 443. Estas peticiones son realizadas en su mayoría por navegadores, pero potencialmente pueden ser enviadas desde otras aplicaciones.

Las peticiones HTTP intercambian información entre un cliente y un servidor a través de URLs.

Por ejemplo imaginemos la petición: `https://dominio.com/css/style.css`. Esta petición realmente nuestro navegador la transformará internamente y la enviará al puerto 433 del host `dominio.com` como:

```
GET /css/style.css HTTP/1.1
Host: dominio.com
Accept-Language: en
Connection: Keep-Alive
```

Vemos que en una petición sencilla, se transmite información acerca del método (`GET`), el protocolo exacto (`HTTP/1.1`), el lenguaje esperado en la respuesta, e incluso se indica que se quiere mantener viva la conexión porque se pretende enviar más peticiones próximamente.

La respuesta del servidor tendrá una forma parecida a esta:

```
HTTP/1.1 200 OK
Date: Mon, 27 Apr 2020 11:28:02 GMT
Server: nginx
Content-Length: 9743
Content-Type: text/css
```

De nuevo, vemos que al cliente, además de propio archivo `.css` que ha pedido, se le transmiten más metadatos sobre la propia respuesta del servidor.

Cabe destacar una de las cabeceras de la respuesta más importantes, el **status code**. Los **status code** se usan en los servidores para indicar el resultado de la operación que se ha ejecutado con motivo de la _request_. Los ejemplos más corrientes son el _200 (OK)_, _400 (BAD REQUEST)_, _403 (FORBIDDEN)_, _404 (NOT FOUND)_, _500 (INTERNAL SERVER ERROR)_, etc. El [listado completo](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) incluye muchos más códigos.

---

## Tipos de peticiones (requests)

El trabajo de programación de backend se resume en programar respuestas para peticiones. En algunos casos la respuesta será enviar un fichero que existe en el disco del servidor pero en otros casos será hacer una consulta a una base de datos, llamar a otro servidor, procesar información de entrada, etc.

Vamos a ver los diferentes tipos de peticiones, que se clasifican en base a su intención y en base al efecto que quieren causar en el servidor. Veremos más en profundidad los métodos `GET` y `POST`, pero realmente existen multitud de métodos en el estándar HTTP. Algunos de los más comunes son:

- **GET**: usado para pedir datos al servidor. Por lo general sin body.
- **POST**: para crear un nuevo recursos en el servidor. La información del recurso se incluye en el body.
- **PUT**: para actualizar un recurso en el servidor. La información _completa_ del recurso se incluye en el body.
- **PATCH**: para actualizar un recurso en el servidor. La información _parcial_ del recurso se incluye en el body.
- **DELETE**: para borrar un recurso en el servidor. Por lo general sin body.

### GET

Las peticiones `GET` que son las más tradicionales. Se usan para pedir datos al servidor. Opcionalmente pueden también enviar datos al servidor usando la propia ruta de la url, concretamente una parte de ella llamado query-string.

```
https://dominio.com/buscar?cadena=Texto&results=100
```

```
Protocolo: https://
Host: dominio.com
Ruta: /buscar
QueryString: ?cadena=Texto&results=100
```

El query-string es una sucesión de `variable=valor` separados entre ellos por `&` y todo ello separado de la ruta por una `?`.

En el servidor tenemos que procesar este querystring y convertirlo a un objeto similar a este:

```
{
  cadena: "Texto",
  results: 100
}
```

Este query-string está incluída en la URL por lo que es completamente visible en cada petición y está limitada al límite de caracteres de cada URL (que es muy grande pero depende del navegador) por lo que no es recomendable para enviar datos de los que no controlemos el tamaño.

En node procesaremos estos querystrings con el core module `querystring`. Ejemplo:

```javascript
const querystring = require("querystring");

const str = "foo=bar&abc=xyz&abc=123";
const data = querystring.parse(str);

console.log(data); // imprime un objeto JS
console.log(querystring.stringify(data)); // imprime el string re-procesado
```

### POST

El método tradicional de enviar información desde el cliente al servidor web son las peticiones con método POST. Estas peticiones al igual que las respuestas tienen cabeceras o _headers_, y un cuerpo o _body_, donde el cliente especifica los datos que se envían al servidor.

Aunque hay más tipos de _body_, durante el curso trabajaremos mayoritariamente con los de tipo _raw_, en donde el cliente enviará objetos _JSON_ para que sean procesados por el servidor. Estos _bodies_ llevan un _header_ especial que indica al servidor el formato de los datos que se incluyen en el _body_, este _header_ es `content-type: application/json`

```
POST / HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: localhost:8080
Content-Length: 16

{
  "name": "Héctor"
}
```
