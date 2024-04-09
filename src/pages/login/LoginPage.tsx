import React, { useState } from 'react'
import { PageFormStyled } from '../../components/form/PageFormStyled'
import { FormLoginStyled } from '../../components/form/FormLoginStyled'
import { Link, useNavigate } from 'react-router-dom'
import { InputStyled } from '../../components/common/InputStyled'
import { ButtonStyled } from '../../components/common/ButtonStyled'
import { useAuth } from '../../context/AuthProvider'
import { toast } from 'react-toastify'

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


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email: email, password: password }
    login(userData)
    if (!login)
      return toast.error('No se inició sesión, usuario o password incorrectos', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    return navigate('/home');
  }

  return (
    <>
      <PageFormStyled>
        <FormLoginStyled onSubmit={handleLogin}>
          <Link to='/' className='loginForm__image'><img src="../assets/logo.JPG" alt="NutriSport logo" /></Link>
          <InputStyled type="email" name="emailInput" id="emailInput" placeholder='email@email.com' onChange={handleChangeEmail} />
          <InputStyled type="password" name="passInput" id="passInput" placeholder='password' onChange={handleChangePass} />
          <ButtonStyled type='submit'>SIGN IN</ButtonStyled>
        </FormLoginStyled>
      </PageFormStyled>
    </>
  )
}
