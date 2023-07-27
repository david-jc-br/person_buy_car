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
import LoginPage from './pages/LoginPage';
import MainAdmin from './pages/MainAdminPage';
import MainUser from './pages/MainUserPage';
import MyCars from './pages/MyCarsPage';
import Cars from './pages/CarsPage';
import BuyCar from './pages/BuyCarPage';
import People from './pages/PeoplePage';
import AddCar from './pages/AddCarPage';
import DeleteCar from './pages/DeleteCarPage';
import UpdateCar from './pages/UpdateCarPage';
import ListCar from './pages/ListCarPage';
import DeletePerson from './pages/DeletePersonPage';
import UpadatePerson from './pages/UpdatePersonPage';
import ProfilePerson from './pages/ProfilePersonPage';
import ListPeople from './pages/ListPeoplePage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/home" exact={true}>
          <HomePage />
        </Route>
        <Route path="/signUp" exact={true}>
          <SignUpPage />
        </Route>
        <Route path="/login/" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/mainUser/:cpf" exact={true}>
          <MainUser />
        </Route>
        <Route path="/mainAdmin/:cpf" exact={true}>
          <MainAdmin />
        </Route>
        <Route path="/buyCar/:cpf" exact={true}>
          <BuyCar />
        </Route>
        <Route path="/profile/:cpf" exact={true}>
          <ProfilePerson />
        </Route>
        <Route path="/myCars/:cpf" exact={true}>
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
        <Route path="/updatePerson/:cpf" exact={true}>
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
