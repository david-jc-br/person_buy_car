import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { person, car, bag, logOut } from 'ionicons/icons';

//Components
import Footer from '../components/FooterComponent';

//Style
import './css/MainPage.css'

const MainUser: React.FC = () => {
    const history = useHistory();

    const handleClickExitButton = () => {
        history.push('/home');
    };

    const handleClickProfileButton = () => {
        history.push('/profileUser');
    };

    const handleClickBuyButton = () => {
        history.push('/buyCar');
    };

    const handleClickMyCarsButton = () => {
        history.push('/myCars');
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='toolbar-main'>
                    <IonButtons>

                        <IonButton size='small' slot='start' shape="round" color='danger' onClick={handleClickExitButton}>
                            Exit
                            <IonIcon slot="start" icon={logOut}></IonIcon>
                        </IonButton>

                        <IonTitle className='ion-title'>iCar</IonTitle>

                        <IonButton size='small' slot='end' shape="round" color='primary' onClick={handleClickProfileButton}>
                            <IonIcon slot="start" icon={person}></IonIcon>
                            Your <br /> profile
                        </IonButton>

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton expand="block" size="large" onClick={handleClickBuyButton}>
                    <IonIcon slot="start" icon={bag} color='success'></IonIcon>
                    Buy
                </IonButton>

                <IonButton expand="block" size='large' onClick={handleClickMyCarsButton}>
                    <IonIcon slot="start" icon={car} color='success'></IonIcon>
                    My Cars
                </IonButton>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default MainUser;
