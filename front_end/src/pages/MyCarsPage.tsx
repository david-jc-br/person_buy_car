import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, car } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

// Components
import Footer from '../components/FooterComponent';

const MyCars: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.push('/mainUser');
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

                        <IonTitle slot='start'>My Cars</IonTitle>

                        <IonIcon slot="start" icon={car}>
                        </IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default MyCars;