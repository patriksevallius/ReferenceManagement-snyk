import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaperCollection, defaultValue } from 'app/shared/model/paper-collection.model';

export const ACTION_TYPES = {
  FETCH_PAPERCOLLECTION_LIST: 'paperCollection/FETCH_PAPERCOLLECTION_LIST',
  FETCH_PAPERCOLLECTION: 'paperCollection/FETCH_PAPERCOLLECTION',
  CREATE_PAPERCOLLECTION: 'paperCollection/CREATE_PAPERCOLLECTION',
  UPDATE_PAPERCOLLECTION: 'paperCollection/UPDATE_PAPERCOLLECTION',
  DELETE_PAPERCOLLECTION: 'paperCollection/DELETE_PAPERCOLLECTION',
  RESET: 'paperCollection/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaperCollection>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaperCollectionState = Readonly<typeof initialState>;

// Reducer

export default (state: PaperCollectionState = initialState, action): PaperCollectionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAPERCOLLECTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAPERCOLLECTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAPERCOLLECTION):
    case REQUEST(ACTION_TYPES.UPDATE_PAPERCOLLECTION):
    case REQUEST(ACTION_TYPES.DELETE_PAPERCOLLECTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAPERCOLLECTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAPERCOLLECTION):
    case FAILURE(ACTION_TYPES.CREATE_PAPERCOLLECTION):
    case FAILURE(ACTION_TYPES.UPDATE_PAPERCOLLECTION):
    case FAILURE(ACTION_TYPES.DELETE_PAPERCOLLECTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERCOLLECTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERCOLLECTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAPERCOLLECTION):
    case SUCCESS(ACTION_TYPES.UPDATE_PAPERCOLLECTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAPERCOLLECTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/paper-collections';

// Actions

export const getEntities: ICrudGetAllAction<IPaperCollection> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAPERCOLLECTION_LIST,
  payload: axios.get<IPaperCollection>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaperCollection> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAPERCOLLECTION,
    payload: axios.get<IPaperCollection>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaperCollection> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAPERCOLLECTION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaperCollection> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAPERCOLLECTION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaperCollection> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAPERCOLLECTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
