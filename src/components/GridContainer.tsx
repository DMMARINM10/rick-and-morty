import React, { FC } from 'react'
// import PropTypes from 'prop-types'
import PaginationButtons from './PaginationButtons'
import { capitalizedText } from '../helpers/textUtils'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { State } from './Container'

interface Props {
    route: string,
    data: State,
}

const GridContainer: FC<Props> = ({ route, data }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h2 style={{
                margin: '2px'
            }}>{capitalizedText(route)}</h2>
            {
                data.loading
                    ? <div>Loading</div>
                    :
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center'
                    }}>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 180px)',
                            gridTemplateRows: 'repeat(4, 225px)',
                            gap: '10px 30px'
                        }}>
                            {data?.data?.length === 0
                                ? <div>There is not favorites</div>
                                :
                                data?.data?.map((value, i) => {
                                    const { name, status, species, image } = value
                                    if (!name) return
                                    return (
                                        <div key={i} style={{
                                            boxShadow: '4px 4px 7px 2px rgba(0, 0, 0, 0.3)'
                                        }}>

                                            <Card sx={{ maxWidth: 200 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="150"
                                                        image={image}
                                                        alt={name}
                                                    />
                                                    <CardContent>
                                                        <h4 style={{
                                                            margin: 0,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}>{name}</h4>
                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: 'gray',
                                                        }}>
                                                            <div>{status}</div>
                                                            <div>{species}</div>
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

            }
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <PaginationButtons total={data.total || 0} />

            </div>
        </div>
    )
}

export default GridContainer