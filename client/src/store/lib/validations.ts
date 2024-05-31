import State from "../state";

export const onboardingUpcomingEnabled = (state: State): boolean => {
  if (state.onboarding.setupType === null) {
    return false;
  }

  return true;
}
