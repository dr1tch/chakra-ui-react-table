import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  type DialogContentProps,
} from '../ui/dialog';
import { DialogOpenChangeDetails, Stack } from '@chakra-ui/react';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';

export interface MRT_EditRowModalProps<TData extends MRT_RowData>
  extends Partial<DialogContentProps> {
  open: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends MRT_RowData>({
  open,
  table,
  ...rest
}: MRT_EditRowModalProps<TData>) => {
  const {
    getState,
    options: {
      localization,
      muiCreateRowModalProps,
      muiEditRowDialogProps,
      onCreatingRowCancel,
      onEditingRowCancel,
      renderCreateRowDialogContent,
      renderEditRowDialogContent,
    },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const dialogProps = {
    ...parseFromValuesOrFunc(muiEditRowDialogProps, { row, table }),
    ...(creatingRow &&
      parseFromValuesOrFunc(muiCreateRowModalProps, { row, table })),
    ...rest,
  };

  const internalEditComponents = row
    .getAllCells()
    .filter((cell) => cell.column.columnDef.columnDefType === 'data')
    .map((cell) => (
      <MRT_EditCellTextField
        cell={cell as any}
        key={cell.id}
        table={table as any}
      />
    ));

  return (
    <DialogRoot
      fullWidth
      maxWidth="xs"
      onOpenChange={(event: DialogOpenChangeDetails) => {
        // @ts-expect-error
        if (event.open) {
          return;
        }
        if (creatingRow) {
          onCreatingRowCancel?.({ row, table });
          setCreatingRow(null);
        } else {
          onEditingRowCancel?.({ row, table });
          setEditingRow(null);
        }
        row._valuesCache = {} as any; //reset values cache
        dialogProps.onClose?.(event);
      }}
      open={open}
      {...dialogProps}
    >
      {((creatingRow &&
        renderCreateRowDialogContent?.({
          internalEditComponents,
          row,
          table,
        })) ||
        renderEditRowDialogContent?.({
          internalEditComponents,
          row,
          table,
        })) ?? (
        // @ts-expect-error
        <DialogContent>
          <DialogHeader>
            {/* @ts-expect-error */}
            <DialogTitle css={{ textAlign: 'center' }}>
              <span>{localization.edit}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack
                css={{
                  gap: '32px',
                  paddingTop: '16px',
                  width: '100%',
                }}
              >
                {internalEditComponents}
              </Stack>
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger css={{ p: '1.25rem' }} asChild>
              <MRT_EditActionButtons row={row} table={table} variant="text" />
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      )}
    </DialogRoot>
  );
};
