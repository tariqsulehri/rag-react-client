import React from 'react';
import { Paper, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { History, Settings, Help } from '@mui/icons-material';

const ChatSidebar = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 280,
        height: 'calc(100vh - 140px)',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Chat History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Help & Support" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default ChatSidebar; 