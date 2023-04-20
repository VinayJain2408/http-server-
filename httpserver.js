import http from "http";

let cars = [
  { id: 1, model: "tata", make: 2000 },
  { id: 2, model: "maruti", make: 2000 },
  { id: 3, model: "honda", make: 2000 },
  { id: 4, model: "mahindra", make: 2000 },
  { id: 5, model: "toyota", make: 2000 },
  { id: 6, model: "ford", make: 2000 },
];

http
  .createServer((request, response) => {
    if (request.method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(cars));
    } else if (request.method === "POST") {
      let newCarDetail = "";
      request.on("data", (data) => {
        newCarDetail += data.toString();
      });
      request.on("end", () => {
        cars.push(JSON.parse(newCarDetail));
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(cars));
      });
    } else if (request.method === "DELETE" && request.url.match(/\/\d+/)) {
      let carToDelete = request.url.split("/")[1];
      cars = cars.filter((car) => {
        return car.id !== Number(carToDelete);
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(cars));
    }
  })





  
  .listen(8080, () => {
    console.log("Connected to Server on 8080");
  });





  