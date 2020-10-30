import React from 'react';
import styles from './Button.module.sass';
import Text, {TextColors, TextSizes} from "../Text";
import classnames from 'classnames';

interface ButtonProps {
    text: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({text, className}) => {
    const buttonClassName = classnames(styles.button, className)

    return (
        <button className={buttonClassName}>
            <Text size={TextSizes.s} text={text} color={TextColors.white} />
        </button>
    );
}

export default Button;
