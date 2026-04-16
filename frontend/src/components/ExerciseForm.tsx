import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';

const exerciseSchema = z.object({
  name: z.string().min(2),
  sets: z.coerce.number().min(1),
  reps: z.coerce.number().min(1),
  weight: z.coerce.number().min(0),
  restTime: z.coerce.number().min(0),
});

type ExerciseFormType = z.infer<typeof exerciseSchema>;

interface ExerciseFormProps {
  workoutId: number;
  onSuccess: () => void;
}

export default function ExerciseForm({ workoutId, onSuccess }: ExerciseFormProps) {
  const { register, handleSubmit } = useForm<ExerciseFormType>({
    resolver: zodResolver(exerciseSchema),
  });

  const onSubmit = async (data: ExerciseFormType) => {
    try {
      await api.post(`/workouts/${workoutId}/exercise`, data);
      onSuccess();
    } catch (error) {
      alert('Помилка додавання вправи');
    }
  };

  const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none' },
    row: { display: 'flex', gap: '10px' },
    button: { padding: '10px', backgroundColor: '#0f62e9', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input {...register('name')} placeholder="Назва (напр. Жим лежачи)" style={styles.input} />
      
      <div style={styles.row}>
        <input {...register('sets')} type="number" placeholder="Підходи" style={{...styles.input, flex: 1}} />
        <input {...register('reps')} type="number" placeholder="Повторення" style={{...styles.input, flex: 1}} />
      </div>
      
      <div style={styles.row}>
        <input {...register('weight')} type="number" placeholder="Вага (кг)" style={{...styles.input, flex: 1}} />
        <input {...register('restTime')} type="number" placeholder="Відпочинок (сек)" style={{...styles.input, flex: 1}} />
      </div>
      
      <button type="submit" style={styles.button}>Додати</button>
    </form>
  );
}