import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableCell, TableBody, TableRow, Button, Fab } from "@material-ui/core";
import { Add } from '@material-ui/icons';

import api from '../../services/api';
import Header from '../../components/Header';

export default function Monster(props) {
  const [monsters, setMonsters] = useState([]);

  async function getMonsters() {
    try {
      const response = await api.get(`/monster`);
      setMonsters(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getMonsters();
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <Header {...props} />
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>           
          
          {monsters.map((monster, index) => (
            <TableRow key={index}>
              <TableCell>{monster.id}</TableCell>
              <TableCell>{monster.name}</TableCell>
              <TableCell>{monster.created_at}</TableCell>
              <TableCell>{monster.updated_at}</TableCell>
              <TableCell><Button>Remove</Button></TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <Fab aria-label='Add' style={{ bottom: 10, right: 10, position: 'absolute' }}>
          <Add size={20} />
        </Fab>
      </Container>
    </div>
  );
}
