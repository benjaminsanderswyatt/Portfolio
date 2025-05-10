/* Dot indicator */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");
  const projectsLink = Array.from(navLinks).find(link =>
    link.href.includes("#projects")
  );

  if (projectsLink) {
    const dotIndicator = document.createElement("div");
    dotIndicator.classList.add("dot-indicator");

    const linkRect = projectsLink.getBoundingClientRect();
    const offsetLeft = projectsLink.offsetLeft + (linkRect.width / 2) - 5; // 5 is half the dot width 10px

    dotIndicator.style.left = `${offsetLeft}px`;

    const nav = document.querySelector("nav");
    nav.appendChild(dotIndicator);
  }
});











document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectName = urlParams.get("repo");

  if (!projectName) {
    document.getElementById("project-title").textContent = "Error getting repo";
    return;
  }

  fetch('https://api.github.com/users/benjaminsanderswyatt/repos')
  .then(res => res.json())
  .then(data => {
    window.repoData = data;
  })
  .catch(err => {
    console.error("Failed to fetch repos:", err);
    document.getElementById("project-title").textContent = "Failed to load project";
  });

  const waitForRepoData = () => {
    if (window.repoData) {
      const project = window.repoData.find(p => p.name === projectName);
      if (project) {
        document.getElementById("project-title").textContent = project.name;
        document.getElementById("project-description").textContent = project.description || "No description provided";
        document.getElementById("project-link").href = project.html_url;

        // Set banner image
        const bannerUrl = `https://raw.githubusercontent.com/benjaminsanderswyatt/${project.name}/${project.default_branch}/banner.png`;
        const banner = document.getElementById("banner-image");
        banner.src = bannerUrl;
        banner.style.display = 'block';


        // If the banner image fails, use fallback
        banner.onerror = () => {
          banner.src = '/assets/repos/default.png';
        };
      } else {
        document.getElementById("project-title").textContent = "Project not found";
      }
    } else {
      setTimeout(waitForRepoData, 100);
    }
  };

  waitForRepoData();
});
