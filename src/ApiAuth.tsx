import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { Button, DialogActions, TextField } from '@mui/material';


export function uploadClickpath(controller: any, enqueueSnackbar: any) {
    const access_token = sessionStorage.getItem('access_token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);
    headers.append('Content-Type', 'application/json');

    fetch('https://v2202301191442214869.powersrv.de/controllers/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(controller),
    })
        .then(response => response.json())
        .then(data => {
            if (data.detail === "Could not validate credentials") {
                enqueueSnackbar(`Login abgelaufen, bitte neu anmelden.`, { variant: 'info' })
                sessionStorage.setItem('access_token', '');
            } else {
                console.log('Success:', data);
                enqueueSnackbar(`Klickpfad erfolgreich hochgeladen!`, { variant: 'success' })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            enqueueSnackbar(`Fehler beim Hochladen!`, { variant: 'error' })
        });
}

export function checkLoginStatus() {
    const access_token = sessionStorage.getItem('access_token');
    if (access_token) {
        return true;
    } else {
        return false;
    }
}

interface LoginDialogProps {
    setOpen: Function,
    controller: any,
    open: boolean
}

export function LoginDialog(props: LoginDialogProps) {
    const { enqueueSnackbar } = useSnackbar();
    const usernameRef = React.useRef<HTMLInputElement>();
    const passwordRef = React.useRef<HTMLInputElement>();

    const handleClose = () => {
        props.setOpen(false);
    }

    const fetchAccessToken = () => {
        if (usernameRef.current && passwordRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;

            // Get access_token from backend
            fetch('https://v2202301191442214869.powersrv.de/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                },
                body: new URLSearchParams({
                    "username": username,
                    "password": password,
                    "grant_type": "",
                    "scope": "",
                    "client_id": "",
                    "client_secret": "",
                }),
            })
                .then(response => response.json())
                .then((data: any) => {
                    console.log('Success:', data);
                    // Set access_token in sessionStorage
                    if (data['access_token']) {
                        sessionStorage.setItem('access_token', data['access_token']);
                        enqueueSnackbar(`Erfolgreich eingeloggt!`, { variant: 'success' })
                        if (props.controller) uploadClickpath(props.controller, enqueueSnackbar);
                        handleClose();
                    } else {
                        enqueueSnackbar(`Fehler beim Login!`, { variant: 'error' })
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    enqueueSnackbar(`Fehler beim Login!`, { variant: 'error' })
                });
        }
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ maxWidth: '350px' }}>
                    {"Um den Klickpfad hochzuladen, müssen Sie sich einloggen."}
                </DialogTitle>
                <DialogActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '350px' }}>
                    <TextField
                        required
                        type="text"
                        label="Username"
                        autoFocus={true}
                        defaultValue=""
                        inputRef={usernameRef}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        required
                        type="password"
                        label="Passwort"
                        defaultValue=""
                        inputRef={passwordRef}
                        sx={{ m: 1 }}
                    />
                    <Button onClick={() => {
                        fetchAccessToken();
                    }}
                        sx={{ m: 1 }}
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};