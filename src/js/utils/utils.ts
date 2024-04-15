import { CHAPTER_QUERY_PARAM } from "../constants/constants";

export const wait = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const hasQueryParam = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.has(CHAPTER_QUERY_PARAM);
};

export const getQueryParam = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(CHAPTER_QUERY_PARAM) || undefined;
};

export const constructQueryParam = (chapterId: String) => {
	return `?chapter=${chapterId}`;
};

// Bug: webpack executes all code on all pages
export const isPage = (pageName: string) => {
    return window.location.href.includes(pageName);
};

export const makeRequest = async(url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    return await response.json();
;}