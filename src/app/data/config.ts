import { DefaultDataServiceConfig, EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { GlobalActionTypes } from './actions/global.actions';
import { environment } from '@env/environment';
import { CategoryModel, UserConfigurationModel, UserModel } from '@m/class';

const entityMetadata: EntityMetadataMap = {
  Category: {
    selectId: (model: CategoryModel) => model.id,
  },
  CurrentUserConfiguration: {
    selectId: (model: UserConfigurationModel) => model.id,
  },
  CurrentUser: {
    selectId: (model: UserModel) => model.id,
  },
};

const pluralNames = {
  Category: 'Category',
  CurrentUser: 'CurrentUser',
  CurrentUserConfiguration: 'CurrentUserConfiguration'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl, // Or your variable
  timeout: environment.apiTimeoutMs,
};

export interface State {
  Test: boolean;
}

const initialTestState = false;

export const reducers: ActionReducerMap<State> = {
  Test: (state = initialTestState, action) =>
    action.type === GlobalActionTypes.AppLogout ? initialTestState : state,
};

export function logoutMetaReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    if (action.type === GlobalActionTypes.AppLogout) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logoutMetaReducer];
