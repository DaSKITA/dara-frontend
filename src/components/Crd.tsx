import { Grid, Card, CardHeader, capitalize, CardActions, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { checkLoginStatus, uploadClickpath } from '../ApiAuth';
import React from 'react';
import { useSnackbar, SnackbarKey } from 'notistack';
import { checkExtensionAvailability } from '../availabilityCheck'
import { fetchWorkflowsEvent, executeWorkflowEvent, deleteWorkflowEvent, editWorkflowEvent } from '../events'


interface CrdProps {
  openLoginDialog: Function,
  controller: any
}

function isFF() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

export const Crd = (props: CrdProps) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const timer = React.useRef<number>();
  let currentWorkflowTabId = 0;
  let automaEvent = '__automa-ext__';

  let closeTabEvent = () => new CustomEvent(automaEvent, {
    'detail': {
      'type': 'remove-tab',
      'data': { "tabId": currentWorkflowTabId }
    }
  });

  let openTabEvent = () => new CustomEvent(automaEvent, {
    'detail': {
      'type': 'set-active-tab',
      'data': { "tabId": currentWorkflowTabId }
    }
  });


  const setExecutionTimeout = (timeout: number) => {
    timer.current = window.setTimeout(() => {
      // endExecution();
      // Offer to repeat execution with tab in foreground
      enqueueSnackbar(`[${props.controller.name}] Die Anfrage braucht länger als erwartet.`, { variant: 'warning', action: restartWfForeground, persist: true })
    }, timeout);
  }

  const openTabAction = (snackbarId: SnackbarKey | undefined) => (
    <>
      <Button
        color="inherit"
        onClick={() => {
          window.dispatchEvent(openTabEvent());
          setExecutionTimeout(20000);
          closeSnackbar(snackbarId);
        }}>
        TAB ÖFFNEN
      </Button>
      <IconButton
        size="small"
        onClick={() => {
          closeSnackbar(snackbarId)
          endExecution()
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const restartWfForeground = (snackbarId: SnackbarKey | undefined) => (
    <>
      <Button color="inherit" onClick={() => {
        window.dispatchEvent(executeWorkflowEvent(props.controller));
        window.addEventListener('message', eventHandler);

        closeSnackbar(snackbarId);
        window.dispatchEvent(openTabEvent());

      }}>
        NEUSTART
      </Button>
      <Button color="inherit" onClick={() => {
        endExecution();
        closeSnackbar(snackbarId);
      }}>
        STOP
      </Button>
      <IconButton
        size="small"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  function endExecution() {
    setFailed(true);
    setLoading(false);
    clearTimeout(timer.current);
    window.removeEventListener('message', eventHandler);
    window.dispatchEvent(closeTabEvent());
  }

  function eventHandler(event: any) {

    // The execution was completed successfully
    if (event.data.workflow_state === 'completed') {
      setSuccess(true);
      setLoading(false);
      clearTimeout(timer.current);
      window.removeEventListener('message', eventHandler);
      closeSnackbar();
      enqueueSnackbar(`[${props.controller.name}] Daten erfolgreich angefragt.`, { variant: 'success' });

      // Todo: Inform user about how and when the data will be transmitted to them. 
      // This could be done via a props.controller-specific modal offering information. Possibly offer a calendar reminder ics?

      // The workflow execution started
    } else if (event.data.workflow_state === 'started') {
      currentWorkflowTabId = event.data.workflowTabId;
      enqueueSnackbar(`[${props.controller.name}] Der Klickpfad wird ausgeführt.`, { variant: 'info' });

      // A previous request is still pending
    } else if (event.data.workflow_state === 'request-pending') {
      enqueueSnackbar(`[${props.controller.name}] Ein vorherige Anfrage wird noch bearbeitet.`, { variant: 'info' });
      setSuccess(true);
      setLoading(false);
      clearTimeout(timer.current);
      // Todo: Inform user about how and when the data will be transmitted to them. 

      // We require user interaction to proceed
    } else if (event.data.workflow_state === 'interaction-needed') {
      currentWorkflowTabId = event.data.workflowTabId;
      clearTimeout(timer.current);
      enqueueSnackbar(`[${props.controller.name}] Eine Eingabe wird benötigt um die Anfrage abzuschließen.`, { variant: 'warning', action: openTabAction, persist: true });

      // Could not start the request
    } else if (event.data.workflow_state === 'start-failed') {
      currentWorkflowTabId = event.data.workflowTabId;
      clearTimeout(timer.current);
      enqueueSnackbar(`[${props.controller.name}] Konnte die Anfrage nicht starten, sind sie auf der Seite des Anbieters eingeloggt?`, { variant: 'warning', action: openTabAction, persist: true });

      // The execution failed
    } else if (event.data.workflow_state === 'failed') {
      endExecution();

      // Offer to repeat execution with tab in foreground
      enqueueSnackbar(`[${props.controller.name}] Konnte die Anfrage leider nicht abschließen.`, { variant: 'error', action: restartWfForeground, persist: true })
    }
  }

  const onClickExecuteRequest = () => {

    if (!checkExtensionAvailability()) {
      enqueueSnackbar(`Konnte die DARA-Browsererweiterung nicht erreichen, ist sie installiert?`, { variant: 'error' })
      return;
    }

    if (isFF()) {
      setSuccess(true);
      let nodes = props.controller.drawflow.nodes;
      for (let node in nodes) {
        if (nodes[node].label === "new-tab") {
          nodes[node].data.active = true;
        }
      }

    } else {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        setExecutionTimeout(15000);
      }
      window.addEventListener('message', eventHandler);
    }
    window.dispatchEvent(executeWorkflowEvent(props.controller));
  }

  return (
    <>
      <Grid item key={props.controller.name} xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            title={capitalize(props.controller.name)}
            titleTypographyProps={{
              variant: "h6",
              component: "h2"
            }}
            action={
              <>
                <IconButton
                  onClick={handleClick}
                  aria-label="more"
                  id="menu"
                  aria-controls={open ? 'menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true">
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="menu"
                  open={open}
                  onClose={handleClose}
                  anchorEl={anchorEl}>
                  <MenuItem onClick={() => { window.dispatchEvent(editWorkflowEvent(props.controller.id)) }}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Bearbeiten</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => { window.dispatchEvent(deleteWorkflowEvent(props.controller.id)) }}>
                    <ListItemIcon>
                      <CloseIcon />
                    </ListItemIcon>
                    <ListItemText>Löschen</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    if (checkLoginStatus()) {
                      uploadClickpath(props.controller, enqueueSnackbar)
                    } else {
                      props.openLoginDialog(props.controller);
                    }
                    setTimeout(() => window.dispatchEvent(fetchWorkflowsEvent(true)), 1200);
                  }}>
                    <ListItemIcon>
                      <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText>Upload</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            }
            subheader={props.controller.verified ? "✓ DARA Orginal Klickpfad" : "Lokaler Klickpfad"}
          />
          <CardActions>
            {props.controller &&
              <LoadingButton
                size="small"
                variant="outlined"
                loading={loading}
                disabled={success ? true : false}
                style={{
                  textTransform: 'none',
                }}
                endIcon={
                  success ? <CheckIcon />
                    : failed ? <ErrorIcon />
                      : <SendIcon />
                }
                loadingPosition="end"
                onClick={() => onClickExecuteRequest()}
              >
                {success ? "Daten angefragt" : "Sende Datenanfrage"}
              </LoadingButton>
            }
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}