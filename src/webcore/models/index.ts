import { Option } from "webcore/utils/option";

interface PistonMetadata {
    active: boolean;                // a
    lastExecuted: Option<number>;   // t
    nextScheduled: Option<number>;  // n
    statusText: Option<string>;
    automaticStatus: Option<string>;
}

export interface PistonListing {
    pistonId: string;
    name: string;
    metadata: PistonMetadata;
    categoryId?: number;
}

export interface Category {
    categoryId: number;
    display: {
        tileSize?: "tile" | "medium" | "large";
        hidden: boolean;
        details: boolean;
    };
    name: string;
}
