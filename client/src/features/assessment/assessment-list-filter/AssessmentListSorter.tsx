import { Select } from '@mantine/core';
import { AssessmentListSortState } from '@projecthermes/client/common/types';
import { Dispatch, SetStateAction } from 'react';

interface props {
  state: AssessmentListSortState;
  setState: Dispatch<SetStateAction<AssessmentListSortState>>;
}

export function AssessmentListSorter({ state, setState }: props) {
  return <Select data={[]} />;
}
