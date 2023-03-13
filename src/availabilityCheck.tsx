import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { Container } from '@mui/system';
import chormelogo from './assets/webstore.png';
import firefoxlogo from './assets/ffaddons.png';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    React.useEffect(() => {
        if (checkExtensionAvailability()) {
            enqueueSnackbar(`${t('extension_available')}`)
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                container={() => document.getElementById('aviailabilty-check-parent')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ position: 'absolute' }}
                BackdropProps={{ style: { position: 'absolute' }, invisible: true }}
            >
                <DialogTitle id="alert-dialog-title">
                    {t('extension_not_available')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('extension_not_available_text')}
                    </DialogContentText>
                    <br></br>
                    <DialogContentText id="alert-dialog-description" sx={{ 'text-align': 'center' }} >
                        {t('extension_not_available_text2')}
                    </DialogContentText>
                    <br></br>
                    <Container sx={{ 'align': 'center' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Container>
                                            <a href="https://chrome.google.com/webstore/detail/automa/heolgaalbnnelipfhbccbkdohecmaimo" target='_blank' rel="noreferrer">
                                                <img height={'60px'} src={chormelogo} alt="Chrome webstore" />
                                            </a>
                                        </Container>
                                    </td>
                                    <td>
                                        <Container>
                                            <a href="https://addons.mozilla.org/en-US/firefox/addon/dara/" target='_blank' rel="noreferrer">
                                                <img height={'60px'} src={firefoxlogo} alt="Firefox add-ons" />
                                            </a>
                                        </Container>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </DialogContent>
            </Dialog >
        </>
    );
};