import {
  Box,
  ProgressCircle,
  type ProgressCircleRootProps,
} from '@chakra-ui/react';
// import { alpha } from '@mui/material/styles';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableLoadingOverlayProps<TData extends MRT_RowData>
  extends ProgressCircleRootProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableLoadingOverlay = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_TableLoadingOverlayProps<TData>) => {
  const {
    options: {
      id,
      localization,
      mrtTheme: { baseBackgroundColor },
      muiCircularProgressProps,
    },
  } = table;

  const circularProgressProps = {
    ...parseFromValuesOrFunc(muiCircularProgressProps, { table }),
    ...rest,
  };

  return (
    <Box
      css={{
        alignItems: 'center',
        backgroundColor: `${baseBackgroundColor}/50`,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        maxHeight: '100vh',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 3,
      }}
    >
      {circularProgressProps?.Component ?? (
        <ProgressCircle.Root
          value={null}
          size="sm"
          aria-label={localization.noRecordsToDisplay}
          id={`mrt-progress-${id}`}
          {...circularProgressProps}
        >
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      )}
    </Box>
  );
};
