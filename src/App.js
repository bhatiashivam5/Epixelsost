import UsersList from './Components/UsersList/UsersList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import UserDetails from './Components/UserDetails/UserDetails';
import DrawerAppBar from './Components/TopAppBar/DrawerAppBar';
import FavoriteUsers from './Components/FavoriteUsers/FavoriteUsers';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.BASENAME}>
        <DrawerAppBar />
        <Routes>
          <Route exact path="/" element={<UsersList />} />
          <Route exact path="/userDetails/:id" element={<UserDetails />} />
          <Route exact path="/favusers" element={<FavoriteUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
