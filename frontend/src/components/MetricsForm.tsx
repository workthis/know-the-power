import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/instance';

const metricsSchema = z.object({
  weight: z.coerce.number().min(20),
  steps: z.coerce.number().min(0),
});

type MetricsFormType = z.infer<typeof metricsSchema>;

interface MetricsFormProps {
  date: string;
  initialData?: { weight?: number; steps?: number };
  onSuccess: () => void;
}

export default function MetricsForm({ date, initialData, onSuccess }: MetricsFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<MetricsFormType>({
    resolver: zodResolver(metricsSchema) as any,
    defaultValues: {
      weight: initialData?.weight || 0,
      steps: initialData?.steps || 0,
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await api.patch('/stats/metrics', { ...data, date });
      onSuccess();
    } catch (error) {
      alert('Помилка оновлення метрик');
    }
  };

  const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '4px' },
    label: { fontSize: '12px', color: '#6b7280', fontWeight: 'bold' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none' },
    button: { 
      padding: '12px', 
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
      <div style={styles.inputGroup}>
        <label style={styles.label}>Вага (кг)</label>
        <input {...register('weight')} type="number" step="0.1" style={styles.input} />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Кроки</label>
        <input {...register('steps')} type="number" style={styles.input} />
      </div>
      <button type="submit" disabled={isSubmitting} style={styles.button}>
        Оновити
      </button>
    </form>
  );
}