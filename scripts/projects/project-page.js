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

  // Get page elements
  const projectLink = document.getElementById("project-link");
  const projectTitle = document.getElementById("project-title");
  const projectDesc = document.getElementById("project-description");
  const banner = document.getElementById("banner-image");

  // Hide the git by default
  projectLink.style.display = "none";


  if (!projectName) {
    projectTitle.textContent = "Error getting repo";
    return;
  }

  fetch('https://api.github.com/users/benjaminsanderswyatt/repos')
    .then(res => res.json())
    .then(data => {
      const project = data.find(p => p.name === projectName);

      if (project) {

        projectTitle.textContent = project.name;
        projectDesc.textContent = project.description || "No description provided";
        projectLink.href = project.html_url;
        projectLink.style.display = "inline-block"; // Show button

        // Load banner image
        const bannerUrl = `https://raw.githubusercontent.com/benjaminsanderswyatt/${project.name}/${project.default_branch}/banner.png`;
        banner.src = bannerUrl;
        banner.style.display = "block";

        banner.onerror = () => {
          banner.src = '/assets/repos/default.png';
        };

      } else {
        projectTitle.textContent = "Project not found";
        projectLink.style.display = "none";
      }
      
    })
    .catch(err => {
      console.error("Failed to fetch repos:", err);
      projectTitle.textContent = "Failed to load project";
      projectLink.style.display = "none";
    }
  );

});
