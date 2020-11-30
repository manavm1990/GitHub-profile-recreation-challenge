import templates from "./templates.js";

export const renderForkedFrom = (url) => {
  const templateSmall = templates.descForkedFrom.cloneNode(true);
  templateSmall.querySelector("span").innerText = url;
  return templateSmall;
};

export const renderTemplateLink = (url) => {
  const templateH3 = templates.template.cloneNode(true);
  templateH3.querySelector("a").href = url;
  return templateH3;
};
