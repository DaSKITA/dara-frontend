import { Grid, Card, CardActionArea, CardHeader, capitalize, CardActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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

const onClick = (wf: any) => {
  const event = new CustomEvent('__automa-ext__', {
    'detail': {
      'type': 'execute-workflow',
      'data': { "workflow": wf }
    }
  });
  window.dispatchEvent(event);
}


export const Crd = ({ controller }: any) => {

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
