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
    comments: any[] | undefined;
};

const RangeSlider = ({
    duration,
    trackProgress,
    onScrubEnd,
    onChange,
    comments,
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
            {comments?.map((comment) => (
                <Comment
                    text={comment.text}
                    position={{ x: comment.atPos, y: sliderHeight }}
                />
            ))}
        </div>
    );
};

export default RangeSlider;
