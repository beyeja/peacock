import React from 'react';
import Link from 'next/link';
import Page from 'src/components/Page';
import FileUpload from 'src/components/FileUpload';

export default function Home() {
    return (
        <Page theme='white'>
            <Link href='/1'>
                <a className='hover:underline'>sound 1</a>
            </Link>
            <Link href='/2'>
                <a className='hover:underline'>sound 2</a>
            </Link>
            <Link href='/3'>
                <a className='hover:underline'>sound 3</a>
            </Link>
            <div className="mt-4">
                <FileUpload redirectOnSuccess/>
            </div>
        </Page>
    );
}
