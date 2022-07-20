function hello() {
  console.log("Hola desde un modulo externo!");
}

function sum(a, b) {
  return a + b;
}

const PI = 3.14;

// acepta un array de numeros y devuelve la suma de los numeros > 3
const arraySum = (array) => {
  return array
    .filter((elemento) => elemento > 3)
    .reduce((acc, num) => acc + num);
};

module.exports = { hello, sum, PI, arraySum };
