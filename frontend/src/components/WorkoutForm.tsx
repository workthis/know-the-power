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
  initialData?: any;
}

export default function WorkoutForm({ date, onSuccess, initialData }: WorkoutFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<WorkoutFormType>({
    resolver: zodResolver(workoutSchema) as any,
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type
    } : { name: '', type: '' }
  });

  const onSubmit = async (values: any) => {
    try {
      if (initialData?.id) {
        await api.patch(`/workouts/${initialData.id}`, { ...values, date });
      } else {
        await api.post('/workouts', { ...values, date });
      }
      onSuccess();
    } catch (error) {
      alert('Помилка при збереженні');
    }
  };

  const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none' },
    button: { 
      padding: '10px', 
      backgroundColor: '#0f62e9', 
      color: '#fff', 
      border: 'none', 
      borderRadius: '6px', 
      fontWeight: 'bold', 
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      opacity: isSubmitting ? 0.7 : 1
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input {...register('name')} placeholder="Назва тренування" style={styles.input} />
      <input {...register('type')} placeholder="Тип (напр. Силове)" style={styles.input} />
      <button type="submit" disabled={isSubmitting} style={styles.button}>
        {isSubmitting ? 'Збереження...' : initialData ? 'Оновити тренування' : 'Створити'}
      </button>
    </form>
  );
}