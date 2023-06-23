import { Dispatch, SetStateAction, useState } from 'react';
import { Select as MantineSelect, SelectItem } from '@mantine/core';

interface props {
  state: [string, Dispatch<SetStateAction<string>>];
  onChange: (value: string) => void;
  data: SelectItem[];
}

export function Select({ state, onChange, data }: props) {
  const [value, setValue] = state;
  const handleChange = (value: string) => {
    setValue(value);
    onChange(value);
  };
  return <MantineSelect value={value} onChange={handleChange} data={data} />;
}
