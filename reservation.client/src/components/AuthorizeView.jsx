import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext({});


function AuthorizeView(props) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true); // add a loading state
    let emptyuser = { email: "" };

    const [user, setUser] = useState(emptyuser);


    useEffect(() => {
        fetch("/api/auth/pingauth", {
            method: "GET",
        }).then(async response => {
            if (response.status == 200) {
                console.log("Authorized", response);
                let j = await response.json();
                setUser({ email: j.email });
                setAuthorized(true);
                return response; // return the response
            } else if (response.status == 401) {
                console.log("Unauthorized");
                return response; // return the response
            } else {
                // throw an error to trigger the catch block
                throw new Error("" + response.status);
            }
        })
        .catch((error) => {
            // handle the final error
            console.log(error.message);
        })
        .finally(() => {
            setLoading(false);  // set loading to false when the fetch is done
        });
    }, []);


    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }
    else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/login" />
                </>
            )
        }
    }

}

export function AuthorizedUser(props) {
    // Consume the username from the UserContext
    const user = React.useContext(UserContext);

    // Display the username in a h1 tag
    if (props.value == "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;