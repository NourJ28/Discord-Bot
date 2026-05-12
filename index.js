require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const wordList = [
  "computer",
  "coding",
  "discord",
  "javascript",
  "roblox",
  "project",
  "programming",
  "python",
  "developer",
  "application"
];

app.post("/interactions", (req, res) => {
  const interaction = req.body;

  if (interaction.type === 1) {
    return res.json({ type: 1 });
  }

  // slash commands
  if (interaction.type === 2) {
    const commandName = interaction.data.name;

    if (commandName === "ping") {
      return res.json({
        type: 4,
        data: { content: "pong" }
      });
    }

    if (commandName === "complete") {
      const input = interaction.data.options?.[0]?.value.toLowerCase();

      const matches = wordList.filter(word =>
        word.startsWith(input)
      );

      if (matches.length === 0) {
        return res.json({
          type: 4,
          data: { content: `No words found starting with "${input}".` }
        });
      }

      return res.json({
        type: 4,
        data: {
          content: `Words that start with "${input}": ${matches.join(", ")}`
        }
      });
    }
  }
});

app.listen(6700, () => {
  console.log("running on port 6700");
});
