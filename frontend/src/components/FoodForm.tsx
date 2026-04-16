import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';

const foodSchema = z.object({
  name: z.string().min(2),
  calories: z.coerce.number().min(1),
  amount: z.string().min(1),
});

type FoodFormType = z.infer<typeof foodSchema>;

interface FoodFormProps {
  date: string;
  onSuccess: () => void;
}

export default function FoodForm({ date, onSuccess }: FoodFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FoodFormType>({
    resolver: zodResolver(foodSchema) as any,
  });

 const onSubmit = async (data: any) => {
    try {
      await api.post('/food', { ...data, date });
      onSuccess();
    } catch (error) {
      alert('Помилка додавання їжі');
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
      <input {...register('calories')} type="number" placeholder="Калорії" style={styles.input} />
      <input {...register('amount')} placeholder="Об'єм/Вага" style={styles.input} />
      <button type="submit" style={styles.button}>Додати</button>
    </form>
  );
}