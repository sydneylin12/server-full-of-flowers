import _ from 'lodash';
import Header from "../components/header";
import Loader from "../components/loader";
import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../constants/constants";
import { constructQueryParam, isPage, makeRequest } from "../utils/utils";
import { Chapter, DropdownItemProps, DropdownProps, FolderMap } from "../types/types";

const DropdownItem: React.FC<DropdownItemProps> = ({
	chapter
}) => {
	const queryParam = constructQueryParam(chapter.chapter_id);
	const goToRead = () => window.location.href = './page.html' + queryParam;
	const goToEdit = () => window.location.href = './editor.html' + queryParam;
	return (
		<li key={chapter.chapter_id}>
			<span>{chapter.name}</span>
			<i className="fa-solid fa-book-open" onClick={goToRead}></i>
			<i className="fa-solid fa-file-pen" onClick={goToEdit}></i>
		</li>
	);
};

const Dropdown: React.FC<DropdownProps> = ({
	folderName,
	chapters
}) => {
	const [isHidden, setIsHidden] = useState(false);
	const onClick = () => setIsHidden(!isHidden);
	return (
		<div className="folder">
			<button className="apple-button collapsable" onClick={onClick}>
				{folderName}
			</button>
			<ul className="dropdown-list" hidden={isHidden}>
				{chapters.map(chapter =>
					<DropdownItem chapter={chapter} />
				)}
			</ul>
		</div>
	);
};

const ChaptersComponent = () => {
	const [folders, setFolders] = useState<FolderMap>({});

	const getData = async () => {
		const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS) as Chapter[];
		chapters.sort((a, b) => {
			return a.name.localeCompare(b.name, undefined, {
				numeric: true,
				sensitivity: 'base'
			});
		});
		setFolders(_.groupBy(chapters, c => c.folder || 'Uncategorized'));
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log('Fetched folders!', folders);
	}, [folders]);

	if (_.isEmpty(folders)) {
		return <Loader />;
	}

	return (
		<div className="content">
			<h1 className="page-heading">Chapters</h1>
			<div className="paragraph-container">
				{Object.entries(folders).map(entry =>
					<Dropdown folderName={entry[0]} chapters={entry[1]} />
				)}
			</div>
		</div>
	);
}

const Chapters: React.FC = () => <>
	<Header />
	<ChaptersComponent />
</>;

export default Chapters;