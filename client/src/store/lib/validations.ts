import State from "../state";

export const onboardingUpcomingEnabled = (state: State): boolean => {
  if (state.onboarding.setupType === null) {
    return false;
  }

  if (state.onboarding.current === 'import-feed' && state.feed.feedStatus !== 'valid') {
    return false;
  }

  return true;
}
