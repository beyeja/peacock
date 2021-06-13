import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import randomColor from 'randomcolor';
import AudioControls from './AudioControls';
import Backdrop from './Backdrop';
import styles from './RangeSlider.module.css';


const audioSample = '/trust-yourself-arnold-schwarzenegger.mp3';

export const getLocationOnProgressBar = (duration, progressTime) => {
	return duration ? (progressTime / duration) * 100 : 0;
}

const AudioPlayer = () => {
	// State
	const [trackProgress, setTrackProgress] = useState(0);
	// autoplay without mute and user interaction is not allowed by modern browsers
	const [isPlaying, setIsPlaying] = useState(false);
	const [startedAutomatically, setStartedAutomatically] = useState(true);
	const [color] = useState(randomColor({luminosity: 'light'}));
	// Refs
	const audio = new Audio(audioSample);
	const audioRef = useRef(audio);
	const updateIntervalRef = useRef();
	// const isReady = useRef(false);

	const { query: params } = useRouter();
	const startTime = params.t;
	const stopTime = params.s; 

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

		updateIntervalRef.current = setInterval(() => {
			setTrackProgress(audioRef.current.currentTime);
			if (/*startedAutomatically &&*/ stopTime && audioRef.current.currentTime >= stopTime )
				setIsPlaying(false);
		}, [500]);
	};

	const onScrub = (value) => {
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
		<div className='audio-player'>
			<div className='track-info'>
				{/* <h2 className="title">{title}</h2>
				<h3 className="artist">{artist}</h3> */}
				<AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
				<div className={cx(styles.slider_container)}>
					<input
						type='range'
						value={trackProgress}
						step='0.25'
						min='0'
						max={duration || 100}
						className={cx(
							styles.slider
						)}
						onChange={(e) => onScrub(e.target.value)}
						onMouseUp={onScrubEnd}
						onKeyUp={onScrubEnd}
					/>
				</div>
			</div>

			<Backdrop activeColor={color} isPlaying={isPlaying} />
		</div>
	);
};

export default AudioPlayer;
