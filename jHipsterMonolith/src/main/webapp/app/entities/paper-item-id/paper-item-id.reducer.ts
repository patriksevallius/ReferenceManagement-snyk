import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaperItemId, defaultValue } from 'app/shared/model/paper-item-id.model';

export const ACTION_TYPES = {
  FETCH_PAPERITEMID_LIST: 'paperItemId/FETCH_PAPERITEMID_LIST',
  FETCH_PAPERITEMID: 'paperItemId/FETCH_PAPERITEMID',
  CREATE_PAPERITEMID: 'paperItemId/CREATE_PAPERITEMID',
  UPDATE_PAPERITEMID: 'paperItemId/UPDATE_PAPERITEMID',
  DELETE_PAPERITEMID: 'paperItemId/DELETE_PAPERITEMID',
  RESET: 'paperItemId/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaperItemId>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaperItemIdState = Readonly<typeof initialState>;

// Reducer

export default (state: PaperItemIdState = initialState, action): PaperItemIdState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAPERITEMID_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAPERITEMID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAPERITEMID):
    case REQUEST(ACTION_TYPES.UPDATE_PAPERITEMID):
    case REQUEST(ACTION_TYPES.DELETE_PAPERITEMID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAPERITEMID_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAPERITEMID):
    case FAILURE(ACTION_TYPES.CREATE_PAPERITEMID):
    case FAILURE(ACTION_TYPES.UPDATE_PAPERITEMID):
    case FAILURE(ACTION_TYPES.DELETE_PAPERITEMID):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERITEMID_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERITEMID):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAPERITEMID):
    case SUCCESS(ACTION_TYPES.UPDATE_PAPERITEMID):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAPERITEMID):
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

const apiUrl = 'api/paper-item-ids';

// Actions

export const getEntities: ICrudGetAllAction<IPaperItemId> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAPERITEMID_LIST,
  payload: axios.get<IPaperItemId>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaperItemId> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAPERITEMID,
    payload: axios.get<IPaperItemId>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaperItemId> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAPERITEMID,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaperItemId> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAPERITEMID,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaperItemId> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAPERITEMID,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
