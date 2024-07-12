import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS } from '../graphql/queries'; // Adjust the import according to your GraphQL queries file
import Modal from './Modal';
import styles from '../styles/CharacterList.module.css'; // Reuse the same CSS module as CharacterList for styling

const LocationList = () => {
  const [page, setPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const itemsPerPage = 10; // Showing 10 items per page
  const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { page } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.locations;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, info.count);

  const handleViewClick = (location: any) => {
    setSelectedLocation(location);
  };

  const closeModal = () => {
    setSelectedLocation(null);
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((location: any) => (
            <tr key={location.id}>
              <td 
                className={styles.truncated} 
                data-full-text={location.name}
                title={location.name}>
                {location.name}
              </td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
              <td><button onClick={() => handleViewClick(location)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination-content">
            <span>Showing {startItem}-{endItem} of {info.count} entries</span>
            <span className="pagination-buttons">
            <button onClick={() => setPage(page - 1)} disabled={!info.prev}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={!info.next}>
                Next
            </button>
            </span>
        </div>
      </div>

      {selectedLocation && (
        <Modal onClose={closeModal}>
          <h2>{selectedLocation.name} Details</h2>
          <table className={styles.modalTable}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{selectedLocation.name}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{selectedLocation.type}</td>
              </tr>
              <tr>
                <th>Dimension</th>
                <td>{selectedLocation.dimension}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
};

export default LocationList;
