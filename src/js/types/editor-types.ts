export interface EditorState {
    chapterId: string | undefined;
    name: string | undefined;
    text: string | undefined;
    folder: string | undefined;
    isLoading: boolean;
    isSaving: boolean;
}

export const DEFAULT_STATE: EditorState = {
    chapterId: undefined,
    name: undefined,
    text: undefined,
    folder: undefined,
    isLoading: false,
    isSaving: false
}