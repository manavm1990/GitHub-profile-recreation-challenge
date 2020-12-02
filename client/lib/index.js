import api from "../api.js";
import { renderDeets, renderDesc, renderForked } from "./optional-renders.js";
import store from "../store.js";
import templates from "./templates.js";

export { default as activateDropdown } from "./activate-dropdown.js";
export { default as handleStarBtns } from "./handle-star-btns.js";

const main = document.querySelector("main");
const repos = main.querySelector("#repos");

const renderRepo = ({
  name,
  url,
  isTemplate,
  parent,
  description: desc,
  primaryLanguage,
  stargazerCount,
  forkCount,
  licenseInfo,
  pushedAt,
}) => {
  const descWrapper = templates.descWrapper.cloneNode(true);
  const descWrapperDiv = descWrapper.querySelector(".desc");
  const repo = templates.repo.cloneNode(true);
  const repoSection = repo.querySelector("section");
  const repoLink = repoSection.querySelector("a");

  repoLink.href = url;
  repoLink.innerText = name;

  if (isTemplate) {
    repoSection
      .querySelector("header")
      .appendChild(templates.template.cloneNode(true));
  }

  if (parent) {
    descWrapperDiv.appendChild(renderForked(parent.nameWithOwner));
  }

  if (desc) {
    descWrapperDiv.appendChild(renderDesc(desc));
  }

  repoSection.appendChild(descWrapper);
  repoSection.appendChild(
    renderDeets({
      primaryLanguage,
      stargazerCount,
      forkCount,
      licenseInfo,
      pushedAt,
      name,
    })
  );
  repos.appendChild(repo);
};

const renderTotalPublicCount = (count) => {
  const totalPublic = main.querySelector("#total-public");
  templates.publicCount.querySelector("strong:first-child").innerText = count;
  totalPublic.appendChild(templates.publicCount);
};

export const renderRepos = async () => {
  const data = await api({
    query: `{
  viewer {
    repositories(
      ownerAffiliations: OWNER
      privacy: PUBLIC
      orderBy: { field: PUSHED_AT, direction: DESC }
      first: 20
    ) {
      totalCount
      nodes {
        name
        url
        isTemplate
        parent {
          nameWithOwner
        }
        description
        primaryLanguage {
          color
          name
        }
        stargazerCount
        forkCount
        licenseInfo {
          name
        }
        pushedAt
      }
    }
  }
}
`,
  });

  const {
    data: {
      viewer: {
        repositories: { totalCount, nodes },
      },
    },
  } = JSON.parse(data);

  repos.innerHTML = null;
  renderTotalPublicCount(totalCount);

  nodes.forEach((node) => renderRepo(node));

  return data;
};

// TODO: Is there a way to 'merge' 👇🏾 👆🏾
export const renderTotalCount = () => {
  api({
    query: `{
  viewer {
    repositories(
      ownerAffiliations: OWNER
      orderBy: { field: PUSHED_AT, direction: DESC }
      first: 20
    ) {
      totalCount
    }
  }
}
`,
  }).then((data) => {
    const {
      data: {
        viewer: {
          repositories: { totalCount },
        },
      },
    } = JSON.parse(data);
    document.querySelector("#total-repos").innerText = totalCount;
  });
};

export const renderUser = () => {
  api({
    query: `{
  viewer {
    avatarUrl
    status {
      emojiHTML
    }
    name
    login
    bio
  }
}
`,
  }).then((data) => {
    const {
      data: {
        viewer: { avatarUrl, status, name, login, bio },
      },
    } = JSON.parse(data);

    const avatarImg = templates.profileContent.querySelector("#avatar img");
    const profile = main.querySelector("#profile");

    avatarImg.src = avatarUrl;
    avatarImg.alt = "";
    templates.profileContent.querySelector("#avatar span").innerHTML =
      status.emojiHTML;
    templates.profileContent.querySelector("h1").innerText = name;
    templates.profileContent.querySelector("h2").innerText = login;
    templates.profileContent.querySelector("p").innerText = bio;

    // Remove 'loading'
    profile.innerHTML = null;
    profile.appendChild(templates.profileContent);

    store.user.setCurrentUser(login);
  });
};
