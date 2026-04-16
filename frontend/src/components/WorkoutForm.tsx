import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';

const workoutSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
});

type WorkoutFormType = z.infer<typeof workoutSchema>;

interface WorkoutFormProps {
  date: string;
  onSuccess: () => void;
}

export default function WorkoutForm({ date, onSuccess }: WorkoutFormProps) {
  const { register, handleSubmit } = useForm<WorkoutFormType>({
    resolver: zodResolver(workoutSchema),
  });

  const onSubmit = async (data: WorkoutFormType) => {
    try {
      await api.post('/workouts', { ...data, date });
      onSuccess();
    } catch (error) {
      alert('Помилка додавання тренування');
    }
  };

  const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none' },
    button: { padding: '10px', backgroundColor: '#0f62e9', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input {...register('name')} placeholder="Назва" style={styles.input} />
      <input {...register('type')} placeholder="Тип (Силове/Кругове)" style={styles.input} />
      <button type="submit" style={styles.button}>Створити</button>
    </form>
  );
}