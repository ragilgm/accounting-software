import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

export default function TableComponent(props) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {props.children}
      </Table>
    </TableContainer>
  );
}
