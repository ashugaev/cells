import React, {useEffect, useRef} from 'react';
import styles from "./App.module.sass";
import Button from "../Button";
import Text, {TextColors, TextSizes} from "../Text";
import CellsList from "../CellsList";
import {useCells} from "./hooks";

const App: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<HTMLDivElement>(null);

    const [cells, addCell] = useCells();

    function scrollDown() {
        if (contentRef.current && appRef.current) {
            appRef.current.scrollTo({
                top: contentRef.current.offsetHeight,
                behavior: "smooth"
            });
        }
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
                    onClick={addCell}
                />
            </div>
        </div>
    );
}

export default App;
