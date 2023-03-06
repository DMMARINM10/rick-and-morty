import React from 'react'
import FormLogin from '../components/FormLogin'

const LoginPage = () => {
  return (
    <div style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <div style={{
            height: '60%',
            width: '100%',
            backgroundImage: `url('https://images3.alphacoders.com/812/812062.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionY: 'bottom'
        }}></div>
        <div style={{
            width: '320px',
            position: 'relative',
            top: '-180px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px 40px',
            boxShadow: '4px 4px 7px 2px rgba(0, 0, 0, 0.3)'
        }}>
            <FormLogin/>
        </div>
    </div>
  )
}

LoginPage.propTypes = {}

export default LoginPage