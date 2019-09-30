import React from 'react'
import { Box, AppBar, Toolbar, Button, Typography } from "@material-ui/core";

export default function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexDirection="column" flexGrow={1} color="#FFF">
          <Typography variant="h6" >
            Sistema de Troféus
            </Typography>
        </Box>
        <Button color="inherit" onClick={() => props.history.push(`/user`)}>Users</Button>
        <Button color="inherit" onClick={() => props.history.push(`/monster`)}>Monsters</Button>
      </Toolbar>
    </AppBar>
  );
}
