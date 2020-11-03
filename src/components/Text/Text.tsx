import React from 'react';
import classnames from 'classnames';
import styles from './Text.module.sass';

export enum TextSizes {
    s = 's',
    l = 'l'
}

export enum TextColors {
    black = 'black',
    white = 'white'
}

interface TextProps {
    text: string;
    className?: string;
    color?: TextColors;
    size?: TextSizes;
    bold?: boolean,
    transparent?: boolean
}

const Text: React.FC<TextProps> = ({
    className, text, color, size, bold, transparent, children
}) => {

    const textClassName = classnames(
        className,
        {
            [styles[`size_${size}`]]: size,
            [styles[`color_${color}`]]: color,
            [styles.bold]: bold,
            [styles.transparent]: transparent,
        });

    return (
        <span
            className={textClassName}
        >
            {text || children}
    </span>
    );
};

Text.defaultProps = {
    size: TextSizes.s,
};

export default Text;
