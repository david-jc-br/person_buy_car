import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, refresh } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

//Componets
import Footer from '../components/FooterComponent';

//styles
import './css/ProfilePage.css'

const ProfileUser: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.push('/mainUser');
    };

    const handleClickUpdateButton = () => {
        history.push('/updatePerson');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='toolbar-main'>
                    <IonButtons>

                        <IonButton size='small' slot='start' shape="round" color='danger' onClick={handleClickBackButton}>
                            Back
                            <IonIcon slot="start" icon={arrowBack}></IonIcon>
                        </IonButton>

                        <IonTitle className='ion-title' slot='start'>Your<br></br>Data</IonTitle>

                        <IonButton size='small' slot='end' shape="round" color='warning' onClick={handleClickUpdateButton}>
                            <IonIcon slot="end" icon={refresh}></IonIcon>
                            Update
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default ProfileUser;