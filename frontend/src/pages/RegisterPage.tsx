import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';
import { useNavigate, Link } from 'react-router-dom';

const registerDataType = z.object({
  email: z.string().email('Невірний формат пошти'),
  password: z.string().min(12, 'Мінімум 12 символів'),
  gender: z.string().min(1, 'Вкажіть стать'),
  age: z.coerce.number().min(10, 'Вкажіть коректний вік'),
  height: z.coerce.number().min(50, 'Вкажіть коректний зріст'),
  initialWeight: z.coerce.number().min(20, 'Вкажіть коректну вагу'),
});

type RegisterForm = z.infer<typeof registerDataType>;

const RegisterPage = () => {
  const navigate = useNavigate();
  
const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
  resolver: zodResolver(registerDataType) as any,
  });

  const onSubmit = async (data: any) => {
  try {
    await api.post('/auth/register', data);
    navigate('/login');
  } catch (error) {
    alert('Помилка реєстрації. Можливо, такий email вже існує.');
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
      maxWidth: '700px',
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
    select: {
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: '#2d2d34',
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
    footerText: {
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
        <h2 style={styles.title}>Реєстрація</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputGroup}>
            <input 
              {...register('email')} 
              placeholder="Email" 
              style={{...styles.input, borderColor: errors.email ? '#ef4444' : '#d1d5db'}} 
            />
            {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
          </div>
          
          <div style={styles.inputGroup}>
            <input 
              {...register('password')} 
              type="password" 
              placeholder="Пароль" 
              style={{...styles.input, borderColor: errors.password ? '#ef4444' : '#d1d5db'}} 
            />
            {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <select 
              {...register('gender')} 
              style={{...styles.select, borderColor: errors.gender ? '#ef4444' : '#d1d5db'}}
            >
              <option value="">Оберіть стать</option>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
            </select>
            {errors.gender && <p style={styles.errorText}>{errors.gender.message}</p>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{...styles.inputGroup, flex: 1}}>
              <input 
                {...register('age')} 
                type="number" 
                placeholder="Вік" 
                style={{...styles.input, borderColor: errors.age ? '#ef4444' : '#d1d5db'}} 
              />
              {errors.age && <p style={styles.errorText}>{errors.age.message}</p>}
            </div>

            <div style={{...styles.inputGroup, flex: 1}}>
              <input 
                {...register('height')} 
                type="number" 
                placeholder="Зріст (см)" 
                style={{...styles.input, borderColor: errors.height ? '#ef4444' : '#d1d5db'}} 
              />
              {errors.height && <p style={styles.errorText}>{errors.height.message}</p>}
            </div>

            <div style={{...styles.inputGroup, flex: 1}}>
              <input 
                {...register('initialWeight')} 
                type="number" 
                placeholder="Вага (кг)" 
                style={{...styles.input, borderColor: errors.initialWeight ? '#ef4444' : '#d1d5db'}} 
              />
              {errors.initialWeight && <p style={styles.errorText}>{errors.initialWeight.message}</p>}
            </div>
          </div>
          
          <button type="submit" style={styles.button}>
            Створити акаунт
          </button>
        </form>

        <p style={styles.footerText}>
          Вже є акаунт? <Link to="/login" style={styles.link}>Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;