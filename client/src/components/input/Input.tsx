import { TextInput } from '@mantine/core';

export function Input() {
  return (
    <TextInput
      placeholder="Email"
      styles={{
        input: {
          borderRadius: '16px',
          background: '#242424',
        },
      }}
    />
  );
}
