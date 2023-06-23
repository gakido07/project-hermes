import { Reducer, useReducer } from 'react';
import { Action } from '@projecthermes/client/common/types';

export function useWrappedReducer<T>(
  reducer: Reducer<T, Action<T>>,
  initialState: T,
) {
  const [state, reducerDispatch] = useReducer(reducer, initialState);
  const dispatch = (payload: Partial<T>) => {
    reducerDispatch({
      type: 'MUTATE_STATE',
      payload,
    });
  };
  return [state, dispatch] as const;
}
