import { API_ROUTES } from "./constants/constants";
import { constructQueryParam, isPage, makeRequest } from "./utils/utils";

const run = () => {
	const chapterContent = document.getElementById('chapter-content') as HTMLElement;
	const loader = document.getElementById('loader') as HTMLElement;
	const template = document.getElementById('folder-template') as HTMLElement;

	const addEventListenerToFolders = () => {
		const collapsables = document.getElementsByClassName('collapsable');
		Array.prototype.forEach.call(collapsables, (el) => {
			el.addEventListener('click', () => {
				const ul = el.nextElementSibling;
				if (ul.hasAttribute('hidden')) {
					ul.removeAttribute('hidden');
				} else {
					ul.setAttribute('hidden', '');
				}
			});
		});
	};

	// TODO: add a type here
	const createFolderElement = ([folderName, chapters]: any) => {
		const clone = template.cloneNode(true) as HTMLElement;
		const name = folderName !== 'undefined' ? folderName : 'Uncategorized';
		clone.children[0].textContent = `${name} +`;
		const ul = clone.children[1];

		chapters.forEach((chapter: any) => {
			// Create list item
			const li = document.createElement('li');

			// Create title of chapter
			const text = document.createElement('text');
			text.textContent = chapter.name;

			// Create icons
			const param = constructQueryParam(chapter['chapter_id']);
			const readIcon = document.createElement('i');
			const writeIcon = document.createElement('i');
			readIcon.classList.add('fa-solid');
			readIcon.classList.add('fa-book-open');
			writeIcon.classList.add('fa-solid');
			writeIcon.classList.add('fa-file-pen');
			readIcon.onclick = () => {
				window.location.href = `./page.html${param}`;
			}
			writeIcon.onclick = () => {
				window.location.href = `./editor.html${param}`;
			}

			li.append(text);
			li.append(readIcon);
			li.append(writeIcon);
			ul.appendChild(li);
		});

		clone.removeAttribute('hidden');
		chapterContent.appendChild(clone);
	};

	const getData = async () => {
		const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS);
		chapters.sort((a: any, b: any) => {
			return a.name.localeCompare(b.name, undefined, {
				numeric: true,
				sensitivity: 'base'
			});
		});

		// @ts-ignore
		const folders = Object.groupBy(chapters, (c: any) => c.folder);

		// Add each template and add event listeners for each button
		Object.entries(folders).forEach(createFolderElement);
		addEventListenerToFolders();

		// Disable the spiner
		loader.remove();
		chapterContent.removeAttribute('hidden');
	};

	getData();
};

if (isPage('chapters')) {
	run();
}


