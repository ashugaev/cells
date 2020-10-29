import React from 'react';
import Cell, {CellData} from "../Cell";
import styles from './CellsList.module.sass';

interface CellsListProps {
    cells: CellData[];
}

const CellsList: React.FC<CellsListProps> = ({cells}) => {
    console.log(styles)
    return (
        <>
            {cells.map(data => (
                    <Cell {...data} className={styles.cell}/>
            ))}
        </>
    );
}

export default CellsList;
