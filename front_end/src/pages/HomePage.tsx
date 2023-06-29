import React from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';

//Components
import Footer from '../components/FooterComponent';

//Style
import './css/HomePage.css'
import { logIn } from 'ionicons/icons';

const Home: React.FC = () => {

  const history = useHistory();

  const handleClickLeftButton = () => {
    history.push('/signUp');
  };

  const handleClickRightButton = () => {
    history.push('/loginIn');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleClickLeftButton}>
              Sign-up
            </IonButton>
            <IonTitle className='ion-title'>
              Home
            </IonTitle>
            <IonButton size='small' slot='end' shape="round" color='success' onClick={handleClickRightButton}>
              <IonIcon slot="start" icon={logIn}></IonIcon>
              login-in
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img alt="icar-icon" src="https://github.com/david-jc-br/ICar/assets/73839667/c029e3fe-e02f-4c62-8d1e-7e8e14dd7521" />
          <IonCardHeader>
            <IonCardTitle className='card-title-home'>ICar</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className='card-content-home'>
            Simple CRUD with <a href='https://ionicframework.com/' target='_blank' rel="noopener noreferrer">Ionic Framework</a> + <a href='https://react.dev/' target='_blank' rel="noopener noreferrer">React</a>, <a href='https://nodejs.org/en' target='_blank' rel="noopener noreferrer">NodeJS</a> and <a href='https://www.mysql.com/' target='_blank' rel="noopener noreferrer">MySQL</a> Developed by <a href='https://github.com/david-jc-br' target='_blank' rel="noopener noreferrer">David de Jesus Costa</a>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
