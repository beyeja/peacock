import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import randomColor from 'randomcolor';
import { CommentType } from 'src/model/ShareAPIType';
import AudioControls from './AudioControls';
import Backdrop from './Backdrop';
import RangeSlider from './RangeSlider';

export const getLocationOnProgressBar = (duration: number, progressTime: number) => {
    return duration ? (progressTime / duration) * 100 : 0;
};

export type AudioPlayerProps = {
    // path to audio file
    audioPath: string;
    // title of file when provided by backend. Player uses partial path when not provided.
    title?: string | undefined;
    // list of comments to be displayed on audio slider
    comments?: CommentType[] | undefined;
};

const AudioPlayer = ({ audioPath, title, comments }: AudioPlayerProps) => {
    // State
    const [trackProgress, setTrackProgress] = useState(0);
    // autoplay without mute and user interaction is not allowed by modern browsers
    const [isPlaying, setIsPlaying] = useState(false);
    const [startedAutomatically, setStartedAutomatically] = useState(true);
    const [color] = useState(randomColor({ luminosity: 'light' }));
    // Refs
    const audio = new Audio(audioPath);
    const audioRef = useRef(audio);
    const updateIntervalRef = useRef();
    // const isReady = useRef(false);

    const { query: params } = useRouter();
    const startTime: number = params.t as unknown as number;
    const stopTime: number = params.s as unknown as number;

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const currentPercentage = getLocationOnProgressBar(duration, trackProgress);
    const trackStyling = `
		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}%, #fff), color-stop(${currentPercentage}%, #777))
	`;
    // timer to autoplay next track and update progress bar
    const startUpdateInterval = () => {
        // Clear any timers already running
        clearInterval(updateIntervalRef.current);

        // updateIntervalRef.current = setInterval(() => {
        //     setTrackProgress(audioRef.current.currentTime);
        //     if (
        //         /*startedAutomatically &&*/ stopTime &&
        //         audioRef.current.currentTime >= stopTime
        //     )
        //         setIsPlaying(false);
        // }, [500]);
    };

    const onScrub = (value: any) => {
        // Clear any timers already running
        clearInterval(updateIntervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startUpdateInterval();
        setStartedAutomatically(false);
    };

    // play state change
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startUpdateInterval();
            setStartedAutomatically(false);
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // only on init
    useEffect(() => {
        if (startTime) {
            audioRef.current.currentTime = startTime;
            setStartedAutomatically(true);
        }

        setTrackProgress(startTime);
        startUpdateInterval();

        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(updateIntervalRef.current);
        };
    }, []);

    return (
        <div>
            <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
            <div className='text-sm inline-block leading-4 ml-1'>
                {title ||
                    audioPath?.substr(
                        audioPath?.lastIndexOf('/') + 1,
                        audioPath?.lastIndexOf('.') - 2
                    ) ||
                    audioPath}
            </div>
            <RangeSlider
                duration={duration}
                trackProgress={trackProgress}
                onScrubEnd={onScrubEnd}
                onChange={(e) => onScrub(e?.target?.value)}
                comments={comments}
            />
            <Backdrop activeColor={color} isPlaying={isPlaying} />
        </div>
    );
};

export default AudioPlayer;
