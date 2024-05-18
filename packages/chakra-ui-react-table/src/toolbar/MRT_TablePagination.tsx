import { IconButton, Flex, Text } from '@chakra-ui/react';
import Pagination from '../pagination';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  position?: 'top' | 'bottom';
  table: MRT_TableInstance<TData>;
}

const commonActionButtonStyles: Record<string, any> = {
  userSelect: 'none',
  '&:disabled': {
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export const MRT_TablePagination = <TData extends Record<string, any> = {}>({
  table,
  position = 'bottom',
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: {
      enableToolbarInternalActions,
      icons: {
        IconChevronLeftPipe,
        IconChevronRightPipe,
        IconChevronLeft,
        IconChevronRight,
      },
      localization,
      mantinePaginationProps,
      paginationDisplayMode,
      rowCount,
    },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const paginationProps =
    mantinePaginationProps instanceof Function
      ? mantinePaginationProps({ table })
      : mantinePaginationProps;

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons =
    numberOfPages > 2 && paginationProps?.withEdges !== false;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  return (
    <Flex
      align="center"
      justify="end"
      gap="lg"
      py="xs"
      px="sm"
      width={'100%'}
      mt={
        position === 'top' && enableToolbarInternalActions && !showGlobalFilter
          ? '3rem'
          : undefined
      }
      p="relative"
      sx={{ zIndex: 2 }}
    >
      {paginationDisplayMode === 'pages' ? (
        <Pagination
          onChange={(newPageIndex) => {
            console.log({ newPageIndex });
            setPageIndex(newPageIndex);
          }}
          onRowsPerPageChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
          total={numberOfPages}
          value={pageIndex}
          withEdges={showFirstLastPageButtons}
          nextIcon={<IconChevronRight />}
          previousIcon={<IconChevronLeft />}
          showRowsPerPageOptions={paginationProps?.showRowsPerPageOptions}
          rowsPerPageOptions={paginationProps?.rowsPerPageOptions}
          firstIcon={<IconChevronLeftPipe />}
          lastIcon={<IconChevronRightPipe />}
          {...paginationProps}
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Text>{`${
            lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
          }-${lastRowIndex.toLocaleString()} ${
            localization.of
          } ${totalRowCount.toLocaleString()}`}</Text>
          <Flex gap="xs">
            {showFirstLastPageButtons && (
              <IconButton
                aria-label={localization.goToFirstPage}
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex(0)}
                sx={commonActionButtonStyles}
              >
                <IconChevronLeftPipe />
              </IconButton>
            )}
            <IconButton
              aria-label={localization.goToPreviousPage}
              disabled={pageIndex <= 0}
              onClick={() => setPageIndex(pageIndex - 1)}
              sx={commonActionButtonStyles}
            >
              <IconChevronLeft />
            </IconButton>
            <IconButton
              aria-label={localization.goToNextPage}
              disabled={lastRowIndex >= totalRowCount}
              onClick={() => setPageIndex(pageIndex + 1)}
              sx={commonActionButtonStyles}
            >
              <IconChevronRight />
            </IconButton>
            {showFirstLastPageButtons && (
              <IconButton
                aria-label={localization.goToLastPage}
                disabled={lastRowIndex >= totalRowCount}
                onClick={() => setPageIndex(numberOfPages - 1)}
                sx={commonActionButtonStyles}
              >
                <IconChevronRightPipe />
              </IconButton>
            )}
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};
