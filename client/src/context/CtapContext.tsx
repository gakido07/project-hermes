import { createContext, Dispatch, SetStateAction } from 'react';
import { CtapReducerType } from '@projecthermes/client/reducers/CtaxReducer';
import { Action } from '@projecthermes/client/common/types';

export const CtapContext = createContext<{
  state: CtapReducerType;
  dispatch: (payload: Partial<CtapReducerType>) => void;
}>(null);
