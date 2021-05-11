import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UiElements/Card';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthContext } from '../../shared/context/AuthContext';
import './PlaceForm.css';

const UpdatePlace = () => {
  const { userId, csrfToken } = useAuthContext();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [fetchedPlace, setFetchedPlace] = useState();

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(`places/${placeId}`);

        setFetchedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    getPlace();
  }, [sendRequest, placeId, setFormData]);

  const history = useHistory();

  const placeUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        }
      );

      history.push('/' + userId + '/places');
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!fetchedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && fetchedPlace && (
        <form className='place-form' onSubmit={placeUpdateSubmit}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            value={fetchedPlace.title}
            isValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters).'
            onInput={inputHandler}
            value={fetchedPlace.description}
            isValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
