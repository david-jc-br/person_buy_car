import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, bag } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

// services
import { getAllCars } from '../services/carsService';
import { createBuy } from '../services/buy.services';

// Components
import Footer from '../components/FooterComponent';

const BuyCar: React.FC = () => {
    const history = useHistory();
    const [carList, setCarList] = useState([]);
    const { cpf } = useParams<{ cpf: string }>();


    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function getCurrentDateInFormat() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const fetchData = async () => {
        try {
            const cars = await getAllCars();
            const carsAvailables = cars.filter((car: any) => car.status === "available");
            setCarList(carsAvailables);
        } catch (error) {
            console.log(error);
        }
    };


    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleBuyCar = async (carPlate: string) => {
        try {
            const buyData = { dateBuy: getCurrentDateInFormat(), buyer_cpf: cpf, car_plate: carPlate };
            console.log(buyData);
            await createBuy(buyData); // Use a função correta do serviço aqui
            console.log('Car purchased successfully');
        } catch (error) {
            console.log(error);
        }
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

                        <IonTitle slot='start'>Cars <br/> Availables </IonTitle>
                        <IonIcon slot="start" icon={bag}></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {carList.map((car: any) => (
                        <IonItem key={car.plate}>
                            <IonLabel>
                                <h2>{car.brand} {car.model} </h2>
                                <p>Year: {car.year}</p>
                                <p>Price: R${car.price}</p>
                                <p>Plate: {car.plate}</p>
                            </IonLabel>
                            <IonButton expand="full" size="default" color='success' shape='round' onClick={() => handleBuyCar(car.plate)}>
                                Buy
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default BuyCar;
