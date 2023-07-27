import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

// Components
import Footer from '../components/FooterComponent';

// Service
import { createCar } from '../services/carsService';

interface CarFormData {
    plate: string;
    brand: string;
    model: string;
    year: string;
    price: number;
}

const AddCar: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState<CarFormData>({
        plate: '',
        brand: '',
        model: '',
        year: '',
        price: 1,
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        setFormData({
            plate: '',
            brand: '',
            model: '',
            year: '',
            price: 1,
        });
    }, []);

    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const car = await createCar(formData);
            setAlertType('success');
            setAlertMessage(`Car added successfully! Plate: ${car.plate}`);
            setShowAlert(true);
        } catch (error) {
            setAlertType('error');
            setAlertMessage(`Error adding car: ${(error as Error).message}`);
            setShowAlert(true);
            console.error(error);
        }
    };

    const handleAlertDismiss = () => {
        setShowAlert(false);
        if (alertType === 'success') {
            history.push('/cars');
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
                        <IonTitle slot='end'>Add Car</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit}>
                <IonItem>
                        <IonInput
                            label="Plate"
                            placeholder="Enter plate"
                            type="text"
                            name="plate"
                            value={formData.plate}
                            onIonChange={e => handleInputChange('plate', e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Brand"
                            placeholder="Enter brand"
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onIonChange={e => handleInputChange('brand', e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Model"
                            placeholder="Enter model"
                            type="text"
                            name="model"
                            value={formData.model}
                            onIonChange={e => handleInputChange('model', e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Year"
                            placeholder="Enter year"
                            type="text"
                            name="year"
                            value={formData.year}
                            onIonChange={e => handleInputChange('year', e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Price: R$"
                            placeholder="Enter price"
                            type="text"
                            name="price"
                            value={formData.price}
                            onIonChange={e => handleInputChange('price', e.detail.value!)}
                        />
                    </IonItem>

                    <IonButton expand='full' color='success' shape='round' type="submit">
                        Add Car
                    </IonButton>
                </form>
            </IonContent>
            <Footer />
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={handleAlertDismiss}
                header={alertType === 'success' ? 'Success' : 'Error'}
                message={alertMessage}
                buttons={['OK']}
            />
        </IonPage>
    );
};

export default AddCar;
