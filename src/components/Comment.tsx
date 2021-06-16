import React from 'react';
import cx from 'classnames';
import styles from './Comment.module.css';

export type CommentProps = {
    text: string;
    position: { x: string | number; y: string | number };
    expand?: boolean;
};

const Comment = ({ text, position, expand }: CommentProps) => {
    return (
        <div
            className={cx('absolute transform origin-top-left rotate-45')}
            style={{
                top: position.y,
                left: position.x,
            }}
        >
            <div className={cx('absolute', styles.comment_arrow_left)}></div>
            <div className={cx('inline  ml-5', styles.comment)}>{text}</div>
        </div>
    );
};

export default Comment;
