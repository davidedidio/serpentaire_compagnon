import {useState} from "react";
import type {InventoryKey, Player} from "../model/player";

const panelStyle: React.CSSProperties = {
    border: "1px solid #ccc",
};

const cell: React.CSSProperties = {
    textAlign: "start",
    paddingLeft: "1em",
    display: "table-cell"
};

const removeButton: React.CSSProperties = {
    cursor: "pointer",
};

const addItemContainer: React.CSSProperties = {
    marginTop: "12px",
    display: "flex",
};

interface InventoryPanelProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    inventoryKey: InventoryKey;
    title: string;
    maxItemSize: number;
}

export function InventoryPanel({player, setPlayer, inventoryKey, title, maxItemSize}: InventoryPanelProps) {
    const [newItemName, setNewItemName] = useState("");

    const addItem = () => {
        if (player[inventoryKey].length >= maxItemSize) return;
        if (!newItemName.trim()) return;

        setPlayer((prev) => {
            return {
                ...prev,
                [inventoryKey]: [
                    ...prev[inventoryKey],
                    {
                        id: crypto.randomUUID(),
                        name: newItemName
                    }]
            }
        });
        setNewItemName("");
    };

    const removeItem = (id: string) => {
        setPlayer((prev) => {
                return {
                    ...prev,
                    [inventoryKey]: prev[inventoryKey].filter((item) => item.id !== id)
                };
            }
        )
    };

    return (
        <div style={panelStyle}>
            <h3>{title}</h3>

            {/* Inventory list */}
            {player[inventoryKey].length === 0 ? (
                <p style={{fontStyle: "italic"}}>Inventaire vide</p>
            ) : (
                <table>
                    <tbody>
                    {player[inventoryKey].map((item) => (
                        <tr key={item.id}>
                            <td style={cell}>{item.name}</td>
                            <td style={cell}>
                                <button
                                    style={removeButton}
                                    onClick={() => removeItem(item.id)}
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Add item */}
            <div style={addItemContainer}>
                <input
                    type="text"
                    placeholder="Nom de l’objet"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />

                <button onClick={addItem}>Ajouter</button>
            </div>
        </div>
    );
}
