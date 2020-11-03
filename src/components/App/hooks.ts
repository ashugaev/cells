import {useState} from 'react';
import {cellsByTypes, validateCells} from "./utils";
import {CellData, CellTypes} from "../Cell";

export const useCells = ():[cells: CellData[], addRandom: () => void] => {
    const [cells, setCells] = useState<CellData[]>([])

    const addRandomCell = (): void => {
        const randomVal = Math.round(Math.random());

        const newCell = randomVal ? cellsByTypes[CellTypes.dead]() : cellsByTypes[CellTypes.alive]();

        const arrWithNewCell = [...cells, newCell];

        const validatedCells = validateCells(arrWithNewCell);

        setCells(validatedCells);
    }

    return [cells, addRandomCell]
}