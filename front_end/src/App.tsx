import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Pages
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/LoginPage';
import MainAdmin from './pages/MainAdminPage';
import MainUser from './pages/MainUserPage';
import MyCars from './pages/MyCarsPage';
import Cars from './pages/CarsPage';
import BuyCar from './pages/BuyCarPage';
import People from './pages/PeoplePage';
import ProfileUser from './pages/ProfileUserPage';
import ProfileAdmin from './pages/ProfileAdminPage';
import AddCar from './pages/AddCarPage';
import DeleteCar from './pages/DeleteCarPage';
import UpdateCar from './pages/UpdateCarPage';
import ListCar from './pages/ListCarPage';
import DeletePerson from './pages/DeletePersonPage';
import UpadatePerson from './pages/UpdatePersonPage';
import ListPeople from './pages/ListPeoplePage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route  path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/home" exact={true}>
          <HomePage />
        </Route>
        <Route path="/signUp" exact={true}>
          <SignUpPage />
        </Route>
        <Route path="/loginIn" exact={true}>
          <SignInPage />
        </Route>
        <Route path="/mainUser" exact={true}>
          <MainUser />
        </Route>
        <Route path="/mainAdmin" exact={true}>
          <MainAdmin />
        </Route>
        <Route path="/buyCar" exact={true}>
          <BuyCar />
        </Route>
        <Route path="/profileAdmin" exact={true}>
          <ProfileAdmin />
        </Route>
        <Route path="/profileUser" exact={true}>
          <ProfileUser />
        </Route>
        <Route path="/myCars" exact={true}>
          <MyCars />
        </Route>
        <Route path="/cars" exact={true}>
          <Cars />
        </Route>
        <Route path="/people" exact={true}>
          <People />
        </Route>
        <Route path="/addCar" exact={true}>
          <AddCar />
        </Route>
        <Route path="/deleteCar" exact={true}>
          <DeleteCar />
        </Route>
        <Route path="/updateCar" exact={true}>
          <UpdateCar />
        </Route>
        <Route path="/listCar" exact={true}>
          <ListCar />
        </Route>
        <Route path="/deletePerson" exact={true}>
          <DeletePerson />
        </Route>
        <Route path="/updatePerson" exact={true}>
          <UpadatePerson />
        </Route>
        <Route path="/listPeople" exact={true}>
          <ListPeople />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
