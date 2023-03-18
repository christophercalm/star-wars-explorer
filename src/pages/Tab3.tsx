import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import './Tab3.css';

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Tab3: React.FC = () => {
  const [starships, setStarships] = useState<any[]>([]);

  const getRandomStarshipImage = async () => {
    const apiKey = '34530862-a715af4a7a86baa16fd2a6d7b';
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=starship&image_type=photo&per_page=200`);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    return data.hits[randomIndex].largeImageURL;
  };
  useEffect(() => {
    const fetchStarships = async () => {
      const response = await fetch('https://swapi.dev/api/starships');
      const data = await response.json();
      const starshipsWithImages = await Promise.all(
        data.results.map(async (starship: any) => {
          const imageURL = await getRandomStarshipImage();
          return { ...starship, imageURL };
        })
      );
      setStarships(starshipsWithImages);
    };

    fetchStarships();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Starships Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides pager={true} options={slideOpts}>
          {starships.map((starship, index) => (
            <IonSlide key={starship.name}>
              <IonCard>
                <IonImg
                  class="starship-image"
                  src={starship.imageURL}
                  alt={starship.name}
                />
                <IonCardHeader>
                  <IonCardTitle>{starship.name}</IonCardTitle>
                  <IonCardSubtitle>Model: {starship.model}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Manufacturer: {starship.manufacturer}</IonCardContent>
                </IonCard>
              </IonSlide>
          ))}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;