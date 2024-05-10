export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface Step {
  name: string;
  visible: boolean;
  status: StepStatus;
}
