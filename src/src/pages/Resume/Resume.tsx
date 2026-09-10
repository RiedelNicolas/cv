import { Avatar, Button, Container, Link, Paper } from "@mui/material";
import { LinkedIn, GitHub, Email, OpenInNew } from '@mui/icons-material';
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
                <div className="nameSubtitle">Software Engineer</div>
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
                    Hi! I'm Nicolás, a software engineer based in <b>Buenos Aires, Argentina</b>.
                    </p>

                    <p>
                    I'm currently a <b>Mobile Engineer at Mendel</b>, a B2B Fintech, working with <b>React Native</b> and <b>Java Spring Boot</b> on the BFF layer.
                    </p>

                    <p>
                    <b>I have experience working across the entire stack, using multiple technologies and programming languages</b>, and I'm always open to use what is necessary to get the job done.
                    </p>

                    <p>
                    I also teach at <b>Universidad de Buenos Aires (UBA)</b>, where I graduated in <b>Software Engineering</b> in December 2025.
                    </p>
                </div>

                <div className="cv_link">
                    <Button
                    variant="outlined"
                    href="/Nicolas-Riedel-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<OpenInNew />}
                    className="cv_link_button"
                    >
                    View full CV
                    </Button>
                </div>

                <div className="profile_description_footer">
                    <Link href="mailto:nariedel99@gmail.com" className="social_link" target="_blank" rel="noopener noreferrer">
                    <Email fontSize="large"/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/nariedel/" className="social_link" target="_blank" rel="noopener noreferrer">
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
