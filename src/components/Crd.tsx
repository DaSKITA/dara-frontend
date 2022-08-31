import { Grid, Card, CardActionArea, CardHeader, capitalize, CardActions, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { green } from '@mui/material/colors';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/*
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardHeader: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expand: {
    marginLeft: 'auto'
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
}));
*/

export const Crd = ({ controller }: any) => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onClick = (wf: any) => {
    /*
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    */
    const event = new CustomEvent('__automa-ext__', {
      'detail': {
        'type': 'execute-workflow',
        'data': { "workflow": wf }
      }
    });
    window.dispatchEvent(event);
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
            /*
            avatar={
              <Avatar
                alt={capitalize(connector.name) + ' logo'}
                src={"https://besticon.herokuapp.com/icon?size=32..200..500&url=" + connector.hostnames[0]}
              />
            }
            */
            />
          </CardActionArea>
          <CardActions disableSpacing>
            {controller.automation &&
              <Button
                size="small"
                variant="text"
                sx={buttonSx}
                style={{
                  textTransform: 'none',
                }}
                startIcon={
                  <SendIcon fontSize='inherit' />
                }
                onClick={() => onClick(controller.automation.definition)}
              >
                Request Data
              </Button>
            }
            { controller.automation && loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
            {/*
            <Button
              className={classes.expand}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              style={{
                textTransform:'none',
              }}
              endIcon={
                <ExpandMoreIcon
                  className={clsx(classes.expandIcon, {
                    [classes.expandIconOpen]: expanded,
                  })}
                />
              }
            >
              Info
            </Button>
            */}
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
