import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from '../graphql/queries';
import Modal from './Modal';
import styles from '../styles/CharacterList.module.css';

const EpisodeList = () => {
  const [page, setPage] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  const itemsPerPage = 20;
  const { loading, error, data } = useQuery(GET_EPISODES, { variables: { page } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.episodes;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, info.count);

  const handleViewClick = (episode: any) => {
    setSelectedEpisode(episode);
  };

  const closeModal = () => {
    setSelectedEpisode(null);
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Episode</th>
            <th>Air Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((episode: any) => (
            <tr key={episode.id}>
              <td title={episode.name}>{episode.name}</td>
              <td>{episode.episode}</td>
              <td>{episode.air_date}</td>
              <td><button onClick={() => handleViewClick(episode)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination-content">
          <span>Showing {startItem}-{endItem} of {info.count} entries</span>
          <span className="pagination-buttons">
            <button onClick={() => setPage(page - 1)} disabled={!info.prev}>Previous</button>
            <button onClick={() => setPage(page + 1)} disabled={!info.next}>Next</button>
          </span>
        </div>
      </div>

      {selectedEpisode && (
        <Modal onClose={closeModal}>
          <h2>{selectedEpisode.name} Details</h2>
          <table className={styles.modalTable}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{selectedEpisode.name}</td>
              </tr>
              <tr>
                <th>Episode</th>
                <td>{selectedEpisode.episode}</td>
              </tr>
              <tr>
                <th>Air Date</th>
                <td>{selectedEpisode.air_date}</td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
};

export default EpisodeList;
