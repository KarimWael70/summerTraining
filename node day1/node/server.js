import http from "node:http";

let users = [
  { id: 1, name: "Karim", age: 22 },
  { id: 2, name: "Ahmed", age: 25 },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET" && url.pathname === "/users") {
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  }
  if (req.method === "GET" && url.pathname.startsWith("/users/")) {
    const id = Number(url.pathname.split("/")[2]);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "user not found" }));
    }
    return res.end(JSON.stringify(user));
  }
  if (req.method === "POST" && url.pathname === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      const user = {
        id: users.length + 1,
        name: data.name,
        age: data.age,
      };
      users.push(user);
      res.statusCode = 201;
      res.end(JSON.stringify(user));
    });
    return;
  }
  if (req.method === "PUT" && url.pathname.startsWith("/users/")) {
    let body = "";
    req.on("data", (ww) => {
      body += ww;
    });
    req.on("end", () => {
      const id = Number(url.pathname.split("/")[2]);
      const data = JSON.parse(body);
      const user = users.find((user) => user.id === id);
      if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "usser not found" }));
      }
      user.name = data.name;
      user.age = data.age;
      res.end(JSON.stringify(user));
    });
    return;
  }
  if (req.method === "PATCH" && url.pathname.startsWith("/users/")) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const id = Number(url.pathname.split("/")[2]);
      const data = JSON.parse(body);
      const user = users.find((user) => user.id === id);
      if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "user not found" }));
      }
      if (data.name) user.name = data.name;
      if (data.age) user.age = data.age;
      res.end(JSON.stringify(user));
    });
    return;
  }
  if (req.method === "DELETE" && url.pathname.startsWith("/users/")) {
    const id = Number(url.pathname.split("/")[2]);
    users = users.filter((user) => user.id !== id);
    res.end(JSON.stringify({ message: "deleted" }));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "noot found" }));
});
server.listen(4000, () => {
  console.log("seervre is running on port 4000");
});
