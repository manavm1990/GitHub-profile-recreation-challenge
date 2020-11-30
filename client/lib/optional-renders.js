import templates from "./templates.js";

export const renderDesc = (desc) => {
  const templateP = templates.desc.cloneNode(true);
  templateP.querySelector("p").innerText = desc;
  return templateP;
};

export const renderForked = (url) => {
  const templateSmall = templates.forked.cloneNode(true);
  templateSmall.querySelector("span").innerText = url;
  return templateSmall;
};
