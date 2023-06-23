import { createContext } from 'react';
import { AssessmentPortalReducerType } from '@projecthermes/client/reducers/AssessmentPortalReducer';

export const AssessmentPortalContext = createContext<{
  state: AssessmentPortalReducerType;
  dispatch: (payload: Partial<AssessmentPortalReducerType>) => void;
}>(null);
