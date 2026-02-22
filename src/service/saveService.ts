import type {Player} from "../model/player";

export class SaveService {

    static async exportSave(player: Player) {
        const json = JSON.stringify(player, null, 2);
        await navigator.clipboard.writeText(json);
    }

    static async importSave(): Promise<Player> {
        const text = await navigator.clipboard.readText();

        let parsed: unknown;

        try {
            parsed = JSON.parse(text);
        } catch {
            throw new Error("Fichier JSON invalide");
        }

        if (!this.isValidPlayer(parsed)) {
            throw new Error("Format de sauvegarde invalide");
        }

        return parsed;
    }

    private static isValidPlayer(obj: unknown): obj is Player {
        return (
            typeof obj === "object" &&
            obj !== null &&
            "skills" in obj &&
            typeof obj.skills === "object" &&
            "commonInventory" in obj &&
            typeof obj.commonInventory === "object" &&
            "vialInventory" in obj &&
            typeof obj.vialInventory === "object" &&
            "specialInventory" in obj &&
            typeof obj.specialInventory === "object" &&
            "talents" in obj &&
            typeof obj.talents === "object"
        );
    }
}
