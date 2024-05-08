import { useTheme, Theme, ThemeProvider, View, Authenticator } from "@aws-amplify/ui-react";
import React from "react";

export const CHAPTER_ID_PARAM = 'id';
export const CHAPTER_PK = 'chapter_id';

export enum API_ROUTES {
    GET_CHAPTERS = 'https://dx1glpvtl6.execute-api.us-east-2.amazonaws.com/default/getChapters',
    CREATE_CHAPTER = 'https://1t85ljppu3.execute-api.us-east-2.amazonaws.com/default/createChapter'
};
