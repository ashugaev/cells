import {CellData, CellTypes} from "../Cell";

export const getRandomId = () => `f${(~~(Math.random()*1e8)).toString(16)}`;

export const cellsByTypes = {
    [CellTypes.alive]: () => ({
            id: getRandomId(),
            type: CellTypes.alive,
            title: 'Живая',
            description: 'И шевелится',
    }),
    [CellTypes.dead]: () => ({
        id: getRandomId(),
        type: CellTypes.dead,
        title: 'Мёртвая',
        description: 'или прикидывается',
    }),
    [CellTypes.life]: () => ({
        id: getRandomId(),
        type: CellTypes.life,
        title: 'Жизнь',
        description: 'Ку-ку!',
    })
}

export const killCellIfLife = (arr: CellData[], index: number): void => {
    if(arr[index] && arr[index].type === CellTypes.life) {
        arr = arr.slice(0, index - 1).concat(arr.slice(index));
        // Если рядом есть еще одна жизнь
        killCellIfLife(arr, index - 1);
    }
};

export const validateCells = (arrWithNewCell: CellData[]): CellData[] => {
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

