import React, { useEffect, useState } from "react";
import { API_ROUTES, CHAPTER_PK } from "../constants/constants";
import { Chapter, CreateChapterPayload } from "../types/types";
import { getQueryParam, makeRequest } from "../utils/utils";
import Header from "../components/header";
import _ from "lodash";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor: React.FC = () => <>
    <Header />
    <EditorViewer />
</>;

const EditorViewer = () => {
    const [data, setData] = useState<Chapter | undefined>(undefined);
    const [text, setText] = useState('');

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

    const onClick = async () => {
        const chapterId = "aaa"
        const name = "aaa"
        const folder = "aaa"

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

        console.log(options);
        const res = await makeRequest(API_ROUTES.CREATE_CHAPTER, options);
        const newChapterId = res[CHAPTER_PK];
        console.log(res, newChapterId);
    };

    return (
        <div className="content">
            <h1 className="page-heading">Chapter Editor</h1>
            <div className="chapter-number-container">
                <input placeholder="Chapter Title" className="apple-input" />
                <input placeholder="Folder*" className="apple-input" />
            </div>
            <ReactQuill theme="snow" value={text} onChange={setText} />
            <div className="save-button-container">
                <button className="apple-button" onClick={onClick}>Save Chapter</button>
                <span id="status-message-container"></span>
            </div>
        </div>
    );
}

export default Editor;
