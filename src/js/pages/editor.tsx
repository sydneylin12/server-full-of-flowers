import Header from "../components/header";
import React, { ChangeEvent } from "react";
import ReactQuill from 'react-quill';
import { API_ROUTES, CHAPTER_PK } from "../constants/constants";
import { Chapter, CreateChapterPayload } from "../types/types";
import { getParam, makeRequest } from "../utils/utils";
import 'react-quill/dist/quill.snow.css';
import Loader from "../components/loader";

class Editor extends React.Component {
    // TODO: type this
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            chapterId: undefined,
            name: undefined,
            text: undefined,
            folder: undefined,
            isLoading: true
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const chapterId = getParam();

        // If no param is provided, empty the state
        // TODO: create a default value
        if (!chapterId) {
            this.setState({
                ...this.state,
                chapterId: undefined,
                name: undefined,
                text: undefined,
                folder: undefined,
                isLoading: false
            });
            return;
        }

        const chapters = await makeRequest(API_ROUTES.GET_CHAPTERS) as Chapter[];
        const chapter = chapters.find(c => c[CHAPTER_PK] === chapterId);
        this.setState({
            ...this.state,
            name: chapter?.name,
            chapterId: chapter?.chapter_id,
            text: chapter?.text,
            folder: chapter?.folder,
            isLoading: false
        });
    }

    onChangeChapterName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            name: e.target.value
        });
        console.log(this.state);
    };

    onChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            folder: e.target.value
        });
        console.log(this.state);
    };

    onChangeQuillEditor = (value: string) => {
        this.setState({
            ...this.state,
            text: value
        });
        console.log(this.state);
    };

    isDisabled = () => {
        const cleanString = this.state.text?.replace(/<[^>]*>/g, '').trim();
        return !this.state.name || !cleanString;
    }

    onClick = async () => {
        if (!this.state.name || !this.state.text) {
            console.error('Invalid state!');
            return;
        }

        const params: CreateChapterPayload = {
            name: this.state.name,
            folder: this.state.folder,
            text: this.state.text,
            'chapter_id': this.state.chapterId
        };

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        const res = await makeRequest(API_ROUTES.CREATE_CHAPTER, options);
        const newChapterId = res[CHAPTER_PK];
        
        this.setState({
            ...this.state,
            chapterId: newChapterId
        });
    };

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        }

        return (
            <>
                <Header />
                <div className="content">
                    <h1 className="page-heading">Chapter Editor</h1>
                    <div className="chapter-number-container">
                        <input placeholder="Chapter Title" className="apple-input" value={this.state.name} onChange={this.onChangeChapterName} />
                        <input placeholder="Folder*" className="apple-input" value={this.state.folder} onChange={this.onChangeFolderName} />
                    </div>
                    <ReactQuill theme="snow" value={this.state.text} onChange={this.onChangeQuillEditor} />
                    <div className="save-button-container">
                        <button className="apple-button" disabled={this.isDisabled()} onClick={this.onClick}>Save Chapter</button>
                        <span id="status-message-container"></span>
                    </div>
                </div>
            </>
        );
    }
}

export default Editor;
