import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home- OpenJira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: "calc(100vh -  100px)" }}>
            <CardHeader title='Earrings'/>

            <CardContent>

              <NewEntry />
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: "calc(100vh -  100px)" }}>
            <CardHeader title='In Progress'/>

            <CardContent>

              <EntryList status='in-progress'/>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: "calc(100vh -  100px)" }}>
            <CardHeader title='Completed'/>

            <CardContent>

              <EntryList status='finished'/>
            </CardContent>
          </Card>

        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;
