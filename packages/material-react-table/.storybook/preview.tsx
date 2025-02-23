import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';

import { ColorModeProvider } from '../src/components/ui/color-mode';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  Link,
  Text,
} from '@chakra-ui/react';

const channel = addons.getChannel();

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Inter, sans-serif' },
        body: { value: 'Inter, sans-serif' },
        mono: { value: 'Roboto Mono, monospace' },
      },
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        light: 'light',
        dark: 'dark',
      },
    }),
    (Story, context) => {
      useEffect(() => {
        if (process.env.NODE_ENV === 'development') return;
        const script = document.createElement('script');
        script.src = 'https://plausible.io/js/script.js';
        script.setAttribute('data-domain', 'material-react-table.dev');
        script.defer = true;

        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      return (
        <ColorModeProvider>
          <ChakraProvider value={system}>
            <Text
              css={{
                pb: '0.5rem',
              }}
            >
              Looking for the main docs site? Click{' '}
              <Link
                href="https://www.material-react-table.com"
                target="_blank"
                rel="noopener"
              >
                here.
              </Link>
            </Text>
            <Text
              css={{
                pb: '1rem',
              }}
            >
              View Source code for these examples in the code tab below or{' '}
              <Link
                href="https://github.com/KevinVandy/material-react-table/tree/v3/packages/material-react-table/stories/features"
                target="_blank"
              >
                here on GitHub.
              </Link>
            </Text>
            <Story {...context} />
            <Story />
          </ChakraProvider>
        </ColorModeProvider>
      );
    },
  ],
};

export default preview;
