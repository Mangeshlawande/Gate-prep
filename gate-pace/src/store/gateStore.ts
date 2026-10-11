import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GATE_90_DAYS_CURRICULUM } from '@/data/curriculum';
import { soundEngine } from '@/utils/audio';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  dayNumber: number;
  block: 'BLOCK_1' | 'BLOCK_2' | 'BLOCK_3';
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  subtasks: Subtask[];
  notes: string;
  resourceLink?: string;
  actualMinutes?: number;
}

export interface PYQLog {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  questionNumber: number;
  subject: string;
  topic: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  timeTakenSeconds: number;
  status: 'CORRECT_FIRST_TRY' | 'CORRECT_SLOW' | 'INCORRECT' | 'UNATTEMPTED_STUCK';
  gateYear?: string;
  notes?: string;
}

export type ErrorTaxonomy = 
  | 'CALCULATION_ARITHMETIC' 
  | 'MISREAD_QUESTION' 
  | 'EDGE_CASE_BLINDSPOT' 
  | 'CONCEPTUAL_GAP' 
  | 'TIME_PRESSURE';

export interface MistakeEntry {
  id: string;
  date: string;
  dayNumber: number;
  subject: string;
  topic: string;
  errorCategory: ErrorTaxonomy;
  problemStatement: string;
  userError: string;
  correctApproach: string;
  referenceLinks: string[];
  correctAttempts: number; // Requires 2 consecutive solves to mark resolved
  isResolved: boolean;
}

export interface StudySession {
  id: string;
  date: string;
  dayNumber: number;
  subject: string;
  block: string;
  startTime: string; // HH:mm
  durationMinutes: number;
  whatIDid: string;
}

export interface PersonalNote {
  id: string;
  date: string;
  subject: string;
  title: string;
  content: string;
  isImportant: boolean;
  tags: string[];
}

export interface GateState {
  startDate: string; // ISO string YYYY-MM-DD
  selectedDate: string; // ISO string YYYY-MM-DD
  activeDay: number; // 1 to 90
  tasks: Record<string, TaskItem>;
  pyqLogs: PYQLog[];
  mistakes: MistakeEntry[];
  studySessions: StudySession[];
  personalNotes: PersonalNote[];
  masteredFormulas: string[];
  xp: number;
  streakCount: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  activeAmbience: 'none' | 'binaural_40hz' | 'brown_noise' | 'white_noise';
  theme: 'dark' | 'light';

  // Actions
  setStartDate: (date: string) => void;
  setSelectedDate: (date: string) => void;
  setActiveDay: (day: number) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  
  // Task Actions
  toggleTaskStatus: (taskId: string, nextStatus?: 'todo' | 'in_progress' | 'done') => void;
  setTaskStatus: (taskId: string, status: 'todo' | 'in_progress' | 'done') => void;
  cycleTaskStatus: (taskId: string) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTaskNotes: (taskId: string, notes: string) => void;
  deleteTask: (taskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  
  // PYQ Actions
  logPYQ: (entry: Omit<PYQLog, 'id'>) => void;
  deletePYQ: (id: string) => void;

  // Mistake Diary Actions
  addMistake: (entry: Omit<MistakeEntry, 'id' | 'correctAttempts' | 'isResolved'>) => void;
  recordMistakeAttempt: (id: string, succeeded: boolean) => void;
  deleteMistake: (id: string) => void;

  // Study Activity Log ("What I did & When")
  logStudySession: (session: Omit<StudySession, 'id'>) => void;
  deleteStudySession: (id: string) => void;

  // Personal Notes
  addPersonalNote: (note: Omit<PersonalNote, 'id' | 'date'>) => void;
  updatePersonalNote: (id: string, updates: Partial<PersonalNote>) => void;
  deletePersonalNote: (id: string) => void;

  // Formula Deck Mastery
  toggleFormulaMastery: (formulaId: string) => void;

  // Gamification & Settings
  gainXp: (points: number) => void;
  checkAndUpdateStreak: (currentDate: string) => void;
  toggleSound: () => void;
  setAmbience: (type: 'none' | 'binaural_40hz' | 'brown_noise' | 'white_noise') => void;
  
  // Backup & Reset
  importState: (jsonString: string) => boolean;
  resetAll: () => void;
}

// Generate default tasks for Day 1 to 90
export function seedDefaultTasks(): Record<string, TaskItem> {
  const tasks: Record<string, TaskItem> = {};
  
  GATE_90_DAYS_CURRICULUM.forEach((day) => {
    // Block 1 Task
    const id1 = `day-${day.dayNumber}-b1`;
    tasks[id1] = {
      id: id1,
      dayNumber: day.dayNumber,
      block: 'BLOCK_1',
      title: `${day.block1.title}: ${day.techFocus.split(':')[0]}`,
      status: 'todo',
      subtasks: [
        { id: `${id1}-s1`, title: `Study theory & concepts: ${day.techFocus}`, completed: false },
        { id: `${id1}-s2`, title: 'Derive key properties and write short notes', completed: false }
      ],
      notes: `Focus area: ${day.techFocus}`,
      actualMinutes: 0
    };

    // Block 2 Task
    const id2 = `day-${day.dayNumber}-b2`;
    tasks[id2] = {
      id: id2,
      dayNumber: day.dayNumber,
      block: 'BLOCK_2',
      title: `${day.block2.title} (${day.pyqTarget} PYQs)`,
      status: 'todo',
      subtasks: [
        { id: `${id2}-s1`, title: `Solve questions 1-12 under timer`, completed: false },
        { id: `${id2}-s2`, title: `Solve questions 13-25 under timer`, completed: false },
        { id: `${id2}-s3`, title: `Analyze unattempted and slow questions`, completed: false }
      ],
      notes: `Target: 25 past GATE questions with stopwatch tracking.`,
      actualMinutes: 0
    };

    // Block 3 Task
    const id3 = `day-${day.dayNumber}-b3`;
    tasks[id3] = {
      id: id3,
      dayNumber: day.dayNumber,
      block: 'BLOCK_3',
      title: `${day.block3.title}: ${day.eveningFocus}`,
      status: 'todo',
      subtasks: [
        { id: `${id3}-s1`, title: `Complete evening drill: ${day.eveningFocus}`, completed: false },
        { id: `${id3}-s2`, title: `Mistake Diary scrub: Log any wrong questions from today`, completed: false },
        { id: `${id3}-s3`, title: `Review daily formula flashcards`, completed: false }
      ],
      notes: `Evening focus: ${day.eveningFocus}`,
      actualMinutes: 0
    };
  });

  return tasks;
}

const todayStr = () => new Date().toISOString().split('T')[0];

export const useGateStore = create<GateState>()(
  persist(
    (set, get) => ({
      startDate: todayStr(),
      selectedDate: todayStr(),
      activeDay: 1,
      tasks: seedDefaultTasks(),
      pyqLogs: [],
      mistakes: [],
      studySessions: [],
      personalNotes: [],
      masteredFormulas: [],
      xp: 150, // initial welcome XP
      streakCount: 1,
      lastActiveDate: todayStr(),
      soundEnabled: true,
      activeAmbience: 'none',
      theme: 'dark',

      setStartDate: (date) => set({ startDate: date }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setActiveDay: (day) => set({ activeDay: Math.min(90, Math.max(1, day)) }),

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
          } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          }
        }
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },

      setTaskStatus: (taskId, status) => {
        const state = get();
        const currentTask = state.tasks[taskId];
        if (!currentTask || currentTask.status === status) return;

        const prevStatus = currentTask.status;
        let xpDelta = 0;
        if (status === 'done') {
          xpDelta = prevStatus === 'in_progress' ? 30 : 50;
        } else if (status === 'in_progress') {
          xpDelta = prevStatus === 'done' ? -30 : 20;
        } else if (status === 'todo') {
          xpDelta = prevStatus === 'done' ? -50 : prevStatus === 'in_progress' ? -20 : 0;
        }

        set((s) => ({
          tasks: {
            ...s.tasks,
            [taskId]: {
              ...currentTask,
              status,
              subtasks:
                status === 'done'
                  ? currentTask.subtasks.map((sub) => ({ ...sub, completed: true }))
                  : status === 'todo'
                  ? currentTask.subtasks.map((sub) => ({ ...sub, completed: false }))
                  : currentTask.subtasks
            }
          },
          xp: Math.max(0, s.xp + xpDelta)
        }));

        if (status === 'done' && state.soundEnabled) {
          soundEngine.playSuccess();
        } else if (status === 'in_progress' && state.soundEnabled) {
          soundEngine.playXpGain();
        }
      },

      cycleTaskStatus: (taskId) => {
        const current = get().tasks[taskId];
        if (!current) return;
        const next =
          current.status === 'todo'
            ? 'in_progress'
            : current.status === 'in_progress'
            ? 'done'
            : 'todo';
        get().setTaskStatus(taskId, next);
      },

      toggleTaskStatus: (taskId, nextStatus) => {
        if (nextStatus) {
          get().setTaskStatus(taskId, nextStatus);
        } else {
          get().cycleTaskStatus(taskId);
        }
      },

      addTask: (taskData) => {
        const id = `task-custom-${Date.now()}`;
        set((s) => ({
          tasks: {
            ...s.tasks,
            [id]: {
              id,
              ...taskData,
              subtasks: taskData.subtasks || []
            }
          },
          xp: s.xp + 10
        }));
      },

      updateTaskNotes: (taskId, notes) => {
        set((s) => {
          const t = s.tasks[taskId];
          if (!t) return s;
          return {
            tasks: {
              ...s.tasks,
              [taskId]: { ...t, notes }
            }
          };
        });
      },

      deleteTask: (taskId) => {
        set((s) => {
          const newTasks = { ...s.tasks };
          delete newTasks[taskId];
          return { tasks: newTasks };
        });
      },

      addSubtask: (taskId, title) => {
        set((s) => {
          const t = s.tasks[taskId];
          if (!t) return s;
          const newSub: Subtask = {
            id: `sub-${Date.now()}`,
            title,
            completed: false
          };
          return {
            tasks: {
              ...s.tasks,
              [taskId]: {
                ...t,
                subtasks: [...t.subtasks, newSub]
              }
            }
          };
        });
      },

      toggleSubtask: (taskId, subtaskId) => {
        set((s) => {
          const t = s.tasks[taskId];
          if (!t) return s;
          const updatedSubs = t.subtasks.map((sub) =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          );
          const allCompleted = updatedSubs.length > 0 && updatedSubs.every(sub => sub.completed);
          
          return {
            tasks: {
              ...s.tasks,
              [taskId]: {
                ...t,
                subtasks: updatedSubs,
                status: allCompleted ? 'done' : t.status === 'todo' ? 'in_progress' : t.status
              }
            },
            xp: s.xp + 15
          };
        });

        if (get().soundEnabled) {
          soundEngine.playXpGain();
        }
      },

      deleteSubtask: (taskId, subtaskId) => {
        set((s) => {
          const t = s.tasks[taskId];
          if (!t) return s;
          return {
            tasks: {
              ...s.tasks,
              [taskId]: {
                ...t,
                subtasks: t.subtasks.filter((sub) => sub.id !== subtaskId)
              }
            }
          };
        });
      },

      logPYQ: (entry) => {
        const id = `pyq-${Date.now()}`;
        const newLog: PYQLog = { id, ...entry };
        
        let earnedXp = 20;
        if (entry.status === 'CORRECT_FIRST_TRY') earnedXp = 50;
        else if (entry.status === 'CORRECT_SLOW') earnedXp = 30;

        set((s) => ({
          pyqLogs: [newLog, ...s.pyqLogs],
          xp: s.xp + earnedXp
        }));

        if (get().soundEnabled) {
          if (entry.status === 'CORRECT_FIRST_TRY') soundEngine.playSuccess();
          else soundEngine.playXpGain();
        }
      },

      deletePYQ: (id) => {
        set((s) => ({
          pyqLogs: s.pyqLogs.filter((p) => p.id !== id)
        }));
      },

      addMistake: (entry) => {
        const id = `mistake-${Date.now()}`;
        const newEntry: MistakeEntry = {
          id,
          ...entry,
          correctAttempts: 0,
          isResolved: false
        };
        set((s) => ({
          mistakes: [newEntry, ...s.mistakes],
          xp: s.xp + 25 // reward for honest mistake tracking
        }));

        if (get().soundEnabled) {
          soundEngine.playXpGain();
        }
      },

      recordMistakeAttempt: (id, succeeded) => {
        set((s) => {
          const list = s.mistakes.map((m) => {
            if (m.id !== id) return m;
            if (succeeded) {
              const attempts = m.correctAttempts + 1;
              const isResolved = attempts >= 2;
              return { ...m, correctAttempts: attempts, isResolved };
            } else {
              return { ...m, correctAttempts: 0, isResolved: false };
            }
          });
          return {
            mistakes: list,
            xp: succeeded ? s.xp + 60 : s.xp
          };
        });

        if (succeeded && get().soundEnabled) {
          soundEngine.playSuccess();
        }
      },

      deleteMistake: (id) => {
        set((s) => ({
          mistakes: s.mistakes.filter((m) => m.id !== id)
        }));
      },

      logStudySession: (session) => {
        const id = `session-${Date.now()}`;
        const newSession: StudySession = { id, ...session };
        const gainedXp = Math.round(session.durationMinutes * 2);

        set((s) => ({
          studySessions: [newSession, ...s.studySessions],
          xp: s.xp + gainedXp
        }));

        if (get().soundEnabled) {
          soundEngine.playSuccess();
        }
      },

      deleteStudySession: (id) => {
        set((s) => ({
          studySessions: s.studySessions.filter((ss) => ss.id !== id)
        }));
      },

      addPersonalNote: (note) => {
        const id = `note-${Date.now()}`;
        const newNote: PersonalNote = {
          id,
          date: todayStr(),
          ...note
        };
        set((s) => ({
          personalNotes: [newNote, ...s.personalNotes],
          xp: s.xp + 15
        }));
      },

      updatePersonalNote: (id, updates) => {
        set((s) => ({
          personalNotes: s.personalNotes.map((n) =>
            n.id === id ? { ...n, ...updates } : n
          )
        }));
      },

      deletePersonalNote: (id) => {
        set((s) => ({
          personalNotes: s.personalNotes.filter((n) => n.id !== id)
        }));
      },

      toggleFormulaMastery: (formulaId) => {
        set((s) => {
          const exists = s.masteredFormulas.includes(formulaId);
          const next = exists
            ? s.masteredFormulas.filter((f) => f !== formulaId)
            : [...s.masteredFormulas, formulaId];
          return {
            masteredFormulas: next,
            xp: exists ? s.xp : s.xp + 30
          };
        });

        if (get().soundEnabled) {
          soundEngine.playXpGain();
        }
      },

      gainXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      checkAndUpdateStreak: (currentDate) => {
        const state = get();
        if (state.lastActiveDate === currentDate) return;

        // Check if yesterday was lastActiveDate
        const current = new Date(currentDate);
        const last = new Date(state.lastActiveDate);
        const diffDays = Math.round((current.getTime() - last.getTime()) / (1000 * 3600 * 24));

        let newStreak = state.streakCount;
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }

        set({
          streakCount: newStreak,
          lastActiveDate: currentDate,
          xp: state.xp + 100 // streak bonus
        });
      },

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      setAmbience: (type) => {
        set({ activeAmbience: type });
        if (type === 'none') {
          soundEngine.stopAmbience();
        } else {
          soundEngine.startAmbience(type);
        }
      },

      importState: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          set(parsed);
          return true;
        } catch {
          return false;
        }
      },

      resetAll: () => {
        set({
          startDate: todayStr(),
          selectedDate: todayStr(),
          activeDay: 1,
          tasks: seedDefaultTasks(),
          pyqLogs: [],
          mistakes: [],
          studySessions: [],
          personalNotes: [],
          masteredFormulas: [],
          xp: 150,
          streakCount: 1,
          lastActiveDate: todayStr(),
          soundEnabled: true,
          activeAmbience: 'none',
          theme: 'dark'
        });
      }
    }),
    {
      name: 'gate-pace-storage-v1'
    }
  )
);

export function getTodayTaskStats(tasks: Record<string, TaskItem>, dayNumber: number) {
  const b1 = tasks[`day-${dayNumber}-b1`];
  const b2 = tasks[`day-${dayNumber}-b2`];
  const b3 = tasks[`day-${dayNumber}-b3`];
  const list = [b1, b2, b3].filter(Boolean);
  const done = list.filter((t) => t?.status === 'done').length;
  const inProgress = list.filter((t) => t?.status === 'in_progress').length;
  const total = 3;
  const percent = Math.round((done / total) * 100);
  return { done, inProgress, total, percent };
}
