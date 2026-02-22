export interface Combatant {
    name: string;
    habilite: number;
    force: number;
    vigueur: number;
}

export interface CombatTurnLog {
    turn: number;
    playerHabiliteRoll: number;
    enemyHabiliteRoll: number;
    attacker: "player" | "enemy";
    damageDealt: number;
}

export interface CombatResult {
    playerDamageDealt: number;
    playerDamageReceived: number;
    winner: string;
    turns: CombatTurnLog[];
}
