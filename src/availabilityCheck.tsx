import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';


export const checkExtensionAvailability = () => {
    if (document.body.getAttribute('data-atm-ext-installed')) {
        return true
    } else {
        return false
    }
}

export default function ExtensionAvailabilityCheck() {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event: any, reason: any) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    React.useEffect(() => {
        if (checkExtensionAvailability()) {
            enqueueSnackbar(`Browser extension is available, ready to go!`)
        } else {
            setOpen(true);
        }
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You need the DARA browser-extension to use this service."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        For DARA to be able to atomatically send a data access request on your behalf, our extension must be installed in your browser.
                    </DialogContentText>
                    <br></br>
                    <DialogContentText id="alert-dialog-description" sx={{ 'text-align': 'center' }} >
                        You can download it here:
                    </DialogContentText>
                </DialogContent>
                {/*
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
                */}
            </Dialog>
        </>
    );
};