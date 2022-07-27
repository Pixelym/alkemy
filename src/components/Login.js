import axios from "axios";
import swAlert from '@sweetalert/with-react';

function Login() {


    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


        if (email === '' || password === "") {


            swAlert(
                <div>
                    <h2>Los campos no deben estar vacios ❗</h2>
                    <p>Los campos de identificacion de usario y contraseña no pueden estar vacios.</p>
                </div>
            )
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            swAlert(<h2>Debes escribir una direeccion de correo valida ❗</h2>)
            return
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(<h2>Credenciales invalidas </h2>);
            return
        }

        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(<h2>Completaste con exito 👌</h2>, { icon: "success", });
                console.log(res.data);
                const tokenRecibido = res.data.token;
                localStorage.setItem('token', tokenRecibido);
                localStorage.setItem('miNombre', 'Ignacio Bertetich')
            })
    }

    return (
        <>
            <h2>formulario de login</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo electronico:</span> <br />
                    <input type='text' name='email' />
                </label>
                <br />
                <label>
                    <span>Contraseña: </span> <br />
                    <input type='password' name='password' />
                </label>
                <br />
                <button type='submit'>Ingresar</button>
            </form>
        </>
    )
}

export default Login