import { Grid, Paper } from "@mui/material";
import Chart from "../../components/dashboardComponent/Chart";
import Deposits from "../../components/dashboardComponent/Deposits";
import { useStyles } from "./SummaryCss";
import Orders from "../../components/dashboardComponent/Order";


export default function Summary(props){
  const classes=useStyles()

  return(<div className={classes.root}>
      <Grid container spacing={3} >
          {/* Chart */}            
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders />
            </Paper>
          </Grid>
      </Grid>
  </div>)
}