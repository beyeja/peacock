import React from 'react';
import Head from 'next/head';
import cx from 'classnames';

const Page = ({
    children,
    theme = 'black',
}: {
    children: React.ReactNode;
    theme?: 'black' | 'white';
}) => {
    return (
        <div
            className={
                'min-h-screen h-screen px-2 flex flex-col ' +
                'justify-center items-center rounded-2xl'
            }
        >
            <Head>
                <title>SoundShare</title>
                <meta name='description' content='just some app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main
                className={cx(
                    'py-2 min-h-28 w-full flex flex-1 flex-col justify-center items-center',
                    {
                        'text-white': theme === 'white',
                    }
                )}
            >
                <h1 className='m-3 text-5xl inline-block mb-4'>SoundShare</h1>
                {children}
            </main>

            <footer
                className={cx('w-full h-24 flex flex-col justify-center items-center', {
                    'text-white': theme === 'white',
                })}
            >
                the bois
            </footer>
        </div>
    );
};

export default Page;
