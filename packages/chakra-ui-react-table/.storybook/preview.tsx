import React, { useEffect, useState } from 'react';
import { Preview } from '@storybook/react';
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { IconBrightnessDown, IconMoon } from '@tabler/icons-react';
import { useDarkMode } from 'storybook-dark-mode';

interface ColorModeProps {
  colorMode: 'light' | 'dark';
  children: JSX.Element;
}

function ColorMode(props: ColorModeProps) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(props.colorMode);
  }, [props.colorMode]);

  return props.children;
}
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useDarkMode() ? 'dark' : 'light';
      const theme = extendTheme({
        config: {
          initialColorMode: colorScheme,
          useSystemColorMode: false,
        },
      });
      useEffect(() => {
        const sbRoot = document.getElementsByClassName(
          'sb-show-main',
        )[0] as HTMLElement;
        if (sbRoot) {
          sbRoot.style.backgroundColor =
            colorScheme === 'dark' ? '#333' : '#fff';
        }
      }, [useDarkMode()]);

      // useEffect(() => {
      //   if (process.env.NODE_ENV === 'development') return;
      //   const script = document.createElement('script');
      //   script.src = 'https://plausible.io/js/script.js';
      //   script.setAttribute('data-domain', 'mantine-react-table.dev');
      //   script.defer = true;

      //   document.body.appendChild(script);
      //   return () => {
      //     document.body.removeChild(script);
      //   };
      // }, []);
      console.log({ colorMode: context });
      return (
        <ChakraProvider theme={theme}>
          <ColorMode colorMode={colorScheme}>
            <>
              <Flex justify="space-between">
                <Stack>
                  <Text
                    sx={{
                      paddingBottom: '8px',
                      color: colorScheme === 'dark' ? '#fff' : '#666',
                    }}
                  >
                    Looking for the main docs site? Click{' '}
                    <Link
                      variant="underline"
                      href="https://www.mantine-react-table.com"
                      target="_blank"
                      rel="noopener"
                    >
                      here.
                    </Link>
                  </Text>
                  <Text
                    sx={{
                      paddingBottom: '16px',
                      color: colorScheme === 'dark' ? '#fff' : '#666',
                    }}
                  >
                    View source code below in the story tab on Canvas or the
                    Show Code Button in Docs. Toggle dark and light mode in the
                    toolbar buttons above.
                  </Text>
                </Stack>
              </Flex>
              <Story {...context} />
            </>
          </ColorMode>
        </ChakraProvider>
      );
    },
  ],
};

export default preview;
