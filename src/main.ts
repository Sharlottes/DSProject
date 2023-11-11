import { fetch } from "@devicescript/net";

console.log("requesting...");
const res = await fetch(`http://localhost:3000`);
const body = await res.text();

console.log("Result: ", body);
console.log("ok: ", res.ok);
console.log("status: ", res.status);
