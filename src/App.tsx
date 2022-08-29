import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { supabase } from './supabaseClient';

import '@ionic/react/css/ionic.bundle.css';

/* Theme variables */
import './theme/variables.css';
import  Home from './pages/Home';
import { SignupPage } from './pages/Signup';
import { LoginPage } from './pages/Login';
import { AccountPage } from './pages/Account';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            exact
            path="/"
            render={() => {
              return session ? <Redirect to="/Login" /> : <Home />;
            }}
          />
          <Route exact path="/Account">
            <AccountPage />
          </Route>
          <Route exact path="/Signup">
            <SignupPage />
          </Route>
          <Route exact path="/Login" render={()=> {return session ? <Redirect to="/Account"/> : <LoginPage />}}>
            
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
