import { IonPage, IonContent, IonInput, IonItem, IonList, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { arrowBackSharp, arrowForwardSharp } from "ionicons/icons";

// Service
import { login } from "../services/loginService";

// components
import Footer from "../components/FooterComponent";

// Style
import './css/LoginPage.css'

const SignIn: React.FC = () => {
    const history = useHistory();
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");

    const handleClickBackButton = () => {
        history.push('/home');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que a página seja recarregada

        try {
            const { kind } = await login(cpf, password);
            console.log(kind);

            if (kind === 'user') {
                history.push('/mainUser');
            } else {
                history.push('/mainAdmin');
            }
        } catch (error) {
            console.error("Error logging in:", error);
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
        </IonPage>
    );
}

export default SignIn;
