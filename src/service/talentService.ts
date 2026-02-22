import type {TalentType} from "../model/skills.ts";
import type {Player} from "../model/player.ts";

export const TALENT_EXPERIENCE_TO_NEXT_LEVEL: number = 12;

export const addTalentExperience = (prev: Player, talent: TalentType, amount: number): Player => {
    const current = prev.talents[talent];
    let newXP = current.experiencePoints + amount;
    let newValue = current.baseValue;

    while (newXP >= TALENT_EXPERIENCE_TO_NEXT_LEVEL) {
        newXP = newXP - TALENT_EXPERIENCE_TO_NEXT_LEVEL;
        newValue += 1;
    }

    return {
        ...prev,
        talents: {
            ...prev.talents,
            [talent]: {
                ...current,
                baseValue: newValue,
                experiencePoints: newXP,
            },
        },
    };
};

export const increaseTalent = (prev: Player, talent: TalentType): Player => {
    return {
        ...prev,
        assignableTalentPoints: prev.assignableTalentPoints - 1,
        talents: {
            ...prev.talents,
            [talent]: {
                ...prev.talents[talent],
                baseValue: prev.talents[talent].baseValue + 1
            },
        }
    }
}
