import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonItemDivider, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

// Components
import Footer from '../components/FooterComponent';
import { getBuysByCpf } from '../services/buy.services';
import { getAllCars } from '../services/carsService';

const MyCars: React.FC = () => {
    const history = useHistory();
    const [cars, setCars] = useState([]);
    const { cpf } = useParams<{ cpf: string }>();

    const handleClickBackButton = () => {
        history.goBack();
    };

    useEffect(() => {
        // Obtém o CPF atual do localStorage
        fetchCars(); // Fetch inicial dos dados

        const interval = setInterval(() => {
            fetchCars(); // Atualização dos dados a cada 1 segundo
        }, 1000);

        return () => {
            clearInterval(interval); // Limpeza do intervalo ao desmontar o componente
        };
    }
        , []);

    const fetchCars = async () => {
        try {
            const userBuys = await getBuysByCpf(cpf);
            const carPlates = userBuys.map((buy: any) => buy.car_plate);
            const allCars = await getAllCars();
            const userCars = allCars.filter((car: any) => carPlates.includes(car.plate));
            setCars(userCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
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
                        <IonTitle slot='end'>My Cars</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {cars.map((car: any) => (
                    <IonCard key={car.plate}>
                        <IonCardHeader>
                            <IonCardSubtitle>Plate: {car.plate}</IonCardSubtitle>
                            <IonCardTitle>{car.brand} - {car.model}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonLabel>
                                            <h2>Year:</h2>
                                            <p>{car.year}</p>
                                        </IonLabel>
                                    </IonCol>
                                    <IonCol>
                                        <IonLabel>
                                            <h2>Price:</h2>
                                            <p>{car.price}</p>
                                        </IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default MyCars;
