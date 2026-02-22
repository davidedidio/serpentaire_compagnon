import type {Player} from "../model/player";

export function createNewPlayer(): Player {
    return {
        name: "Arcan Rivelac",
        skills: {
            habilite: {baseValue: 0, equipmentValue: 0},
            force: {baseValue: 0, equipmentValue: 0},
            vigueur: {baseValue: 15, equipmentValue: 0},
            discretion: {baseValue: 0, equipmentValue: 0},
        },
        assignableSkillPoints: 5,
        skillsExperience: 0,
        assignableTalentPoints: 12,
        destinyPoints: 2,

        talents: {
            savoir: {baseValue: 0, experiencePoints: 0},
            equitation: {baseValue: 0, experiencePoints: 0},
            tir: {baseValue: 0, experiencePoints: 0},
            crochetage: {baseValue: 0, experiencePoints: 0},
            melee: {baseValue: 0, experiencePoints: 0},
            manipulation: {baseValue: 0, experiencePoints: 0},
        },

        gold: 0,
        throwingDaggers: 0,
        arrows: 0,

        astorianne: 0,
        bostelie: 0,
        brumaNoctae: 0,
        bruyereArdente: 0,
        perleDeNoix: 0,
        roseDesPres: 0,
        trempeGlace: 0,
        tulipeNoir: 0,

        commonInventory: [],
        specialInventory: [],
        vialInventory: []
    };
}
