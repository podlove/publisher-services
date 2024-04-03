export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface Step {
  name: string;
  status: StepStatus;
}
