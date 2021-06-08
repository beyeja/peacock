import React, { useEffect } from 'react';

const Backdrop = ({ activeColor, isPlaying }) => {
	useEffect(() => {
		document.documentElement.style.setProperty('--active-color', activeColor);
	}, [activeColor]);

	return <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />;
};

export default Backdrop;
