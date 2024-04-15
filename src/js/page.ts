import { API_ROUTES, CHAPTER_PK } from "./constants/constants";
import { Chapter } from "./types/types";
import { getQueryParam, isPage, makeRequest } from "./utils/utils";

const run = () => {
	const loader = document.getElementById('loader') as HTMLElement;
	const chapterContent = document.getElementById('chapter-content') as HTMLElement;
	const title = document.getElementById('title') as HTMLElement;
	const paragraph = document.getElementById('paragraph') as HTMLElement;

	const getData = async () => {
		const chapterId = getQueryParam();

		// TODO: move this to an API that gets one chapter at a time instead of filtering
		const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS) as Chapter[];
		const chapter = chapters.find(c => c[CHAPTER_PK] === chapterId);

		loader.remove();
		title.innerHTML = chapter?.name || '';
		paragraph.innerHTML = chapter?.text || '';
		chapterContent.removeAttribute('hidden');
	};

	getData();
};

if (isPage('page')) {
	run();
}