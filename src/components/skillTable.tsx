import type {SkillType} from "../model/skills.ts";
import type {Player} from "../model/player.ts";
import {increaseSkillBaseValue, isSkillIncreasable, setSkillEquipmentValue} from "../service/skillService.ts";

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
                        {isSkillIncreasable(player, key as SkillType) && (<div>
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
            </tbody>
        </table>
    );
}
