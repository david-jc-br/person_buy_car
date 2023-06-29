import {IonFooter, IonToolbar} from '@ionic/react';
import React from 'react';

//Style
import './css/FooterComponent.css';

const Footer: React.FC = () => {
    return (
        <IonFooter class='ion-footer'>
            <IonToolbar>
                <p className='footer-text'> <a href='https://linktr.ee/david.jc.br' target = "_blank" rel="noreferrer" className='link'>iCar</a> © 2023</p>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;
