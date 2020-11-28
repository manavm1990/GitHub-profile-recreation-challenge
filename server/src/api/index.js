import got from "got";
import config from "config";

/**
 * TODO: Consider gzip 🤐
 * https://graphql.org/learn/best-practices/#json-with-gzip
 */
export default async (graphql) => {
  try {
    const { body } = await got("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.gitHubToken}`,
        "Content-Type": "application/json",
      },
      body:
        // ⚠️ Must 're-stringify'
        JSON.stringify(graphql),
    });
    return body;
  } catch ({ name, message }) {
    throw new Error(`${name}: ${message}`);
  }
};
