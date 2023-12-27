import {FC} from 'react'
import {Fade, Tooltip as MuiTooltip, TooltipProps, Typography} from '@mui/material';


export const Tooltip: FC<TooltipProps> = ({children, placement, title}) => {
  return (
    <MuiTooltip TransitionComponent={Fade}
                arrow
                TransitionProps={{timeout: 600}} placement={placement}
                title={<Typography fontSize={20}>{title}</Typography>}>
      {children}
    </MuiTooltip>
  );
};
