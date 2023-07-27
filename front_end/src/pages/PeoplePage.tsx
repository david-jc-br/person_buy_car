import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, removeCircle, listCircle, people } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/FooterComponent';

const People: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleClickDeleteButton = () => {
        history.push('/deletePerson');
    };

    const handleClickListButton = () => {
        history.push('/listPeople');
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

                        <IonTitle slot='start'>People</IonTitle>

                        <IonIcon slot="start" icon={people}>
                        </IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonButton expand="block" size='large' onClick={handleClickDeleteButton}>
                    <IonIcon slot="start" icon={removeCircle} ></IonIcon>
                    delete
                </IonButton>

                <IonButton expand="block" size="large" onClick={handleClickListButton}>

                    <IonIcon slot="start" icon={listCircle} ></IonIcon>
                    List
                </IonButton>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default People;