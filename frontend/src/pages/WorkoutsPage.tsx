import { useEffect, useState } from 'react';
import api from '../api/instance';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get('/workouts');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Помилка завантаження тренувань:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <h2 style={{ padding: '20px' }}>Завантаження тренувань...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Мої тренування</h1>

      <section style={{ marginBottom: '20px' }}>
        <h2>🏋️ Історія тренувань</h2>

        {workouts.length > 0 ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id} style={{ marginBottom: '15px' }}>
                <strong>{workout.name}</strong> ({workout.type}) — <small>{workout.date}</small>
                
                {/* Перевіряємо, чи є вкладені вправи */}
                {workout.exercises && workout.exercises.length > 0 && (
                  <ul style={{ marginTop: '5px', color: '#555' }}>
                    {workout.exercises.map((ex: any) => (
                      <li key={ex.id}>
                        {ex.name}: {ex.sets} підходів по {ex.reps} разів ({ex.weight} кг)
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Ти ще не додав жодного тренування.</p>
        )}
      </section>
    </div>
  );
};

export default WorkoutsPage;