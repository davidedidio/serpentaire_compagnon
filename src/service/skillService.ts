import type {SkillType} from "../model/skills.ts";
import type {Player} from "../model/player.ts";

export const INCREASABLE_SKILLS: SkillType[] = [
    "habilite",
    "force",
    "discretion",
];

export const increaseSkillBaseValue = (prev: Player, skill: SkillType): Player => {
    if (!isSkillIncreasable(prev, skill)) {
        return prev;
    }

    return {
        ...prev,
        assignableSkillPoints: prev.assignableSkillPoints - 1,
        skills: {
            ...prev.skills,
            [skill]: {
                ...prev.skills[skill],
                baseValue: prev.skills[skill].baseValue + 1,
            }
        }
    };
}

export const setSkillEquipmentValue = (prev: Player, skill: SkillType, delta: number): Player => {
    if (!isSkillIncreasable(prev, skill)) {
        return prev;
    }

    return {
        ...prev,
        skills: {
            ...prev.skills,
            [skill]: {
                ...prev.skills[skill],
                equipmentValue: (prev.skills[skill].equipmentValue || 0) + delta,
            }
        }
    };
}

export const isSkillIncreasable = (player: Player, skill: SkillType): boolean => {
    return player.assignableSkillPoints > 0 && INCREASABLE_SKILLS.includes(skill);
}