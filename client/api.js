export default async (query) => {
  const res = await fetch("https://fake-github.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  return res.json();
};
