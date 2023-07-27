import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { person, car, people, logOut } from 'ionicons/icons';

// Components
import Footer from '../components/FooterComponent';

// Style
import './css/MainPage.css'

const MainAdmin: React.FC = () => {
    const history = useHistory();
    
    const { cpf } = useParams<{ cpf: any }>();

    const handleClickExitButton = () => {
        history.push('/home');
    };

    const handleClickProfileButton = () => {
        history.push(`/profile/${cpf}`);
    };

    const handleClickBuyButton = () => {
        history.push('/cars');
    };

    const handleClickMyCarsButton = () => {
        history.push('/people');
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

                        <IonTitle className='ion-title'>iCar<br></br>Admin</IonTitle>

                        <IonButton size='small' slot='end' shape="round" color='primary' onClick={handleClickProfileButton}>
                            <IonIcon slot="start" icon={person}></IonIcon>
                            {cpf}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton expand="block" size="large" onClick={handleClickBuyButton}>
                    <IonIcon slot="start" icon={car} color='success'></IonIcon>
                    Cars
                </IonButton>

                <IonButton expand="block" size='large' onClick={handleClickMyCarsButton}>
                    <IonIcon slot="start" icon={people} color='success'></IonIcon>
                    People
                </IonButton>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default MainAdmin;
