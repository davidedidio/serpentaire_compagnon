import {useState} from "react";
import type {Player} from "../model/player";
import {applyCombatResult, simulateCombat} from "../service/combatService";
import type {CombatResult, CombatTurnLog} from "../model/combat";

interface CombatPanelProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

interface CombatTurnProps {
    turn: CombatTurnLog;
}

const panelStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "12px",
};

const fightButton: React.CSSProperties = {
    marginTop: "8px",
};

const logContainer: React.CSSProperties = {
    marginTop: "12px",
    backgroundColor: "#111",
    color: "#0f0",
    padding: "8px",
    fontFamily: "monospace",
    fontSize: "0.85em",
};

const turnStyle: React.CSSProperties = {
    marginBottom: "8px",
    paddingBottom: "6px",
    borderBottom: "1px solid #333",
    animation: "fadeIn 0.3s ease-in",
};

const headerCellStyle: React.CSSProperties = {
    borderBottom: "1px solid #ccc",
    padding: "4px",
    textAlign: "center",
    fontWeight: "bold",
};

const cellStyle: React.CSSProperties = {
    padding: "4px",
    textAlign: "center",
};

function CombatTurn({turn}: CombatTurnProps) {
    return (
        <div style={turnStyle}>
            <strong>Tour {turn.turn}</strong>
            <div>
                Habilité — Joueur {turn.playerHabiliteRoll} / Ennemi{" "}
                {turn.enemyHabiliteRoll}
            </div>
            <div>
                Attaquant :{" "}
                {turn.attacker === "player" ? "Joueur" : "Ennemi"}
            </div>
            <div>
                <strong>{turn.damageDealt}</strong>
            </div>
        </div>
    );
}

export function CombatPanel({player, setPlayer}: CombatPanelProps) {
    const [enemy, setEnemy] = useState({
        name: "Ennemi",
        habilite: 2,
        force: 2,
        vigueur: 10,
    });
    const [combatResult, setCombatResult] = useState({} as CombatResult)

    const startCombat = () => {
        const playerCombatant = {
            name: player.name,
            habilite: player.skills.habilite.baseValue + (player.skills.habilite.equipmentValue ?? 0),
            force: player.skills.force.baseValue + (player.skills.force.equipmentValue ?? 0),
            vigueur: player.skills.vigueur.baseValue + (player.skills.vigueur.equipmentValue ?? 0),
        };

        const enemyCombatant = {
            ...enemy,
        };

        const combatResult = simulateCombat(
            playerCombatant,
            enemyCombatant
        );
        setCombatResult(combatResult);

        setPlayer(p => applyCombatResult(p, combatResult));
    };

    return (
        <div style={panelStyle}>
            <h3>Combat</h3>

            <fieldset>
                <legend>Ennemi</legend>

                <table style={{borderCollapse: "collapse", width: "100%"}}>
                    <thead>
                    <tr>
                        <th style={headerCellStyle}>Nom</th>
                        <th style={headerCellStyle}>Habilité</th>
                        <th style={headerCellStyle}>Force</th>
                        <th style={headerCellStyle}>Vigueur</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td style={cellStyle}>
                            <input
                                type="text"
                                value={enemy.name}
                                onChange={(e) =>
                                    setEnemy({...enemy, name: e.target.value})
                                }
                            />
                        </td>

                        <td style={cellStyle}>
                            <input
                                type="number"
                                value={enemy.habilite}
                                onChange={(e) =>
                                    setEnemy({...enemy, habilite: +e.target.value})
                                }
                            />
                        </td>

                        <td style={cellStyle}>
                            <input
                                type="number"
                                value={enemy.force}
                                onChange={(e) =>
                                    setEnemy({...enemy, force: +e.target.value})
                                }
                            />
                        </td>

                        <td style={cellStyle}>
                            <input
                                type="number"
                                value={enemy.vigueur}
                                onChange={(e) =>
                                    setEnemy({...enemy, vigueur: +e.target.value})
                                }
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
            <button onClick={startCombat} style={fightButton}>
                Lancer le combat
            </button>

            {combatResult.turns && (
                <div>
                    <div>
                        {combatResult.winner} a gagné le combat.
                        <br/>
                        {player.name} a fait {combatResult.playerDamageDealt} dégats et a reçu {combatResult.playerDamageReceived} dégats
                    </div>
                    <div style={logContainer}>
                        {combatResult.turns.map((turn) => (
                            <CombatTurn key={turn.turn} turn={turn}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
