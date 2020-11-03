import React from 'react';
import styles from './Button.module.sass';
import Text, {TextColors} from "../Text";
import classnames from 'classnames';

interface ButtonProps {
    text: string;
    onClick: () => void
    className?: string;
}

const Button: React.FC<ButtonProps> = ({text, className, onClick}) => {
    const buttonClassName: string = classnames(styles.button, className)

    return (
        <button className={buttonClassName} onClick={onClick}>
            <Text text={text} color={TextColors.white}/>
        </button>
    );
}

export default Button;
