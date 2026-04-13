// MoureDev Replica - Main JavaScript

// Theme Management
(function() {
    'use strict';

    // Only run in browser environment, not during SSR
    if (typeof document !== 'undefined') {
        try {
            const theme = localStorage.getItem("theme") || "system";
            const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            const resolvedTheme = theme === "system" ? systemPreference : theme;

            // Apply theme immediately - blocks until complete
            // Use classList to avoid overwriting other classes
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(resolvedTheme);
            document.documentElement.style.colorScheme = resolvedTheme;

        } catch (e) {
            // Fallback to system preference on any error (resolve "system" to actual theme)
            const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(fallbackTheme);
            document.documentElement.style.colorScheme = fallbackTheme;
        }
    }
})();

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            html.classList.remove('dark', 'light');
            html.classList.add(newTheme);
            html.style.colorScheme = newTheme;
            
            // Save to localStorage
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button icon
            updateThemeToggleIcon(newTheme);
        });
        
        // Set initial icon
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        updateThemeToggleIcon(currentTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'system' || !savedTheme) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.classList.remove('dark', 'light');
            document.documentElement.classList.add(newTheme);
            document.documentElement.style.colorScheme = newTheme;
            updateThemeToggleIcon(newTheme);
        }
    });
});

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
            `;
        } else {
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
            `;
        }
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
