export const getEnvBackendBasePath = () => {
    return process.env.NEXT_PUBLIC_BACKEND_URL?.endsWith('/')
        ? process.env.NEXT_PUBLIC_BACKEND_URL?.slice(0, -1)
        : process.env.NEXT_PUBLIC_BACKEND_URL;
};

export const getEnvFileBasePath = () => {
    return process.env.NEXT_PUBLIC_FILESTORAGE_URL?.endsWith('/')
        ? process.env.NEXT_PUBLIC_FILESTORAGE_URL?.slice(0, -1)
        : process.env.NEXT_PUBLIC_FILESTORAGE_URL;
};
