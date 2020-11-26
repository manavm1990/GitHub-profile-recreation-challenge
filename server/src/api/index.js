import got from "got";
import config from "config";

export default async (graphql) => {
  try {
    const { body } = await got("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.gitHubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphql),
    });
    return body;
  } catch ({ name, message }) {
    throw new Error(`${name}: ${message}`);
  }
};
