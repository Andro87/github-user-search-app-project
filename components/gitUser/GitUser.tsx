import React, { useEffect, useState } from "react";
import styles from "./GitUser.module.scss";
import { useForm } from "react-hook-form";
import Search from "svg/icon-search.svg";
import Location from "svg/icon-location.svg";
import Website from "svg/icon-website.svg";
import Twitter from "svg/icon-twitter.svg";
import Company from "svg/icon-company.svg";
import { UserContact } from "components";
import User from "model/User";

//1.An Interface that describes what is in the response (User)

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

export const GitUser: React.FunctionComponent = () => {
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
                                isNotLink
                            />
                            <UserContact
                                contact={user.blog}
                                contact_icon={<Website />}
                            />
                        </div>
                        <div className={styles.detail_wrap}>
                            <UserContact
                                twitter
                                contact={user.twitter_username}
                                contact_icon={<Twitter />}
                            />
                            <UserContact
                                contact={user.company}
                                contact_icon={<Company />}
                                isNotLink
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

//4.The first thing we want to do is load something when it first renders, so for this we add a useEffect().
//What it does: when the componet first renders it runs what's in the useEffect. This calls the function 'getUser'
//and then set user to the response. After this it sets 'busy' to false.

//5. add the form with the button. (I use react-hook-form)
