export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  occupation: string;
  company?: string;
  workHoursPerDay: number;
  memberSince: string;
}

export interface PracticeSessionRecord {
  id: string;
  userId: string;
  date: string; // ISO string or YYYY-MM-DD
  durationMinutes: number;
  routineTitle: string;
  phaseCount: number;
  completedAt: string;
}

export interface UserStreakInfo {
  currentStreak: number;
  longestStreak: number;
  totalCompletedSessions: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  completedDates: string[]; // List of YYYY-MM-DD strings
}
