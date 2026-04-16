import { useEffect, useState } from 'react';
import api from '../api/instance';
import Modal from '../components/Modal';
import FoodForm from '../components/FoodForm';
import ExerciseForm from '../components/ExerciseForm';
import WorkoutForm from '../components/WorkoutForm';
import MetricsForm from '../components/MetricsForm';

const DashboardPage = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<any>(null);
  const [editingWorkout, setEditingWorkout] = useState<any>(null);

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
  }, [selectedDate, refreshTrigger]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate <= today) {
      setSelectedDate(newDate);
    }
  };

  const handleDeleteFood = async (id: number) => {
    try {
      await api.delete(`/food/${id}`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      alert('Помилка видалення');
    }
  };

  const handleDeleteWorkout = async (id: number) => {
    try {
      await api.delete(`/workouts/${id}`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      alert('Помилка видалення');
    }
  };

  const handleSuccessModal = () => {
    setIsFoodModalOpen(false);
    setIsWorkoutModalOpen(false);
    setIsExerciseModalOpen(false);
    setIsMetricsModalOpen(false);
    setEditingFood(null);
    setEditingWorkout(null);
    setSelectedWorkoutId(null);
    setRefreshTrigger(prev => prev + 1);
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
    },
      actionButton: {
      marginTop: '12px',
      padding: '10px',
      backgroundColor: '#f6f9ff',
      color: '#0f62e9',
      border: '1px dashed #0f62e9',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.2s',
    },
      actionIcons: {
      display: 'flex',
      gap: '12px',
      fontSize: '14px',
      cursor: 'pointer',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '2px solid #f6f9ff', paddingBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', color: '#0f62e9', fontWeight: 'bold', margin: 0 }}>Метрики</h3>
                <span title="Оновити показники" onClick={() => setIsMetricsModalOpen(true)} style={{ cursor: 'pointer', fontSize: '16px' }}>✏️</span>
              </div>
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
                    <div>
                      <p style={styles.itemText}>{item.name}</p>
                      <p style={styles.itemValue}>{item.calories} ккал</p>
                    </div>
                    <div style={styles.actionIcons}>
                      <span title="Редагувати" onClick={() => { setEditingFood(item); setIsFoodModalOpen(true); }}>✏️</span>
                      <span title="Видалити" onClick={() => handleDeleteFood(item.id)}>🗑️</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.emptyText}>Записів немає</p>
              )}
              <button style={styles.actionButton} onClick={() => setIsFoodModalOpen(true)}>
                + Додати їжу
              </button>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Тренування</h3>
              {data.workouts?.length > 0 ? (
                data.workouts.map((workout: any) => (
                    <div key={workout.id} style={{...styles.itemCard, flexDirection: 'column', alignItems: 'stretch'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={styles.itemText}>{workout.name}</p>
                        <p style={styles.itemValue}>{workout.type}</p>
                      </div>
                        <div style={styles.actionIcons}>
                          <span title="Додати вправу" onClick={() => { setSelectedWorkoutId(workout.id); setIsExerciseModalOpen(true); }}>➕</span>
                          <span title="Редагувати" onClick={() => { setEditingWorkout(workout); setIsWorkoutModalOpen(true); }}>✏️</span>
                          <span title="Видалити" onClick={() => handleDeleteWorkout(workout.id)}>🗑️</span>
                        </div>
                    </div>
                    
                    {workout.exercises?.length > 0 && (
                      <ul style={{ marginTop: '12px', paddingLeft: '20px', fontSize: '14px', color: '#4b5563', marginBottom: 0 }}>
                        {workout.exercises.map((ex: any) => (
                          <li key={ex.id} style={{ marginBottom: '4px' }}>
                            <strong>{ex.name}</strong>: {ex.sets}x{ex.reps} — {ex.weight} кг (відп: {ex.restTime}с)
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p style={styles.emptyText}>Тренувань немає</p>
              )}
              <button style={styles.actionButton} onClick={() => setIsWorkoutModalOpen(true)}>
                + Додати тренування
              </button>
            </div>
            
          </>
        )}
      </div>
        <Modal 
          isOpen={isFoodModalOpen} 
          onClose={() => { setIsFoodModalOpen(false); setEditingFood(null); }} 
          title={editingFood ? "Редагувати запис" : "Додати прийом їжі"}
        >
          <FoodForm date={selectedDate} onSuccess={handleSuccessModal} initialData={editingFood} />
        </Modal>

        <Modal 
          isOpen={isWorkoutModalOpen} 
          onClose={() => { setIsWorkoutModalOpen(false); setEditingWorkout(null); }} 
          title={editingWorkout ? "Редагувати тренування" : "Нове тренування"}
        >
          <WorkoutForm date={selectedDate} onSuccess={handleSuccessModal} initialData={editingWorkout} />
        </Modal>

      <Modal 
        isOpen={isExerciseModalOpen} 
        onClose={() => setIsExerciseModalOpen(false)} 
        title="Додати вправу"
      >
        {selectedWorkoutId && <ExerciseForm workoutId={selectedWorkoutId} onSuccess={handleSuccessModal} />}
      </Modal>
      <Modal 
        isOpen={isMetricsModalOpen} 
        onClose={() => setIsMetricsModalOpen(false)} 
        title="Метрики"
      >
        <MetricsForm date={selectedDate} initialData={data?.metrics} onSuccess={handleSuccessModal} />
      </Modal>
    </div>
  );
};

export default DashboardPage;