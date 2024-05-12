import { createAction, handleActions } from 'redux-actions';
import { last, first } from 'lodash-es';
import { type Step } from '../types/step.types';

export interface State {
  current: string;
  steps: {
    name: string;
    visible: boolean;
  }[];
}

export type nextActionPayload = void;
export type previousActionPayload = void;

export const actions = {
  next: createAction<nextActionPayload>('ONBOARDING/NEXT'),
  previous: createAction<previousActionPayload>('ONBOARDING/PREVIOUS')
};

export const reducer = handleActions<State, any>(
  {
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
    current: 'select',
    steps: [
      { name: 'select', visible: false },
      { name: 'podcast', visible: true },
      { name: 'next-steps', visible: true }
    ]
  }
);

export const selectors = {
  previous: (state: State): { name: string; visible: boolean; } | null => {
    const currentIndex = state.steps.findIndex((step) => step.name === state.current);

    if (currentIndex === 0) {
      return null;
    }

    return state.steps[currentIndex - 1];
  },
  current: (state: State): { name: string; visible: boolean } | null => state.steps.find(({ name }) => name === state.current) || null,
  upcoming: (state: State):  { name: string; visible: boolean; } | null => {
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
