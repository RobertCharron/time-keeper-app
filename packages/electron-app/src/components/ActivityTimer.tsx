import React, { FC, useState, useEffect } from 'react';
import './ActivityTimer.css';

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

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const ActivityTimer: FC<ActivityTimerProps> = ({ token }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [pauseTime, setPauseTime] = useState<Date | null>(null);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

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
    if (isRunning && !isPaused && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const pausedTime = totalPausedTime;
        setElapsedTime(Math.floor((now.getTime() - startTime.getTime() - pausedTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, startTime, totalPausedTime]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const resetTimer = () => {
    setStartTime(null);
    setPauseTime(null);
    setTotalPausedTime(0);
    setSelectedActivity(null);
    setSelectedStation(null);
    setError(null);
    setElapsedTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

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

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(new Date());
      setIsRunning(true);
      setIsPaused(false);
      setElapsedTime(0);
      setTotalPausedTime(0);
    }
  };

  const handlePause = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
      setPauseTime(new Date());
    } else if (isRunning && isPaused && pauseTime) {
      setIsPaused(false);
      const now = new Date();
      const newPausedTime = now.getTime() - pauseTime.getTime();
      setTotalPausedTime((prev) => prev + newPausedTime);
      setPauseTime(null);
    }
  };

  const handleFinish = async () => {
    if (!startTime || !selectedActivity) return;

    const endTime = new Date();
    setLoading(true);
    try {
      // Calculate total duration in milliseconds
      const totalDuration = endTime.getTime() - startTime.getTime();

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
          timePaused: totalPausedTime,
          totalDuration: totalDuration,
        }),
      });

      if (!response.ok) throw new Error('Failed to save activity use');

      addToast('Activity saved successfully!', 'success');
      resetTimer();
    } catch (error) {
      console.error('Error saving activity use:', error);
      setError('Failed to save activity use');
      addToast('Failed to save activity. Please try again.', 'error');
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
    <div className="timer-container">
      <h2 className="timer-title">Activity Timer</h2>

      <div className="timer-grid">
        <div>
          <label className="timer-label">Select Station:</label>
          <select
            value={selectedStation || ''}
            onChange={(e) => setSelectedStation(Number(e.target.value))}
            className="timer-select"
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
            <label className="timer-label">Select Activity:</label>
            <select
              value={selectedActivity || ''}
              onChange={(e) => setSelectedActivity(Number(e.target.value))}
              className="timer-select"
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
        <div className="timer-display">
          <div className="timer-time">{formatTime(elapsedTime)}</div>
          <div className="timer-buttons">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="timer-button start-button"
                disabled={loading}
              >
                Start
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="timer-button pause-button"
                  disabled={loading}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={handleFinish}
                  className="timer-button finish-button"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Finish'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimer;
