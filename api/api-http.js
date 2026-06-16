import http from "http";

const hostname = "0.0.0.0"; // pot sa il accesez de peste tot
const port = 3000; // folosesc port 3000 caci asta e portul default pentru nodejs dar pot sa folosesc orice port liber

const server = http.createServer((req, res) => {
  // functie cu 2 parametrii
  console.log("Headers ", req.rawHeaders); // ca sa pot sa vad cine a accesat pe browser / server, ce metoda a folosit, ce ruta a accesat, etc

  res.statusCode = 200; // eu raspund cu 200
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World"); // si asa raspunde serverul la orice cerere, indiferent de metoda sau ruta, raspunde cu "Hello World"
});

server.listen(port, hostname, () => {
  // atunci porneste serverul
  console.log(`Server running at http://localhost:${port}/`);
});
