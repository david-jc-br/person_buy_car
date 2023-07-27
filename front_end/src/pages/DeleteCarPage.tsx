import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonAlert, IonInput, IonItem, IonList } from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

// API
import { getAllCars, deleteCar } from '../services/carsService';

// Components
import Footer from '../components/FooterComponent';

const DeleteCar: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.goBack();
    };

    const [plate, setPlate] = useState(''); // Definindo o tipo como number ou null
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const handleDeleteCar = async () => {
        try {
            if (plate !== null) { // Verifica se carId não é nulo
                const carsData = await getAllCars();
                const car = carsData.find((car: any) => car.plate === plate);

                if (car) {
                    await deleteCar(car.plate);
                    setAlertTitle('Success');
                    setAlertMessage(`Car: "${car.brand} - ${car.model}" with plate: "${car.plate}" has been deleted.`);
                } else {
                    setAlertTitle('Error');
                    setAlertMessage(`Car with plate: ${plate} does not exist.`);
                }

                setShowAlert(true);
            }
        } catch (error: any) {
            setAlertTitle('Error');
            setAlertMessage('Failed to delete car.');
            setShowAlert(true);
        }
    };

    const handleAlertDismiss = () => {
        setShowAlert(false);
        history.push('/cars');
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

                        <IonTitle slot='end'>Delete Car</IonTitle>
                        <IonIcon slot='end' icon={trash}></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonInput
                            type='text' // Alterando o tipo para "number"
                            placeholder=' Enter Car Plate: '
                            value={plate} // Convertendo para string
                            onIonChange={(e) => setPlate(e.detail.value!)} // Convertendo para número usando parseInt
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            expand='full'
                            color='danger'
                            shape='round'
                            onClick={handleDeleteCar}
                        >
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

export default DeleteCar;
