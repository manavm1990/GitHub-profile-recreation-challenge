import templates from "./templates.js";

export default (url) => {
  const templateH3 = templates.template.cloneNode(true);
  templateH3.querySelector("a").href = url;
  return templateH3;
};
