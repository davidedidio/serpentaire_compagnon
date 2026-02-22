import type {Player} from "../model/player";
import type {TalentType} from "../model/skills.ts";
import {addTalentExperience, increaseTalent, TALENT_EXPERIENCE_TO_NEXT_LEVEL} from "../service/talentService.ts";
import {useState} from "react";
import {destinyDiceRoll} from "../service/randomService.ts";

const cellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
};

const rowHeaderStyle: React.CSSProperties = {
    ...cellStyle,
    textAlign: "left",
    fontWeight: "bold",
};

const xpBarContainer: React.CSSProperties = {
    width: "100%",
    height: "10px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "4px",
};

const xpBarFill: React.CSSProperties = {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.3s ease",
};

const buttonStyle: React.CSSProperties = {
    marginTop: "4px",
    padding: "2px 6px",
    fontSize: "0.75em",
    cursor: "pointer",
};

const LABELS: Record<TalentType, string> = {
    savoir: "Savoir",
    equitation: "Équitation",
    tir: "Tir",
    manipulation: "Manipulation",
    crochetage: "Crochetage",
    melee: "Mélée"
};

interface TalentTableProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

export function TalentsTable({player, setPlayer}: TalentTableProps) {
    const {talents} = player;
    const [diceThrowValue, setDiceThrowValue] = useState(0);
    const [diceThrowTalent, setDiceThrowTalent] = useState({} as TalentType);

    return (
        <table style={{borderCollapse: "collapse", width: "100%"}}>
            <thead>
            <tr>
                <th style={cellStyle}>Talent</th>
                <th style={cellStyle}>Valeur</th>
                <th style={cellStyle}>Expérience</th>
                <th style={cellStyle}>Lancé</th>
            </tr>
            </thead>

            <tbody>
            {(Object.keys(talents) as TalentType[]).map((talent) => {
                const t = talents[talent];
                const percent =
                    (t.experiencePoints / TALENT_EXPERIENCE_TO_NEXT_LEVEL) * 100;

                return (
                    <tr key={talent}>
                        <td style={rowHeaderStyle}>{LABELS[talent]}</td>

                        <td style={cellStyle}>
                            <strong>{t.baseValue}
                                {player.assignableTalentPoints > 0 &&
                                    (
                                        <div>
                                            <button
                                                style={buttonStyle}
                                                onClick={() => setPlayer((prev) => increaseTalent(prev, talent))}>
                                                +1
                                            </button>
                                        </div>
                                    )}

                            </strong>
                        </td>

                        <td style={cellStyle}>
                            <div style={xpBarContainer}>
                                <div
                                    style={{
                                        ...xpBarFill,
                                        width: `${percent}%`,
                                    }}
                                />
                            </div>

                            <div style={{fontSize: "0.8em"}}>
                                {t.experiencePoints} / {TALENT_EXPERIENCE_TO_NEXT_LEVEL}
                            </div>

                            <button
                                style={buttonStyle}
                                onClick={() => setPlayer(prev => addTalentExperience(prev, talent, 1))}>
                                +1 XP
                            </button>
                        </td>

                        <td style={cellStyle}>
                            <div>
                                {diceThrowTalent === talent ? diceThrowValue : "-"}
                            </div>
                            <button
                                style={buttonStyle}
                                onClick={() => {
                                    setDiceThrowValue(() => destinyDiceRoll() + t.baseValue)
                                    setDiceThrowTalent(() => talent)
                                }}>
                                Lancé du destin
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
