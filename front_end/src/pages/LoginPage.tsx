import { IonPage, IonContent, IonInput, IonItem, IonList, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { arrowBackSharp, arrowForwardSharp } from "ionicons/icons";

// components
import Footer from "../components/FooterComponent";

//Style
import './css/LoginPage.css'

const SignIn: React.FC = () => {
    const history = useHistory();

    const handleClickBackButton = () => {
        history.push('/home');
    };

    const handleClickEnterButton = () => {
        history.push('/mainUser');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleClickBackButton}>{'back'}
                            <IonIcon slot="start" icon={arrowBackSharp}></IonIcon></IonButton>

                        <IonTitle className='ion-title'>Login</IonTitle>
                        <IonButton size='small' slot='end' shape="round" color='success' onClick={handleClickEnterButton}>{'enter'}
                            <IonIcon slot="end" icon={arrowForwardSharp}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonInput
                            label="Email"
                            placeholder="Enter email"
                            type="email"
                            name="email"
                        // value=
                        // onIonChange=
                        />
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            name="password"
                        // value={}
                        // onIonChange={handleInputChange}
                        />
                    </IonItem>
                </IonList>

            </IonContent>
            <Footer />
        </IonPage>);
}

export default SignIn;