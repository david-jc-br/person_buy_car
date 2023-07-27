import { IonPage, IonContent, IonInput, IonItem, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonList, IonAlert, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

// API
import { createPerson, getAllPeople } from "../services/peopleService";

// components
import Footer from "../components/FooterComponent";

// Style
import './css/SignUpPage.css'

enum profile {
  Admin = "admin",
  User = "user"
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const handleClickLeftButton = () => {
    history.push('/home');
  };

  const [added, setAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    cpf: '',
    name: '',
    email: '',
    profile: profile.User,
    password: ''
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleKindChange(event: any) {
    setFormData({ ...formData, profile: event.target.value });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    // Verificar se algum campo está em branco
    if (
      formData.cpf.trim() === '' ||
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === ''
    ) {
      setAdded(false);
      setShowAlert(true);
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    try {
      const allPeople = await getAllPeople();

      const cpfExists = allPeople.some((person: any) => person.cpf === formData.cpf);

      if (cpfExists) {
        setAdded(false);
        setShowAlert(true);
        setErrorMessage('Person with the provided CPF already exists.');
        return;
      }

      const response = await createPerson(formData);
      console.log(response);

      setAdded(true);
      setShowAlert(true);

      setFormData({
        cpf: '',
        name: '',
        email: '',
        profile: profile.User,
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
            <IonButton size='small' slot='end' shape="round" color='success' onClick={handleSubmit}>{'Confirm'}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                label="CPF"
                placeholder="Enter CPF"
                type="text"
                name="cpf"
                value={formData.cpf}
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Name"
                placeholder="Enter name"
                type="text"
                name="name"
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
              <IonSelect
                label="Profile"
                placeholder="Select profile"
                name="profile"
                value={formData.profile}
                onIonChange={handleKindChange}
              >
                <IonSelectOption value={profile.Admin}>Admin</IonSelectOption>
                <IonSelectOption value={profile.User}>User</IonSelectOption>
              </IonSelect>
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
        message={added ? 'Person added successfully!' : errorMessage || 'Error adding person!'}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default SignUp;
