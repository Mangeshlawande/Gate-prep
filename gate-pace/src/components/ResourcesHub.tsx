'use client';

import React, { useState } from 'react';
import { useGateStore, PersonalNote } from '@/store/gateStore';
import { GATE_RESOURCES, ResourceLink } from '@/data/resources';
import {
  ExternalLink,
  Star,
  Plus,
  Trash2,
  Edit2,
  Search,
  BookOpen,
  Bookmark,
  Share2,
  Calculator,
  Compass
} from 'lucide-react';

export const ResourcesHub: React.FC = () => {
  const {
    personalNotes,
    addPersonalNote,
    updatePersonalNote,
    deletePersonalNote,
    gainXp
  } = useGateStore();

  const [activeTab, setActiveTab] = useState<'resources' | 'notes'>('resources');
  const [resourceCategory, setResourceCategory] = useState<string>('ALL');
  const [resourceSearch, setResourceSearch] = useState<string>('');

  // Note Creator Form State
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteSubject, setNoteSubject] = useState<string>('Operating Systems');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteTags, setNoteTags] = useState<string>('');
  const [isNoteStarred, setIsNoteStarred] = useState<boolean>(false);

  // Filter Notes
  const [noteFilterStarred, setNoteFilterStarred] = useState<boolean>(false);
  const [notesSearch, setNotesSearch] = useState<string>('');

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    addPersonalNote({
      subject: noteSubject,
      title: noteTitle,
      content: noteContent,
      isImportant: isNoteStarred,
      tags: noteTags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setIsNoteStarred(false);
    setShowNoteModal(false);
  };

  // Filtered Resources
  const filteredResources = GATE_RESOURCES.filter((res) => {
    const matchesCat = resourceCategory === 'ALL' || res.category === resourceCategory;
    const matchesQuery =
      resourceSearch === '' ||
      res.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      res.subject.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(resourceSearch.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  // Filtered Notes
  const filteredNotes = personalNotes.filter((n) => {
    const matchesStarred = !noteFilterStarred || n.isImportant;
    const matchesQuery =
      notesSearch === '' ||
      n.title.toLowerCase().includes(notesSearch.toLowerCase()) ||
      n.subject.toLowerCase().includes(notesSearch.toLowerCase()) ||
      n.content.toLowerCase().includes(notesSearch.toLowerCase());
    return matchesStarred && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Navigation Switcher */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100">
                RESOURCE DIRECTORY & NOTES
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Curated GeeksforGeeks notes, GateOverflow archives, TCS calculator, and tagged notebooks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono text-center transition-colors touch-manipulation cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Curated Links
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono text-center transition-colors touch-manipulation cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Personal Notes
            </button>
          </div>
        </div>

        {/* Tab 1 Controls: Resources */}
        {activeTab === 'resources' && (
          <div className="mt-4 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll -mx-2 px-2 sm:mx-0 sm:px-0">
              {['ALL', 'GeeksforGeeks', 'GateOverflow', 'Official Tool', 'Textbook Guide'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setResourceCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation cursor-pointer ${
                    resourceCategory === cat
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources, topics..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* Tab 2 Controls: Personal Notes */}
        {activeTab === 'notes' && (
          <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNoteFilterStarred(!noteFilterStarred)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                  noteFilterStarred
                    ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" /> Starred Only
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <button
                onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              >
                <Plus className="w-3.5 h-3.5" /> New Note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 p-5 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                    {res.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{res.subject}</span>
                </div>

                <h3 className="text-sm font-bold text-zinc-100 mt-2.5 group-hover:text-cyan-300 transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-950 text-zinc-400 border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-end">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs">
              No notes found. Click &quot;New Note&quot; to record important derivations, shortcuts, or website takeaways.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    note.isImportant
                      ? 'bg-zinc-900/90 border-amber-900/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-2.5">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300">
                        {note.subject}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-100 mt-1">
                        {note.title}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Logged on {note.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updatePersonalNote(note.id, { isImportant: !note.isImportant })}
                        className={`p-1.5 rounded-lg transition-colors ${
                          note.isImportant ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
                        }`}
                        title={note.isImportant ? 'Unstar Note' : 'Star Note as Important'}
                      >
                        <Star className={`w-4 h-4 ${note.isImportant ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => deletePersonalNote(note.id)}
                        className="p-1.5 text-zinc-600 hover:text-rose-400 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-950 p-3 rounded-xl border border-zinc-800/60">
                      {note.content}
                    </p>
                  </div>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <form onSubmit={handleSaveNote} className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-cyan-800 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold font-mono text-cyan-300">
                WRITE NEW STUDY NOTE / TAKEAWAY
              </h3>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="text-zinc-500 hover:text-zinc-300 font-mono text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">SUBJECT</label>
                <input
                  type="text"
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">TAGS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  placeholder="e.g. formula, trap, gfg"
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">TITLE</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Master Theorem Regularity Trap; Paging Multi-level math..."
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">CONTENT / NOTES</label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write markdown formulas, derivations, or link references..."
                rows={5}
                className="w-full text-xs p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono resize-none"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-zinc-300">
                <input
                  type="checkbox"
                  checked={isNoteStarred}
                  onChange={(e) => setIsNoteStarred(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-amber-500 accent-amber-500"
                />
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                Mark as High Priority / Starred
              </label>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold cursor-pointer"
                >
                  Save Note (+15 XP)
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
