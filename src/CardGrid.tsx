import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Crd } from "./components/Crd"
import Accordion from "./components/Accordion"
import daraIcon from "./assets/icon-128.png";
import daskitaLogo from "./assets/daskita_logo.png";
import tubLogo from "./assets/tub_logo.png";
import bmuvLogo from "./assets/bmuv_logo.svg";
import ptbleLogo from "./assets/ptble_logo.jpg";
import { Box, Button, capitalize, IconButton, InputBase, Menu, MenuItem, Modal, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TranslateIcon from '@mui/icons-material/Translate';
import PlusIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import { useEffect, useRef } from "react";
import React from 'react';
import { LoginDialog } from "./ApiAuth";
import { fetchWorkflowsEvent, recordWorkflowEvent } from "./events";
import ExtensionAvailabilityCheck from './availabilityCheck';
import { Trans, useTranslation } from 'react-i18next';


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

const socialNetworks = ['twitter', 'linkedin', 'facebook', 'instagram', 'reddit', 'tiktok'];
const shopping = ['amazon', 'ebay', 'ebay_kleinanzeigen', 'otto', 'vinted'];
const software = ['apple', 'google', 'samsung', 'huawei', 'xiaomi', 'microsoft'];
const streaming = ['netflix', 'spotify', 'deezer'];
const mobility = ['jelbi', 'uber', 'nextbike'];
//other - no own array required

export default function CardGrid() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = React.useState("");
  const [workflows, setWorkflows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loginDialogState, setloginDialogState] = React.useState<boolean>(false);
  const [loginDialogController, setloginDialogController] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLngMenu = Boolean(anchorEl);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoginDialogOpen = (controller: any) => {
    setloginDialogState(true);
    setloginDialogController(controller);
  };
  const handleTrans = (code: any) => {
    i18n.changeLanguage(code);
  };
  const handleLngMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLngMenuClose = () => setAnchorEl(null);
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
            {t('app_name')}
          </StyledTypography>
          <Button
            onClick={handleOpen}
            startIcon={<PlusIcon />}
            sx={{ my: 2, mx: 0.5, color: 'white' }}
          >
            {t('add_service_provider')}
          </Button>
          <Button
            onClick={() => {
              window.dispatchEvent(fetchWorkflowsEvent(true));
            }}
            sx={{ my: 2, mx: 0.5, color: 'white' }}
            startIcon={<RefreshIcon />}
          >
            {t('refresh')}
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={ `${t('search')}` }
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange} />
          </Search>
          {/*Language switcher*/}
          <IconButton
            onClick={handleLngMenuClick}
            sx={{ ml: 1 }}
            aria-label="more"
            id="lng-menu"
            aria-controls={openLngMenu ? 'menu' : undefined}
            aria-expanded={openLngMenu ? 'true' : undefined}
            aria-haspopup="true">
            <TranslateIcon />
            {capitalize(i18n.language)}
          </IconButton>
          <Menu
            id="lng-menu"
            open={openLngMenu}
            onClose={handleLngMenuClose}
            anchorEl={anchorEl}>
            <MenuItem onClick={() => handleTrans('de')}>{t('german')}</MenuItem>
            <MenuItem onClick={() => handleTrans('en')}>{t('english')}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <main>
        {/* Introduction */}

        <Container maxWidth="md">
          <Box sx={{ mt: 5 }}>
            <Typography variant="h3" gutterBottom>
              { t('site_title') }
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Typography variant='body1'>
            <Trans i18nKey="site_description">
              DARA steht für "Data Access Request Assistant" und ist ein Tool, das Ihnen bei der Ausübung Ihres Rechts auf Datenauskunft assistiert. Es besteht aus dieser Webseite und einer Browserextension, die für Sie eine Datenauskunftsanfrage an verschiedene Dienstanbieter senden kann.
              Dabei hat DARA zu keiner Zeit Zugriff auf Ihre personenbezogenen Daten, diese Daten werden nur bei den Diensten und anschließend auf Ihrem Computer gespeichert.
              Probieren Sie es einfach aus oder erfahren Sie im Abschnitt <a href='#faq'>FAQ</a> weitere Informationen.
            </Trans>
          </Typography>
        </Container>
        {/* End Introduction */}
        {/* Main */}
        <StyledCardGridContainer
          maxWidth="md"
          id="aviailabilty-check-parent"
          sx={{ position: 'relative' }}>
          <ExtensionAvailabilityCheck />
          <Box sx={{ mb: 2, mt: -2 }}>
            <Typography variant="h4">
              {t('verified_data_request')}
            </Typography>
            <Typography variant="body1">
              {t('verified_data_request_description')}
            </Typography>
          </Box>
          {/* Start Card grid */}
          {snwWorkflows.length ? <>
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2 }}>
              {t('social_networks')}
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
              {t('software')}
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
              {t('mobility')}
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
              {t('shopping')}
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
              {t('streaming_providers')}
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
            <Typography variant='h6' gutterBottom sx={{ borderTop: 1, borderColor: 'primary.main', paddingTop: 2, marginTop: 4 }}>
              {t('other')}
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
            <Typography variant="h4" sx={{ marginTop: 6 }}>
              {t('local_data_requests')}
            </Typography>
            <Typography variant="body1">
              {t('local_data_requests_description')}
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
            {t('no_local_data_requests')}
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
                {t('record_new_clickpath')}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                {t('record_new_clickpath_description')}
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
                {t('record_new_clickpath_description_2')}
              </Typography>
              <Button onClick={() => {
                handleStartRecording();
                handleClose();
              }}
                sx={{ mt: 2 }}
              >
                {t('start_recording')}
              </Button>
            </Box>
          </Modal>
        </StyledCardGridContainer>


        <Container maxWidth='md'>
          <Accordion />
        </Container>
      </main>
      <LoginDialog open={loginDialogState} setOpen={setloginDialogState} controller={loginDialogController} />

      {/* Footer */}
      < StyledFooter sx={{ bgcolor: "rgba(255, 255, 255, 0.12)", color: "white", marginTop: 10 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs={7} alignContent={"center"}>
            <StyledTypography variant="h5" align="center" gutterBottom marginTop={2}>
              {t('footer_title')}
            </StyledTypography>
            <Typography align='center' gutterBottom>
              <Trans i18nKey="footer_text">
                Dieses Tool wurde vom Fachgebiet <a href='https://www.tu.berlin/ise'>Information Systems Engineering</a> <br />der Technischen Universität Berlin <br /> im Rahmen des Projekts <br />"Datensouveränität durch KI-basierte Transparenz und Auskunft" (<a href='https://daskita.github.io/'>DaSKITA</a>) entwickelt.
              </Trans>
            </Typography>
          </Grid>
          <Grid item xs>
            <TableContainer>
              <TableRow>
                <TableCell sx={{ bgcolor: "white", align: "center", border: "none" }}>
                  <img src={bmuvLogo} height="100em" alt="Gefördert durch das BMUV aufgrund eines Beschlusses des Deutschen Bundestages"></img>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ bgcolor: "white", align: "center", border: "none" }}>
                  <img src={ptbleLogo} height="40em" alt="Projektträger ist die Bundesanstalt für Landwirtschaft und Ernährung"></img>
                </TableCell>
              </TableRow>
            </TableContainer>
          </Grid>
        </Grid>
        { /*<Copyright /> */}
      </StyledFooter >
      {/* End footer */}
    </>
  );
}
