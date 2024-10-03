import { createAction, handleActions, type Action } from 'redux-actions';
import type { Notification } from '../types/notification.types';

export type showNotificationPayload = Notification;
export type hideNotificationPayload = number;
export interface errorNotificationPayload {
  title: string;
  details?: string;
}

export type State = Notification[];

export const INITIAL_STATE: State = [];

export const actions = {
  error: createAction<errorNotificationPayload>('NOTIFICATIONS/ERROR'),
  show: createAction<showNotificationPayload>('NOTIFICATIONS/SHOW'),
  hide: createAction<hideNotificationPayload>('NOTIFICATIONS/HIDE')
};

export const reducer = handleActions<State, any>(
  {
    [actions.show.toString()]: (state, action: Action<showNotificationPayload>) => [
      ...state,
      action.payload
    ],
    [actions.hide.toString()]: (state, action: Action<hideNotificationPayload>) =>
      state.map((notification, index) => ({
        ...notification,
        visible: index === action.payload ? false : notification.visible
      })),
    [actions.error.toString()]: (state, { payload }: Action<errorNotificationPayload>) => [
      ...state,
      {
        ...payload,
        type: 'error',
        visible: true,
        interaction: {
          autoclose: false
        }
      }
    ],
  },
  INITIAL_STATE
);

export const selectors = {
  notifications: (state: State) => state
};
