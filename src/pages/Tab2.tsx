import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [planets, setPlanets] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    };

    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Planets Explorer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        />
        <IonList>
          {filteredPlanets.map((planet) => (
            <IonItem key={planet.name}>
              <IonLabel>
                <h2>{planet.name}</h2>
                <p>Population: {planet.population}</p>
                <p>Climate: {planet.climate}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;