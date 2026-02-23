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
import {SaveService} from "./service/saveService.ts";

const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
    marginBottom: "1em"
};

const inventoryParentDivStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    gridTemplateRows: "repeat(1, auto)",
    maxWidth: "min-content"
};


function renderTab(activeTab: Tab, player: Player, setPlayer: Dispatch<SetStateAction<Player>>) {
    const [bookmark, setBookmark] = useState(player.bookmark);
    const [note, setNote] = useState(player.note);

    switch (activeTab) {
        case "Inventory":
            return (<div>
                    <h2>Inventaires</h2>
                    <div style={inventoryParentDivStyle}>
                        <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"commonInventory"}
                                        title={"Besace (10 Objets MAX)"} maxItemSize={10}/>
                        <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"specialInventory"}
                                        title={"Poche (Objets Spéciaux)"} maxItemSize={1000}/>
                        <InventoryPanel player={player} setPlayer={setPlayer} inventoryKey={"vialInventory"}
                                        title={"Fioles (6 MAX)"} maxItemSize={6}/>
                    </div>
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
                <h2>Capacités</h2>
                <SkillTable player={player} setPlayer={setPlayer}/>
                <h2>Talents</h2>
                <TalentsTable player={player} setPlayer={setPlayer}/>
            </div>)
        }
        case "Notes": {
            return (<div>
                <button style={{margin: "1em"}} onClick={() => {
                    setPlayer((prev) => {
                        return {
                            ...prev,
                            bookmark: bookmark,
                            note: note
                        }
                    })
                }}>Sauvegarder
                </button>
                <div style={{marginBottom: "1em"}}>
                    <label style={{marginRight: "1em"}}>Marque page numéro du livre: </label>
                    <input id="page" type={"number"} value={bookmark}
                           onChange={(e) => setBookmark(e.target.valueAsNumber)}></input>
                </div>
                <textarea id="note" style={{width: "100%", height: "40em", resize: "vertical"}}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}></textarea>
            </div>)
        }
        case "Settings": {
            return (<div>
                <h2></h2>
                <button style={buttonStyle} onClick={() => {
                    clearPlayer();
                    setPlayer(createNewPlayer());
                }}>
                    Réinitialiser sauvegarde
                </button>

                <h2></h2>
                <button style={buttonStyle} onClick={async () => {
                    try {
                        await SaveService.exportSave(player);
                        alert("Sauvegarde exportée !");
                    } catch {
                        alert("Impossible d'accéder au presse-papier");
                    }
                }}>
                    Exporter sauvegarde
                </button>
                <h2></h2>
                <button style={buttonStyle} onClick={async () => {
                    try {
                        const imported = await SaveService.importSave();
                        setPlayer(imported)
                        alert("Sauvegarde importée !")
                    } catch (e) {
                        alert((e as Error).message);
                    }
                }}>
                    Importer sauvegarde
                </button>

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

            <CounterInventory player={player} setPlayer={setPlayer}
                              counterKeys={["gold", "skillsExperience", "destinyPoints", "throwingDaggers", "arrows"]}/>

            <Tabs activeTab={activeTab} onSelect={(tab) => setActiveTab(tab)}></Tabs>
            {renderTab(activeTab, player, setPlayer)}
        </div>
    );
}

export default App;
