import { Reducer } from 'react';
import { Action } from '@projecthermes/client/common/types';

export const generatePatchedReducer = <T>(): Reducer<T, Action<T>> => {
  return (state, action): T => {
    switch (action.type) {
      case 'MUTATE_STATE':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
};
