import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import Backdrop from './Backdrop';

const audioSample = '/trust-yourself-arnold-schwarzenegger.mp3';

const AudioPlayer = () => {
	// State
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	// Refs
	const audioRef = useRef(new Audio(audioSample));
	const intervalRef = useRef();
	const isReady = useRef(false);

	// Destructure for conciseness
	const { duration } = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
	const trackStyling = `
		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
	`;

	// timer to autoplay next track and update progress bar
	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setTrackProgress(audioRef.current.currentTime);
		}, [1000]);
	};

	const onScrub = (value) => {
		// Clear any timers already running
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	// play state change
	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	// only on init
	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<div className='audio-player'>
			<div className='track-info'>
				{/* <h2 className="title">{title}</h2>
				<h3 className="artist">{artist}</h3> */}
				<AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
				<input
					type='range'
					value={trackProgress}
					step='1'
					min='0'
					max={duration || `${duration}`}
					className='progress'
					onChange={(e) => onScrub(e.target.value)}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					style={{ background: trackStyling }}
				/>
			</div>
			<Backdrop activeColor='#5f9fff' isPlaying={isPlaying} />
		</div>
	);
};

export default AudioPlayer;
