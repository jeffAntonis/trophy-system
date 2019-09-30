import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableCell, TableBody, TableRow } from "@material-ui/core";

import api from '../../services/api';
import Header from '../../components/Header';

export default function Main(props) {

  return (
    <div style={{ flexGrow: 1 }}>
      <Header {...props} />
      <Container>
        Opa
      </Container>
    </div>
  );
}
