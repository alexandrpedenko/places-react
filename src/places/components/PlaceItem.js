import React, { useState } from 'react';
import './PlaceItem.css';
import Card from '../../shared/components/UiElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Map from '../../shared/components/UiElements/Map';
import Modal from '../../shared/components/UiElements/Modal';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';

import { useAuthContext } from '../../shared/context/AuthContext';
import { useHttpClient } from '../../shared/hooks/http-hook';

const PlaceItem = (props) => {
  const { userId, csrfToken } = useAuthContext();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  const showDeleteWarning = () => setShowConfirmModal(true);
  const closeDeleteWarning = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`places/${props.id}`, 'DELETE', null, {
        'X-CSRF-Token': csrfToken,
      });

      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMap}>&times; Close</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteWarning}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteWarning}>
              Cancel
            </Button>
            <Button delete onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMap}>
              View On Map
            </Button>
            {userId === props.creator && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {userId === props.creator && (
              <Button danger onClick={showDeleteWarning}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
