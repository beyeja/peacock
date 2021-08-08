import React from 'react';

export type AudioControlsProps = {
    isPlaying: boolean;
    onPlayPauseClick: (event: any) => void;
};

const AudioControls = ({ isPlaying, onPlayPauseClick }: AudioControlsProps) => (
    <div className='inline-block'>
        {isPlaying ? (
            // 'Pause'
            <button
                type='button'
                className='w-3 focus:outline-none'
                onClick={() => onPlayPauseClick(false)}
            >
                <img className='' style={{ height: 10 }} src={'./pause.svg'} alt='hey' />
            </button>
        ) : (
            // "Play"
            <button
                type='button'
                className='w-3 focus:outline-none'
                onClick={() => onPlayPauseClick(true)}
            >
                <img className='' style={{ height: 10 }} src={'./play.svg'} alt='hey' />
            </button>
        )}
    </div>
);

export default AudioControls;
