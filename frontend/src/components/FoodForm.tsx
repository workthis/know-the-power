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
  initialData?: any;
}

export default function FoodForm({ date, onSuccess, initialData }: FoodFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FoodFormType>({
    resolver: zodResolver(foodSchema) as any,
    defaultValues: initialData ? {
      name: initialData.name,
      calories: initialData.calories,
      amount: initialData.amount
    } : { name: '', calories: '', amount: '' }
  });

  const onSubmit = async (values: any) => {
    try {
      if (initialData?.id) {
        await api.patch(`/food/${initialData.id}`, { ...values, date });
      } else {
        await api.post('/food', { ...values, date });
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
      <input {...register('name')} placeholder="Назва страви" style={styles.input} />
      <input {...register('calories')} type="number" placeholder="Калорії" style={styles.input} />
      <input {...register('amount')} placeholder="Вага/Об'єм" style={styles.input} />
      <button type="submit" disabled={isSubmitting} style={styles.button}>
        {isSubmitting ? 'Збереження...' : initialData ? 'Оновити дані' : 'Додати'}
      </button>
    </form>
  );
}