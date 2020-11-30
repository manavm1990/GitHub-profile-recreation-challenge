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

export const renderLanguage = ({ color, name }) => {
  const lang = templates.language.cloneNode(true);
  const langSpans = lang.querySelectorAll("span");
  langSpans[0].style.background = color;
  langSpans[1].innerText = name;
  return lang;
};
