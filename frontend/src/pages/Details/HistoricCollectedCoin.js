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

export default function HistoricCollectedCoin(props) {
  const [collectedCoin, setCollectedCoin] = useState([]);

  async function getCollectedCoin() {
    try {
      const response = await api.get(`/collected_coin/getByUser/${props.user_id}`);
      setCollectedCoin(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getCollectedCoin();
  }, [props.get]);
  
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Moedas Coletadas</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {collectedCoin.map((collected, index) => (
              <TableRow key={index}>
                <TableCell>{collected.id}</TableCell>
                <TableCell>{collected.value}</TableCell>
                <TableCell>{collected.created_at}</TableCell>
                <TableCell>{collected.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
