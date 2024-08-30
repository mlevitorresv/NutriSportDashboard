import React, { useState } from 'react'
import { PageFormStyled } from '../../components/form/PageFormStyled'
import { FormLoginStyled } from '../../components/form/FormLoginStyled'
import { Link, useNavigate } from 'react-router-dom'
import { InputStyled } from '../../components/common/InputStyled'
import { ButtonStyled } from '../../components/common/ButtonStyled'
import { useAuth } from '../../context/AuthProvider'
import { toast } from 'react-toastify'
import { H1Styled } from '../../components/common/H1Styled'

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleChangePass = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { email: email, password: password }
    try {
      await login(userData);
    } catch (error) {
      console.error('Error de autenticación:', error);
      toast.error('Error al iniciar sesión. Por favor, intenta nuevamente más tarde.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if(!sessionStorage.getItem('token')){
      toast.error('No se inició sesión, usuario o contraseña incorrectos', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else{
      navigate('/home');
      toast.success('Sesión iniciada correctamente, ¡Bienvenido!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <PageFormStyled>
        <FormLoginStyled onSubmit={handleLogin}>
          <H1Styled center={true}>Bienvenido al programa de gestión de </H1Styled>
          <Link to='/' className='loginForm__image'><img src="src\assets\logo.JPG" alt="NutriSport logo" /></Link>
          <InputStyled model="email" name="emailInput" id="emailInput" placeholder='email@email.com' onChange={handleChangeEmail} />
          <InputStyled type="password" model="password" name="passInput" id="passInput" placeholder='password' onChange={handleChangePass} />
          <ButtonStyled type='submit'>SIGN IN</ButtonStyled>
        </FormLoginStyled>
      </PageFormStyled>
    </>
  )
}
