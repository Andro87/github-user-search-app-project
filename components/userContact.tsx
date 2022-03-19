import React, { ReactNode } from "react";
import styles from "./userContact.module.scss";

interface Props {
    readonly contact: string;
    readonly contact_icon: ReactNode;
    readonly location?: boolean;
}

const UserContact: React.FunctionComponent<Props> = props => {
    const { contact, contact_icon, location } = props;

    function deleteFirstLetter(word) {
        if (!word) {
            return "#";
        }

        if (word.startsWith("@")) {
            let newWord = word.substring(1);
            return ` https://github.com/${newWord}`;
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
            {location ? (
                <p> {contact ? contact : "Not Available"}</p>
            ) : (
                <a href={deleteFirstLetter(contact)}>
                    {contact ? contact : "Not Available"}
                </a>
            )}
        </div>
    );
};

export default UserContact;
