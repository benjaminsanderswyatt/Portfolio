// Get the toggle button and theme link elements
const toggleButton = document.getElementById('theme-toggle');
const lightThemeLink = document.getElementById('light-theme-link');
const darkThemeLink = document.getElementById('dark-theme-link');

// Check for saved user preference in localStorage
const userPreference = localStorage.getItem('theme');

// Function to switch to light mode
function enableLightMode() {
    lightThemeLink.media = 'all';  // Enable light theme
    darkThemeLink.media = 'not all';  // Disable dark theme
    localStorage.setItem('theme', 'light');  // Save user preference
}

// Function to switch to dark mode
function enableDarkMode() {
    lightThemeLink.media = 'not all';  // Disable light theme
    darkThemeLink.media = 'all';  // Enable dark theme
    localStorage.setItem('theme', 'dark');  // Save user preference
}

// Function to set the default theme based on system preference
function setDefaultTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

// Apply user preference if available, otherwise set default theme
if (userPreference === 'light') {
    enableLightMode();
} else if (userPreference === 'dark') {
    enableDarkMode();
} else {
    setDefaultTheme();
}

// Event listener for the toggle button
toggleButton.addEventListener('click', () => {
    if (lightThemeLink.media === 'all') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});