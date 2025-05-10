document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let autoPlayInterval;

  // Update the carousel and dot
  function updateCarousel() {
    const carouselRow = document.querySelector('.carousel-row');
    const items = document.querySelectorAll('#carousel-repos .repo-item');

    if (items.length === 0) 
      return;

    const firstItem = items[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemWidth = firstItem.offsetWidth + parseInt(itemStyle.marginRight);
    const wrapper = document.querySelector('.carousel-wrapper');

    const visibleCount = Math.floor(wrapper.offsetWidth / itemWidth);

    // Calculate total pages (then shift)
    const totalPages = items.length - visibleCount + 1;

    // Wrap arround current index
    if (currentIndex < 0) {
      currentIndex = totalPages - 1;
    } else if (currentIndex >= totalPages) {
      currentIndex = 0;
    }

    const offset = -(currentIndex * itemWidth);
    carouselRow.style.transform = `translateX(${offset}px)`;

    // Update the dot
    const dots = document.querySelectorAll('#carousel-dots .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }


  // Start carousel auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, 4000);  // every 4 seconds
  }


  // Create dot indicators based on total pages
  function createDots() {
    const carouselDotsContainer = document.getElementById('carousel-dots');
    carouselDotsContainer.innerHTML = "";

    const items = document.querySelectorAll('#carousel-repos .repo-item');
    
    if (items.length === 0) 
      return;

    const firstItem = items[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemWidth = firstItem.offsetWidth + parseInt(itemStyle.marginRight);
    const wrapper = document.querySelector('.carousel-wrapper');
    const visibleCount = Math.floor(wrapper.offsetWidth / itemWidth);
    const totalPages = items.length - visibleCount + 1;

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) {
        dot.classList.add('active');
      }

      // Handle clicking on dot
      dot.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        currentIndex = i;
        updateCarousel();
        startAutoPlay();
      });

      carouselDotsContainer.appendChild(dot);

    }
  }



  // Load github repos onto carosel
  async function loadGithubRepos() {

    // Repos to ignore
    const ignoredRepos = ["Portfolio"];

    // Pinned repos
    const pinnedOrder = [
      "COMP3000-JanusVersionControl",
      "SnakeGame",
      "Comp2003-CloudStorage"
    ];


    try {

      // Get repos from api
      const response = await fetch('https://api.github.com/users/benjaminsanderswyatt/repos');
      if (!response.ok) 
        throw new Error(`Network response was not ok: ${response.statusText}`);

      let repos = await response.json();
      repos = repos.filter(repo => !ignoredRepos.includes(repo.name));
      
      // Separate repos (for pinned)
      const pinnedRepos = repos.filter(repo => pinnedOrder.includes(repo.name));
      pinnedRepos.sort((a, b) => pinnedOrder.indexOf(a.name) - pinnedOrder.indexOf(b.name));

      const nonPinnedRepos = repos.filter(repo => !pinnedOrder.includes(repo.name));

      // Get the container elements
      const pinnedContainer = document.getElementById('pinned-repos');
      const carouselContainer = document.getElementById('carousel-repos');


      // Create repo item for repository data
      function createRepoItem(repo) {
        const repoItem = document.createElement('div');
        repoItem.classList.add('repo-item');
        repoItem.style.cursor = "pointer";

        repoItem.addEventListener('click', () => {
          window.open(repo.html_url, '_blank');
        });

        // Pause carousel on hover
        repoItem.addEventListener('mouseenter', () => {
          clearInterval(autoPlayInterval);
        });

        // Replay carousel after hover
        repoItem.addEventListener('mouseleave', () => {
          startAutoPlay();
        });


        // Image URL
        const imageUrl = `https://raw.githubusercontent.com/benjaminsanderswyatt/${repo.name}/${repo.default_branch}/banner.png`;
        const repoImage = document.createElement('img');
        repoImage.src = imageUrl;
        repoImage.alt = `${repo.name} banner`;
        repoImage.classList.add('repo-image');

        // Fallback image if the repo image fails
        repoImage.onerror = function () {
          this.src = './assets/repos/default.png';
        };
        repoItem.appendChild(repoImage);

        const repoName = document.createElement('h2');
        repoName.textContent = repo.name;
        repoItem.appendChild(repoName);

        // Add desciption if it has it
        if (repo.description) {
          const repoDesc = document.createElement('p');
          repoDesc.textContent = repo.description;
          repoItem.appendChild(repoDesc);
        }

        return repoItem;
      }

      // Add pinned repo items
      pinnedRepos.forEach(repo => {
        pinnedContainer.appendChild(createRepoItem(repo));
      });

      // Add carousel repo items
      nonPinnedRepos.forEach(repo => {
        carouselContainer.appendChild(createRepoItem(repo));
      });


      // Init dots and auto play
      createDots();
      updateCarousel(); // Update initially so active dot is set
      startAutoPlay();

      // Handle dots and carousel on window resizing
      window.addEventListener('resize', () => {
        updateCarousel();
        createDots();
      });

    } catch (error) {
      console.error('Error fetching repositories:', error);

      document.getElementById('pinned-repos').textContent = 'Failed to load pinned projects. Please try again later.';
      document.getElementById('carousel-repos').textContent = 'Failed to load projects. Please try again later.';
    }
  }

  // Call the function to load repos
  loadGithubRepos();
});


