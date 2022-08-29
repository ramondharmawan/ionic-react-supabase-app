import { useState } from "react";
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

  export function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    const [showLoading, hideLoading] = useIonLoading();
    const [ showToast ] = useIonToast();
    
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log()
        e.preventDefault();
        await showLoading();
        try {
            await supabase.auth.signUp({email, password});
            await showToast({message: 'Got it, please check your email to verified', duration: 3000});
            window.setTimeout(function(){ window.location.href = "http://localhost:8100/"; }, 3050);
        } catch (e: any) {
            await showToast({message: e.error_description || e.message, duration: 3000});
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
          <h1>SignUp</h1>
          <p>SignUp Page</p>
        </div>
        <IonList inset={true}>
          <form onSubmit={handleSignup}>
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
                SignUp
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
    );
  }
