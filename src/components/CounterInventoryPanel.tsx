import type {CountableKey, Player} from "../model/player";

interface CounterInventoryProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    counterKeys: CountableKey[];
}

const panelStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, auto)",
};

const counterBox: React.CSSProperties = {
    border: "1px solid #aaa",
    padding: "8px 0px 8px 0px",
    textAlign: "center",
};

const counterLabel: React.CSSProperties = {
    fontWeight: "bold",
    width: "10em",
    height: "3em",
    marginBottom: "4px",
};

const counterValue: React.CSSProperties = {
    fontWeight: "bold",
    marginBottom: "6px",
};

const counterControls: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
};

const COUNTER_FULL_CALLBACK: Record<CountableKey, (player: Player) => Player> = {
    arrows(player: Player): Player {
        return player;
    },
    astorianne(player: Player): Player {
        return player;
    }, bostelie(player: Player): Player {
        return player;
    }, brumaNoctae(player: Player): Player {
        return player;
    }, bruyereArdente(player: Player): Player {
        return player;
    }, destinyPoints(player: Player): Player {
        return player;
    }, gold(player: Player): Player {
        return player;
    }, perleDeNoix(player: Player): Player {
        return player;
    }, roseDesPres(player: Player): Player {
        return player;
    }, skillsExperience(player: Player): Player {
        return {
            ...player,
            skillsExperience: player.skillsExperience - MAX_VALUES["skillsExperience"],
            assignableSkillPoints: player.assignableSkillPoints + 1
        };
    }, throwingDaggers(player: Player): Player {
        return player;
    }, trempeGlace(player: Player): Player {
        return player;
    }, tulipeNoir(player: Player): Player {
        return player;
    }
}

const LABELS: Record<CountableKey, string> = {
    skillsExperience: "Point d'expérience de capacité",
    destinyPoints: "Points de destin",
    gold: "Bourse",
    throwingDaggers: "Poingnards de jet",
    arrows: "Carreaux d'arbasvelte",
    tulipeNoir: "Tulipe noir",
    trempeGlace: "Trempeglace",
    brumaNoctae: "Bruma noctae",
    roseDesPres: "Rose des prés",
    astorianne: "Astorianne",
    bostelie: "Bostélie",
    bruyereArdente: "Bruyère ardente",
    perleDeNoix: "Perle de noix"
};

const MAX_VALUES: Record<CountableKey, number> = {
    skillsExperience: 20,
    destinyPoints: Number.MAX_VALUE,
    gold: 100,
    throwingDaggers: 6,
    arrows: 12,
    tulipeNoir: Number.MAX_VALUE,
    trempeGlace: Number.MAX_VALUE,
    brumaNoctae: Number.MAX_VALUE,
    roseDesPres: Number.MAX_VALUE,
    astorianne: Number.MAX_VALUE,
    bostelie: Number.MAX_VALUE,
    bruyereArdente: Number.MAX_VALUE,
    perleDeNoix: Number.MAX_VALUE
};


export function CounterInventory({
                                     player,
                                     setPlayer,
                                     counterKeys
                                 }: CounterInventoryProps) {
    const updateCounter = (counterKey: CountableKey, delta: number) => {
        setPlayer((prev) => {
            let newPlayer : Player = {
                ...prev,
                [counterKey]: Math.min(MAX_VALUES[counterKey], Math.max(0, ((prev[counterKey]) ?? 0) + delta))
            };
            if(newPlayer[counterKey] >= MAX_VALUES[counterKey]){
                newPlayer = COUNTER_FULL_CALLBACK[counterKey](newPlayer)
            }
            return newPlayer;
        })
    };

    return (
        <div style={panelStyle}>
            {counterKeys.map((key) => (
                <div key={key} style={counterBox}>
                    {/* Line 1: Label */}
                    <div style={counterLabel}>{LABELS[key]}</div>

                    {/* Line 2: Value */}
                    <div
                        style={counterValue}>{player[key] ?? 0} {MAX_VALUES[key] != Number.MAX_VALUE ? " / " + MAX_VALUES[key] : ""}
                    </div>
                    {/* Line 3: Controls */}
                    <div style={counterControls}>
                        <button
                            onClick={() => updateCounter(key, -1)}
                            disabled={(player[key] ?? 0) === 0}
                        >
                            −
                        </button>
                        <button onClick={() => updateCounter(key, +1)}>
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
