import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaperCollectionId, defaultValue } from 'app/shared/model/paper-collection-id.model';

export const ACTION_TYPES = {
  FETCH_PAPERCOLLECTIONID_LIST: 'paperCollectionId/FETCH_PAPERCOLLECTIONID_LIST',
  FETCH_PAPERCOLLECTIONID: 'paperCollectionId/FETCH_PAPERCOLLECTIONID',
  CREATE_PAPERCOLLECTIONID: 'paperCollectionId/CREATE_PAPERCOLLECTIONID',
  UPDATE_PAPERCOLLECTIONID: 'paperCollectionId/UPDATE_PAPERCOLLECTIONID',
  DELETE_PAPERCOLLECTIONID: 'paperCollectionId/DELETE_PAPERCOLLECTIONID',
  RESET: 'paperCollectionId/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaperCollectionId>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaperCollectionIdState = Readonly<typeof initialState>;

// Reducer

export default (state: PaperCollectionIdState = initialState, action): PaperCollectionIdState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAPERCOLLECTIONID_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAPERCOLLECTIONID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAPERCOLLECTIONID):
    case REQUEST(ACTION_TYPES.UPDATE_PAPERCOLLECTIONID):
    case REQUEST(ACTION_TYPES.DELETE_PAPERCOLLECTIONID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAPERCOLLECTIONID_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAPERCOLLECTIONID):
    case FAILURE(ACTION_TYPES.CREATE_PAPERCOLLECTIONID):
    case FAILURE(ACTION_TYPES.UPDATE_PAPERCOLLECTIONID):
    case FAILURE(ACTION_TYPES.DELETE_PAPERCOLLECTIONID):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERCOLLECTIONID_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERCOLLECTIONID):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAPERCOLLECTIONID):
    case SUCCESS(ACTION_TYPES.UPDATE_PAPERCOLLECTIONID):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAPERCOLLECTIONID):
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

const apiUrl = 'api/paper-collection-ids';

// Actions

export const getEntities: ICrudGetAllAction<IPaperCollectionId> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAPERCOLLECTIONID_LIST,
  payload: axios.get<IPaperCollectionId>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaperCollectionId> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAPERCOLLECTIONID,
    payload: axios.get<IPaperCollectionId>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaperCollectionId> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAPERCOLLECTIONID,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaperCollectionId> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAPERCOLLECTIONID,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaperCollectionId> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAPERCOLLECTIONID,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
