import dotenv from "dotenv";

dotenv.config();

export default {
  gitHubToken: process.env.GITHUB_TOKEN,
};
