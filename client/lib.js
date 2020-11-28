import api from "./api.js";

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
          emoji
        }
        name
        login
        bio
      }
    }`,
  }).then((data) => {
    console.log(data);
  });
};
