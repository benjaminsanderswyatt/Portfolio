const toggleButton = document.getElementById('theme-toggle');
const lightThemeLink = document.getElementById('light-theme-link');
const darkThemeLink = document.getElementById('dark-theme-link');

// Check for saved user preference in localStorage
const userPreference = localStorage.getItem('theme');

function enableLightMode() {
    lightThemeLink.media = 'all';
    darkThemeLink.media = 'not all';
    localStorage.setItem('theme', 'light'); 
}

function enableDarkMode() {
    lightThemeLink.media = 'not all';
    darkThemeLink.media = 'all';
    localStorage.setItem('theme', 'dark');
}

// Sets theme based on system preference
function setDefaultTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

// Checks if user has set a preferance
if (userPreference === 'light') {
    enableLightMode();
} else if (userPreference === 'dark') {
    enableDarkMode();
} else {
    setDefaultTheme();
}

// Theme toggle listener
toggleButton.addEventListener('click', () => {
    if (lightThemeLink.media === 'all') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});