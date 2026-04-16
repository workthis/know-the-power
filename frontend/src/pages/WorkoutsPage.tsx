import { useEffect, useState } from 'react';
import api from '../api/instance';

const WorkoutsPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats/weekly');
        setStats(response.data);
      } catch (error) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '18px',
      color: '#0f62e9',
      marginBottom: '16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    statBox: {
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center' as const,
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0 0 4px 0',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    statValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0,
    },
    progressPositive: {
      color: '#10b981',
      fontSize: '12px',
      fontWeight: 'bold',
      marginTop: '4px',
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
        <h2 style={styles.title}>Аналітика прогресу</h2>

        {loading ? (
          <p style={styles.statusText}>Аналіз даних</p>
        ) : !stats ? (
          <p style={styles.statusText}>Недостатньо даних для аналізу</p>
        ) : (
          <>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📅 За останній тиждень</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Середня вага</p>
                  <p style={styles.statValue}>{stats.averageWeight || '—'} кг</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Тренування</p>
                  <p style={styles.statValue}>{stats.totalWorkouts || 0}</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Всього ккал</p>
                  <p style={styles.statValue}>{stats.totalCalories || 0}</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Прогрес ваги</p>
                  <p style={styles.progressPositive}>
                    {stats.weightDiff > 0 ? `+${stats.weightDiff}` : stats.weightDiff || 0} кг
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📊 За останній місяць</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Виконано занять</p>
                  <p style={styles.statValue}>{stats.monthlyWorkouts || 0}</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statLabel}>Скинуто ваги</p>
                  <p style={{...styles.statValue, color: '#10b981'}}>
                    {stats.monthlyWeightDiff || '—'} кг
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;