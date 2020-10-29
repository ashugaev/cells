import React, {FunctionComponent} from 'react';
import classnames from 'classnames';
import styles from './Text.module.sass';

export enum FontSizes {
    s = 's',
    m = 'm',
    l = 'l'
}

export enum FontColors {
    black = 'black',
    white = 'white'
}

interface TextProps {
    text: string;
    className?: string;
    color?: FontColors;
    size?: FontSizes;
    bold?: boolean,
}

const Text: FunctionComponent<TextProps> = ({
    className, text, color, size, bold,
}) => {

    const textClassName = classnames(
        className,
        {
            [styles[`size-${size}`]]: size,
            [styles[`color-${color}`]]: color,
            [styles.bold]: bold,
        });

    return (
        <span
            className={textClassName}
        >
            {text}
    </span>
    );
};

Text.defaultProps = {
    size: FontSizes.m,
};

export default Text;
