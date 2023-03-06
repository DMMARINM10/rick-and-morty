import React, { FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { request } from '../helpers/httpRequest'
import GridContainer from './GridContainer';
import TableCont from './Table';

interface Data {
    characters?: Results,
    locations?: Results,
    episodes?: Results,
    charactersByIds?: []
}

interface Results {
    info: Page,
    results: []
}

interface Page {
    pages: number
}

export interface State {
    loading: boolean,
    data: [] | undefined,
    total: number | undefined
}

interface Props {
    route: string
}

const Container: FC<Props> = ({ route }) => {
    const [data, setData] = useState<State>({
        loading: true,
        data: [],
        total: 0
    })
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const page = searchParams.get('page')
    const argPage = Math.trunc(Number(page))
    let favorites: number[]
    const favo = localStorage.getItem('favorites')?.split(',').map((x) => Number(x))
    if(favo) {
        favorites = favo?.splice(((argPage-1) * 20) || 0, 20)
    } else {
        favorites = []
    }
    let results: string
    switch (route) {
        case 'characters':
            results = 'name, status, species, image, id'
            break;

        case 'locations':
            results = 'id, name, type, dimension, residents { name, image, id }'
            break;

        case 'episodes':
            results = 'id, name, air_date, episode, characters { name, image, id }'
            break;
        case 'favorites':
            results = 'name, status, species, image, id'
            break;

        default:
            results = 'name, status, species, image, id'
            break;
    }
    useEffect(() => {
        if (!argPage) navigate(`/${route}?page=1`)
        const query = route !== 'favorites'
            ? `
        query {
            ${route}(page: ${argPage || '1'}) {
                info {
                    pages
                }
                results {
                    ${results}
                }
             }
        }`
            : `
        query {
            charactersByIds(ids: ${JSON.stringify(favorites)}) {
                ${results}
             }
        }`
        request(query).then((resp: Data) => {
            const dataFetch = route !== 'favorites'
                ? resp[route as keyof typeof resp]?.results
                : resp['charactersByIds' as keyof typeof resp]
            const totalFetch = route !== 'favorites'
                ? resp[route as keyof typeof resp]?.info?.pages
                : favorites.length <= 20 
                    ? favorites.length === 0
                        ? 0
                        : 1 
                    : Math.ceil(favorites.length / 20) 
            setData({
                loading: false,
                data: dataFetch,
                total: totalFetch
            })
        }
        )
    }, [page])
    return (
        route === 'characters' || route === 'favorites'
            ? <GridContainer route={route} data={data} />
            : <TableCont route={route} data={data} />
    )
}

export default Container