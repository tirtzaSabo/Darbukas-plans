import React from "react";
import { Box, CssBaseline, Drawer, Toolbar, List, ListItem, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="events">
              <ListItemText primary="אירועים" />
            </ListItem>
            <ListItem button component={Link} to="business">
              <ListItemText primary="עסקים" />
            </ListItem>
            <ListItem button component={Link} to="users">
              <ListItemText primary="לקוחות" />
            </ListItem><ListItem button component={Link} to="events-types">
              <ListItemText primary="סוגי אירועים" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
