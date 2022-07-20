const os = require("os");

//total system memory in bytes
// 8 Bits = 1 Byte
// 1024 Bytes = 1 KiloByte (KB)
// 1024 KiloBytes (KB) = 1 MegaByte (MB)
// 1024 MegaBytes (MB) = 1 GigaByte (GB)
// 1024 GigaBytes (GB) = 1 TeraByte (TB)
// 1024 TeraBytes (TB) = 1 PentaByte (PB)

const memoria_total = os.totalmem();
const memoria_libre = os.freemem();

console.log("Memoria total:", memoria_total);

var gigaByte = 1 / Math.pow(1024, 3);
console.log("Memoria total:", os.totalmem() * gigaByte, "GBs");

console.log("Memoria libre:", memoria_libre);
console.log("hostname:", os.hostname());

console.log("directorio personal:", os.homedir());
console.log("directorio temporal:", os.tmpdir());
