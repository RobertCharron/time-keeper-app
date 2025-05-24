import { FC, useState, useEffect } from 'react';

interface Station {
  id: number;
  name: string;
  activities: Activity[];
}

interface Activity {
  id: number;
  name: string;
}

interface ActivityTimerProps {
  token: string;
}

const ActivityTimer: FC<ActivityTimerProps> = ({ token }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (selectedStation) {
      fetchActivities(selectedStation);
    } else {
      setActivities([]);
    }
  }, [selectedStation]);

  const fetchStations = async () => {
    try {
      const response = await fetch('http://localhost:3000/stations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stations');
      const data = await response.json();
      setStations(data);
    } catch (err) {
      setError('Failed to load stations');
    }
  };

  const fetchActivities = async (stationId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/activities/station/${stationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError('Failed to load activities');
    }
  };

  const handleStartStop = () => {
    if (!isRunning) {
      setStartTime(new Date());
      setIsRunning(true);
    } else {
      setEndTime(new Date());
      setIsRunning(false);
    }
  };

  const handleFinish = async () => {
    if (!startTime || !endTime || !selectedActivity) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/activity-uses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          timeStart: startTime,
          timeEnd: endTime,
          activityId: selectedActivity,
        }),
      });

      if (!response.ok) throw new Error('Failed to save activity use');

      // Reset the timer
      setStartTime(null);
      setEndTime(null);
      setSelectedActivity(null);
      setSelectedStation(null);
      setError(null);
    } catch (err) {
      setError('Failed to save activity use');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Activity Timer</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Select Station:
        </label>
        <select
          value={selectedStation || ''}
          onChange={(e) => setSelectedStation(Number(e.target.value))}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select a station</option>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStation && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Select Activity:
          </label>
          <select
            value={selectedActivity || ''}
            onChange={(e) => setSelectedActivity(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select an activity</option>
            {activities.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedActivity && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={handleStartStop}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: isRunning ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          {endTime && (
            <button
              onClick={handleFinish}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Saving...' : 'Finish'}
            </button>
          )}
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>
      )}

      {startTime && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Started: {startTime.toLocaleTimeString()}</p>
          {endTime && <p>Ended: {endTime.toLocaleTimeString()}</p>}
        </div>
      )}
    </div>
  );
};

export default ActivityTimer; 