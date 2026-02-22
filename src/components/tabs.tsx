import {allTabs, type Tab} from "../model/tab.ts";

const tabBar: React.CSSProperties = {
    display: "flex",
    gap: "6px",
    padding: "10px",
    justifyContent: "center"
};

const tabButton: React.CSSProperties = {
    padding: "6px 10px",
    border: "1px solid #aaa",
    cursor: "pointer",
};

const activeTabButton: React.CSSProperties = {
    fontWeight: "bold",
    backgroundColor: "darkslategray"
};

const LABELS: Record<Tab, string> = {
    Inventory: "Inventaires",
    Combat: "Combat",
    SkillsAndTalents: "Talents et Compétences"
};

interface TabsProps {
    activeTab: Tab;
    onSelect: (key: Tab) => void;
}

export function Tabs({activeTab, onSelect}: TabsProps) {
    return (
        <div>
            <div style={tabBar}>
                {allTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onSelect(tab)}
                        style={{
                            ...tabButton,
                            ...(activeTab === tab ? activeTabButton : {}),
                        }}>
                        {LABELS[tab]}
                    </button>
                ))}
            </div>
        </div>
    );
}
