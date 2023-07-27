import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonItemDivider, IonCardHeader, IonCardSubtitle, IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Components
import Footer from '../components/FooterComponent';
import { getAllCars } from '../services/carsService';

const ListCar: React.FC = () => {
	const history = useHistory();
	const [cars, setCars] = useState([]);

	const handleClickBackButton = () => {
		history.goBack();
	};

	const fetchCars = async () => {
		try {
			const data = await getAllCars();
			setCars(data);
		} catch (error) {
			console.error('Error fetching cars:', error);
		}
	};

	useEffect(() => {
		fetchCars(); // Fetch inicial dos dados

		const interval = setInterval(() => {
			fetchCars(); // Atualização dos dados a cada 1 segundo
		}, 1000);

		return () => {
			clearInterval(interval); // Limpeza do intervalo ao desmontar o componente
		};
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar class='toolbar-main'>
					<IonButtons>
						<IonButton size='small' slot='start' shape="round" color='danger' onClick={handleClickBackButton}>
							Back
							<IonIcon slot="start" icon={arrowBack}></IonIcon>
						</IonButton>
						<IonTitle slot='end'>List Car</IonTitle>
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
									<IonCol>
										<IonLabel>
											<h2>Status:</h2>
											<p>{car.status}</p>
										</IonLabel>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCardContent>
					</IonCard>
				))}
			</IonContent>
			<Footer />
		</IonPage >);
};

export default ListCar;
