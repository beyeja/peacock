import React from 'react';
import Link from 'next/link';
import Page from '../components/Page';
import FileUpload from '../components/FileUpload';

export default function Home() {
    return (
        <Page theme='white'>
            <div className='mt-4'>
                <FileUpload redirectOnSuccess />
            </div>

            <Link href='/example'>
                <a className='mt-32 text-lg hover:underline'>&gt; Example &lt;</a>
            </Link>
        </Page>
    );
}
