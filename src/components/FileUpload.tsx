import router from 'next/router';
import React from 'react';

export default function FileUpload({
    redirectOnSuccess = false,
}: {
    redirectOnSuccess?: boolean;
}) {
    const uploadFile = (file: File) => {
        if (!process.env.NEXT_PUBLIC_SQUIRREL_URL) return;

        fetch(process.env.NEXT_PUBLIC_SQUIRREL_URL, {
            method: 'POST',
            body: file,
        })
            .then((response) => response.json())
            .then((response) => {
                if (response?.creatorId) {
                    if (redirectOnSuccess) router.push(`${response?.creatorId}`);
                }
            })
            .catch((response) => {
                console.log(response);
                if (redirectOnSuccess) router.push(`${response?.creatorId}`);
            });
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files?.[0]) {
            uploadFile(event.target.files[0]);
        }
    };

    return (
        <div className='h-40 border-2 border-gray-500 border-dotted rounded-md'>
            <input type='file' name='file' onChange={onChange} multiple={false} />
        </div>
    );
}
