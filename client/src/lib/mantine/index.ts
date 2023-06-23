import { MantineThemeOverride } from '@mantine/core';

const inputStyles = {
  borderRadius: '8px',
  background: '#2C2C2C',
  height: '3rem',
  marginBottom: '3rem',
  color: 'white',
};

const labelStyles = {
  color: '#868E96',
  marginBottom: '0.8rem',
};

export const themeOverrides: MantineThemeOverride = {
  components: {
    TextInput: {
      styles: {
        root: {
          input: {
            borderRadius: '8px',
            background: '#2C2C2C',
            height: '3rem',
            marginBottom: '3rem',
            color: 'white',
          },
          label: labelStyles,
        },
      },
    },
    Textarea: {
      styles: {
        root: {
          textarea: {
            background: '#2C2C2C',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '3rem',
          },
          label: labelStyles,
        },
      },
    },
    DateInput: {
      styles: {
        root: {
          input: inputStyles,
          label: labelStyles,
        },
      },
    },
    Avatar: {
      styles: {
        placeholder: {
          backgroundColor: '#2A2A2D !important',
        },
        placeholderIcon: {},
      },
    },
    NumberInput: {
      styles: {
        root: {
          input: inputStyles,
          label: labelStyles,
        },
      },
    },
  },
  // Select: {
  //   styles: {
  //   }
  // }
};
