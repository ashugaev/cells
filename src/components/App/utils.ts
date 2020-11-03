import {CellTypes} from "../Cell";

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
