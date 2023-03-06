import React from 'react'
import { useUserContext } from '../App'
import { useNavigate } from 'react-router-dom';
import { fontSize, minHeight } from '@mui/system';

const Sidebar = () => {
    const { setUser } = useUserContext()
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.setItem('isLogged', 'false')
        setUser({ isLogged: false })
        navigate('/login')
    }
    return (
        <aside style={{
            backgroundColor: '#04abc5',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '100px',
            fontSize: '18px',
            height: '100%',
        }}>
            <img width={250} alt='rick-and-morty' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRLKcpHDvGUrN4UIjotYdnjiw5eyeh1jy3g&usqp=CAU'/>
            <nav>
                <ul>
                    <li><a href='/characters'>characters</a></li>
                    <li><a href='/locations'>locations</a></li>
                    <li><a href='/episodes'>episodes</a></li>
                    <li><a href='/favorites'>favorites</a></li>
                </ul>
            </nav>
            <div style={{
                cursor: 'pointer'
            }} onClick={handleLogOut}><h3>Log out</h3></div>
        </aside>
    )
}

export default Sidebar