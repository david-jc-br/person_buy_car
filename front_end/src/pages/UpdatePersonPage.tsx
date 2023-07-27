import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, reload, save } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

// Components
import Footer from '../components/FooterComponent';
import { getAllPeople } from '../services/peopleService';

const UpdatePerson: React.FC = () => {
    const history = useHistory();

    const { cpf } = useParams<{ cpf: string }>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');

    // Use useEffect para buscar os dados da pessoa quando o componente for montado
    useEffect(() => {
        async function fetchPersonData() {
            try {
                const people = await getAllPeople();
                const person = people.find((person: any) => person.cpf === cpf);
                if (person) {
                    setName(person.name);
                    setEmail(person.email);
                    setProfile(person.profile);
                } else {
                    // Se a pessoa não for encontrada, faça algo como redirecionar para uma página de erro ou exibir uma mensagem
                    console.error(`Person with CPF: ${cpf} not found.`);
                }
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        }

        fetchPersonData();
    }, [cpf]);

    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleClickUpdateButton = () => {
        // Verificar se os campos obrigatórios foram preenchidos
        if (cpf.trim() === '' || name.trim() === '' || email.trim() === '' || profile.trim() === '') {
            // Exibir mensagem de erro ou realizar outra ação necessária
            return;
        }

        // Obter a lista de pessoas do Local Storage
        const peopleData = localStorage.getItem('peopleData');
        if (!peopleData) {
            // A lista de pessoas não foi encontrada no Local Storage, faça algo como exibir uma mensagem de erro ou redirecionar para uma página de erro
            console.error('People data not found in Local Storage.');
            return;
        }

        try {
            // Atualizar os dados da pessoa na lista
            const peopleList = JSON.parse(peopleData);
            const updatedPeopleList = peopleList.map((person: any) => {
                if (person.cpf === cpf) {
                    return {
                        ...person,
                        name: name,
                        email: email,
                        profile: profile
                    };
                }
                return person;
            });

            // Salvar a lista atualizada no Local Storage
            localStorage.setItem('peopleData', JSON.stringify(updatedPeopleList));

            // Redirecionar para outra página ou realizar outra ação necessária após a atualização
            history.push('/mainAdmin');
        } catch (error) {
            console.error('Error updating person data:', error);
            // Exibir mensagem de erro ou realizar outra ação necessária em caso de erro
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="toolbar-main">
                    <IonButtons>
                        <IonButton size="small" slot="start" shape="round" color="danger" onClick={handleClickBackButton}>
                            Back
                            <IonIcon slot="start" icon={arrowBack}></IonIcon>
                        </IonButton>

                        <IonTitle slot="end">Update</IonTitle>
                        <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleClickUpdateButton}>
                            <IonIcon slot="end" icon={reload}></IonIcon> update
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="CPF"
                            label='CPF'
                            value={cpf}
                            onIonChange={(e) => (e.detail.value!)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Name"
                            label='Name'
                            value={name}
                            onIonChange={(e) => setName(e.detail.value!)}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Email"
                            label='Email'
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                </IonList>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default UpdatePerson;
