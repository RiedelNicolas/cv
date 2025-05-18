import { Avatar, Container, Link, Paper } from "@mui/material";
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import "./Resume.css";


export const Resume = () => {

    return (
        <Container style={{ width: "100%" }}>
            <Grid container spacing={1} justifyContent={"center"} >
            <Grid size={12}>
                <div className="nameTitle">Nicolás Riedel</div>
            </Grid>
            <Grid size={12}>
                <div className="nameSubtitle">Software Developer</div>
            </Grid>
            <Grid size={12}>
                <div class="avatarContainer">
                <Avatar
                    src="/profile.png"
                    id="avatarElement"
                />
                </div>
            </Grid>
            <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                <Paper elevation={10} className="profile_description_card">
                <div className="profile_description">
                    
                    <p>
                    Hi! I'm Nicolás, a software developer based in <b>Buenos Aires, Argentina</b>.
                    </p>

                    <p>
                    <b>I have experience working across the entire stack, using multiple technologies and programming languages</b>.
                    </p>

                    <p>
                    In the present, I am working primarly with Typescript, ReactJS, React Native and NodeJS, but I'm always open to use what is necessary to get the job done.
                    </p>

                    <p>
                    Additionally, I teach at <b>Universidad de Buenos Aires (UBA)</b>, where I am completing my final courses in <b>Software Engineering</b>.
                    </p>
                </div>

                <div className="profile_description_footer">
                    <Link href="mailto:nariedel99@gmail.com" className="social_link" target="_blank" rel="noopener noreferrer">
                    <Email fontSize="large"/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/nicol%C3%A1s-riedel-9b2617171" className="social_link" target="_blank" rel="noopener noreferrer">
                    <LinkedIn fontSize="large"/>
                    </Link>
                    <Link href="https://github.com/RiedelNicolas" className="social_link" target="_blank" rel="noopener noreferrer">
                    <GitHub fontSize="large"/>
                    </Link>
                </div>
                </Paper>
            </Grid>
            </Grid>

        {/* Footer, with paper */}

    </Container>
  )
}