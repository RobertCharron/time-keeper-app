import React, { FC, useState, useEffect } from 'react';

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
  const [elapsedTime, setElapsedTime] = useState(0);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const fetchStations = async () => {
    try {
      const response = await fetch('http://localhost:3000/stations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stations');
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setError('Failed to load stations');
    }
  };

  const fetchActivities = async (stationId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/activities/station/${stationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load activities');
    }
  };

  const handleStartStop = () => {
    if (!isRunning) {
      setStartTime(new Date());
      setIsRunning(true);
      setElapsedTime(0);
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
          Authorization: `Bearer ${token}`,
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
      setElapsedTime(0);
    } catch (error) {
      console.error('Error saving activity use:', error);
      setError('Failed to save activity use');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          marginBottom: '30px',
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '28px',
          fontWeight: '600',
        }}
      >
        Activity Timer
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#2c3e50',
            }}
          >
            Select Station:
          </label>
          <select
            value={selectedStation || ''}
            onChange={(e) => setSelectedStation(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
              fontSize: '16px',
              transition: 'border-color 0.2s',
              cursor: 'pointer',
            }}
          >
            <option value="">Select a station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {selectedStation && (
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50',
              }}
            >
              Select Activity:
            </label>
            <select
              value={selectedActivity || ''}
              onChange={(e) => setSelectedActivity(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontSize: '16px',
                transition: 'border-color 0.2s',
                cursor: 'pointer',
              }}
            >
              <option value="">Select an activity</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedActivity && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#2c3e50',
              fontFamily: 'monospace',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              minWidth: '200px',
              textAlign: 'center',
            }}
          >
            {formatTime(elapsedTime)}
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={handleStartStop}
              disabled={loading}
              style={{
                padding: '12px 30px',
                backgroundColor: isRunning ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'transform 0.2s, background-color 0.2s',
              }}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>

            {endTime && (
              <button
                onClick={handleFinish}
                disabled={loading}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'transform 0.2s, background-color 0.2s',
                }}
              >
                {loading ? 'Saving...' : 'Finish'}
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      {startTime && (
        <div
          style={{
            marginTop: '30px',
            textAlign: 'center',
            color: '#6c757d',
            fontSize: '14px',
          }}
        >
          <p>Started: {startTime.toLocaleTimeString()}</p>
          {endTime && <p>Ended: {endTime.toLocaleTimeString()}</p>}
        </div>
      )}
    </div>
  );
};

export default ActivityTimer;
