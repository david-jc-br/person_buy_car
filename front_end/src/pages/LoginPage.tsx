import { IonPage, IonContent, IonInput, IonItem, IonList, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { arrowBackSharp, arrowForwardSharp } from "ionicons/icons";

// Service
import { login } from "../services/loginService";

// components
import Footer from "../components/FooterComponent";

// Style
import './css/LoginPage.css'

const Login: React.FC = () => {
    const history = useHistory();
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClickBackButton = () => {
        history.goBack();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que a página seja recarregada

        // Verificar se algum campo está em branco
        if (cpf.trim() === '' || password.trim() === '') {
            setShowAlert(true);
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        try {
            const dataLogin = await login(cpf, password);

            if (dataLogin) {
                // Definir uma única vez antes de redirecionar
                setShowAlert(true);
                setSuccessMessage(dataLogin.profile === 'admin' ? 'Admin login successful!' : 'Login successful!');
                setCPF("");
                setPassword("");
                history.push(dataLogin.profile === 'admin' ? `/mainAdmin/${cpf}` : `/mainUser/${cpf}`);
            }

        } catch (error) {
            setShowAlert(true);
            setErrorMessage('Error login: CPF or password incorrect' );
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleClickBackButton}>{'back'}
                            <IonIcon slot="start" icon={arrowBackSharp}></IonIcon></IonButton>

                        <IonTitle className='ion-title'>Login</IonTitle>
                        <IonButton size='small' slot='end' shape="round" color='success' onClick={handleSubmit}>{'enter'}
                            <IonIcon slot="end" icon={arrowForwardSharp}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonInput
                                label="CPF"
                                placeholder="Enter CPF"
                                type='text'
                                min={11}
                                max={11}
                                name="cpf"
                                value={cpf}
                                onIonChange={(e) => setCPF(e.detail.value!)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonInput
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            />
                        </IonItem>

                        {/* Adicione qualquer outro campo do formulário aqui, se necessário */}

                        <button type="submit" hidden>Submit</button>
                    </form>
                </IonList>
            </IonContent>
            <Footer />
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={errorMessage ? 'Error' : 'Success'}
                message={errorMessage || successMessage}
                buttons={['OK']}
            />
        </IonPage>
    );
}

export default Login;
