import { createAction, handleActions } from 'redux-actions';
import { last, first } from 'lodash-es';
import { type Step } from '../types/step.types';

export interface State {
  current: string;
  steps: string[];
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
      const selectedIndex = state.steps.findIndex((step) => step === state.current);

      if (selectedIndex + 1 === state.steps.length - 1) {
        return {
          ...state,
          current: last(state.steps)
        };
      }

      return {
        ...state,
        current: state.steps[selectedIndex + 1]
      };
    },
    [actions.previous.toString()]: (state) => {
      const selectedIndex = state.steps.findIndex((step) => step === state.current);

      if (selectedIndex - 1 < 0) {
        return {
          ...state,
          current: first(state.steps)
        };
      }

      return {
        ...state,
        current: state.steps[selectedIndex - 1]
      };
    }
  },
  {
    current: 'podcast',
    steps: ['podcast', 'preview', 'next-steps']
  }
);

export const selectors = {
  previous: (state: State): string | null => {
    const currentIndex = state.steps.findIndex((step) => step === state.current);
    if (currentIndex === 0)
      return null;
    return state.steps[currentIndex - 1];
  },
  current: (state: State): string => state.current,
  upcoming: (state: State): string | null => {
    const currentIndex = state.steps.findIndex((step) => step === state.current);

    if (currentIndex + 1 > state.steps.length - 1) {
      return null
    };

    return state.steps[currentIndex + 1];
  },
  steps: (state: State): Step[] => {
    const currentIndex = state.steps.findIndex((step) => step === state.current);

    const result = state.steps.map((name, index) => {
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
        status
      };
    });

    return result;
  }
};
