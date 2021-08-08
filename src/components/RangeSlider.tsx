import React from 'react';
import cx from 'classnames';
import Comment from './Comment';
import { useEffect, createRef } from 'react';
import styles from './RangeSlider.module.css';
import { CommentType } from '../model/ShareAPIType';

export type RangeSliderProps = {
    duration: number;
    trackProgress?: number;
    onScrubEnd: (event: any) => void;
    onChange: (event: any) => void;
    comments?: CommentType[] | undefined;
};

/** defined slider height for comment placement */
const SLIDER_HEIGHT = 25;

const RangeSlider = ({
    duration,
    trackProgress,
    onScrubEnd,
    onChange,
    comments,
}: RangeSliderProps) => {
    const rangeRef = createRef<HTMLInputElement>();
    return (
        <div className={cx(styles.slider_container, 'relative')}>
            <input
                ref={rangeRef}
                type='range'
                value={trackProgress || 0}
                step='0.25'
                min='0'
                max={duration || 100}
                className={cx('w-full', styles.slider)}
                onChange={onChange}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
            />
            {comments &&
                comments?.map((comment, i) => (
                    <Comment
                        key={`comment-${i}-${comment.atPos}`}
                        text={comment.text}
                        position={{ x: comment.atPos + '%', y: SLIDER_HEIGHT }}
                    />
                ))}
        </div>
    );
};

export default RangeSlider;
