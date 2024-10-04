
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react'

//styles
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button type="submit" className="btn" disabled={isPending}>
        {isPending ? <div className='spinner'/> : 'Login'}

      </button>
      {error && <div className="error" aria-live="polite">{error}</div>}

    </form>
  )
}

export default Login