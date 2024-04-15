interface ChapterBase {
    name: string;
    text: string;
    folder?: string;
}

export interface Chapter extends ChapterBase {
    chapter_id: string;
}

export interface CreateChapterPayload extends ChapterBase {
    chapter_id?: string;
}
