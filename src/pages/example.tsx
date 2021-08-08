import React from 'react';
import dynamic from 'next/dynamic';
import Page from '../components/Page';
import PagePlayerContainer from '../components/PagePlayerContainer';
import { ShareType } from '../model/ShareAPIType';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), {
    ssr: false,
});

export const shareMock: ShareType = {
    id: '12345678',
    files: [
        {
            id: '4712',
            filename: 'bensound - anewbeginning (no copyright)',
            path: './bensound-anewbeginning.mp3',
        },
        {
            id: '4711',
            filename: 'Arnold Schwarzenegger trust yourself speech',
            path: './trust-yourself-arnold-schwarzenegger.mp3',
        },
        {
            id: '4713',
            filename: 'Sub Urban - Cradles [NCS Release]',
            path: 'Sub Urban - Cradles [NCS Release].mp3',
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
            <PagePlayerContainer>
                {shareMock.files.map(
                    (file) =>
                        file.path && (
                            <AudioPlayerWithoutSSR
                                key={`audio-example-${file.id}`}
                                audioPath={file.path}
                                comments={file.comments}
                                title={file.filename}
                            />
                        )
                )}
            </PagePlayerContainer>
        </Page>
    );
}
