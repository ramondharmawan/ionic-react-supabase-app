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
import { supabase } from "../src/supabaseClient";
import { useState, useEffect} from 'react';
import {Route} from 'react-router-dom';


export default function EventlistPage () {
    const user = supabase.auth.user();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents()
      },[]);

      async function fetchEvents() {
        const { data, error } = await supabase.from('events').select().eq("userId", user?.id)
        setEvents(data)
        setLoading(false)

        if (error) {
          return <div>Error! {error.message}</div>
      }
      };  

      if (loading) return <p className="text-2xl">Loading ...</p>
      if (!events.length) return <p className="text-2xl">No event list.</p>
      

      return (
        <div>
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Event List</h1>
          {
            events.map(event => (
              <Route key={data.id} href={`/posts/${data.id}`}>
                <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
                  <h2 className="text-xl font-semibold">{event.event_title}</h2>
                </div>
              </Route>)
            )
          }
        </div>
      );
    
};