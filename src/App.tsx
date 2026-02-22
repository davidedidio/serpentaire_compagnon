import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {Player} from "./model/player";
import {createNewPlayer} from "./service/playerCreationService";
import {clearPlayer, loadPlayer, savePlayer} from "./service/storageService";
import {SkillTable} from "./components/skillTable.tsx";
import {TalentsTable} from "./components/talentTable.tsx";
import {CombatPanel} from "./components/combatPanel.tsx";
import {InventoryPanel} from "./components/InventoryPanel.tsx";
import {CounterInventory} from "./components/CounterInventoryPanel.tsx";
import type {Tab} from "./model/tab.ts";
import {Tabs} from "./components/tabs.tsx";

const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
    marginBottom: "1em"
};

function renderTab(activeTab: Tab, player: Player, setPlayer: Dispatch<SetStateAction<Player>>) {
    switch (activeTab) {
        case "Inventory":
            return (<div>
                    <h2>Inventaires</h2>
                    <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"commonInventory"}
                                    title={"Objets Communs 10 MAX"} maxItemSize={10}/>
                    <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"specialInventory"}
                                    title={"Objets Spéciaux"} maxItemSize={1000}/>
                    <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"vialInventory"}
                                    title={"Fioles 6 MAX"} maxItemSize={6}/>
                    <h2>Herbes</h2>
                    <CounterInventory player={player} setPlayer={setPlayer} counterKeys={["tulipeNoir", "trempeGlace",
                        "brumaNoctae", "roseDesPres", "astorianne", "bostelie", "bruyereArdente", "perleDeNoix"]}></CounterInventory>
                </div>
            );
        case "Combat": {
            return (
                <div>
                    <h2>Combats</h2>
                    <CombatPanel player={player} setPlayer={setPlayer}/>
                </div>);
        }
        case "SkillsAndTalents": {
            return (<div>
                <h2>Compétences</h2>
                <SkillTable player={player} setPlayer={setPlayer}/>
                <h2>Talents</h2>
                <TalentsTable player={player} setPlayer={setPlayer}/>
            </div>)
        }
    }
}

function App() {
    const [player, setPlayer] = useState<Player>(() => {
        const saved = loadPlayer();
        return saved ?? createNewPlayer();
    });

    const [activeTab, setActiveTab] = useState<Tab>("SkillsAndTalents")

    // Sauvegarde automatique à chaque changement
    useEffect(() => {
        savePlayer(player);
    }, [player]);

    return (
        <div>
            <h1>{player.name}</h1>

            <button style={buttonStyle} onClick={() => {
                clearPlayer();
                setPlayer(createNewPlayer());
            }}>
                Réinitialiser sauvegarde
            </button>

            <CounterInventory player={player} setPlayer={setPlayer}
                              counterKeys={["gold", "skillsExperience", "destinyPoints", "throwingDaggers", "arrows"]}/>

            <Tabs activeTab={activeTab} onSelect={(tab) => setActiveTab(tab)}></Tabs>
            {renderTab(activeTab, player, setPlayer)}
        </div>
    );
}

export default App;
