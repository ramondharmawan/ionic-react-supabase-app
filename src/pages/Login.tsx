import { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './Login.css'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import { supabase } from '../supabaseClient';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast ] = useIonToast();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log()
    e.preventDefault();
    await showLoading();
    try {
      await supabase.auth.signIn({ email, password });
      if (supabase.auth.user() !== null) {
        <Route path="/" render={() => <Redirect to="/Account"/>} exact={true}/>
      }
      await showToast({ message: 'Check your email for the login link!', duration: 4000 });
    } catch (e: any) {
      await showToast({ message: e.error_description || e.message , duration: 5000});
    } finally {
      await hideLoading();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="ion-text-center">
          <IonTitle>Favourse App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding text-center vertengah">
        <img src="https://www.favourse.com/wp-content/uploads/elementor/thumbs/logo-pn2hxg33oslc4h606cghl7i7aufb11y5tbhyaat5ge.png" alt="favourse logo" />
          <h1>Login</h1>
          <p>Sign in via magic link with your email below</p>
        </div>
        <IonList inset={true}>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="stacked">Type Your Email</IonLabel>
              <IonInput
                value={email}
                name="email"
                onIonChange={(e) => setEmail(e.detail.value ?? '')}
                type="email"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Type Your Password</IonLabel>
              <IonInput
                value={password}
                name="password"
                onIonChange={(e) => setPassword(e.detail.value ?? '')}
                type="password"
              ></IonInput>
            </IonItem>
            <div className="ion-text-center">
              <IonButton type="submit" fill="clear">
                Login
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
