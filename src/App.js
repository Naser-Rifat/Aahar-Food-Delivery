import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Pages/Homepage/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Pages/Homepage/Home/Home';
import Footer from './Pages/Homepage/Footer/Footer';
import Fooditems from './Pages/Homepage/Fooditems/Fooditems';
import AuthProvider from './Pages/AuthProvider/AuthProvider';
import Login from './Pages/Login/Login';
import FoodDetails from './Pages/FoodDetails/FoodDetails';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import Orders from './Pages/Orders/Orders';
import NotFound from './Pages/NotFound/NotFound';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/fooditems">
            <Fooditems></Fooditems>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/fooddetails/:id">
            <FoodDetails></FoodDetails>
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <Router path="*">
            <NotFound></NotFound>
          </Router>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
