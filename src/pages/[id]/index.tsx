import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'src/components/Page';
import PagePlayerLayout from 'src/components/PagePlayerLayout';
import FileUpload from 'src/components/FileUpload';
import useFetch from 'use-http';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../../components/AudioPlayer'), {
    ssr: false,
});

export const shareMock = {
    id: 12345678,
    files: [
        {
            path: './trust-yourself-arnold-schwarzenegger.mp3',
        },
        {
            path: './White Stripes -- Seven Nation Army (The Glitch Mob Remix).mp3',
        },
        {
            path: './stranger-things-2-below-remix.mp3',
            comments: [
                {
                    text: 'hey this part is awesome',
                    atPos: '25%',
                },
                {
                    text: 'Sheeeeeeeeeeeesh',
                    atPos: '34%',
                },
                {
                    text: 'listen to this',
                    atPos: '66%',
                },
            ],
        },
    ],
};

export default function Home() {
    const { get, post, response, loading, error } = useFetch(
        process.env.NEXT_PUBLIC_SQUIRREL_URL
    );

    return (
        <Page>
            <FileUpload />

            {/* mock only  */}
            <PagePlayerLayout>
                {shareMock.files.map((file) => (
                    <AudioPlayerWithoutSSR
                        audioClip={file.path}
                        comments={file.comments}
                    />
                ))}
            </PagePlayerLayout>

            {/* proper backend data  */}
            {/* {response && (
                <PagePlayerLayout>
                    {shareMock.files.map((file) => (
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
