import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React , {useEffect, useState} from "react";
import PrivateRoute from "./components/PrivateRoute";

export const userContext = React.createContext();

function App(props) {
    const[userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const updateUserData = (action)=>{
        switch(action.type){
            case "LOGOUT":
                setUserData(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserData(action.payload);
                break;
            default:
                break;
        }
    }
    useEffect(()=>{
        setUserData(JSON.parse(localStorage.getItem("user_data")));
        setLoading(false)
    },[])
    return loading? (<h1>Loading</h1>): (
        <div>
            <userContext.Provider value={{userData, updateUserData}}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Places} />
                        <Route path="/auth/login/" exact component={Login} />
                        <Route path="/auth/create/" exact component={Signup} />
                        <PrivateRoute path="/place/:id" component={Place} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </userContext.Provider>
           
        </div>
    );
}

export default App;
