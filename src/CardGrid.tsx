import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Crd } from "./components/Crd"
import Accordion from "./components/Accordion"
import daraIcon from "./assets/icon-128.png";
import { Box, Button, InputBase, Modal, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlusIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import { useEffect, useRef } from "react";
import React from 'react';
import { LoginDialog } from "./ApiAuth";


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

const socialNetworks = ['twitter', 'linkedin', 'facebook', 'instagram'];
const shopping = ['amazon', 'ebay', 'ebay_kleinanzeigen', 'otto', 'vinted'];
const software = ['apple', 'google', 'samsung', 'huawei', 'xiaomi'];
const streaming = ['netflix', 'spotify', 'deezer', 'instagram'];
const mobility = ['jelbi', 'uber', 'nextbike'];
//other - no own array required

export default function CardGrid() {
  const [filter, setFilter] = React.useState("");
  const [workflows, setWorkflows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loginDialogState, setloginDialogState] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoginDialogOpen = () => setloginDialogState(true);
  const formularUrlRef = useRef<HTMLInputElement>();
  const workflowDataEventHandler = (event: any) => {
    if (event.origin === window.location.origin) {
      if (event.data.workflows) {
        let workflowArray = []
        for (const value of Object.values(event.data.workflows)) {
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

  let originalWorkflows = [];
  let snwWorkflows = [];
  let shoppingWorkflows = [];
  let softwareWorkflows = [];
  let streamingWorkflows = [];
  let mobilityWorkflows = [];
  let localWorkflows = [];
  for (let i = 0; i < workflows.length; i++) {
    let workflow = workflows[i];
    if (workflow.verified) {
      let name = workflow.name.toLowerCase();
      if (socialNetworks.includes(name)) {
        snwWorkflows.push(workflow);
      } else if (shopping.includes(name)) {
        shoppingWorkflows.push(workflow);
      } else if (software.includes(name)) {
        softwareWorkflows.push(workflow);
      } else if (streaming.includes(name)) {
        streamingWorkflows.push(workflow);
      } else if (mobility.includes(name)) {
        mobilityWorkflows.push(workflow);
      } else {
        originalWorkflows.push(workflow);
      }
    } else {
      localWorkflows.push(workflow);
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/*Include icon here*/}
          <img src={daraIcon} alt="DARA Logo" width="30" height="30" />


          <StyledTypography variant="h6" color="inherit" sx={{ ml: 2 }}>
            DARA - Ihr Assistent für Datenanfragen
          </StyledTypography>
          <Button
            onClick={handleOpen}
            startIcon={<PlusIcon />}
            sx={{ my: 2, mx: 0.5, color: 'white' }}
          >
            Neuen Anfrageprozess aufzeichnen
          </Button>
          <Button
            onClick={() => {
              window.dispatchEvent(fetchWorkflowsEvent(true));
            }}
            sx={{ my: 2, mx: 0.5, color: 'white' }}
            startIcon={<RefreshIcon />}
          >
            Dienstanbieter aktualisieren
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Suche…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange} />
          </Search>
        </Toolbar>
      </AppBar>

      <main>
        {/* Introduction */}

        <Container maxWidth="md">
          <Box sx={{ mt: 5 }}>
            <Typography variant="h3" gutterBottom>
              DARA - Automatisierte Datenauskunft
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Typography variant='body1'>
            DARA steht für "Data Access Request Assistant" und ist ein Tool, das Ihnen bei der Ausübung Ihres Rechts auf Datenauskunft assistiert. Es besteht aus dieser Webseite und einer Browserextension, die für Sie eine Datenauskunftsanfrage an verschiedene Dienstanbieter senden kann.
            Dabei hat DARA zu keiner Zeit Zugriff auf Ihre personenbezogenen Daten, diese Daten werden nur bei den Diensten und anschließend auf Ihrem Computer gespeichert.
            Probieren Sie es einfach aus oder erfahren Sie im Abschnitt <a href='#faq'>FAQ</a> weitere Informationen.
          </Typography>
        </Container>
        {/* End Introduction */}
        {/* Main */}
        <StyledCardGridContainer maxWidth="md">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              Verifizierte Datenanfrageprozesse
            </Typography>
            <Typography variant="body1">
              Hier können Sie für ausgewählte vordefinierte Dienste eine Datenauskunft anfragen.
              Bitte loggen Sie sich bei dem entsprechenden Dienst ein, bevor Sie über diese Webseite die Daten beantragen!
            </Typography>
          </Box>
          {/* Start Card grid */}
          {snwWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2 }}>
              Soziale Netzwerke
            </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {snwWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}

            </Grid></> : <></>}

          {softwareWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              Software
            </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {softwareWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}

            </Grid></> : <></>}

          {mobilityWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              Mobilität
            </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {mobilityWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}

            </Grid></> : <></>}

          {shoppingWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              Online Shopping
            </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {shoppingWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}

            </Grid></> : <></>}
          {streamingWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              Streaminganbieter
            </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {streamingWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}
            </Grid></> : <></>}

          {originalWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderBottom: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              Sonstige
          </Typography>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {originalWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}
            </Grid></> : <></>}

          <Box sx={{ my: 4 }}>
            <Typography variant="h4" sx={{ marginTop: 8 }}>
              Lokale Datenanfrageprozesse
            </Typography>
            <Typography variant="body1">
              Hier können Sie Dienste sehen bei denen Sie manuell eine Datenanfrage gestellt haben und diesen Prozess (den sogenannten Klickpfad) aufgezeichnet haben. Eine neue Aufzeichnung können Sie mit dem Button im Menü oben recht starten.
            </Typography>
          </Box>
          {localWorkflows.length ? <>
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {localWorkflows?.map((workflow: any) => (
                workflow.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={workflow} key={workflow.id} openLoginDialog={handleLoginDialogOpen} />
              ))}

            </Grid></> : <Typography>
              Zur Zeit liegen keine lokalen Aufzeichnungen vor
            </Typography>}
          {/* End Card grid */}

          {/*Popup New Clickpath Recording*/}
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
                sx={{ mb: 2 }} />
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


        <Container maxWidth='md'>
          <Accordion />
        </Container>
      </main>
      <LoginDialog open={loginDialogState} setOpen={setloginDialogState} />

      {/* Footer */}
      < StyledFooter >
        <StyledTypography variant="h6" align="center" gutterBottom>
          DARA - Data Access Request Assistant
        </StyledTypography>
        <Typography align='center'>
          Dieses Tool wurde vom Fachgebiet <a href='https://www.tu.berlin/ise'>Information Systems Engineering</a> der Technischen Universität Berlin <br></br> im Rahmen des Projekts "Datensouveränität durch KI-basierte Transparenz und Auskunft" (<a href='https://daskita.github.io/'>DaSKITA</a>) entwickelt.
        </Typography>
        { /*<Copyright /> */}
      </StyledFooter >
      {/* End footer */}
    </>
  );
}
