import { UserProfile, PracticeSessionRecord, UserStreakInfo } from '../types/auth';

const STORAGE_KEY_USER = 'centra_auth_user';
const STORAGE_KEY_SESSIONS = 'centra_user_sessions';
const STORAGE_KEY_USERS_DB = 'centra_registered_users';

// Helper to format date as YYYY-MM-DD in local time
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate recent dates for realistic demo streak
function getDemoSessionDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  // Last 4 days including today
  for (let i = 0; i < 4; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDateKey(d));
  }
  
  // Also some sessions from last week
  for (let i = 6; i < 9; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDateKey(d));
  }

  return dates.sort();
}

export const DEMO_USER: UserProfile = {
  id: 'usr_leonardo_rocha',
  name: 'Leonardo Rocha',
  email: 'leonardorochadspro@gmail.com',
  occupation: 'Desenvolvedor / Trabalho Remoto',
  company: 'Home Office Tech',
  workHoursPerDay: 8,
  memberSince: '2026-09-15',
};

export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY_USER);
  if (!raw) {
    // Default to DEMO_USER on initial load so the client has an active authenticated state out of the box
    saveCurrentUser(DEMO_USER);
    seedDemoSessionsIfEmpty(DEMO_USER.id);
    return DEMO_USER;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserProfile | null) {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEY_USER);
  } else {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
}

export function getAllSessions(userId: string): PracticeSessionRecord[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(`${STORAGE_KEY_SESSIONS}_${userId}`);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function seedDemoSessionsIfEmpty(userId: string) {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEY_SESSIONS}_${userId}`;
  const existing = localStorage.getItem(key);
  if (existing) return;

  const dates = getDemoSessionDates();
  const initialSessions: PracticeSessionRecord[] = dates.map((d, index) => ({
    id: `sess_demo_${index}`,
    userId,
    date: d,
    durationMinutes: 30,
    routineTitle: 'Plano de Equilíbrio Postural & Alívio Lombar',
    phaseCount: 4,
    completedAt: `${d}T17:30:00.000Z`,
  }));

  localStorage.setItem(key, JSON.stringify(initialSessions));
}

export function recordCompletedSession(
  userId: string,
  durationMinutes: number,
  routineTitle: string = 'Rotina Mat Pilates Home Office'
): PracticeSessionRecord {
  const sessions = getAllSessions(userId);
  const todayKey = formatDateKey(new Date());

  const newSession: PracticeSessionRecord = {
    id: `sess_${Date.now()}`,
    userId,
    date: todayKey,
    durationMinutes,
    routineTitle,
    phaseCount: 4,
    completedAt: new Date().toISOString(),
  };

  const updated = [...sessions, newSession];
  if (typeof window !== 'undefined') {
    localStorage.setItem(`${STORAGE_KEY_SESSIONS}_${userId}`, JSON.stringify(updated));
  }

  // Asynchronous full-stack sync with Express backend
  if (typeof window !== 'undefined') {
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        durationMinutes,
        workoutNotes: routineTitle,
        dateStr: todayKey,
      }),
    }).catch((err) => {
      console.warn('Backend sync deferred (operating offline/cached mode):', err);
    });
  }

  return newSession;
}

export function toggleManualDayCompletion(userId: string, dateKey: string): boolean {
  const sessions = getAllSessions(userId);
  const exists = sessions.find((s) => s.date === dateKey);

  let updated: PracticeSessionRecord[];
  let isNowCompleted = false;

  if (exists) {
    // Remove session
    updated = sessions.filter((s) => s.date !== dateKey);
    isNowCompleted = false;
  } else {
    // Add manual session
    const manualSession: PracticeSessionRecord = {
      id: `sess_manual_${Date.now()}`,
      userId,
      date: dateKey,
      durationMinutes: 30,
      routineTitle: 'Treino de Mat Pilates Concluído (Registro Manual)',
      phaseCount: 4,
      completedAt: new Date().toISOString(),
    };
    updated = [...sessions, manualSession];
    isNowCompleted = true;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(`${STORAGE_KEY_SESSIONS}_${userId}`, JSON.stringify(updated));
    fetch('/api/sessions/toggle-day', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, dateStr: dateKey }),
    }).catch((err) => {
      console.warn('Backend toggle sync deferred:', err);
    });
  }

  return isNowCompleted;
}

export function calculateUserStreak(userId: string): UserStreakInfo {
  const sessions = getAllSessions(userId);
  if (sessions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCompletedSessions: 0,
      lastCompletedDate: null,
      completedDates: [],
    };
  }

  // Get unique dates
  const uniqueDatesSet = new Set(sessions.map((s) => s.date));
  const sortedDates = Array.from(uniqueDatesSet).sort();

  const today = new Date();
  const todayKey = formatDateKey(today);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);

  // Check if active streak
  let currentStreak = 0;
  let cursor = new Date(today);

  // If today is completed, start from today.
  // If not completed today, but completed yesterday, streak is still alive from yesterday.
  if (uniqueDatesSet.has(todayKey)) {
    cursor = new Date(today);
  } else if (uniqueDatesSet.has(yesterdayKey)) {
    cursor = new Date(yesterday);
  } else {
    cursor = new Date(0); // broken
  }

  if (cursor.getTime() > 0) {
    while (true) {
      const key = formatDateKey(cursor);
      if (uniqueDatesSet.has(key)) {
        currentStreak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak in history
  let longestStreak = 0;
  let tempStreak = 0;
  let previousDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const currentDate = new Date(y, m - 1, d);

    if (previousDate) {
      const diffTime = currentDate.getTime() - previousDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    previousDate = currentDate;
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    totalCompletedSessions: sessions.length,
    lastCompletedDate: sortedDates[sortedDates.length - 1] || null,
    completedDates: sortedDates,
  };
}

export function registerUser(name: string, email: string): UserProfile {
  const newUser: UserProfile = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    occupation: 'Profissional em Teletrabalho',
    workHoursPerDay: 8,
    memberSince: formatDateKey(new Date()),
  };

  saveCurrentUser(newUser);
  return newUser;
}

export function loginUser(email: string): UserProfile {
  // If matches demo email
  if (email.toLowerCase().includes('leonardo')) {
    saveCurrentUser(DEMO_USER);
    seedDemoSessionsIfEmpty(DEMO_USER.id);
    return DEMO_USER;
  }

  // Otherwise login or create
  const user: UserProfile = {
    id: `usr_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
    name: email.split('@')[0].replace('.', ' '),
    email: email.trim().toLowerCase(),
    occupation: 'Profissional em Teletrabalho',
    workHoursPerDay: 8,
    memberSince: formatDateKey(new Date()),
  };

  saveCurrentUser(user);
  return user;
}
