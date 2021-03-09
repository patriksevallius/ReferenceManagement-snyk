import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaperItem, defaultValue } from 'app/shared/model/paper-item.model';

export const ACTION_TYPES = {
  FETCH_PAPERITEM_LIST: 'paperItem/FETCH_PAPERITEM_LIST',
  FETCH_PAPERITEM: 'paperItem/FETCH_PAPERITEM',
  CREATE_PAPERITEM: 'paperItem/CREATE_PAPERITEM',
  UPDATE_PAPERITEM: 'paperItem/UPDATE_PAPERITEM',
  DELETE_PAPERITEM: 'paperItem/DELETE_PAPERITEM',
  RESET: 'paperItem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaperItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaperItemState = Readonly<typeof initialState>;

// Reducer

export default (state: PaperItemState = initialState, action): PaperItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAPERITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAPERITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAPERITEM):
    case REQUEST(ACTION_TYPES.UPDATE_PAPERITEM):
    case REQUEST(ACTION_TYPES.DELETE_PAPERITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAPERITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAPERITEM):
    case FAILURE(ACTION_TYPES.CREATE_PAPERITEM):
    case FAILURE(ACTION_TYPES.UPDATE_PAPERITEM):
    case FAILURE(ACTION_TYPES.DELETE_PAPERITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAPERITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAPERITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_PAPERITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAPERITEM):
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

const apiUrl = 'api/paper-items';

// Actions

export const getEntities: ICrudGetAllAction<IPaperItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAPERITEM_LIST,
  payload: axios.get<IPaperItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaperItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAPERITEM,
    payload: axios.get<IPaperItem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaperItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAPERITEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaperItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAPERITEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaperItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAPERITEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
