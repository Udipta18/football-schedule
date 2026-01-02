import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Initialize state based on current document attribute
    const [isLightTheme, setIsLightTheme] = useState(
        typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
    );

    // Function to toggle theme
    const toggleTheme = () => {
        const root = document.documentElement;
        const newTheme = !isLightTheme;

        if (newTheme) {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }

        setIsLightTheme(newTheme);
    };

    // Sync state if attribute changes externally (optional, but good for robustness)
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setIsLightTheme(document.documentElement.getAttribute('data-theme') === 'light');
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
