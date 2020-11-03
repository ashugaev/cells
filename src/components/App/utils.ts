import {CellData, CellTypes} from "../Cell";

export const getRandomId = (): string => `f${(~~(Math.random() * 1e8)).toString(16)}`;

export const cellsByTypes = {
    [CellTypes.alive]: (): CellData => ({
        id: getRandomId(),
        type: CellTypes.alive,
        title: 'Живая',
        description: 'И шевелится',
    }),
    [CellTypes.dead]: (): CellData => ({
        id: getRandomId(),
        type: CellTypes.dead,
        title: 'Мёртвая',
        description: 'или прикидывается',
    }),
    [CellTypes.life]: (): CellData => ({
        id: getRandomId(),
        type: CellTypes.life,
        title: 'Жизнь',
        description: 'Ку-ку!',
    })
}

export const killCellIfLife = (arr: CellData[], index: number, increment?: boolean): CellData[] => {
    if (arr[index] && arr[index].type === CellTypes.life) {
        arr = arr.slice(0, index).concat(cellsByTypes[CellTypes.dead](), arr.slice(index + 1));
        // Если рядом есть еще одна жизнь
        return killCellIfLife(arr, index + (increment ? 1 : -1));
    } else {
        return arr;
    }
};

interface CellCounterValues {
    type: CellTypes | null;
    count: number;
}

export const validateCells = (arrWithNewCell: CellData[]): CellData[] => {
    if (arrWithNewCell.length < 2) return arrWithNewCell;

    const sameCellsCounter: CellCounterValues = {
        type: null,
        count: 0,
    };

    let sameCellsCounterPrev: CellCounterValues = {
        ...sameCellsCounter
    };

    for (let i = 0; i < arrWithNewCell.length; i++) {
        const cell: CellData = arrWithNewCell[i];

        if (sameCellsCounter.type !== cell.type) {
            sameCellsCounterPrev = {...sameCellsCounter};

            sameCellsCounter.type = cell.type;
            sameCellsCounter.count = 1;
        } else {
            sameCellsCounter.count++;
        }

        if (sameCellsCounter.type === CellTypes.alive && sameCellsCounter.count === 2) {
            arrWithNewCell = arrWithNewCell.slice(0, -2);

            const isCellBornAndDied: boolean = sameCellsCounterPrev.type === CellTypes.dead && sameCellsCounterPrev.count >= 3;

            arrWithNewCell.push(isCellBornAndDied ? cellsByTypes[CellTypes.dead]() : cellsByTypes[CellTypes.life]());

            i--;
        }

        if (sameCellsCounter.type === CellTypes.dead && sameCellsCounter.count >= 3) {
            arrWithNewCell = killCellIfLife(arrWithNewCell, i + 1, true);
            arrWithNewCell = killCellIfLife(arrWithNewCell, i - sameCellsCounter.count);
        }
    }

    return arrWithNewCell;
}

