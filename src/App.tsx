import { useEffect, useState } from "react";
import { AppRouter } from "./Routes/Router"
import { UserInterface } from "./interfaces/user.interface";
import { onAuthStateChanged } from "firebase/auth";
import { db, firebaseAuth } from "./Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const App = () => {

    const [init, setInit] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObj, setUserObj] = useState<UserInterface | null>(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                const q = query(
                    collection(db, "users"),
                    where("uid", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setUserObj({
                        uid: data.uid,
                        email: data.email,
                        nickname: data.nickname,
                        date_created: data.date_created,
                        pfp:user.photoURL!
                    });
                });
                setIsLoggedIn(true);
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ?
                <AppRouter
                    isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userObj={userObj} />
                : <div className="loader"><img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" /></div>
            }
        </>
    );
}

export default App;