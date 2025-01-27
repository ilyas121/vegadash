// Function to load CSS files
function loadCSS(filename) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${window.env.baseUrl}/css/${filename}`;
        
        link.onload = () => {
            console.log(`Successfully loaded CSS: ${filename}`);
            resolve();
        };
        link.onerror = (error) => {
            console.error(`Failed to load CSS: ${filename}`, error);
            reject(error);
        };
        
        document.head.appendChild(link);
    });
}

// Function to load script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        
        script.onload = () => {
            console.log(`Successfully loaded script: ${src}`);
            resolve();
        };
        script.onerror = (error) => {
            console.error(`Failed to load script: ${src}`, error);
            reject(error);
        };
        
        document.body.appendChild(script);
    });
}

// Load resources when DOM is ready
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded. Base URL:', window.env.baseUrl);
    try {
        // // Load CSS files
        // await Promise.all([
        //     loadCSS('bootstrap.min.css'),
        //     loadCSS('animate.min.css'),
        //     loadCSS('ares.css')
        // ]);
        // console.log('All CSS files loaded successfully');

        // Load the bundle
        await loadScript(`${window.env.baseUrl}/bundle.js`);
        console.log('Bundle loaded successfully');
    } catch (error) {
        console.error('Failed to load resources:', error);
    }
}); 