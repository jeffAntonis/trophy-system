import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField

} from "@material-ui/core";
import { Add } from '@material-ui/icons';

import api from '../../services/api';
import Header from '../../components/Header';

export default function Monster(props) {
  const [monsters, setMonsters] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

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

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const response = await api.post(`/monster`, {
        name
      });
      alert('Monstro cadastrado com sucesso!');
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpen(false);
      setName('');
      getMonsters();
    }
  }

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
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={onSubmitForm}>
            <DialogTitle id="form-dialog-title">Cadastrar Monstro</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Confirmar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Fab aria-label='Add'
          style={{ bottom: 10, right: 10, position: 'absolute' }}
          onClick={() => setOpen(!open)}
        >
          <Add size={20} />
        </Fab>
      </Container>
    </div>
  );
}
