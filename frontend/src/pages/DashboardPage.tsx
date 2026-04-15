import { useEffect, useState } from 'react';
import api from '../api/instance';

const DashboardPage = () => {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournal = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/journal/${selectedDate}`);
        setData(response.data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate <= today) {
      setSelectedDate(newDate);
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#efecec',
      padding: '40px 20px',
      boxSizing: 'border-box' as const,
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '40px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '450px',
    },
    title: {
      textAlign: 'center' as const,
      marginBottom: '24px',
      color: '#000000',
      fontSize: '24px',
      marginTop: 0,
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '6px',
      marginBottom: '24px',
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#374151',
    },
    input: {
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box' as const,
      fontFamily: 'inherit',
      color: '#000000',
    },
    section: {
      marginBottom: '24px',
    },
    sectionTitle: {
      fontSize: '18px',
      color: '#0f62e9',
      marginBottom: '12px',
      fontWeight: 'bold',
      borderBottom: '2px solid #f6f9ff',
      paddingBottom: '8px',
      marginTop: 0,
    },
    itemCard: {
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemText: {
      margin: 0,
      color: '#374151',
      fontSize: '15px',
    },
    itemValue: {
      margin: 0,
      color: '#111827',
      fontWeight: 'bold',
      fontSize: '15px',
    },
    emptyText: {
      color: '#6b7280',
      fontSize: '14px',
      margin: 0,
    },
    statusText: {
      textAlign: 'center' as const,
      color: '#6b7280',
      fontSize: '16px',
      margin: '40px 0',
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Щоденник</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Оберіть дату</label>
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={handleDateChange}
            style={styles.input}
          />
        </div>

        {loading ? (
          <p style={styles.statusText}>Завантаження даних...</p>
        ) : !data ? (
          <p style={styles.statusText}>Немає даних для відображення</p>
        ) : (
          <>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Метрики</h3>
              <div style={styles.itemCard}>
                <p style={styles.itemText}>Вага</p>
                <p style={styles.itemValue}>{data.metrics?.weight || '—'} кг</p>
              </div>
              <div style={styles.itemCard}>
                <p style={styles.itemText}>Кроки</p>
                <p style={styles.itemValue}>{data.metrics?.steps || 0}</p>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Харчування</h3>
              {data.food?.length > 0 ? (
                data.food.map((item: any) => (
                  <div key={item.id} style={styles.itemCard}>
                    <p style={styles.itemText}>{item.name}</p>
                    <p style={styles.itemValue}>{item.calories} ккал</p>
                  </div>
                ))
              ) : (
                <p style={styles.emptyText}>Записів немає</p>
              )}
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Тренування</h3>
              {data.workouts?.length > 0 ? (
                data.workouts.map((workout: any) => (
                  <div key={workout.id} style={styles.itemCard}>
                    <p style={styles.itemText}>{workout.name}</p>
                    <p style={styles.itemValue}>{workout.type}</p>
                  </div>
                ))
              ) : (
                <p style={styles.emptyText}>Тренувань немає</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;