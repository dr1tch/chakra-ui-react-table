import {
  ChakraProvider,
  createSystem,
  defineConfig,
  defaultConfig,
} from '@chakra-ui/react';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Theming',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];

const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const DefaultTheme = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const CustomLightTheme = () => {
  const theme = defineConfig({
    theme: {
      tokens: {
        colors: {
          default: { value: '#ffffef' },
          primary: { value: '#ff9800' },
          secondary: { value: '#00bcd4' },
        },
      },
    },
  });

  const customTheme = createSystem(defaultConfig, theme);
  return (
    <ChakraProvider value={customTheme}>
      <MaterialReactTable columns={columns} data={data} enableRowSelection />
    </ChakraProvider>
  );
};

// export const CustomDarkTheme = () => {
//   const theme = createSystem({
//     palette: {
//       mode: 'dark',
//       primary: {
//         main: '#81980f',
//       },
//       secondary: {
//         main: '#00bcd4',
//       },
//     },
//   });
//   return (
//     <ChakraProvider value={theme}>
//       <MaterialReactTable columns={columns} data={data} enableRowSelection />
//     </ChakraProvider>
//   );
// };
