import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8090;

app.get("/", (req, res) => {
  return res.json("msg: Hello from CI/CD!");
});

app.listen(PORT, () => {
  console.log(`Server is up adn running on PORT: ${PORT}`);
});
