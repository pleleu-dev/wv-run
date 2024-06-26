import * as path from "path";
import express from "express";

import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";

const app = express();
const port = 5000;

const baseDir = path.resolve(__dirname, "../../../couch-potato");

const options: Partial<SimpleGitOptions> = {
  baseDir,
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git = simpleGit(options);

app.get("/", async (req, res) => {
  const log = await git.log();
  res.send(JSON.stringify(log));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
