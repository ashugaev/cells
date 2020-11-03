import {useState} from 'react';
import {cellsByTypes, validateCells} from "./utils";
import {CellData, CellTypes} from "../Cell";

export const useCells = (): [cells: CellData[], addRandom: () => void] => {
    const [cells, setCells] = useState<CellData[]>([])

    const addRandomCell = (): void => {
        const randomVal: number = Math.round(Math.random());

        const newCell: CellData = randomVal ? cellsByTypes[CellTypes.dead]() : cellsByTypes[CellTypes.alive]();

        const arrWithNewCell: CellData[] = [...cells, newCell];

        const validatedCells: CellData[] = validateCells(arrWithNewCell);

        setCells(validatedCells);
    }

    return [cells, addRandomCell]
}