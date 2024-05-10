import State from "../state";

export const onboardingUpcomingEnabled = (state: State): boolean => {
  if (state.setupType.type === null) {
    return false;
  }

  return true;
}
