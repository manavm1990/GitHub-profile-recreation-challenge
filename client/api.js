export default async (query) => {
  const res = await fetch("http://localhost:8000/", {
    method: "POST",
  });
  console.log(await res.json());
};
