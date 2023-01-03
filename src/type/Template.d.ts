export interface Template {
    _id: string;
    created_at: Date;
    description: string;
    json_schema: object;
    title: string;
    ui_schema: object;
}

export interface EditTemplate {
    templateId: string;
    loading: boolean;
    setLoading: Function
}
