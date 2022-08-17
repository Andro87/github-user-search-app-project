import React, { ReactNode } from "react";
import styles from "./UserContact.module.scss";

interface Props {
    readonly contact: string;
    readonly contact_icon: ReactNode;
    readonly isNotLink?: boolean;
    readonly twitter?: boolean;
}

export const UserContact: React.FunctionComponent<Props> = props => {
    const { contact, contact_icon, isNotLink, twitter } = props;

    function getContact(word) {
        if (!word) {
            return "#";
        }

        if (word.startsWith("@")) {
            let newWord = word.substring(1);
            return ` https://github.com/${newWord}`;
        }
        if (twitter) {
            return `https://twitter.com/${word}`;
        }

        return word;
    }
    return (
        <div
            className={`${styles.contact}  ${
                !contact ? styles.contact_not : null
            }`}
        >
            {contact_icon}
            {isNotLink ? (
                <p> {contact ? contact : "Not Available"}</p>
            ) : (
                <a href={getContact(contact)}>
                    {contact ? contact : "Not Available"}
                </a>
            )}
        </div>
    );
};
