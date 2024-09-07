import {Avatar, Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import './app.css'; 

export function App() {
  return (
    <Container style={{width:"100%"}}>
      <Grid container spacing={1}>
      <Grid size={12}>
        <div className="nameTitle">Nicolás Riedel</div>
      </Grid>
      <Grid size={12}>
        <div className="nameSubtitle">Software Developer</div>
      </Grid>
      <Grid size={12}>
        <Avatar/>
      </Grid>
      </Grid>
    </Container>
  );
}
