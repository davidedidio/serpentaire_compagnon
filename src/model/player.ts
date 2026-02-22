import type {SkillType, TalentType} from "./skills";
import type {PlayerItem} from "./playerItem.ts";
import type {SkillStat, TalentStat} from "./stat.ts";

export interface Player {
    name: string;
    skills: Record<SkillType, SkillStat>;
    talents: Record<TalentType, TalentStat>;

    assignableSkillPoints: number;
    skillsExperience: number;
    assignableTalentPoints: number;
    destinyPoints: number;

    gold: number;
    throwingDaggers: number;
    arrows: number;

    commonInventory: PlayerItem[];
    specialInventory: PlayerItem[];
    vialInventory: PlayerItem[];

    tulipeNoir: number;
    trempeGlace: number;
    brumaNoctae: number;
    roseDesPres: number;
    astorianne: number;
    bostelie: number;
    bruyereArdente: number;
    perleDeNoix: number;
}

export type CountableKey =
    | "skillsExperience"
    | "destinyPoints"
    | "gold"
    | "throwingDaggers"
    | "arrows"
    | "tulipeNoir"
    | "trempeGlace"
    | "brumaNoctae"
    | "roseDesPres"
    | "astorianne"
    | "bostelie"
    | "bruyereArdente"
    | "perleDeNoix";

export type InventoryKey =
    | "commonInventory"
    | "specialInventory"
    | "vialInventory";