import api from "./api.js";

const main = document.querySelector("main");
const templateProfileContent = document.querySelector("#template-profile")
  .content;
const templateReposContent = document.querySelector("#template-count").content;

export const activateDropdown = () => {
  const dropdown = document.querySelector("#dropdown");

  document.querySelector("#toggle-nav").addEventListener("click", () => {
    dropdown.classList.replace("is-hidden", "is-shown") ||
      dropdown.classList.replace("is-shown", "is-hidden");
  });
};

export const renderRepos = () => {
  api({
    query: `{
  viewer {
    repositories(ownerAffiliations: OWNER privacy: PUBLIC orderBy: {field: PUSHED_AT, direction: DESC} first: 20) {
      totalCount
    }
  }
}`,
  }).then((data) => {
    const {
      data: {
        viewer: {
          repositories: { totalCount },
        },
      },
    } = JSON.parse(data);
    const repos = main.querySelector("#repos");

    templateReposContent.querySelector("strong").innerText = totalCount;

    // 'template content' must be 'appended' (NOT 'innerHTML')
    repos.appendChild(templateReposContent);
  });
};

// TODO: Is there a way to 'merge' 👇🏾 👆🏾
export const renderTotalCount = () => {
  api({
    query: `{viewer {
    repositories(ownerAffiliations: OWNER orderBy: {field: PUSHED_AT, direction: DESC} first: 20) {
      totalCount
    }
  }}`,
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
    }`,
  }).then((data) => {
    const {
      data: {
        viewer: { avatarUrl, status, name, login, bio },
      },
    } = JSON.parse(data);
    const avatarImg = templateProfileContent.querySelector("#avatar img");
    const profile = main.querySelector("#profile");

    avatarImg.src = avatarUrl;
    avatarImg.alt = "";
    templateProfileContent.querySelector("#avatar span").innerHTML =
      status.emojiHTML;
    templateProfileContent.querySelector("h1").innerText = name;
    templateProfileContent.querySelector("h2").innerText = login;
    templateProfileContent.querySelector("p").innerText = bio;

    profile.innerHTML = null;
    profile.appendChild(templateProfileContent);
  });
};
