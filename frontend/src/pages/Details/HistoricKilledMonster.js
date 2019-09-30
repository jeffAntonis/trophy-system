import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  ExpansionPanel, 
  ExpansionPanelSummary, 
  ExpansionPanelDetails,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import api from '../../services/api';

export default function HistoricKilledMonster(props) {
  const [killedMonster, setKilledMonster] = useState([]);

  async function getKilledMonster() {
    try {
      const response = await api.get(`/killed_monster/getByUser/${props.user_id}`);
      setKilledMonster(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getKilledMonster();
  }, [props.get]);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Abates Registrados</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Monster</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {killedMonster.map((killed, index) => (
              <TableRow key={index}>
                <TableCell>{killed.id}</TableCell>
                <TableCell>{killed.name}</TableCell>
                <TableCell>{killed.created_at}</TableCell>
                <TableCell>{killed.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
