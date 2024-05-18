import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export interface PaginationProps {
  value: number;
  total: number;
  onChange: (newPageIndex: number) => void;
  nextIcon?: React.ReactElement;
  previousIcon?: React.ReactElement;
  firstIcon?: React.ReactElement;
  lastIcon?: React.ReactElement;
  pageSize: number;
  rowsPerPageOptions?: number[];
  withEdges?: boolean;
  showRowsPerPageOptions?: boolean;
  onRowsPerPageChange?: (newPageSize: number) => void;
}

export default function Pagination({
  value,
  total,
  onChange,
  pageSize,
  nextIcon,
  previousIcon,
  firstIcon,
  lastIcon,
  rowsPerPageOptions = [5, 10, 15, 20, 25, 30, 50, 100],
  showRowsPerPageOptions = true,
  withEdges,
  onRowsPerPageChange,
}: PaginationProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.700', 'white');
  return (
    <Flex
      justifyContent="space-between"
      my={4}
      gap={6}
      alignItems="center"
      bg={bg}
      color={color}
    >
      <Flex>
        {withEdges && (
          <Tooltip label="First Page">
            <IconButton
              aria-label="First Page"
              onClick={() => onChange(0)}
              isDisabled={value === 0}
              icon={firstIcon}
              mr={4}
            />
          </Tooltip>
        )}
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="Previous Page"
            onClick={() => onChange(value - 1)}
            isDisabled={value === 0}
            icon={previousIcon}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{' '}
          <Text fontWeight="bold" as="span">
            {value + 1}
          </Text>{' '}
          of{' '}
          <Text fontWeight="bold" as="span">
            {total}
          </Text>
        </Text>
        <Text flexShrink="0">Go to page:</Text>{' '}
        <NumberInput
          ml={2}
          mr={8}
          min={1}
          max={total}
          onChange={(value) => {
            const page = value ? Number(value) - 1 : 0;
            onChange(page);
          }}
          defaultValue={value + 1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {showRowsPerPageOptions && (
          <Select
            width={32}
            value={pageSize}
            onChange={(e) => {
              onRowsPerPageChange &&
                onRowsPerPageChange(Number(e.target.value));
            }}
          >
            {rowsPerPageOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        )}
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            aria-label="Next Page"
            onClick={() => {
              console.log({ value, total });
              onChange(value + 1);
            }}
            isDisabled={value === total - 1}
            icon={nextIcon}
          />
        </Tooltip>
        {withEdges && (
          <Tooltip label="Last Page">
            <IconButton
              aria-label="Last Page"
              onClick={() => onChange(total - 1)}
              isDisabled={value === total - 1}
              icon={lastIcon}
              ml={4}
            />
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
}
