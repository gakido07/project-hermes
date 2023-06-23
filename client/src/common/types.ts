export interface Action<T, Z = 'MUTATE_STATE'> {
  type: Z;
  payload: Partial<T>;
}

export type AlertSeverity = 'error' | 'success' | 'info' | 'warning';

export type AssessmentListSortState = 'newest' | 'name';
