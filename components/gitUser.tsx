import React, { useEffect, useState } from "react";
import styles from "./gitUser.module.scss";
import { useForm } from "react-hook-form";
import Search from "../svg/icon-search.svg";
import Location from "../svg/icon-location.svg";
import Website from "../svg/icon-website.svg";
import Twitter from "../svg/icon-twitter.svg";
import Company from "../svg/icon-company.svg";
import UserContact from "./userContact";

//1.An Interface that describes what is in the response

interface User {
    readonly login: string;
    readonly id: number;
    readonly node_id: string;
    readonly avatar_url: string;
    readonly gravatar_id: string;
    readonly url: string;
    readonly html_url: string;
    readonly followers_url: string;
    readonly following_url: string;
    readonly gists_url: string;
    readonly starred_url: string;
    readonly subscriptions_url: string;
    readonly organizations_url: string;
    readonly repos_url: string;
    readonly events_url: string;
    readonly received_events_url: string;
    readonly type: string;
    readonly site_admin: boolean;
    readonly name: string;
    readonly company: string;
    readonly blog: string;
    readonly location: string;
    readonly email: string;
    readonly hireable: boolean;
    readonly bio: string;
    readonly twitter_username: string;
    readonly public_repos: number;
    readonly public_gists: number;
    readonly followers: number;
    readonly following: number;
    readonly created_at: string;
    readonly updated_at: string;
}

//2.A function to fetch the data from the api.
//    this function should take an username and should return a promise with the 'User' model.

const getUser = (username: string): Promise<User> => {
    return fetch(`https://api.github.com/users/${username}`).then(res => {
        if (!res.ok) {
            throw Error("No results");
        }
        return res.json();
    });
};

//3.The component. It needs to have the user stored in a state, and whether it is loading or not in a state

const GitUser: React.FunctionComponent = () => {
    const [user, setUser] = useState<User>();
    const [busy, setBusy] = useState(true); // Initial state to true because there is no 'user' data on load
    const [error, setError] = useState<Error>();
    const { register, handleSubmit } = useForm();
    //See '4', for this useEffect.

    useEffect(() => {
        getUser("octocat")
            .then(user => setUser(user))
            .catch(error => setError(error))
            .finally(() => setBusy(false));
    }, []);

    useEffect(() => {
        if (typeof user !== "undefined") {
            setError(undefined);
        }
    }, [user]);
    if (busy) {
        return <p> Loading...</p>;
    }

    function getDate(date: string | number | Date) {
        return new Date(date).toLocaleDateString("eu", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }
    return (
        <>
            <form
                className={styles.search_box}
                onSubmit={handleSubmit(data => {
                    setBusy(true);
                    console.log(user);
                    getUser(data.gitUser)
                        .then(user => setUser(user))
                        .catch(error => {
                            console.log(error);
                            setError(error);
                        })
                        .finally(() => setBusy(false));
                })}
            >
                <Search />
                <input
                    aria-label="gitUser"
                    type="text"
                    className={styles.input_search}
                    placeholder="Search GitHub user name..."
                    {...register("gitUser")}
                />
                {error ? (
                    <p className={styles.error_message}>{error.message}</p>
                ) : null}
                <button
                    type="submit"
                    title="search"
                    className={styles.btn_search}
                >
                    Search
                </button>
            </form>
            <div className={styles.user_box}>
                <div className={styles.user_box_wrap}>
                    <div className={styles.user_info_wrap}>
                        <img src={user.avatar_url} alt="avatar" />
                        <div className={styles.user_info}>
                            <h2>{user.name ? user.name : user.login}</h2>
                            <p className={styles.user_login}>@{user.login}</p>
                            <p className={styles.user_join}>
                                Joined {getDate(user.created_at)}
                            </p>
                        </div>
                    </div>
                    <p
                        className={`  ${styles.user_bio}  ${
                            !user.bio ? styles.user_no_bio : null
                        }`}
                    >
                        {user.bio ? user.bio : "This profile has no bio"}
                    </p>
                    <div className={styles.user_gitinfo}>
                        <div className={styles.git_info}>
                            <h3>Repos</h3>
                            <p>{user.public_repos}</p>
                        </div>

                        <div className={styles.git_info}>
                            <h3>Followers</h3>
                            <p>{user.followers}</p>
                        </div>

                        <div className={styles.git_info}>
                            <h3>Following</h3>
                            <p>{user.following}</p>
                        </div>
                    </div>
                    <div className={styles.user_detail}>
                        <div className={styles.detail_wrap}>
                            <UserContact
                                contact={user.location}
                                contact_icon={<Location />}
                                location={true}
                            />
                            <UserContact
                                contact={user.blog}
                                contact_icon={<Website />}
                            />
                        </div>
                        <div className={styles.detail_wrap}>
                            <UserContact
                                twitter={true}
                                contact={user.twitter_username}
                                contact_icon={<Twitter />}
                            />
                            <UserContact
                                contact={user.company}
                                contact_icon={<Company />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GitUser;

//4.The first thing we want to do is load something when it first renders, so for this we add a useEffect().
//What it does: when the componet first renders it runs what's in the useEffect. This calls the function 'getUser'
//and then set user to the response. After this it sets 'busy' to false.

//5. add the form with the button. (I use react-hook-form)
