import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';
import { useNavigate, Link } from 'react-router-dom';

const loginEnterDataType = z.object({
  email: z.string().email('Невірний формат пошти'),
  password: z.string().min(12, 'Пароль має містити мінімум 12 символів'),
});

type LoginForm = z.infer<typeof loginEnterDataType>;

const LoginPage = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginEnterDataType),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
      window.location.reload(); 
    } catch (error) {
      alert('Помилка входу: перевірте ваш логін і пароль.');
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#efecec',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '350px',
    },
    title: {
      textAlign: 'center' as const,
      marginBottom: '24px',
      color: '#000000',
      fontSize: '24px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '6px',
    },
    input: {
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      outline: 'none',
    },
    errorText: {
      color: '#b50000',
      fontSize: '12px',
      margin: 0,
    },
    button: {
      marginTop: '8px',
      padding: '12px',
      backgroundColor: '#0f62e9',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    footer: {
      marginTop: '20px',
      textAlign: 'center' as const,
      fontSize: '14px',
      color: '#6b7280',
    },
    link: {
      color: '#0f62e9',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Вхід у систему</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputGroup}>
            <input 
              {...register('email')} 
              placeholder="Email" 
              style={{
                ...styles.input,
                borderColor: errors.email ? '#ef4444' : '#d1d5db'
              }} 
            />
            {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
          </div>
          
          <div style={styles.inputGroup}>
            <input 
              {...register('password')} 
              type="password" 
              placeholder="Пароль" 
              style={{
                ...styles.input,
                borderColor: errors.password ? '#ef4444' : '#f6f9ff'
              }} 
            />
            {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}
          </div>
          
          <button type="submit" style={styles.button}>
            Увійти
          </button>
        </form>

        <div style={styles.footer}>
          Немає акаунту? <Link to="/register" style={styles.link}>Зареєструватися</Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;