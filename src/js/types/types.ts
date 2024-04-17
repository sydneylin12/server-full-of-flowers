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

export interface DropdownProps {
    folderName: string;
    chapters: Chapter[];
}

export interface DropdownItemProps {
    chapter: Chapter;
}

export type FolderMap = Record<string, Chapter[]>;
