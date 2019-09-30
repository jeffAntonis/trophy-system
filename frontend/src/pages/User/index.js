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

export default function User(props) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function getUsers() {
    try {
      const response = await api.get(`/user`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const response = await api.post(`/user`, {
        name,
        email
      });
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpen(false);
      setName('');
      setEmail('');
      getUsers();
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
              <TableCell>Email</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.updated_at}</TableCell>
                <TableCell><Button onClick={() => props.history.push(`/details/${user.id}`)}>Info</Button></TableCell>
                <TableCell><Button>Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={onSubmitForm}>
            <DialogTitle id="form-dialog-title">Cadastrar Usuário</DialogTitle>
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
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
