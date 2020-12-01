import renderUpdatedTime from "./time.js";
import store from "../store.js";
import templates from "./templates.js";

const renderForks = (count, repo) => {
  const forks = templates.forks.cloneNode(true);
  forks.querySelector(
    "a"
  ).href = `https://github.com/${store.user.getCurrentUser()}/${repo}/network/members`;
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

const renderLicense = ({ name }) => {
  const license = templates.license.cloneNode(true);
  license.querySelector("span").innerText = name;
  return license;
};

const renderStarGazers = (count, name) => {
  const stargazers = templates.stargazers.cloneNode(true);
  stargazers.querySelector(
    "a"
  ).href = `https://github.com/${store.user.getCurrentUser()}/${name}/stargazers`;
  stargazers.querySelector("span").innerText = count;
  return stargazers;
};

const renderUpdated = (datetime) => {
  const updated = templates.updated.cloneNode(true);
  updated.querySelector("span").innerText = renderUpdatedTime(datetime);
  return updated;
};

export const renderDeets = ({
  primaryLanguage,
  stargazerCount,
  forkCount,
  licenseInfo,
  pushedAt: updated,
  name,
}) => {
  const deets = templates.deets.cloneNode(true).querySelector(".deets");

  if (primaryLanguage) {
    deets.appendChild(renderLanguage(primaryLanguage));
  }

  if (stargazerCount) {
    deets.appendChild(renderStarGazers(stargazerCount, name));
  }

  if (forkCount) {
    deets.appendChild(renderForks(forkCount, name));
  }

  if (licenseInfo) {
    deets.appendChild(renderLicense(licenseInfo));
  }

  deets.appendChild(renderUpdated(updated));
  return deets;
};

export const renderDesc = (desc) => {
  const templateP = templates.desc.cloneNode(true);
  templateP.querySelector("p").innerText = desc;
  return templateP;
};

export const renderForked = (url) => {
  const templateSmall = templates.forked.cloneNode(true);
  const link = templateSmall.querySelector("a");
  link.href = `https://github.com/${url}`;
  link.innerText = url;
  return templateSmall;
};
