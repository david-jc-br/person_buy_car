import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, arrowBack, car, listCircle, refreshCircle, removeCircle } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

//components
import Footer from '../components/FooterComponent';

const Cars: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.push('/mainAdmin');
    };

    const handleClickAddButton = () => {
        history.push('/addCar');
    };

    const handleClickDeleteButton = () => {
        history.push('/deleteCar');
    };

    const handleClickUpdateButton = () => {
        history.push('/updateCar');
    };

    const handleClickListButton = () => {
        history.push('/listCar');
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

                        <IonTitle slot='start'>Cars</IonTitle>

                        <IonIcon slot="start" icon={car}>
                        </IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton expand="block" size="large" onClick={handleClickAddButton}>

                    <IonIcon slot="start" icon={addCircle} ></IonIcon>
                    Add
                </IonButton>

                <IonButton expand="block" size='large' onClick={handleClickDeleteButton}>
                    <IonIcon slot="start" icon={removeCircle} ></IonIcon>
                    Delete
                </IonButton>

                <IonButton expand="block" size='large' onClick={handleClickUpdateButton}>
                    <IonIcon slot="start" icon={refreshCircle} ></IonIcon>
                    Update
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

export default Cars;