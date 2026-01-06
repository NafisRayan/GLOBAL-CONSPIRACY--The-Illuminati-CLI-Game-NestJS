import { Mission } from './mission.entity';
export declare enum PlayerRank {
    INITIATE = "Initiate",
    APPRENTICE = "Apprentice",
    KEEPER = "Keeper",
    MASTER = "Master",
    COUNCIL_MEMBER = "Council Member",
    GRAND_MASTER = "Grand Master",
    ILLUMINATUS = "Illuminatus"
}
export declare enum PlayerBackground {
    CORPORATE_EXECUTIVE = "Corporate Executive",
    INTELLIGENCE_OFFICER = "Intelligence Officer",
    ACADEMIC = "Academic",
    CRIMINAL = "Criminal",
    POLITICIAN = "Politician",
    OCCULTIST = "Occultist"
}
export declare class Player {
    id: number;
    name: string;
    rank: PlayerRank;
    background: PlayerBackground;
    experience: number;
    influence: number;
    wealth: number;
    knowledge: number;
    power: number;
    secrecy: number;
    loyalty: number;
    charisma: number;
    intelligence: number;
    cunning: number;
    willpower: number;
    stealth: number;
    turn: number;
    createdAt: Date;
    updatedAt: Date;
    missions: Mission[];
}
