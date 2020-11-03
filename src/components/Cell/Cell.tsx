import React, {FunctionComponent} from 'react';
import Text, {TextSizes} from "../Text";
import classnames from 'classnames';
import styles from './Cell.module.sass';

export enum CellTypes {
    dead= 'dead',
    alive = 'alive',
    life = 'life'
}

export interface CellData {
    id: string;
    type: CellTypes;
    title: string;
    description: string;
}

interface CellProps extends CellData {
    className?: string;
}

const Cell:FunctionComponent<CellProps> = ({type, title, description, className}) => {
    const iconClassName = classnames(styles.icon, styles[`icon_${CellTypes[type]}`]);
    const cellClassName = classnames(styles.cell, className);

    return (
       <div className={cellClassName}>
           <div className={iconClassName} />
           <div className={styles.textContent}>
               <Text text={title} className={styles.title} size={TextSizes.l} bold/>
               <Text text={description} className={styles.description}/>
           </div>
       </div>
    );
}

export default Cell;
