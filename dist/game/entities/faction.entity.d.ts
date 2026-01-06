export declare enum FactionType {
    AMERICAN_EMPIRE = "American Empire",
    RUSSIAN_BEAR = "Russian Bear",
    CHINESE_DRAGON = "Chinese Dragon",
    EUROPEAN_UNION = "European Union",
    BANKING_CARTEL = "Banking Cartel",
    MILITARY_INDUSTRIAL_COMPLEX = "Military-Industrial Complex",
    ISRAEL_LOBBY = "Israel Lobby",
    SAUDI_UAE_AXIS = "Saudi-UAE Axis",
    TURKISH_DEEP_STATE = "Turkish Deep State",
    IRANIAN_MULLAHS = "Iranian Mullahs",
    INDIAN_HINDUTVA = "Indian Hindutva",
    TECH_TOTALITARIANS = "Tech Totalitarians"
}
export declare class Faction {
    id: number;
    name: string;
    type: FactionType;
    description: string;
    influence: number;
    power: number;
    stability: number;
    leaders: any;
    goals: any;
    conspiracies: any;
}
