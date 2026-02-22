import type {Player} from "../model/player";

const STORAGE_KEY = "serpentaire-player";

/**
 * Sauvegarde le personnage dans le localStorage
 */
export function savePlayer(player: Player): void {
    try {
        const serialized = JSON.stringify(player);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du personnage", error);
    }
}

/**
 * Charge le personnage depuis le localStorage
 * Retourne null si aucun personnage n'existe
 */
export function loadPlayer(): Player | null {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return null;
        }

        const parsed = JSON.parse(data) as Player;
        return parsed;
    } catch (error) {
        console.error("Erreur lors du chargement du personnage", error);
        return null;
    }
}

/**
 * Supprime le personnage sauvegardé
 */
export function clearPlayer(): void {
    localStorage.removeItem(STORAGE_KEY);
}
