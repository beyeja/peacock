export type ShareType = {
    id: string;
    /** TODO: implement some type of token to secure file access somewhat */
    csrfToken?: string;
    files: FileType[];
};

export type FileType = {
    id: string;
    filename: string;
    path: string;
    comments?: CommentType[];
};

export type CommentType = {
    text: string;
    atPos: number;
};
