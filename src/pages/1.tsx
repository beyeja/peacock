import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'src/components/Page';
import PagePlayerLayout from 'src/components/PagePlayerLayout';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), {
    ssr: false,
});

export default function Home() {
    return (
        <Page>
            <PagePlayerLayout>
                <AudioPlayerWithoutSSR
                    audioClip={
                        './White Stripes -- Seven Nation Army (The Glitch Mob Remix).mp3'
                    }
                />
            </PagePlayerLayout>
        </Page>
    );
}
