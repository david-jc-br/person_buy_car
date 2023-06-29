import { IonPage, IonContent, IonInput, IonItem, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonList, IonAlert } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

//API
import { createPerson } from "../services/peopleService";

// components
import Footer from "../components/FooterComponent";

//Style
import './css/SignUpPage.css'

const SignUp: React.FC = () => {
  const history = useHistory();

  const handleClickLeftButton = () => {
    history.push('/home');
  };

  const [added, setAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    address: '',
    email: '',
    password: ''
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await createPerson(formData);
      console.log(response);

      setAdded(true);
      setShowAlert(true);

      setFormData({
        name: '',
        cpf: '',
        address: '',
        email: '',
        password: ''
      });

      history.push('/home');

    } catch (error: any) {
      console.log(formData);
      console.error(error);
      setAdded(true);
      setShowAlert(true);
      setErrorMessage(error.message);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton size='small' slot='start' shape="round" color='primary' onClick={handleClickLeftButton}>{'Back'}</IonButton>
            <IonTitle className='ion-title'>Sign-up</IonTitle>
            <IonButton size='small' slot='end' shape="round" color='success' onClick={handleSubmit}>{'confirm'}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                label="Name"
                placeholder="Enter name"
                type="text"
                name="first_name"
                value={formData.name}
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Address"
                placeholder="Enter address"
                type="text"
                name="address"
                value={formData.address}
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Password"
                placeholder="Enter password"
                type="password"
                name="password"
                value={formData.password}
                onIonChange={handleInputChange}
              />
            </IonItem>
          </IonList>
        </form>
      </IonContent>
      <Footer />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={added ? 'Success' : 'Error'}
        message={added ? 'Person added successfully!' : errorMessage || 'Error added person!'}
        buttons={['OK']}
      />
    </IonPage >);
}

export default SignUp;