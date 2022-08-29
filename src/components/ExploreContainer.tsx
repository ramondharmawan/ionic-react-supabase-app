import './ExploreContainer.css';
import { IonButton } from '@ionic/react';
//import { Link, Route, Switch } from "react-router-dom";
//import { IonReactRouter } from '@ionic/react-router';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const mystyle = {
    //backgroundImage: `url("https://via.placeholder.com/500")`,
    padding: "10px",
    fontFamily: "Arial",
    height: "50%",
    display: "flex",
    flexDirection: 'column' as 'column',
    justifyContent: "space-around"
  };

  const mystyle2 = {
    display: "flex",
    flexDirection: 'row' as 'row',
    justifyContent: 'center'
  };

  return (
    <div className="container" style={mystyle} >
      <strong>Welcome to Favourse App</strong>
      <div className="algcenter">
      <img src="https://www.favourse.com/wp-content/uploads/elementor/thumbs/logo-pn2hxg33oslc4h606cghl7i7aufb11y5tbhyaat5ge.png" alt="favourse logo" />
      </div>
      <p>Create your event at xero risk</p>
      <div style={mystyle2}>
      <IonButton href="/Login" color="primary">SignIn</IonButton>
      <IonButton href="/Signup" color="primary">SignUp</IonButton>
      </div>
  
    </div>
  );
};

export default ExploreContainer;
