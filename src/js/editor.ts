import { API_ROUTES, CHAPTER_PK } from "./constants/constants";
import { CreateChapterPayload } from "./types/types";
import { constructQueryParam, getQueryParam, hasQueryParam, isPage, makeRequest, wait } from "./utils/utils";
import Quill from 'quill';

const run = () => {
    const loader = document.getElementById('loader') as HTMLElement;
    const chapterInput = document.getElementById('chapter-input') as HTMLInputElement;
    const folderInput = document.getElementById('folder-input') as HTMLInputElement;
    const button = document.getElementById('save-button') as HTMLButtonElement;
    const editorBody = document.getElementById('editor-body') as HTMLElement;
    const statusContainer = document.getElementById('status-message-container') as HTMLElement;

    // @ts-ignore needs to be here to initialize Quill
    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    // TODO: update this to contain a status code and response body
    const updateMessage = async (res: any) => {
        const el = document.createElement('span');
        el.classList.add('status-message');
        if (!!res) {
            el.textContent = 'Sucessfully saved chapter!';
        } else {
            el.textContent = 'Error saving chapter!';
        }
        statusContainer?.appendChild(el);
        await wait(3000);
        el.remove();
    };

    const validateInput = () => {
        const inputContent = chapterInput.value;
        if (!inputContent?.length) {
            console.warn('Input must not be null or empty');
            chapterInput.setAttribute('error', '');
            button.setAttribute('disabled', '');
        } else {
            chapterInput.removeAttribute('error');
            button.removeAttribute('disabled');
        }
    };

    const getQuillBody = () => {
        return document.getElementsByClassName('ql-editor')[0] as HTMLElement;
    };

    // Initial call so no null stories are created
    validateInput();
    chapterInput.addEventListener('change', validateInput);

    // Input content is already validated by the time we get here
    button.addEventListener('click', async () => {
        const text = getQuillBody().innerHTML;
        const chapterId = getQueryParam();
        const name = chapterInput.value;
        const folder = folderInput.value;

        const params: CreateChapterPayload = {
            name,
            folder,
            text,
            'chapter_id': chapterId
        };

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        button.setAttribute('disabled', '');
        const res = await makeRequest(API_ROUTES.CREATE_CHAPTER, options);
        const newChapterId = res[CHAPTER_PK];
        await updateMessage(res);
        button.removeAttribute('disabled');

        // Load query param if it's a new chapter
        if (!newChapterId) {
            window.location.href = './editor.html' + constructQueryParam(newChapterId);
        }
    });

    const disableLoaderAndShowEditor = () => {
        loader.remove();
        editorBody.removeAttribute('hidden');
    }

    /**
     * If the editor is loaded with the chapter query param, make a request to
     * AWS Lambda to get the chapter's latest content.
     * Also lock down the chapter number input.
     */
    const getEditData = async () => {
        if (!hasQueryParam()) {
            disableLoaderAndShowEditor();
            return;
        }

        // Load the data
        const chapterId = getQueryParam();
        const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS);
        const chapter = chapters.find((c: any) => c[CHAPTER_PK] === chapterId);

        disableLoaderAndShowEditor();

        // Update UI to reflect the current chapter
        chapterInput.value = chapter.name;
        folderInput.value = chapter.folder || '';

        // Bug: quill does not get parsed in the same block above
        // Fix: retrieve the object here
        getQuillBody().innerHTML = chapter.text;
        validateInput();
    }

    getEditData();
};

if (isPage('editor')) {
    run();
}
