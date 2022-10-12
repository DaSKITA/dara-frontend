import { Grid, Card, CardActionArea, CardHeader, capitalize, CardActions, Button, Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import BusinessIcon from '@mui/icons-material/Business';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useSnackbar, SnackbarKey } from 'notistack';
import { checkExtensionAvailability } from '../availabilityCheck'

export const Crd = ({ controller }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const timer = React.useRef<number>();
  const automaEvent = '__automa-ext__';
  let currentWorkflowTabId = 0;

  const executeWorkflowEvent = new CustomEvent(automaEvent, {
    'detail': {
      'type': 'execute-workflow',
      'data': { "workflow": controller.automation.definition }
    }
  });

  const closeTabEvent = () => new CustomEvent(automaEvent, {
    'detail': {
      'type': 'remove-tab',
      'data': { "tabId": currentWorkflowTabId }
    }
  });

  const openTabEvent = () => {
    return new CustomEvent(automaEvent, {
      'detail': {
        'type': 'set-active-tab',
        'data': { "tabId": currentWorkflowTabId }
      }
    })
  };

  const setExecutionTimeout = (timeout: number) => {
    timer.current = window.setTimeout(() => {
      endExecution();
      // Offer to repeat execution with tab in foreground
      enqueueSnackbar(`[${controller.name}] Request submission time out reached.`, { variant: 'error', action: restartWfForeground, persist: true })
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
        OPEN TAB
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
        window.dispatchEvent(executeWorkflowEvent);
        window.addEventListener('message', eventHandler);

        closeSnackbar(snackbarId);
        window.dispatchEvent(openTabEvent());

      }}>
        RESTART
      </Button>
      <IconButton
        size="small"
        onClick={() => {
          closeSnackbar(snackbarId);
          endExecution();
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
      enqueueSnackbar(`[${controller.name}] Successfuly requested your data.`, { variant: 'success' });

      // Todo: Inform user about how and when the data will be transmitted to them. 
      // This could be done via a controller-specific modal offering information. Possibly offer a calendar reminder ics?

      // The workflow execution started
    } else if (event.data.workflow_state === 'started') {
      currentWorkflowTabId = event.data.workflowTabId;
      enqueueSnackbar(`[${controller.name}] Executing the click path.`, { variant: 'info' });

      // A previous request is still pending
    } else if (event.data.workflow_state === 'request-pending') {
      enqueueSnackbar(`[${controller.name}] A previous request is still pending.`, { variant: 'info' });
      setSuccess(true);
      setLoading(false);
      clearTimeout(timer.current);
      // Todo: Inform user about how and when the data will be transmitted to them. 

      // We require user interaction to proceed
    } else if (event.data.workflow_state === 'interaction-needed') {
      currentWorkflowTabId = event.data.workflowTabId;
      clearTimeout(timer.current);
      enqueueSnackbar(`[${controller.name}] Manual input is required to finish the request.`, { variant: 'warning', action: openTabAction, persist: true });

      // The execution failed
    } else if (event.data.workflow_state === 'failed') {
      endExecution();

      // Offer to repeat execution with tab in foreground
      enqueueSnackbar(`[${controller.name}] Could not finish request.`, { variant: 'error', action: restartWfForeground, persist: true })
    }
  }

  const onClickExecuteRequest = () => {

    if (!checkExtensionAvailability()) {
      enqueueSnackbar(`Could not reach extension, is it installed?`, { variant: 'error' })
      return;
    }

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setExecutionTimeout(15000);
    }
    window.dispatchEvent(executeWorkflowEvent);
    window.addEventListener('message', eventHandler);
  }

  return (
    <>
      <Grid item key={controller.name} xs={12} sm={6} md={4}>
        <Card>
          <CardActionArea
            target="_blank"
            href={controller.dsar_url}
          >
            <CardHeader
              title={capitalize(controller.name)}
              titleTypographyProps={{
                variant: "h6",
                component: "h2"
              }}
              subheader="Data Request Page"
              avatar={
                <Avatar
                  alt={capitalize(controller.name) + ' logo'}
                // src={"https://besticon.herokuapp.com/icon?size=32..200..500&url=" + controller.hostnames[0]}
                >
                  <BusinessIcon />
                </Avatar>
              }
            />
          </CardActionArea>
          <CardActions>
            {controller.automation &&
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
                {success ? "Requested Data" : "Request Data"}
              </LoadingButton>
            }
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}