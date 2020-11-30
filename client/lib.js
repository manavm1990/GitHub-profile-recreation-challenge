import api from "./api.js";

const main = document.querySelector("main");
const repos = main.querySelector("#repos");
const templateProfileContent = document.querySelector("#template-profile")
  .content;
const templatePublicCount = document.querySelector("#template-count").content;
const templateRepo = document.querySelector("#template-repo").content;
const templateTemplate = document.querySelector("#template-template").content;

const renderRepo = ({ name, url, templateRepository }) => {
  const repoDiv = templateRepo.cloneNode(true);
  const repoLink = repoDiv.querySelector("a");
  repoLink.href = url;
  repoLink.innerText = name;

  if (templateRepository) {
    const templateH3 = templateTemplate.cloneNode(true);
    templateH3.querySelector("a").href = templateRepository.url;
    repoDiv.querySelector(".flex").appendChild(templateH3);
  }
  repos.appendChild(repoDiv);
};

const renderTotalPublicCount = (count) => {
  const totalPublic = main.querySelector("#total-public");
  templatePublicCount.querySelector("strong:first-child").innerText = count;
  totalPublic.appendChild(templatePublicCount);
};

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
        templateRepository {
          url
        }
        parent {
          nameWithOwner
        }
        description
        repositoryTopics(first: 3) {
          nodes {
            topic {
              name
            }
          }
        }
        primaryLanguage {
          color
          name
        }
        stargazerCount
        forkCount
        # test
        pushedAt
      }
    }
  }
}
`,
  }).then((data) => {
    const {
      data: {
        viewer: {
          repositories: { totalCount, nodes },
        },
      },
    } = JSON.parse(data);

    renderTotalPublicCount(totalCount);

    nodes.forEach((node) => renderRepo(node));
    // const repos = main.querySelector("#repos");

    // templateReposContent.querySelector("strong").innerText = totalCount;

    // // 'template content' must be 'appended' (NOT 'innerHTML')
    // repos.appendChild(templateReposContent);
  });
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
