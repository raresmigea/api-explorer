import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import Modal from './Modal';
import styles from '../styles/CharacterList.module.css'; // Adjust path as needed

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  const itemsPerPage = 10; // Show 10 items per page
  const { loading, error, data } = useQuery(GET_CHARACTERS, { variables: { page } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.characters;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, info.count);

  const handleViewClick = (character: any) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((character: any) => (
            <tr key={character.id}>
              <td title={character.name}>{character.name}</td>
              <td title={character.species}>{character.species}</td>
              <td title={character.origin?.name}>{character.origin?.name ?? 'Unknown'}</td>
              <td title={character.location?.name}>{character.location?.name ?? 'Unknown'}</td>
              <td><button onClick={() => handleViewClick(character)}>View</button></td>
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

      {selectedCharacter && (
        <Modal onClose={closeModal}>
          <h2>{selectedCharacter.name} Details</h2>
          <table className={styles.modalTable}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{selectedCharacter.name}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{selectedCharacter.species}</td>
              </tr>
              <tr>
                <th>Origin</th>
                <td>{selectedCharacter.origin?.name ?? 'Unknown'}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{selectedCharacter.location?.name ?? 'Unknown'}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
};

export default CharacterList;
