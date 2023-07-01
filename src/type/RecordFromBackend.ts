import {Template} from "./Template";

export interface RecordFromBackend {
    _id: string;
    title: string;
    description: string;

    template: Template;
    created_at: string;
    updated_at: string;
}