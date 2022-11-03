import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Crd } from "./components/Crd"
import controllers from "./assets/controllers.json";
import { Box, Button, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";


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
const recordWorkflowExent = new CustomEvent(automaEvent, {
  'detail': {
    'type': 'record-workflow'
  }
});

export default function CardGrid() {
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <StyledTypography variant="h6" color="inherit">
            DARA Overview
          </StyledTypography>
          <Button
            onClick={() => {
              window.dispatchEvent(recordWorkflowExent);
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Record flow
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
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
            {controllers &&
              controllers.map((controller: any) => (
                controller.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd controller={controller} key={controller.name} />
              ))
            }
          </Grid>
        </StyledCardGridContainer>
        {/* End Card grid */}
      </main>

      {/* Footer */}
      <StyledFooter>
        <StyledTypography variant="h6" align="center" gutterBottom>
          DARA - Data Access Request Assistant
        </StyledTypography>
        {/* <Copyright /> */}
      </StyledFooter>
      {/* End footer */}
    </>
  );
}
