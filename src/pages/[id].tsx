import React from 'react';
import dynamic from 'next/dynamic';
import Page from '../components/Page';
import PagePlayerLayout from '../components/PagePlayerLayout';
import FileUpload from '../components/FileUpload';
import useFetch from 'use-http';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), {
    ssr: false,
});
export default function Home() {
    const { get, post, response, loading, error } = useFetch(
        process.env.NEXT_PUBLIC_BACKEND_URL
    );

    return (
        <Page>
            {/* proper backend data  */}
            {/* {response && (
                <PagePlayerLayout>
                    {response.files.map((file) => (
                        <AudioPlayerWithoutSSR
                            audioClip={file.path}
                            comments={file.comments}
                        />
                    ))}
                </PagePlayerLayout>
            )} */}

            {loading && <p>Loading... ༼ つ ◕_◕ ༽つ</p>}

            {typeof error === 'object' && (
                <div>
                    Error (⊙_⊙;) <br />
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </Page>
    );
}
