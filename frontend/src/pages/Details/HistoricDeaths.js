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

export default function HistoricDeaths(props) {
  const [deaths, setDeaths] = useState([]);

  async function getDeaths() {
    try {
      const response = await api.get(`/death/getByUser/${props.user_id}`);
      setDeaths(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getDeaths();
  }, [props.get]);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Mortes Registradas</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {deaths.map((death, index) => (
              <TableRow key={index}>
                <TableCell>{death.id}</TableCell>
                <TableCell>{death.created_at}</TableCell>
                <TableCell>{death.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
