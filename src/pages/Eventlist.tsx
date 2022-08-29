import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
  useIonRouter
} from '@ionic/react';
import { supabase } from "../supabaseClient";
import { useState, useEffect} from 'react';
import {Route} from 'react-router-dom';


export default function EventlistPage () {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const [session] = useState(() => supabase.auth.session());
  const router = useIonRouter();
  const [allevents, setAllevents] = useState({
    event_title: '',
    description: '',
    event_date: '',
  });

    useEffect(() => {
        fetchEvents()
      },[session]);

      async function fetchEvents() {
        await showLoading();
        try {
          const user = supabase.auth.user();
          let { data, error, status } = await supabase
          .from('events')
          .select(`event_title, description, event_date`)
          .eq('id', user!.id)
          .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setAllevents({
          event_title: data.event_title,
          description: data.description,
          event_date: data.event_date,
        });
      }
    } catch (error: any) {
      showToast({ message: error.message, duration: 5000 });
    } finally {
      await hideLoading();
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Avatar url={profile.avatar_url} onUpload={updateProfile}></Avatar>
        <form onSubmit={updateProfile}>
          <IonItem>
            <IonLabel>
              <p>Email</p>
              <p>{session?.user?.email}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              name="username"
              value={profile.username}
              onIonChange={(e) =>
                setProfile({ ...profile, username: e.detail.value ?? '' })
              }
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Website</IonLabel>
            <IonInput
              type="url"
              name="website"
              value={profile.website}
              onIonChange={(e) =>
                setProfile({ ...profile, website: e.detail.value ?? '' })
              }
            ></IonInput>
          </IonItem>
          <div className="ion-text-center">
            <IonButton fill="clear" type="submit">
              Update Profile
            </IonButton>
          </div>
        </form>

        <div className="ion-text-center">
          <IonButton fill="clear" onClick={signOut}>
            Log Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );

      
};