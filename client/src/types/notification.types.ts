export interface Notification {
  type: 'info' | 'success' | 'error' | 'warning';
  title: string;
  details?: string;
  visible: boolean;
  interaction?: {
    autoclose?: boolean;
  }
}
