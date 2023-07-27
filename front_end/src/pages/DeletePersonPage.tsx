import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, IonAlert, IonList, IonItem } from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

// API
import { getAllPeople, deletePerson } from '../services/peopleService';

// Components
import Footer from '../components/FooterComponent';

const DeletePerson: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.goBack();
    };

    const [cpf, setCpf] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const handleDeletePerson = async () => {
        try {
            const peopleData = await getAllPeople();
            const person = peopleData.find((person: any) => person.cpf === cpf);

            if (person) {
                await deletePerson(person.cpf);
                setAlertTitle('Success');
                setAlertMessage(`Person ${person.name} with CPF ${person.cpf} has been deleted.`);
            } else {
                setAlertTitle('Error');
                setAlertMessage(`Person with CPF ${cpf} does not exist.`);
            }

            setShowAlert(true);
        } catch (error: any) {
            setAlertTitle('Error');
            setAlertMessage('Failed to delete person.');
            setShowAlert(true);
        }
    };

    const handleAlertDismiss = () => {
        setShowAlert(false);
        history.push('/people');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='toolbar-main'>
                    <IonButtons>
                        <IonButton size='small' slot='start' shape='round' color='danger' onClick={handleClickBackButton}>
                            Back
                            <IonIcon slot='start' icon={arrowBack}></IonIcon>
                        </IonButton>

                        <IonTitle slot='end'>Delete Person</IonTitle>
                        <IonIcon slot='end' icon={trash}></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonInput
                            type='text'
                            placeholder=' Enter CPF'
                            value={cpf}
                            onIonChange={(e) => setCpf(e.detail.value!)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            expand='full'
                            color='danger'
                            shape='round'
                            onClick={handleDeletePerson}>
                            Delete
                        </IonButton>
                    </IonItem>

                </IonList>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={handleAlertDismiss}
                    header={alertTitle}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default DeletePerson;
