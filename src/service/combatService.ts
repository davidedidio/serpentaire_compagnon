import type {Combatant, CombatResult, CombatTurnLog,} from "../model/combat";
import {destinyDiceRoll} from "./randomService.ts";
import type {Player} from "../model/player.ts";

export function simulateCombat(
    player: Combatant,
    enemy: Combatant
): CombatResult {
    let playerVigueur = player.vigueur;
    let enemyVigueur = enemy.vigueur;

    let playerDamageDealt = 0;
    let playerDamageReceived = 0;

    const turns: CombatTurnLog[] = [];
    let turn = 1;

    while (playerVigueur > 0 && enemyVigueur > 0) {
        let playerHabiliteRoll: number;
        let enemyHabiliteRoll: number;

        // 1) Jets d’habilité (égalité → on recommence)
        do {
            playerHabiliteRoll = destinyDiceRoll() + player.habilite;
            enemyHabiliteRoll = destinyDiceRoll() + enemy.habilite;
        } while (playerHabiliteRoll === enemyHabiliteRoll);

        const attacker = playerHabiliteRoll > enemyHabiliteRoll ? "player" : "enemy";

        // 2) Dégâts
        const damage = destinyDiceRoll() + (attacker === "player" ? player.force : enemy.force);

        // 3) Application des dégâts
        if (attacker === "player") {
            enemyVigueur -= damage;
            playerDamageDealt += damage;
        } else {
            playerVigueur -= damage;
            playerDamageReceived += damage;
        }

        turns.push({
            turn: turn++,
            playerHabiliteRoll,
            enemyHabiliteRoll,
            attacker,
            damageDealt: damage
        });
    }

    return {
        playerDamageDealt,
        playerDamageReceived,
        winner: playerVigueur > 0 ? player.name : enemy.name,
        turns,
    };
}

export const applyCombatResult = (prev: Player, combat: CombatResult) => {
    const newVigueur =
        prev.skills.vigueur.baseValue - combat.playerDamageReceived;

    return {
        ...prev,
        skills: {
            ...prev.skills,
            vigueur: {
                ...prev.skills.vigueur,
                baseValue: Math.max(newVigueur, 0),
            },
        },
    };
};
