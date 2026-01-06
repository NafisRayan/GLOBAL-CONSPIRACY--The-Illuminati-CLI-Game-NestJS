export declare enum MissionType {
    RECRUITMENT = "Recruitment",
    INFILTRATION = "Infiltration",
    INFLUENCE = "Influence",
    RESOURCE = "Resource",
    KNOWLEDGE = "Knowledge",
    CRISIS = "Crisis"
}
export declare enum MissionStatus {
    AVAILABLE = "Available",
    ACTIVE = "Active",
    COMPLETED = "Completed",
    FAILED = "Failed"
}
export declare class Mission {
    id: number;
    title: string;
    description: string;
    type: MissionType;
    status: MissionStatus;
    difficulty: number;
    requirements: Record<string, any>;
    rewards: Record<string, any>;
    choices: string[];
    consequences: Record<string, any>[];
    player: any;
    createdAt: Date;
}
