import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { ReactComponent as ChromeLogo } from './assets/chrome-webstore.svg';
import { Container } from '@mui/system';


export const checkExtensionAvailability = () => {
    if (document.body.getAttribute('data-atm-ext-installed')) {
        return true
    } else {
        return false
    }
}

export default function ExtensionAvailabilityCheck() {
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = (event: any, reason: any) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    React.useEffect(() => {
        if (checkExtensionAvailability()) {
            enqueueSnackbar(`Connected to browser extension, ready to go!`)
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
                        You can download it for chrome-based browsers or firefox:
                    </DialogContentText>
                    <br></br>
                    <Container sx={{ 'align': 'center' }}>
                        <table>
                            <tr>
                                <td>
                                    <Container sx={{ 'width': '15rem' }}>
                                        <a href="https://chrome.google.com/webstore/detail/automa/heolgaalbnnelipfhbccbkdohecmaimo">
                                            <ChromeLogo />
                                        </a>
                                    </Container>
                                </td>
                                <td>
                                    <Container sx={{ 'width': '15rem' }}>
                                        <a href="https://addons.mozilla.org/en-US/firefox/addon/dara/">
                                            <img src="https://user-images.githubusercontent.com/22908993/166417727-3481fef4-00e5-4cf0-bb03-27fb880d993c.png" alt="Firefox add-ons" />
                                        </a>
                                    </Container>
                                </td>
                            </tr>
                        </table>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};