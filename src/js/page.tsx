import { createRoot } from "react-dom/client";
import { API_ROUTES, CHAPTER_PK } from "./constants/constants";
import { Chapter } from "./types/types";
import { getQueryParam, isPage, makeRequest } from "./utils/utils";
import Header from "./components/header";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";

const renderReactOnPageViewer = () => {
	document.body.innerHTML = '<div id="page"></div>';
	const root = createRoot(document.getElementById('page')!);
	root.render(
		<>
			<Header />
			<PageViewer />
		</>
	)
};

const PageViewer = () => {
	const [data, setData] = useState<Chapter | undefined>(undefined);

	const getData = async () => {
		const chapterId = getQueryParam();
		const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS) as Chapter[];
		const chapter = chapters.find(c => c[CHAPTER_PK] === chapterId);
		setData(chapter);
	};

	// Call it once initially
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log('Fetched chapter!', data);
	}, [data]);

	if (!data) {
		return <Loader />;
	}

	return (
		<div className="content times">
			<h1 className="page-heading">{data.name}</h1>
			<hr />
			<div className="paragraph-container">
				<p className="paragraph" dangerouslySetInnerHTML={{
					__html: data.text
				}} />
			</div>
		</div>
	);
}

if (isPage('page')) {
	renderReactOnPageViewer();
}