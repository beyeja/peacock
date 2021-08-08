/* eslint-disable no-console */
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import useFetch from 'use-http';
import { useRouter } from 'next/router';
import { ShareType } from 'src/model/ShareAPIType';
import { getEnvBackendBasePath, getEnvFileBasePath } from 'src/utils/envUtils';
import PagePlayerContainer from '../components/PagePlayerContainer';
import Page from '../components/Page';

// load audio player lazily only on client side execution
const AudioPlayerWithoutSSR = dynamic(() => import('../components/AudioPlayer'), {
    ssr: false,
});
export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const { get, loading, error, data } = useFetch<ShareType>(
        getEnvBackendBasePath(),
        {}
    );

    // fetch "share" data once id is read from query and always when id changes
    useEffect(() => {
        if (id != null) get(`/${id}`);
    }, [id]);

    if (data) console.debug('data: ', JSON.stringify(data));
    if (error) console.warn('error while fetching share: ', error.stack);
    return (
        <Page>
            {data && (
                <PagePlayerContainer>
                    {data?.files?.map(
                        (file) =>
                            file.path && (
                                <AudioPlayerWithoutSSR
                                    key={`audio-${id}-${file.id}`}
                                    title={file.filename}
                                    audioPath={`${getEnvFileBasePath()}/${file.path}`}
                                />
                            )
                    )}
                </PagePlayerContainer>
            )}

            {loading && <p>Loading share... ༼ つ ◕_◕ ༽つ</p>}
            {error && (
                <div className='text-center'>
                    <p>Error (⊙_⊙;) </p>
                    <pre className='text-xs'>{error.message}</pre>
                </div>
            )}
        </Page>
    );
}
