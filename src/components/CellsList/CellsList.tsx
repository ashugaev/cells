import React from 'react';
import Cell, {CellData} from "../Cell";
import styles from './CellsList.module.sass';
import classnames from 'classnames';
import Text, {TextColors} from '../Text';

interface CellsListProps {
    cells: CellData[];
    className?: string;
}

const CellsList: React.FC<CellsListProps> = ({cells, className}) => {
    const cellsListClassName = classnames(className, styles.cellsList);

    if(!cells.length) {
        return (
            <Text
                className={styles.placeholder}
                text='Для начала процесса зарождения нажмите "СОТВОРИТЬ"'
                transparent
                color={TextColors.white}
             />
        )
    }
    return (
        <div className={cellsListClassName}>
            {cells.map((data) => (
                    <Cell key={data.id} {...data} className={styles.cell}/>
                    ))}
        </div>
    );
}

export default CellsList;
