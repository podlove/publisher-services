import { Action, createAction, handleActions } from 'redux-actions';
import { last, first } from 'lodash-es';
import { type Step } from '../types/step.types';

type Route = 'start-new' | 'import' | null

export interface State {
  current: string;
  route: Route;
  steps: {
    name: string;
    visible: boolean;
  }[];
}

export type nextActionPayload = void;
export type setRouteActionPayload = Route;
export type previousActionPayload = void;

export const actions = {
  next: createAction<nextActionPayload>('ONBOARDING/NEXT'),
  previous: createAction<previousActionPayload>('ONBOARDING/PREVIOUS'),
  setRoute: createAction<setRouteActionPayload>('ONBOARDING/SET_ROUTE'),
};

const startNewSteps = [
  { name: 'select', visible: false },
  { name: 'start-new-podcast', visible: true },
  { name: 'start-new-next-steps', visible: true }
];

const importSteps = [
  { name: 'select', visible: false },
  { name: 'import-feed', visible: true },
  { name: 'import-podcast', visible: true },
  { name: 'import-episodes', visible: true }
];

export const reducer = handleActions<State, any>(
  {
    [actions.setRoute.toString()]: (state, { payload }: Action<setRouteActionPayload>) => {
      let steps: State['steps'] = [];

      switch (payload) {
        case 'start-new':
          steps = startNewSteps;
          break;
        case 'import':
          steps = importSteps;
          break;
        default:
          steps = state.steps;
          break;
      }

      return {
        ...state,
        steps
      }
    },
    [actions.next.toString()]: (state) => {
      const selectedIndex = state.steps.findIndex((step) => step.name === state.current);

      if (selectedIndex + 1 === state.steps.length - 1) {
        return {
          ...state,
          current: last(state.steps).name
        };
      }

      return {
        ...state,
        current: state.steps[selectedIndex + 1].name
      };
    },
    [actions.previous.toString()]: (state) => {
      const selectedIndex = state.steps.findIndex((step) => step.name === state.current);

      if (selectedIndex - 1 < 0) {
        return {
          ...state,
          current: first(state.steps).name
        };
      }

      return {
        ...state,
        current: state.steps[selectedIndex - 1].name
      };
    }
  },
  {
    route: null,
    current: 'select',
    steps: [{ name: 'select', visible: false }]
  }
);

export const selectors = {
  previous: (state: State): { name: string; visible: boolean } | null => {
    const currentIndex = state.steps.findIndex((step) => step.name === state.current);

    if (currentIndex === 0) {
      return null;
    }

    return state.steps[currentIndex - 1];
  },
  current: (state: State): { name: string; visible: boolean } | null =>
    state.steps.find(({ name }) => name === state.current) || null,
  upcoming: (state: State): { name: string; visible: boolean } | null => {
    const currentIndex = state.steps.findIndex((step) => step.name === state.current);

    if (currentIndex + 1 > state.steps.length - 1) {
      return null;
    }

    return state.steps[currentIndex + 1];
  },
  steps: (state: State): Step[] => {
    const currentIndex = state.steps.findIndex((step) => step.name === state.current);

    const result = state.steps.map(({ name, visible }, index) => {
      let status;

      switch (true) {
        case index === currentIndex:
          status = 'current';
          break;

        case index < currentIndex:
          status = 'complete';
          break;

        case index > currentIndex:
          status = 'upcoming';
          break;
      }

      return {
        name,
        status,
        visible
      };
    });

    return result;
  }
};
