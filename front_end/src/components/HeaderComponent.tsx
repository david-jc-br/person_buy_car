import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import {close,  } from 'ionicons/icons';

// Style
import './css/HeaderComponent.css';

// HeaderComponent
interface Props {
    Headertitle: string;
    textButtonLeft: string;
    textButtonRight: string;
    routeButtonLeft: string;
    routeButtonRight: string;
    colorButtonLeft: string;
    colorButtonRight: string;
    iconLeft?: string;
    iconRight?: string;
}

const Header: React.FC<Props> = (props) => {
    const history = useHistory();

    const handleClickLeftButton = () => {
        history.push(props.routeButtonLeft);
    };

    const handleClickRightButton = () => {
        history.push(props.routeButtonRight);
    };
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonButton size='small' slot='start' shape="round" color={props.colorButtonLeft} onClick={handleClickLeftButton}>{props.textButtonLeft}
                        <IonIcon slot="start" icon={close}></IonIcon>

                    </IonButton>
                    <IonTitle className='ion-title'>{props.Headertitle}</IonTitle>
                    <IonButton size='small' slot='end' shape="round" color={props.colorButtonRight} onClick={handleClickRightButton}>{props.textButtonRight}
                        <IonIcon slot="end" icon={props.iconRight}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;