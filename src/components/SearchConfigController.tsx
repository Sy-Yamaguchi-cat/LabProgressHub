import Grid2 from "@mui/material/Grid2";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { pastMonthAmountAtom } from "@/firebase/store";
import { useAtom } from "jotai";

export default function SearchConfigController() {
    const [pastMonthAmount, setPastMonthAmount] = useAtom(pastMonthAmountAtom)
    return <Paper sx={(theme) => ({margin: theme.spacing(3)})}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="span">Search criteria</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid2 container>
                <Grid2 size={6}>
                <TextField
                    size="small"
                    label="Filter by past months"
                    type="number"
                    slotProps={{htmlInput: { min : 1 }}}
                    value={pastMonthAmount ?? 0}
                    onChange={(evt) => 
                        setPastMonthAmount(evt.target.value ? Number(evt.target.value) : null)
                    }
                />
                </Grid2>
            </Grid2>
        </AccordionDetails>
      </Accordion>
        
    </Paper>
} 