import api from "./api.js";

const main = document.querySelector("main");
const templateProfileContent = document.querySelector("#template-profile")
  .content;

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
        name
        repositories(last: 20) {
          nodes {
            name
          }
        }
      }
  }`,
  }).then((data) => {
    console.log(data);
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
      data: { viewer: user },
    } = JSON.parse(data);
    const avatarImg = templateProfileContent.querySelector("#avatar img");
    const avatarStatus = templateProfileContent.querySelector("#avatar span");
    const h1 = templateProfileContent.querySelector("h1");
    const h2 = templateProfileContent.querySelector("h2");
    const p = templateProfileContent.querySelector("p");

    const profile = main.querySelector("#profile");

    avatarImg.src = user.avatarUrl;
    avatarImg.alt = "";
    avatarStatus.innerHTML = user.status.emojiHTML;
    h1.innerText = user.name;
    h2.innerText = user.login;
    p.innerText = user.bio;

    profile.innerHTML = null;
    profile.appendChild(templateProfileContent);
  });
};
