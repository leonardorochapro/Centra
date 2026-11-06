import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { PILATES_EXERCISES_DATABASE } from './src/data/pilatesExercises';
import { generateClinicalPilatesRoutine } from './src/services/clinicalEngine';
import { UserAssessment } from './src/types/pilates';
import { UserProfile, PracticeSessionRecord, UserStreakInfo } from './src/types/auth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// In-Memory Database with Pre-seeded Demo Data
interface UserDatabase {
  users: Record<string, UserProfile>;
  sessions: Record<string, PracticeSessionRecord[]>;
  contactLeads: Array<{ id: string; name?: string; email?: string; message?: string; plan?: string; createdAt: string }>;
}

const db: UserDatabase = {
  users: {
    'usr_leonardo_rocha': {
      id: 'usr_leonardo_rocha',
      name: 'Leonardo Rocha',
      email: 'leonardorochadspro@gmail.com',
      occupation: 'Desenvolvedor / Trabalho Remoto',
      company: 'Tech Remote & Home Office',
      workHoursPerDay: 8,
      memberSince: '2026-01-15',
    },
    'usr_mariana_duarte': {
      id: 'usr_mariana_duarte',
      name: 'Mariana Duarte',
      email: 'mariana.duarte@remotework.io',
      occupation: 'Product Designer',
      company: 'Design Studio Global',
      workHoursPerDay: 8,
      memberSince: '2026-02-01',
    },
  },
  sessions: {
    'usr_leonardo_rocha': [
      {
        id: 'sess-1',
        userId: 'usr_leonardo_rocha',
        completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        durationMinutes: 30,
        routineTitle: 'Foco na descompressão lombar e trapézio superior.',
        phaseCount: 4,
      },
      {
        id: 'sess-2',
        userId: 'usr_leonardo_rocha',
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        durationMinutes: 30,
        routineTitle: 'Ativação do Powerhouse e respiração costolateral.',
        phaseCount: 4,
      },
      {
        id: 'sess-3',
        userId: 'usr_leonardo_rocha',
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        durationMinutes: 15,
        routineTitle: 'Pausa ativa rápida no meio da jornada teletrabalho.',
        phaseCount: 4,
      },
      {
        id: 'sess-4',
        userId: 'usr_leonardo_rocha',
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        durationMinutes: 45,
        routineTitle: 'Sessão completa com mobilidade articular e relaxamento.',
        phaseCount: 4,
      },
      {
        id: 'sess-5',
        userId: 'usr_leonardo_rocha',
        completedAt: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        durationMinutes: 30,
        routineTitle: 'Treino de Mat Pilates do dia concluído com alívio cervical.',
        phaseCount: 4,
      },
    ],
  },
  contactLeads: [],
};

// Helper: Compute Streaks
function calculateStreakForUser(userId: string): UserStreakInfo {
  const userSessions = db.sessions[userId] || [];
  if (userSessions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCompletedSessions: 0,
      lastCompletedDate: null,
      completedDates: [],
    };
  }

  // Deduplicate and sort dates descending
  const dateSet = new Set<string>();
  userSessions.forEach((s) => dateSet.add(s.date));
  const sortedDates = Array.from(dateSet).sort((a, b) => (b > a ? 1 : -1));

  const totalCompletedSessions = userSessions.length;
  const lastCompletedDate = sortedDates[0] || null;

  // Calculate current streak
  let currentStreak = 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  let checkDate = new Date();
  if (!dateSet.has(todayStr) && dateSet.has(yesterdayStr)) {
    checkDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  }

  const checkDateStr = checkDate.toISOString().split('T')[0];
  if (dateSet.has(checkDateStr)) {
    currentStreak = 1;
    let prevDay = new Date(checkDate);
    while (true) {
      prevDay.setDate(prevDay.getDate() - 1);
      const prevDayStr = prevDay.toISOString().split('T')[0];
      if (dateSet.has(prevDayStr)) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  const ascendingDates = Array.from(dateSet).sort();
  let longestStreak = 0;
  let running = 0;
  let lastChecked: Date | null = null;

  for (const dStr of ascendingDates) {
    const d = new Date(dStr + 'T00:00:00');
    if (!lastChecked) {
      running = 1;
    } else {
      const diffMs = d.getTime() - lastChecked.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        running++;
      } else if (diffDays > 1) {
        running = 1;
      }
    }
    if (running > longestStreak) {
      longestStreak = running;
    }
    lastChecked = d;
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  return {
    currentStreak,
    longestStreak,
    totalCompletedSessions,
    lastCompletedDate,
    completedDates: Array.from(dateSet),
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // ----------------------------------------------------
  // REST API Endpoints
  // ----------------------------------------------------

  // 1. Health status
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'Centra Mat Pilates Full-Stack Engine',
      environment: isProduction ? 'production' : 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Clinical Exercises Database
  app.get('/api/exercises', (_req: Request, res: Response) => {
    res.json({
      count: PILATES_EXERCISES_DATABASE.length,
      exercises: PILATES_EXERCISES_DATABASE,
    });
  });

  // 3. Server-authoritative Routine Generator
  app.post('/api/routines/generate', (req: Request, res: Response) => {
    try {
      const assessment = req.body as UserAssessment;
      if (!assessment || typeof assessment.duration !== 'number') {
        res.status(400).json({ error: 'Parâmetros de anamnese clínica inválidos.' });
        return;
      }

      const routine = generateClinicalPilatesRoutine(assessment);
      res.json(routine);
    } catch (err: any) {
      console.error('Error generating routine on backend:', err);
      res.status(500).json({ error: 'Falha ao processar prescrição clínica.' });
    }
  });

  // 4. User Authentication - Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, name } = req.body;
    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'E-mail obrigatório para identificação.' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      // Auto-create user if first time logging in
      const newId = `usr_${Date.now()}`;
      const newUser: UserProfile = {
        id: newId,
        name: name?.trim() || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        occupation: 'Profissional em Teletrabalho',
        company: 'Home Office Tech',
        workHoursPerDay: 8,
        memberSince: new Date().toISOString().split('T')[0],
      };
      db.users[newId] = newUser;
      db.sessions[newId] = [];
      user = newUser;
    }

    const streak = calculateStreakForUser(user.id);
    res.json({
      user,
      streak,
    });
  });

  // 5. User Registration
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, company, occupation, workHoursPerDay } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      const streak = calculateStreakForUser(existing.id);
      res.json({ user: existing, streak });
      return;
    }

    const id = `usr_${Date.now()}`;
    const newUser: UserProfile = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      occupation: occupation?.trim() || 'Profissional em Teletrabalho',
      company: company?.trim() || 'Home Office',
      workHoursPerDay: Number(workHoursPerDay) || 8,
      memberSince: new Date().toISOString().split('T')[0],
    };

    db.users[id] = newUser;
    db.sessions[id] = [];
    const streak = calculateStreakForUser(id);

    res.status(201).json({
      user: newUser,
      streak,
    });
  });

  // 6. Get User by ID
  app.get('/api/users/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = db.users[userId];
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }
    const streak = calculateStreakForUser(userId);
    res.json({ user, streak });
  });

  // 7. Get Sessions & Streak for User
  app.get('/api/sessions/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const sessions = db.sessions[userId] || [];
    const streak = calculateStreakForUser(userId);
    res.json({
      sessions,
      streak,
    });
  });

  // 8. Record Completed Practice Session
  app.post('/api/sessions', (req: Request, res: Response) => {
    const { userId, durationMinutes, workoutNotes, dateStr } = req.body;
    if (!userId || !durationMinutes) {
      res.status(400).json({ error: 'userId e durationMinutes são obrigatórios.' });
      return;
    }

    if (!db.users[userId]) {
      db.users[userId] = {
        id: userId,
        name: 'Praticante Centra',
        email: `${userId}@centra.app`,
        occupation: 'Teletrabalho',
        workHoursPerDay: 8,
        memberSince: new Date().toISOString().split('T')[0],
      };
    }

    if (!db.sessions[userId]) {
      db.sessions[userId] = [];
    }

    const now = new Date();
    const targetDateStr = dateStr || now.toISOString().split('T')[0];

    const newRecord: PracticeSessionRecord = {
      id: `sess-${Date.now()}`,
      userId,
      completedAt: now.toISOString(),
      date: targetDateStr,
      durationMinutes: Number(durationMinutes),
      routineTitle: workoutNotes || 'Sessão de Mat Pilates concluída.',
      phaseCount: 4,
    };

    db.sessions[userId].push(newRecord);
    const updatedStreak = calculateStreakForUser(userId);

    res.status(201).json({
      record: newRecord,
      streak: updatedStreak,
    });
  });

  // 9. Toggle Practice Day on Calendar
  app.post('/api/sessions/toggle-day', (req: Request, res: Response) => {
    const { userId, dateStr } = req.body;
    if (!userId || !dateStr) {
      res.status(400).json({ error: 'userId e dateStr são obrigatórios.' });
      return;
    }

    if (!db.sessions[userId]) {
      db.sessions[userId] = [];
    }

    const existingIndex = db.sessions[userId].findIndex((s) => s.date === dateStr);
    if (existingIndex >= 0) {
      // Remove it
      db.sessions[userId].splice(existingIndex, 1);
    } else {
      // Add manual check-in
      db.sessions[userId].push({
        id: `sess-manual-${Date.now()}`,
        userId,
        completedAt: new Date(`${dateStr}T12:00:00Z`).toISOString(),
        date: dateStr,
        durationMinutes: 30,
        routineTitle: 'Prática de Mat Pilates registrada manualmente.',
        phaseCount: 4,
      });
    }

    const streak = calculateStreakForUser(userId);
    res.json({
      success: true,
      streak,
      sessions: db.sessions[userId],
    });
  });

  // 10. Contact / Lead Submissions (from Centra Landing Page)
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, message, plan } = req.body;
    const lead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      message,
      plan: plan || 'Integral',
      createdAt: new Date().toISOString(),
    };
    db.contactLeads.push(lead);
    console.log(`[Centra Lead] New contact received: ${email} (${plan})`);
    res.json({
      success: true,
      message: 'Obrigado pelo contato! Nossa equipe clínica entrará em contato em breve.',
      leadId: lead.id,
    });
  });

  // ----------------------------------------------------
  // Frontend Serving / Vite Dev Middleware
  // ----------------------------------------------------
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Centra Pilates Full-Stack Engine running on http://0.0.0.0:${PORT} [${isProduction ? 'PROD' : 'DEV'}]`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting Centra Pilates server:', err);
  process.exit(1);
});
