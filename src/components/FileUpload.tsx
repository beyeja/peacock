/* eslint-disable no-console */
import router from 'next/router';
import React from 'react';
import { ShareType } from 'src/model/ShareAPIType';
import { getEnvBackendBasePath } from 'src/utils/envUtils';
import useFetch from 'use-http';

export type FileUploadProps = {
    /** redirect to newly created "share"-view on upload success */
    redirectOnSuccess?: boolean;
};

const FileUpload = ({ redirectOnSuccess = false }: FileUploadProps) => {
    const backendPath = getEnvBackendBasePath();
    const { post, loading, error, data } = useFetch<ShareType>(`${backendPath}`, {
        mode: 'cors',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Access-Control-Allow-Origin': '*',
        //     Accept: '*/*',
        //     'Accept-Encoding': 'gzip, deflate',
        // },
    });

    const uploadFile = (file: File) => {
        if (!backendPath) return;

        const data = new FormData();
        data.append('file', file);
        post('/', data);
    };

    if (data) console.debug('data: ', JSON.stringify(data));
    if (error) console.warn('error while uploading audio file: ', error.stack);

    // direct user directly to detail-"share"-view after first successful upload
    if (data?.id) {
        if (redirectOnSuccess) router.push(`${data.id}`);
    }

    const onFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            uploadFile(event.target.files[0]);
        }
    };

    return (
        <>
            {!loading ? (
                <div className='h-40 border-2 border-gray-500 border-dotted rounded-md'>
                    <input
                        type='file'
                        name='file'
                        onChange={onFileDrop}
                        multiple={false}
                    />
                </div>
            ) : (
                <p>Loading share... ༼ つ ◕_◕ ༽つ</p>
            )}

            {error && (
                <div className='text-center'>
                    <p>Error (⊙_⊙;) </p>
                    <pre className='text-xs'>{error.message}</pre>
                </div>
            )}
        </>
    );
};

export default FileUpload;
