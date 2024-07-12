// pages/index.tsx
import { useState } from 'react';
import CharacterList from '../components/CharacterList';
import EpisodeList from '../components/EpisodeList';
import LocationList from '../components/LocationList';

const Home = () => {
  const [view, setView] = useState<'characters' | 'episodes' | 'locations'>('characters');

  return (
    <div>
      <nav>
        <button onClick={() => setView('characters')}>Characters</button>
        <button onClick={() => setView('episodes')}>Episodes</button>
        <button onClick={() => setView('locations')}>Locations</button>
      </nav>
      <main>
        {view === 'characters' && <CharacterList />}
        {view === 'episodes' && <EpisodeList />}
        {view === 'locations' && <LocationList />}
      </main>
    </div>
  );
};

export default Home;
