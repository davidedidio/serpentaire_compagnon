import type {SkillType} from "../model/skills.ts";
import type {Player} from "../model/player.ts";
import {increaseSkillBaseValue, isSkillIncreasable, setSkillEquipmentValue} from "../service/skillService.ts";
import {destinyDiceRoll} from "../service/randomService.ts";
import {useState} from "react";

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

const buttonStyle: React.CSSProperties = {
    marginTop: "4px",
    padding: "2px 6px",
    cursor: "pointer",
};

interface SkillTableProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

const LABELS: Record<SkillType, string> = {
    habilite: "Habilité",
    force: "Force",
    vigueur: "Vigueur",
    discretion: "Discrétion",
};

export function SkillTable({player, setPlayer}: SkillTableProps) {
    const [diceThrowValue, setDiceThrowValue] = useState(0);
    const [diceThrowSkill, setDiceThrowSkill] = useState({} as SkillType);

    return (
        <table style={{borderCollapse: "collapse", width: "100%"}}>
            <thead>
            <tr>
                <th></th>
                {Object.keys(player.skills).map((key) => (
                    <th key={key} style={cellStyle}>
                        {LABELS[key as SkillType]}
                        {isSkillIncreasable(player, key as SkillType) && (
                            <div>
                                <button
                                    style={buttonStyle}
                                    onClick={() => setPlayer(prev => increaseSkillBaseValue(prev, key as SkillType))}>
                                    +1
                                </button>
                            </div>
                        )}
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            <tr>
                <td style={rowHeaderStyle}>Points initiaux</td>
                {Object.values(player.skills).map((cap, index) => (
                    <td key={index} style={cellStyle}>
                        {cap.baseValue}
                    </td>
                ))}
            </tr>

            <tr>
                <td style={rowHeaderStyle}>Modificateur d’équipement</td>
                {Object.keys(player.skills).map((key) => (
                    <td key={key} style={cellStyle}>
                        {player.skills[key as SkillType].equipmentValue}

                        <br></br>
                        {(<div>
                            <button
                                style={buttonStyle}
                                onClick={() => setPlayer(prev => setSkillEquipmentValue(prev, key as SkillType, -1))}>
                                -1
                            </button>
                            <button
                                style={buttonStyle}
                                onClick={() => setPlayer(prev => setSkillEquipmentValue(prev, key as SkillType, +1))}>
                                +1
                            </button>
                        </div>)}
                    </td>
                ))}
            </tr>

            <tr>
                <td style={rowHeaderStyle}>Points réels</td>
                {Object.values(player.skills).map((cap, index) => (
                    <td
                        key={index}
                        style={{...cellStyle, fontWeight: "bold"}}
                    >
                        {cap.baseValue + (cap.equipmentValue ?? 0)}
                    </td>
                ))}
            </tr>
            <tr>
                <td style={rowHeaderStyle}>Lancé du destin</td>

                {(Object.keys(player.skills) as SkillType[]).map((skill) => (
                    <td
                        style={{...cellStyle, fontWeight: "bold"}}
                    >
                        <div>
                            {diceThrowSkill === skill ? diceThrowValue : "-"}
                        </div>
                        <button
                            style={buttonStyle}
                            onClick={() => {
                                setDiceThrowValue(() => destinyDiceRoll() + player.skills[skill].baseValue + (player.skills[skill].equipmentValue || 0))
                                setDiceThrowSkill(() => skill)
                            }}>
                            Lancé du destin
                        </button>
                    </td>

                ))}
            </tr>

            </tbody>
        </table>
    );
}
