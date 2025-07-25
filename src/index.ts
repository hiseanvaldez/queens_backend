import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Slayyy 👑 Your backend is up~");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Now listening on all network interfaces, baby 😘");
});
