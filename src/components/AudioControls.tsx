import React from 'react';
// import { ReactComponent as Play } from '../assets/play.svg';
// import { ReactComponent as Pause } from '../assets/pause.svg';

export type AudioControlsProps = {
    isPlaying: boolean;
    onPlayPauseClick: (event: any) => void;
};

const AudioControls = ({ isPlaying, onPlayPauseClick }: AudioControlsProps) => (
    <div className='audio-controls'>
        {isPlaying ? (
            <button type='button' className='pause' onClick={() => onPlayPauseClick(false)}>
                "Pause"
            </button>
        ) : (
            <button type='button' className='play' onClick={() => onPlayPauseClick(true)}>
                "Play"
            </button>
        )}
    </div>
);

export default AudioControls;
