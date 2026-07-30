import express from "express";
const app = express();
app.use(express.json());
let users = [
  { id: 1, name: "Karim", age: 22 },
  { id: 2, name: "Ahhmed", age: 25 },
];
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(user);
  res.status(201).json(user);
});
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name;
  user.age = req.body.age;
  res.json(user);
});
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.age) {
    user.age = req.body.age;
  }
  res.json(user);
});
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.json({ message: "user deleted" });
});
app.listen(3000, () => {
  console.log("serrver is running on port 3000");
});
