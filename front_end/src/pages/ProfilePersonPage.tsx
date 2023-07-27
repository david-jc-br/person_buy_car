import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, key, mail, people, person, refresh } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

// Components
import Footer from '../components/FooterComponent';

// Styles
import './css/ProfilePage.css';
import { getPersonByCpf } from '../services/peopleService';

interface Person {

    cpf: string;
    name: string;
    email: string;
    profile: string;
    password: string;
}

const ProfilePerson: React.FC = () => {
    const { cpf } = useParams<{ cpf: string }>();
    const history = useHistory();
    const [personData, setPersonData] = useState<Person | null>(null); // Alterado o estado para Person | null

    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleClickUpdateButton = () => {
        history.push(`/updatePerson/${cpf}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPersonByCpf(cpf);

                if (response === null) {
                    throw new Error('Person not Found');
                }

                setPersonData(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [cpf]); // Adicionamos "cpf" como dependência para o useEffect para que ele seja executado quando o parâmetro mudar

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

                        <IonButton size='small' slot='end' shape='round' color='primary' onClick={handleClickUpdateButton}>
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
                            CPF: {personData?.cpf || ''} {/* Usamos "personData?.cpf" para garantir que o valor seja exibido somente se "personData" não for nulo */}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={person} />
                            Name: {personData?.name || ''} { }
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon slot='start' icon={mail} />
                            Email: {personData?.email || ''} { }
                        </IonLabel>
                    </IonItem>

                </IonList>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default ProfilePerson;
