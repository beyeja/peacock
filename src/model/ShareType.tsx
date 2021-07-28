export type ShareType = {
    id: string;
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
