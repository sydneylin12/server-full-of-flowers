import { API_ROUTES, CHAPTER_PK, CHAPTER_ID_PARAM } from "../constants/api";
import { Chapter } from "../types/types";
import { makeRequest } from "../utils/utils";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader";
import { useParams } from "react-router-dom";

const PageViewer = () => {
	const [data, setData] = useState<Chapter | undefined>(undefined);
	const params = useParams();

	const getData = async () => {
		const chapterId = params[CHAPTER_ID_PARAM];
		const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS) as Chapter[];
		const chapter = chapters.find(c => c[CHAPTER_PK] === chapterId);
		setData(chapter);
	};

	useEffect(() => {
		getData();
	}, []);

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

const Page: React.FC = () => <>
	<Header />
	<PageViewer />
</>;

export default Page;
