import React from 'react';
import dynamic from 'next/dynamic';
import Page from '../components/Page';
import PagePlayerLayout from '../components/PagePlayerLayout';
import { ShareType } from '../model/ShareType';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), {
    ssr: false,
});

export const shareMock: ShareType = {
    id: '12345678',
    files: [
        {
            id: '123123',
            filename: 'trust-yourself-arnold-schwarzenegger',
            path: './trust-yourself-arnold-schwarzenegger.mp3',
        },
        {
            id: '123123',
            filename: 'White Stripes -- Seven Nation Army (The Glitch Mob Remix)',
            path: './White Stripes -- Seven Nation Army (The Glitch Mob Remix).mp3',
        },
        {
            id: '123123',
            filename: 'stranger-things-2-below-remix',
            path: './stranger-things-2-below-remix.mp3',
            comments: [
                {
                    text: 'hey this part is awesome',
                    atPos: 25,
                },
                {
                    text: 'Sheeeeeeeeeeeesh',
                    atPos: 34,
                },
                {
                    text: 'listen to this',
                    atPos: 66,
                },
            ],
        },
    ],
};

export default function Home() {
    return (
        <Page>
            <PagePlayerLayout>
                {shareMock.files.map((file) => (
                    <div className='mt-8'>
                        <AudioPlayerWithoutSSR
                            audioPath={file.path}
                            comments={file.comments}
                        />
                    </div>
                ))}
            </PagePlayerLayout>
        </Page>
    );
}
