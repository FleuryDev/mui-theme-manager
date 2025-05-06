export const list: Record<string, any> = {};



function getEnvironment(): "Node.js" | "Vite (Navigateur)" | "Webpack" | "Navigateur" {
    if (typeof process !== "undefined" && process.versions?.node) {
        return "Node.js";
        // @ts-ignore
    } else if (typeof import.meta !== "undefined" && import.meta.env) {
        return "Vite (Navigateur)";
        // @ts-ignore
    } else if (typeof require !== "undefined" && typeof require.context === "function") {
        return "Webpack";
    } else {
        return "Navigateur";
    }
}

// Fonction pour charger dynamiquement les fichiers de thèmes
async function loadThemes(): Promise<void> {
    const environment = getEnvironment();
    
    if (environment === "Node.js") {
        const fs = require("fs");
        const path = require("path");
        const themesDir = path.resolve(process.cwd(), "src/themes");

        if (fs.existsSync(themesDir)) {
            fs.readdirSync(themesDir).forEach((file: string) => {
                if (file.endsWith(".ts") || file.endsWith(".js")) {
                    const themeModule = require(path.join(themesDir, file));
                    if (themeModule.name && typeof themeModule.data === "function") {
                        list[themeModule.name] = themeModule;
                    }
                }
            });
        }
    } else if (environment === "Vite (Navigateur)") {
        // Vite utilise import.meta.glob pour charger les modules de manière dynamique
        // @ts-ignore
        const modules = import.meta.glob("/src/themes/*.{ts,js}", { eager: true }) as Record<string, any>;
        
        Object.entries(modules).forEach(([filePath, module]) => {
            if (module?.name && typeof module.data === "function") {
                list[module.name] = module;
            }
        });
    } else if (environment === "Webpack") {
      // @ts-ignore
        const context = require.context("/src/themes", false, /\.(ts|js)$/);
        context.keys().forEach((filePath: string) => {
            const module = context(filePath);
            if (module?.name && typeof module.data === "function") {
                list[module.name] = module;
            }
        });
    } else {
        console.error("Impossible de charger les thèmes : environnement non pris en charge.");
    }
}

// Charger les thèmes
loadThemes();

