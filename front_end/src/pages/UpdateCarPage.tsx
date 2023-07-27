import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, reload} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getAllCars, updateCar } from '../services/carsService';

// Components
import Footer from '../components/FooterComponent';

const UpdateCar: React.FC = () => {
    const history = useHistory();
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        status: "available",

    });
    const [plate, setPlate] = useState('');

    const handleClickBackButton = () => {
        history.goBack();
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const handleBrandChange = (e: CustomEvent) => {
        setCarData({ ...carData, brand: e.detail.value });
    };

    const handleModelChange = (e: CustomEvent) => {
        setCarData({ ...carData, model: e.detail.value });
    };

    const handleYearChange = (e: CustomEvent) => {
        setCarData({ ...carData, year: e.detail.value });
    };

    const handlePriceChange = (e: CustomEvent) => {
        setCarData({ ...carData, price: e.detail.value });
    };

    const handlePlateChange = (e: CustomEvent) => {
        setPlate(e.detail.value);
    };

    // Use useEffect to fetch car data when the plate changes
    useEffect(() => {
        async function fetchData() {
            try {
                const cars = await getAllCars();
                const filteredCar = cars.find((car: any) => car.plate === plate);
                if (filteredCar) {
                    setCarData({
                        brand: filteredCar.brand,
                        model: filteredCar.model,
                        year: filteredCar.year,
                        price: filteredCar.price,
                        status: filteredCar.status,
                    });
                    // Limpa o alerta quando encontrar o carro
                    setShowAlert(false);
                } else {
                    // Se não encontrar o carro com a placa fornecida, limpa os campos e exibe o alerta
                    setCarData({
                        brand: "",
                        model: "",
                        year: "",
                        price: "",
                        status: "available"
                    });

                    setAlertTitle('Error');
                    setAlertMessage(`Car with plate: ${plate} does not exist.`);
                    setShowAlert(true);
                }
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        }

        if (plate !== '') {
            fetchData();
        }
    }, [plate]);

    const handleUpdateCar = async () => {
        try {

            console.log(carData);
            await updateCar(plate, carData);


            setAlertTitle('Success');
            setAlertMessage('Car updated successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating car:', error);
            setAlertTitle('Error');
            setAlertMessage('An error occurred while updating the car.');
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='toolbar-main'>
                    <IonButtons>
                        <IonButton size='small' slot='start' shape="round" color='danger' onClick={handleClickBackButton}>
                            <IonIcon slot="start" icon={arrowBack}></IonIcon> Back
                        </IonButton>
                        <IonTitle slot='end'>Update</IonTitle>
                        <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleUpdateCar}>
                            <IonIcon slot="end" icon={reload}></IonIcon> update
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel>Plate:</IonLabel>
                    <IonInput type="text" placeholder="Enter car plate" onIonChange={handlePlateChange}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Brand:</IonLabel>
                    <IonInput type="text" value={carData.brand} onIonChange={handleBrandChange}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Model:</IonLabel>
                    <IonInput type="text" value={carData.model} onIonChange={handleModelChange}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Year:</IonLabel>
                    <IonInput type="text" value={carData.year} onIonChange={handleYearChange}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Price:</IonLabel>
                    <IonInput type="text" value={carData.price} onIonChange={handlePriceChange}></IonInput>
                </IonItem>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                header={alertTitle}
                message={alertMessage}
                buttons={['OK']}
                onDidDismiss={() => setShowAlert(false)} // Fecha o alerta quando é fechado pelo usuário
            />
            <Footer />
        </IonPage>
    );
};

export default UpdateCar;
