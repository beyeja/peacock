import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), { ssr: false });

export default function Home() {
    return (
        <div className='min-h-screen h-screen px-2 flex flex-col justify-center items-center'>
            <Head>
                <title>SoundShare</title>
                <meta name='description' content='just some app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='py-2 min-h-28 w-full border-t border-gray-200 flex flex-1 flex-col justify-center items-center'>
                <h1 className='m-3 text-5xl inline-block'>SoundShare</h1>

                <Link href='/1'>
                    <a>Lets go</a>
                </Link>
            </main>

            <footer className='w-full h-24 border-t border-gray-200 flex flex-col justify-center items-center'>
                the bois
            </footer>
        </div>
    );
}