require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.post("/interactions", (req, res) => {
  const interaction = req.body;

  if (interaction.type === 1) {
    return res.json({ type: 1 });
  }
  if (interaction.type === 2 && interaction.data.name === "ping") {
    return res.json({
      type: 4,
      data: { content: "pong" }
    });
  }
});
app.listen(4000, () => {
  console.log("running on port 4000");
});