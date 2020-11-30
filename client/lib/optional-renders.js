import templates from "./templates.js";

const renderForks = (count) => {
  const forks = templates.forks.cloneNode(true);
  forks.querySelector("span").innerText = count;
  return forks;
};

const renderLanguage = ({ color, name }) => {
  const lang = templates.language.cloneNode(true);
  const langSpans = lang.querySelectorAll("span");
  langSpans[0].style.background = color;
  langSpans[1].innerText = name;
  return lang;
};

const renderStarGazers = (count) => {
  const starGazers = templates.stargazers.cloneNode(true);
  starGazers.querySelector("span").innerText = count;
  return starGazers;
};

export const renderDeets = ({
  primaryLanguage,
  stargazerCount,
  forkCount,
  pushedAt,
}) => {
  const deets = templates.deets.cloneNode(true).querySelector(".deets");

  if (primaryLanguage) {
    deets.appendChild(renderLanguage(primaryLanguage));
  }

  if (stargazerCount) {
    deets.appendChild(renderStarGazers(stargazerCount));
  }

  if (forkCount) {
    deets.appendChild(renderForks(forkCount));
  }

  return deets;
};

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
