import {
  activateDropdown,
  handleStarBtns,
  renderRepos,
  renderTotalCount,
  renderUser,
} from "./lib/index.js";

activateDropdown();
renderUser();
renderTotalCount();

// TODO: 'then'...add 👩🏾‍🎤 button handlers
renderRepos().then(() => {
  handleStarBtns();
});
