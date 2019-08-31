export declare type CharmType = "charm" | "ma" | "evocation" | "eclipse";
export declare type CharmRequirement = {
    charmType?: CharmType | "other";
    source?: string;
    name: string;
};
export declare type Charmlike = {
    /**
     * Type of thing
     */
    charmType: CharmType;
    /**
     * Name of charm
     */
    name: string;
    /**
     * Essence prerequisite
     */
    essence: number;
    /**
     * Simple/Uniform and all that
     */
    type: string;
    /**
     * Mote costs
     */
    cost: string;
    /**
     * Scene/Instant and all that
     */
    duration: string;
    /**
     * List of charms to do
     */
    requiredCharms?: [CharmRequirement | string] | CharmRequirement | string;
    /**
     *
     */
    processedrequirements?: [CharmRequirement];
    /**
     * Like "social" or whatever.
     */
    categories: string[];
    /**
     * Uniform/Decisive-only and all that
     */
    keywords: string[] | string;
    /**
     * The "lowdown" synopsis of a charm
     */
    shortDescription: string;
};
