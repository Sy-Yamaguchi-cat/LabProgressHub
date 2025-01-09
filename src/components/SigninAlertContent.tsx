import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";


import AccountCircle from "@mui/icons-material/AccountCircle";
import { signIn } from "@/firebase/authentication";


export default function SigninAlertContent() {
    return <Box sx={(theme)=>({margin: theme.spacing(3)})}>
            <Alert variant="outlined"severity="info" action={
                <Button
                color="inherit"
                size="small"
                endIcon={<AccountCircle />}
                onClick={signIn}
                >
                Sign in
                </Button>
            }>
            Please sign in to enable the features on this page.
        </Alert>
    </Box>
}