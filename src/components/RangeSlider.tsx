import React from 'react';
import cx from 'classnames';
import Comment from './Comment';
import { useEffect, createRef } from 'react';
import styles from './RangeSlider.module.css';

export type RangeSliderProps = {
    duration: number;
    trackProgress?: number;
    onScrubEnd: (event: any) => void;
    onChange: (event: any) => void;
};

const RangeSlider = ({
    duration,
    trackProgress,
    onScrubEnd,
    onChange,
}: RangeSliderProps) => {
    const rangeRef = createRef<HTMLInputElement>();

    useEffect(() => {});
    duration = duration || 100;
    const sliderHeight = 25;
    return (
        <div className={cx(styles.slider_container, 'relative')}>
            <input
                ref={rangeRef}
                type='range'
                value={trackProgress}
                step='0.25'
                min='0'
                max={duration || 100}
                className={cx('w-full', styles.slider)}
                onChange={onChange}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
            />
            <Comment
                text='hey this part is awesome'
                position={{ x: '25%', y: sliderHeight }}
            />
            <Comment text='Sheeeeeeeeeeeesh' position={{ x: '34%', y: sliderHeight }} />
            <Comment text='listen to this' position={{ x: '66%', y: sliderHeight }} />
        </div>
    );
};

export default RangeSlider;
