import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { Button, DialogActions, TextField } from '@mui/material';


export function uploadClickpath(controller: any, enqueueSnackbar: any) {
    const access_token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);
    headers.append('Content-Type', 'application/json');

    fetch('https://v2202301191442214869.powersrv.de/controllers/', {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(controller),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            enqueueSnackbar(`Klickpfad erfolgreich hochgeladen!`)
        })
        .catch((error) => {
            console.error('Error:', error);
            enqueueSnackbar(`Fehler beim Hochladen!`)
        });
}

export function checkLoginStatus() {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        return true;
    } else {
        return false;
    }
}

interface LoginDialogProps {
    setOpen: Function,
    open: boolean
}

export function LoginDialog(props: LoginDialogProps) {
    const { enqueueSnackbar } = useSnackbar();
    const usernameRef = React.useRef<HTMLInputElement>();
    const passwordRef = React.useRef<HTMLInputElement>();

    const handleClose = (event: any, reason: any) => {
        props.setOpen(false);
    }

    const fetchAccessToken = () => {
        if (usernameRef.current && passwordRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;

            // Get access_token from backend
            fetch('https://v2202301191442214869.powersrv.de/token/', {
                method: 'POST',
                mode: 'no-cors',
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
                .then(data => {
                    console.log('Success:', data);
                    // Set access_token in localStorage
                    localStorage.setItem('access_token', data.access_token);
                    enqueueSnackbar(`Erfolgreich eingeloggt!`)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    enqueueSnackbar(`Fehler beim Login!`)
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
                        autoFocus={true}
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