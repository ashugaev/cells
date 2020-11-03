import React, {useEffect, useState} from 'react';
import styles from "./App.module.sass";
import Button from "../Button";
import Text, {TextColors, TextSizes} from "../Text";
import CellsList from "../CellsList";
import {CellData, CellTypes} from '../Cell';
import {cellsByTypes} from './utils';

function killCellIfLife(arr: CellData[], index: number): void {
    if(arr[index] && arr[index].type === CellTypes.life) {
        arr = arr.slice(0, index - 1).concat(arr.slice(index));
        // Рекурсивная проверка на то, что радом с этой жизнь не было еще одной
        killCellIfLife(arr, index - 1);
    }
};

function App() {
    const [cells, setCells] = useState<CellData[]>([])
    const contentRef = React.useRef<HTMLDivElement>(null);
    const appRef = React.useRef<HTMLDivElement>(null);

    const addRandomCell = () => {
        const randomVal = Math.round(Math.random());

        const newCell = randomVal ? cellsByTypes[CellTypes.dead]() : cellsByTypes[CellTypes.alive]();

        const arrWithNewCell = [...cells, newCell];

        const validatedCells = validateCells(arrWithNewCell);

        setCells(validatedCells);
    }

    function scrollDown() {
        if (contentRef.current && appRef.current) {
            appRef.current.scrollTo({
                top: contentRef.current.offsetHeight,
                behavior: "smooth"
            });
        }
    }

    const validateCells = (arrWithNewCell: CellData[]) => {
        if (arrWithNewCell.length < 2) return arrWithNewCell;

        const sameCellsCounter:{type: CellTypes | null, count: number} = {
            type: null,
            count: 0,
        };

        const validatedCellsArr = arrWithNewCell.reduce((acc: CellData[], cell: CellData) => {
            acc.push(cell);

            if(sameCellsCounter.type !== cell.type) {
                if(sameCellsCounter.type === CellTypes.alive && sameCellsCounter.count === 2) {
                    acc = acc.slice(0, -2);
                    acc.push(cellsByTypes[CellTypes.life]());
                }

                if(sameCellsCounter.type === CellTypes.dead && sameCellsCounter.count === 3) {
                    killCellIfLife(acc, acc.length - 4)
                }

                sameCellsCounter.type = cell.type;
                sameCellsCounter.count = 1;
            } else {
                sameCellsCounter.count++;
            }

            return acc;
        }, [])

        return validatedCellsArr;
    }

    useEffect(() => {
        scrollDown();
    }, [cells])

    return (
        <div
            className={styles.app}
            ref={appRef}
        >
            <div
                className={styles.content}
                ref={contentRef}
            >
                <Text
                    text="Клеточное наполнение"
                    color={TextColors.white}
                    className={styles.title}
                    bold
                    size={TextSizes.l}
                />
                <CellsList className={styles.cellsList} cells={cells}/>
                <Button
                    text="СОТВОРИТЬ"
                    className={styles.button}
                    onClick={addRandomCell}
                />
            </div>
        </div>
    );
}

export default App;
