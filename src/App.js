import { React } from "react";
import './App.css';
import './styles/theme.css'
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app__body">
        <Router>
          <Sidebar />              
          <Switch>
            <Route path="/chats/:chatId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    )}      
    </div>
  );
}

export default App;
