import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, key, mail, people, person, refresh } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Components
import Footer from '../components/FooterComponent';

// Styles
import './css/ProfilePage.css';
import { getAllPeople } from '../services/peopleService';

const ListPeople: React.FC = () => {
    const history = useHistory();
    const initialData = { cpf: '', name: '', email: '', kind: '' };
    const [userData, setUserData] = useState(initialData);

    const handleClickBackButton = () => {
        history.goBack;
    };

    const handleClickUpdateButton = () => {
        history.push('/updatePerson');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cpf = localStorage.getItem('cpf');
                const response = await getAllPeople();
                const peopleData = response.data || [];
                const user = peopleData.find((person:any) => person.cpf === cpf);
                setUserData(user || initialData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='toolbar-main'>
                    <IonButtons>
                        <IonButton size='small' slot='start' shape='round' color='danger' onClick={handleClickBackButton}>
                            Back
                            <IonIcon slot='start' icon={arrowBack}></IonIcon>
                        </IonButton>

                        <IonTitle className='ion-title' slot='start'>Your<br></br>Data</IonTitle>

                        <IonButton size='small' slot='end' shape='round' color='warning' onClick={handleClickUpdateButton}>
                            <IonIcon slot='end' icon={refresh}></IonIcon>
                            Update
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={key} />
                            CPF: {userData?.cpf || ''}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={person} />
                            Name: {userData?.name || ''}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={mail} />
                            Email: {userData?.email || ''}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={people} />
                            Kind: {userData?.kind || ''}
                        </IonLabel>
                    </IonItem>
                    {/* Renderize outros dados do usuário conforme necessário */}
                </IonList>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default ListPeople;
