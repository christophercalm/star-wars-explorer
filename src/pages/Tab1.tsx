import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRow,
  IonThumbnail,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

  async function fetchData() {
    const newCharacters: Character[] = [];
    for (let i = 1; i <= 20; i++) {
      const response = await fetch(`https://swapi.dev/api/people/${(currentPage - 1) * 20 + i}`);
      const data: Character = await response.json();
      newCharacters.push(data);
    }
    setCharacters([...characters, ...newCharacters]);
  
    if (currentPage * 20 >= 100) {
      setDisableInfiniteScroll(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  async function loadMoreData(event: CustomEvent<void>) {
    await fetchData();
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
        {characters.map((character, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonRow>
              <IonThumbnail class="rounded-thumbnail">
                  <IonImg
                    src={`https://loremflickr.com/50/50/star%20wars?random=${(currentPage - 1) * 20 + index}`}
                    alt={character.name}
                  />
                </IonThumbnail>
                <div>
                  <IonCardTitle>{character.name}</IonCardTitle>
                  <IonCardSubtitle>Gender: {character.gender}</IonCardSubtitle>
                </div>
              </IonRow>
            </IonCardHeader>
            <IonCardContent>Height: {character.height} cm</IonCardContent>
          </IonCard>
        ))}
        </IonList>
        <IonInfiniteScroll
          threshold="100px"
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => loadMoreData(e)}
        >
          <IonInfiniteScrollContent loadingText="Loading more characters..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

interface Character {
  name: string;
  height: string;
  gender: string;
}