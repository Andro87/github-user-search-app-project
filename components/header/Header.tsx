import React from "react";
import styles from "./Header.module.scss";
import { useState, useEffect } from "react";
import Sun from "svg/icon-sun.svg";
import Moon from "svg/icon-moon.svg";

//
export const Header: React.FunctionComponent = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [dark]);

    return (
        <div className={styles.header}>
            <h1>devfinder</h1>
            <div className={styles.switch_wrap}>
                <p> {!dark ? "DARK" : "LIGHT"}</p>
                <button
                    type="button"
                    title="switch"
                    className={styles.btn_switch}
                    onClick={() => setDark(!dark)}
                >
                    {!dark ? <Moon /> : <Sun />}
                </button>
            </div>
        </div>
    );
};
