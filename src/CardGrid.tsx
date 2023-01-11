import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Crd } from "./components/Crd"
import daraIcon from "./assets/icon-128.png";
import { Box, Button, InputBase, Modal, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlusIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from "react";
import React from 'react';

/*
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © DARA ' + new Date().getFullYear() + '.'}
    </Typography>
  );
}
*/

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledCardGridContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  flexGrow: 1,
}));

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const automaEvent = '__automa-ext__';
let recordWorkflowEvent = (url = "") => new CustomEvent(
  automaEvent, {
  'detail': {
    'type': 'record-workflow',
    'data': {
      "url": url
    },
  }
});
const fetchWorkflowsEvent = (revalidate = false) => new CustomEvent(automaEvent, {
  'detail': {
    'type': 'worflow-fetchall',
    'data': { "revalidate": revalidate },
  }
});

export default function CardGrid() {
  const [filter, setFilter] = useState("");
  const [workflows, setWorkflows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formularUrlRef = useRef<HTMLInputElement>();


  const workflowDataEventHandler = (event: any) => {
    if (event.origin === window.location.origin) {
      if (event.data.workflows) {
        let workflowArray = []
        for (const [_, value] of Object.entries(event.data.workflows)) {
          workflowArray.push(value)
        }
        setWorkflows(workflowArray);
      }
    }
  }
  window.addEventListener('message', workflowDataEventHandler);
  useEffect(() => {
    window.dispatchEvent(fetchWorkflowsEvent(true));
  }, []);

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value);
  };

  const handleStartRecording = () => {
    if (formularUrlRef.current) {
      window.dispatchEvent(recordWorkflowEvent(formularUrlRef.current.value))
    }
  }


  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/*Include icon here*/}
          <img src={daraIcon} alt="DARA Logo" width="30" height="30" />


          <StyledTypography variant="h6" color="inherit" sx={{ml: 2}}>
            DARA - Ihr Assistent für Datenanfragen
          </StyledTypography>
          <Button
            onClick={handleOpen}
            startIcon={<PlusIcon />}
            sx={{ my: 2, mx: 0.5, color: 'white' }}
          >
            Neuen Klickpfad aufzeichnen
          </Button>
          <Button
            onClick={() => {
              window.dispatchEvent(fetchWorkflowsEvent(true));
            }}
            sx={{ my: 2, mx:0.5, color: 'white' }}
            startIcon={<RefreshIcon />}
          >
            Klickpfade aktualisieren
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Suche…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <main>
        {/* Card grid */}
        <StyledCardGridContainer maxWidth="md">
          <Grid
            container
            spacing={4}
            direction="row"
          >
            {/*controllers &&
              controllers.map((controller: any) => (
                controller.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={controller} key={controller.name} />
              ))
              */}
            {workflows &&
              workflows.map((workflow: any) => (
                <Crd controller={workflow} key={workflow.id} />
              ))
            }
          </Grid>
          {/* End Card grid */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 700,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
              width='700'
              noValidate
              autoComplete="off">
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Neuen Klickpfad aufzeichnen
              </Typography>
              <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                Hier können sie einen neuen Klickpfad zur Automatisierung einer Datenanfrage aufzeichenen.
                Als ersten Schritt geben sie bitte die URL / Internetadresse des Onlineformulars für die Datenanfrage an.
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Formular URL"
                autoFocus={true}
                defaultValue=""
                inputRef={formularUrlRef}
                sx={{ mb: 2 }}
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nach dem Klick auf den "Aufzeichnung starten" Button  wird ein neuer Tab mit der angegebenen URL geöffnet. Hier können sie wie gewohnt ihre Daten beantragen. 
                Nur ihre Klicks werden aufgezeichnet, keine eigegebenen Daten oder sonstige Informationen. 
                Nach dem Absenden der Datenanfrage beenden sie die Aufzeichnung über den roten Button. Der Klickpfand wird lokal gespeichert und erscheint in der Übersicht. 
              </Typography>
              <Button onClick={() => {
                handleStartRecording();
                handleClose();
              }}
                sx={{ mt: 2 }}
                >
                Aufzeichnung starten
              </Button>
            </Box>
          </Modal>
        </StyledCardGridContainer>
      </main>

      {/* Footer */}
      < StyledFooter >
        <StyledTypography variant="h6" align="center" gutterBottom>
          DARA - Data Access Request Assistant
        </StyledTypography>
        {/* <Copyright /> */}
      </StyledFooter >
      {/* End footer */}
    </>
  );
}
