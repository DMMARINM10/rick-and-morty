import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { capitalizedText } from '../helpers/textUtils';
import PaginationButtons from './PaginationButtons';
import { Avatar } from '@mui/material';
import { State } from './Container';

const createData = (
  id: number,
  name: string,
  characters: [],
  forth: string,
  fifth: string
) => {
  return { id, name, characters, forth, fifth  }
}

interface Props {
  route: string,
  data: State,
}

interface Value {
  id: number,
  name: string,
  characters?: [],
  residents?: [],
  episode?: string,
  air_date?: string,
  type?: string,
  dimension?: string,
}

interface Row {
  id: number,
  name: string,
  characters: [],
  forth: string,
  fifth: string
}

interface Character {
  image: string,
  name: string
}


const TableCont:FC<Props> = ({ route, data }) => {
  const rows = data?.data?.map((value: Value) => {
    const { id, name } = value
    let third, forth, fifth
    if(route === 'episodes') {
      third = value.characters
      forth = value.episode
      fifth = value.air_date
    } else {
      third = value.residents
      forth = value.type
      fifth = value.dimension
    }
    return (
      createData(id, name, third, forth, fifth)
    )
  })
  return (
    <div>
      <h2 style={{
        margin: '2px'
      }}>{capitalizedText(route)}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">{route === 'episodes' ? 'Air Date' : 'Type'}</TableCell>
              <TableCell align="center">{route === 'episodes' ? 'Episode' : 'Dimension'}</TableCell>
              <TableCell align="center">Characters</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: Row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.forth}</TableCell>
                <TableCell align="center">{row.fifth}</TableCell>
                <TableCell align="center">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}>

                  <div className='scroll' style={{
                    display: 'flex',
                    maxWidth: '200px',
                    overflowX: 'scroll',
                  }}>
                    {
                      row.characters.map((ch: Character, i) => <div key={i}><Avatar alt={ch.name} src={ch.image} /></div>)
                    }
                  </div>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <PaginationButtons total={data.total || 0} />
      </div>
    </div>
  );
}

export default TableCont