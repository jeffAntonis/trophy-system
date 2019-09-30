import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Select, Paper, Divider } from "@material-ui/core";

import api from '../../services/api';
import Header from '../../components/Header';
import HistoricDeaths from './HistoricDeaths';
import HistoricCollectedCoin from './HistoricCollectedCoin';
import HistoricKilledMonster from './HistoricKilledMonster';

export default function Details(props) {
  const [user, setUser] = useState([]);
  const [get, setGet] = useState('');
  const [trophys, setTrophys] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [formState, setFormState] = useState({
    valueCoin: '', monsterId: ''
  })

  async function getUser() {
    try {
      const response = await api.get(`/user/${props.match.params.id}`);
      setUser(response.data.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function getTrophysUser() {
    try {
      const response = await api.get(`/trophy_user/${props.match.params.id}`);
      setTrophys(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function getMonsters() {
    try {
      const response = await api.get(`/monster`);
      setMonsters(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getUser();
    getTrophysUser();
    getMonsters();
  }, []);

  async function collectCoin() {
    try {
      const response = await api.post(`/collected_coin`, {
        user_id: props.match.params.id,
        value: formState.valueCoin
      });

      setFormState({ ...formState, valueCoin: '' });
      setGet(response.data.data.length);
      alert('Moeda coletada com sucesso!');
    } catch (error) {
      console.log(error.response);
    } finally {
      getTrophysUser();
    }
  }

  async function killedMonster() {
    try {
      const response = await api.post(`/killed_monster`, {
        user_id: props.match.params.id,
        monster_id: formState.monsterId
      });

      setFormState({ ...formState, monster_id: '' });
      setGet(response.data.data.length);
      alert('Abate registrado com sucesso!');
    } catch (error) {
      console.log(error.response);
    } finally {
      getTrophysUser();
    }
  }

  async function death() {
    try {
      const response = await api.post(`/death`, {
        user_id: props.match.params.id
      });
      alert('Morte registrada com sucesso!');
      setGet(response.data.data.length);
    } catch (error) {
      console.log(error.response);
    } finally {
      getTrophysUser();
    }
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Header {...props} />
      <Container style={{ paddingBottom: 20 }}>
        <Box mt={2} mb={5}>
          <Typography variant="h6">
            User: {user.name}
          </Typography>
        </Box>

        <Box mt={2} mb={5}>
          <Typography variant="h6">
            Troféis coletados
          </Typography>

          {trophys.map((trophy, index) => (
            <>
              <Box key={index} display="flex" flexDirection="column" mt={2} mb={2}>              
                <Typography variant="subtitle2">
                  Troféu: {trophy.type_trophy}
                </Typography>
                <Typography variant="subtitle2">
                  Nível: {trophy.name}
                </Typography>

                {trophy.type_trophy === 'killed_monster' && (
                  <Typography variant="subtitle2">
                    Monstro: {trophy.nm_monster}
                  </Typography>
                )}
              </Box>
              <Divider />
            </>
          ))}
        </Box>

        <Paper>
          <Box p={2}>
            <Typography variant="subtitle2">
              Coletar Moeda
            </Typography>
            <Box display="flex" flexDirection="row" mb={4}>
              <Box mr={2} display="flex" flexGrow={1}>
                <TextField
                  id="valueMoeda"
                  label="Valor da Moeda"
                  required
                  fullWidth
                  margin="normal"
                  type="number"
                  value={formState.valueCoin}
                  onChange={(e) => setFormState({ ...formState, valueCoin: e.target.value })}
                />
              </Box>
              <Button type="button" size="small" onClick={collectCoin}>Confirmar</Button>
            </Box>

            <Typography variant="subtitle2">
              Abater Monstro
            </Typography>
            <Box display="flex" flexDirection="row" mb={4}>
              <Box mr={2} display="flex" flexGrow={1}>
                <Select
                  native
                  fullWidth
                  value={formState.monsterId}
                  onChange={(e) => setFormState({ ...formState, monsterId: e.target.value })}
                  inputProps={{
                    name: 'cbMonster',
                    id: 'cbMonster',
                  }}
                >
                  <option value="">::SELECIONE::</option>

                  {monsters.map((monster, index) => (
                    <option key={index} value={monster.id}>{monster.name}</option>
                  ))}
                </Select>
              </Box>
              <Button size="small" onClick={killedMonster}>Confirmar</Button>
            </Box>

            <Box display="flex" flexDirection="row">
              <Box mr={2}>
                <Typography variant="subtitle2">
                  Registrar Morte
                </Typography>
              </Box>
              <Button size="small" onClick={death}>Sim</Button>
            </Box>
          </Box>
        </Paper>

        <Box mt={4}>
          <Typography variant="h6">
            Históricos
          </Typography>
        </Box>

        <HistoricDeaths user_id={props.match.params.id} get={get} />
        <HistoricKilledMonster user_id={props.match.params.id} get={get} />
        <HistoricCollectedCoin user_id={props.match.params.id} get={get} />
      </Container>
    </div>
  );
}
