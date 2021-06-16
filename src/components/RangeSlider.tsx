import React from 'react';
import cx from 'classnames';
import styles from './RangeSlider.module.css';

export type RangeSliderProps = {
    duration: number;
    trackProgress?: number;
    onScrubEnd: (event: any) => void;
    onChange: (event: any) => void;
};

const RangeSlider = ({ duration, trackProgress, onScrubEnd, onChange }: RangeSliderProps) => {
    return (
        <div className={cx(styles.slider_container)}>
            <input
                type='range'
                value={trackProgress}
                step='0.25'
                min='0'
                max={duration || 100}
                className={cx(styles.slider)}
                onChange={onChange}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
            />
        </div>
    );
};

export default RangeSlider;
