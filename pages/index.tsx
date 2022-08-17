import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { Header, GitUser } from "components";

export default function Home() {
    return (
        <div className={styles.main_container}>
            <Head>
                <title>GitHub user search app </title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/images/favicon-32x32.png" />
            </Head>

            <main className={styles.main}>
                <Header />
                <GitUser />
            </main>
        </div>
    );
}
