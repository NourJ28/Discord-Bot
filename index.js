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

const jokes = [
  "Why did the programmer quit? ... because he did not get arrays]",
  "Why was the computer cold? ... it left its Windows open",
  "Why do programmers like dark mode .... because light attracts bugs"
];

app.post("/interactions", (req, res) => {
  const interaction = req.body;

  if (interaction.type === 1) {
    return res.json({ type: 1 });
  }

  if (interaction.type === 2) {
    const commandName = interaction.data.name;

    if (commandName === "ping") {
      return res.json({
        type: 4,
        data: { content: "pong" }
      });
    }

    if (commandName === "complete") {
      const input = interaction.data.options?.[0]?.value?.toLowerCase();

      if (!input) {
        return res.json({
          type: 4,
          data: { content: "please type part of a word" }
        });
      }

      const matches = wordList.filter(word => word.startsWith(input));

      if (matches.length === 0) {
        return res.json({
          type: 4,
          data: { content: `no words found starting with "${input}".` }
        });
      }

      return res.json({
        type: 4,
        data: {
          content: `words that start with "${input}": ${matches.join(", ")}`
        }
      });
    }

    if (commandName === "joke") {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

      return res.json({
        type: 4,
        data: { content: randomJoke }
      });
    }

    if (commandName === "about") {
      return res.json({
        type: 4,
        data: {
          content: "I am a Discord bot that can complete words and tell coding jokes"
        }
      });
    }
  }

  return res.json({
    type: 4,
    data: { content: "bad command" }
  });
});

app.listen(6700, () => {
  console.log("running on port 6700");
});
