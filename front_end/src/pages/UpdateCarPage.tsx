import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

// Components
import Footer from '../components/FooterComponent';

const UpdateCar: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.push('/mainAdmin');
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

                        <IonTitle slot='end'>Update Car</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default UpdateCar;