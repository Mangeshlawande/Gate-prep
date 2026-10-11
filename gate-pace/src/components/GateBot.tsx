'use client';

import React, { useState, useEffect, useRef } from 'react';
import { globalBotEngine, BotResponse } from '@/lib/botEngine';
import { globalVectorDb, VectorDocument, SearchResult, DocumentCategory } from '@/lib/vectorDb';
import { globalGraphDb, GraphNode, GraphEdge, NodeLabel, EdgeType, PathResult } from '@/lib/graphDb';
import { initializeKnowledgeBases, CORE_GATE_SUBJECTS } from '@/lib/knowledgeBase';
import {
  Bot,
  Sparkles,
  Send,
  Search,
  Database,
  Network,
  BookOpen,
  Layers,
  ArrowRight,
  Plus,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Trash2,
  Compass
} from 'lucide-react';
import { MarkdownMessage } from './MarkdownMessage';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  data?: BotResponse;
}

const STARTER_PROMPTS = [
  "How to calculate TLB Effective Memory Access Time (EMAT)?",
  "Master Theorem edge cases when f(n) contains log",
  "Best standard textbooks & resources for Computer Networks",
  "Prerequisites for B-Trees and Normal Forms in DBMS",
  "Common NAT traps in IP Fragmentation offset calculation",
  "How to minimize DFA states with Myhill-Nerode theorem?"
];

export const GateBot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'vector' | 'graph'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [expandedInspector, setExpandedInspector] = useState<Record<string, boolean>>({});

  // Vector DB Explorer State
  const [vectorSearchQuery, setVectorSearchQuery] = useState('');
  const [vectorSearchResults, setVectorSearchResults] = useState<SearchResult[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [vectorStats, setVectorStats] = useState({ count: 0 });

  // Custom Vector Modal State
  const [showAddVectorModal, setShowAddVectorModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<DocumentCategory>('topic');
  const [newDocSubject, setNewDocSubject] = useState('Operating Systems');

  // Graph DB Explorer State
  const [graphSubjectFilter, setGraphSubjectFilter] = useState<string>('all');
  const [graphLabelFilter, setGraphLabelFilter] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [graphSearchQuery, setGraphSearchQuery] = useState('');
  const [graphStats, setGraphStats] = useState({ nodes: 0, edges: 0 });

  // Path Finder State
  const [pathSource, setPathSource] = useState<string>('');
  const [pathTarget, setPathTarget] = useState<string>('');
  const [pathResult, setPathResult] = useState<PathResult | null>(null);

  // Custom Graph Node State
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeLabel, setNewNodeLabel] = useState<NodeLabel>('Topic');
  const [newNodeSubject, setNewNodeSubject] = useState('Operating Systems');
  const [newNodeDesc, setNewNodeDesc] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Knowledge Bases on mount
  useEffect(() => {
    const stats = initializeKnowledgeBases();
    setVectorStats({ count: stats.vectorCount });
    setGraphStats({ nodes: stats.nodeCount, edges: stats.edgeCount });

    // Initial greeting message
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: `### 🤖 Welcome to GATE AI Guide!\n\nI am powered by a **Hybrid Graph-RAG Engine** with an integrated **128-D Vector Database** and **Knowledge Graph Database**.\n\nI can help you with:\n- **Conceptual Problem Solving & Derivations**\n- **Prerequisite Dependency Paths** (what concepts to master before tackling a topic)\n- **Standard Textbooks, GateOverflow PYQ tags & GFG Links**\n- **High-Yield Formulas & Avoidance of Common Exam Traps**\n\nAsk any question or pick a quick starter prompt below:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      // Run hybrid RAG query
      const response = await globalBotEngine.ask(query);

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: response
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'bot',
        text: "I encountered an issue processing this query. Please check your knowledge base or try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleVectorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vectorSearchQuery.trim()) return;
    const results = globalVectorDb.search(vectorSearchQuery, {
      topK: 8,
      minScore: 0.05,
      category: selectedCategoryFilter as any
    });
    setVectorSearchResults(results);
  };

  const handleAddVectorDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    const docId = `custom-vec-${Date.now()}`;
    globalVectorDb.insert({
      id: docId,
      title: newDocTitle.trim(),
      content: newDocContent.trim(),
      category: newDocCategory,
      metadata: {
        subject: newDocSubject,
        tags: [newDocSubject, newDocCategory]
      }
    });

    setVectorStats({ count: globalVectorDb.count() });
    setShowAddVectorModal(false);
    setNewDocTitle('');
    setNewDocContent('');

    // Trigger fresh search if query exists
    if (vectorSearchQuery) {
      const results = globalVectorDb.search(vectorSearchQuery, { topK: 8 });
      setVectorSearchResults(results);
    }
  };

  const handleFindPath = () => {
    if (!pathSource || !pathTarget) return;
    const res = globalGraphDb.findShortestPath(pathSource, pathTarget);
    setPathResult(res);
  };

  const handleAddGraphNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const id = `custom-node-${Date.now()}`;
    globalGraphDb.addNode({
      id,
      label: newNodeLabel,
      name: newNodeName.trim(),
      properties: {
        subject: newNodeSubject,
        description: newNodeDesc.trim() || `Custom ${newNodeLabel}`
      }
    });

    setGraphStats({
      nodes: globalGraphDb.getAllNodes().length,
      edges: globalGraphDb.getAllEdges().length
    });
    setShowAddNodeModal(false);
    setNewNodeName('');
    setNewNodeDesc('');
  };

  const toggleInspector = (msgId: string) => {
    setExpandedInspector((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  // Filtered Graph Nodes for Explorer
  const filteredGraphNodes = globalGraphDb.getAllNodes().filter((n) => {
    if (graphSubjectFilter !== 'all' && n.properties.subject && !n.properties.subject.toLowerCase().includes(graphSubjectFilter.toLowerCase())) {
      return false;
    }
    if (graphLabelFilter !== 'all' && n.label !== graphLabelFilter) {
      return false;
    }
    if (graphSearchQuery.trim()) {
      const q = graphSearchQuery.toLowerCase();
      return (
        n.name.toLowerCase().includes(q) ||
        (n.properties.description && n.properties.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800 shadow-sm">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                GATE AI GUIDE & DUAL KNOWLEDGE ENGINE
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Hybrid Graph-RAG • 128-D Vector Embeddings • Knowledge Graph Dependencies
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-zinc-900 p-1 rounded-xl border border-slate-300 dark:border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Guide Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('vector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'vector'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Vector DB ({vectorStats.count})</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'graph'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Graph DB ({graphStats.nodes})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: AI GUIDE CHAT */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chat Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-[650px] rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            {/* Chat Messages Scrollable Box */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none font-mono'
                        : 'bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none font-sans'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-current/10 text-[10px] opacity-70 font-mono">
                      <span>{msg.sender === 'user' ? 'Aspirant Inquiry' : 'GATE-Pace AI Guide'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Body */}
                    {msg.sender === 'bot' ? (
                      <MarkdownMessage content={msg.text} />
                    ) : (
                      <div className="font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </div>
                    )}

                    {/* Dual-DB Retrieval Inspector Drawer for Bot Responses */}
                    {msg.data && (
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800">
                        <button
                          onClick={() => toggleInspector(msg.id)}
                          className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                        >
                          {expandedInspector[msg.id] ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                          <span>
                            Dual-DB Inspection: {msg.data.retrievedVectors.length} Vector Matches • {msg.data.graphNodes.length} Graph Entities
                          </span>
                        </button>

                        {expandedInspector[msg.id] && (
                          <div className="mt-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3 font-mono text-[11px]">
                            {/* Vector Matches */}
                            <div>
                              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                                📊 TOP VECTOR SIMILARITY SCORES:
                              </span>
                              <div className="space-y-1">
                                {msg.data.retrievedVectors.map((v, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-zinc-950 text-[10px]"
                                  >
                                    <span className="truncate max-w-[240px] text-zinc-700 dark:text-zinc-300">
                                      {v.doc.title}
                                    </span>
                                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                                      Score: {(v.score * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Graph Prereq Chain */}
                            {msg.data.prerequisites.length > 0 && (
                              <div>
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                                  🔗 GRAPH PREREQUISITES TRAVERSED:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {msg.data.prerequisites.map((p) => (
                                    <span
                                      key={p.id}
                                      className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[10px]"
                                    >
                                      {p.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Follow-up Prompts */}
                    {msg.data?.suggestedFollowUps && msg.data.suggestedFollowUps.length > 0 && (
                      <div className="mt-4 pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block mb-1.5">
                          Suggested Deep Dives:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.data.suggestedFollowUps.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(s)}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-zinc-700 transition-colors text-left"
                            >
                              → {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-600" />
                    <span>Querying Vector DB & traversing Knowledge Graph...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a question about GATE concepts, formulas, standard books, or tricky problems..."
                  className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-cyan-500 font-sans shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Ask</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar: Starter Prompts & Dual-DB Status (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Starter Chips Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-md">
              <h3 className="text-xs font-bold font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                HIGH-YIELD STARTER QUERIES
              </h3>
              <div className="space-y-2">
                {STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 border border-slate-200 dark:border-zinc-800/80 hover:border-cyan-300 dark:hover:border-cyan-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono transition-colors flex items-start gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-600 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Explainer Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-md text-xs font-mono space-y-3">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600" />
                HYBRID GRAPH-RAG ARCHITECTURE
              </h3>

              <div className="space-y-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400 block mb-0.5">
                    1. Vector DB (128-D Dense Embeddings)
                  </span>
                  Matches your question against curriculum, formula derivations, and standard notes using cosine similarity.
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                    2. Graph DB (Entity & Dependency Traversal)
                  </span>
                  Traverses prerequisite chains (A → B), connects textbook chapters, and surfaces high-frequency traps.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VECTOR DB EXPLORER */}
      {activeTab === 'vector' && (
        <div className="space-y-6">
          {/* Search & Actions Header */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-600" />
                  VECTOR DATABASE INDEX & SEMANTIC RETRIEVAL
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  Total Documents Indexed: <strong>{globalVectorDb.count()}</strong> • Dimension: 128-D L2-Normalized Cosine
                </p>
              </div>

              <button
                onClick={() => setShowAddVectorModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Knowledge Chunk</span>
              </button>
            </div>

            {/* Semantic Search Query Form */}
            <form onSubmit={handleVectorSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={vectorSearchQuery}
                  onChange={(e) => setVectorSearchQuery(e.target.value)}
                  placeholder="Test semantic similarity (e.g. 'TLB miss page table hit', 'Kruskal cut property', 'BCNF decomposition')..."
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="text-xs px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono"
              >
                <option value="all">All Categories</option>
                <option value="topic">Topics & Concepts</option>
                <option value="formula">Formula Deck</option>
                <option value="resource">Standard Textbooks</option>
                <option value="problem">Solved PYQs</option>
                <option value="curriculum">90-Day Curriculum</option>
                <option value="custom">Custom Added</option>
              </select>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-cyan-600 hover:text-white text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Search Vectors
              </button>
            </form>
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-mono text-zinc-500 dark:text-zinc-400">
              {vectorSearchResults.length > 0
                ? `SEMANTIC SEARCH RESULTS (${vectorSearchResults.length} CHUNKS MATCHED)`
                : `INDEXED KNOWLEDGE DOCUMENTS (${globalVectorDb.count()} TOTAL)`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(vectorSearchResults.length > 0
                ? vectorSearchResults.map((r) => r.doc)
                : globalVectorDb.getAll().slice(0, 12)
              ).map((doc, idx) => {
                const searchMatch = vectorSearchResults.find((r) => r.doc.id === doc.id);
                return (
                  <div
                    key={doc.id}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-zinc-800 text-cyan-700 dark:text-cyan-400 border border-slate-300 dark:border-zinc-700 uppercase">
                          {doc.category}
                        </span>

                        {searchMatch && (
                          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            Similarity: {(searchMatch.score * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 mb-1.5">
                        {doc.title}
                      </h4>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 font-sans">
                        {doc.content}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Subject: {doc.metadata.subject || 'General CS'}</span>
                      <span className="text-cyan-600 dark:text-cyan-400">128-D Vector Indexed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GRAPH DB EXPLORER & PATH FINDER */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          {/* Graph Query & Stats Header */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-600" />
                  KNOWLEDGE GRAPH DB: PREREQUISITES & TOPIC TAXONOMY
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  Entities: <strong>{globalGraphDb.getAllNodes().length} Nodes</strong> • Relationships:{' '}
                  <strong>{globalGraphDb.getAllEdges().length} Edges</strong>
                </p>
              </div>

              <button
                onClick={() => setShowAddNodeModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Entity Node</span>
              </button>
            </div>

            {/* Path Finder Section */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-3 font-mono text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-600" />
                SHORTEST LEARNING & DEPENDENCY PATH FINDER (BFS)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={pathSource}
                  onChange={(e) => setPathSource(e.target.value)}
                  className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs"
                >
                  <option value="">Select Starting Concept...</option>
                  {globalGraphDb.getAllNodes().filter((n) => n.label === 'Topic').map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>

                <select
                  value={pathTarget}
                  onChange={(e) => setPathTarget(e.target.value)}
                  className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs"
                >
                  <option value="">Select Target Concept...</option>
                  {globalGraphDb.getAllNodes().filter((n) => n.label === 'Topic').map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleFindPath}
                  disabled={!pathSource || !pathTarget}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold transition-colors cursor-pointer"
                >
                  Find Dependency Path
                </button>
              </div>

              {pathResult && (
                <div className="mt-2 p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-900 dark:text-cyan-200">
                  <span className="font-bold block mb-1">
                    Path Found ({pathResult.length} hops):
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pathResult.nodes.map((node, i) => (
                      <React.Fragment key={node.id}>
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-cyan-300 dark:border-cyan-700 font-bold">
                          {node.name}
                        </span>
                        {i < pathResult.nodes.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Search entities..."
                value={graphSearchQuery}
                onChange={(e) => setGraphSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
              />

              <select
                value={graphLabelFilter}
                onChange={(e) => setGraphLabelFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
              >
                <option value="all">All Entity Types</option>
                <option value="Subject">Subjects</option>
                <option value="Topic">Topics</option>
                <option value="Formula">Formulas</option>
                <option value="Resource">Resources</option>
                <option value="Problem">Problems</option>
              </select>
            </div>
          </div>

          {/* Nodes Explorer Grid & Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Nodes Grid (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold font-mono text-zinc-500">
                KNOWLEDGE NODES ({filteredGraphNodes.length} MATCHED)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredGraphNodes.map((n) => {
                  const isSelected = selectedNode?.id === n.id;
                  return (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNode(n)}
                      className={`p-4 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-950/80 border-cyan-500 shadow-md ring-1 ring-cyan-500'
                          : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                          {n.label}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {n.properties.subject || 'CS'}
                        </span>
                      </div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {n.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 font-sans">
                        {n.properties.description || n.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Node Detail & Connections (5 cols) */}
            <div className="lg:col-span-5">
              {selectedNode ? (
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-cyan-500/50 shadow-xl space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800">
                      {selectedNode.label} Details
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                      {selectedNode.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-1">
                      {selectedNode.properties.description}
                    </p>
                  </div>

                  {/* Prerequisites Chain */}
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                      🔗 PREREQUISITES (Must know before this):
                    </span>
                    <div className="space-y-1">
                      {globalGraphDb.getPrerequisites(selectedNode.id, 2).length > 0 ? (
                        globalGraphDb.getPrerequisites(selectedNode.id, 2).map((p) => (
                          <div
                            key={p.id}
                            className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-[11px]"
                          >
                            • {p.name}
                          </div>
                        ))
                      ) : (
                        <span className="text-zinc-400 text-[11px]">Foundational concept (No prerequisites).</span>
                      )}
                    </div>
                  </div>

                  {/* Downstream Topics Unlocked */}
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">
                      🚀 UNLOCKS ADVANCED TOPICS:
                    </span>
                    <div className="space-y-1">
                      {globalGraphDb.getDownstreamTopics(selectedNode.id, 2).length > 0 ? (
                        globalGraphDb.getDownstreamTopics(selectedNode.id, 2).map((d) => (
                          <div
                            key={d.id}
                            className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-[11px]"
                          >
                            • {d.name}
                          </div>
                        ))
                      ) : (
                        <span className="text-zinc-400 text-[11px]">Apex topic.</span>
                      )}
                    </div>
                  </div>

                  {/* Exam Trap */}
                  {selectedNode.properties.examTrap && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px]">
                      <span className="font-bold flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> High-Frequency Exam Trap:
                      </span>
                      {selectedNode.properties.examTrap}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-center text-xs font-mono text-zinc-500">
                  Select any node from the left grid to inspect its multi-hop prerequisites, downstream topics, and formula links.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Vector Document */}
      {showAddVectorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-600" />
                ADD CHUNK TO VECTOR DATABASE
              </h3>
              <button
                onClick={() => setShowAddVectorModal(false)}
                className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVectorDocument} className="space-y-3">
              <div>
                <label className="block text-zinc-600 dark:text-zinc-400 mb-1">TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Formula for Matrix Chain Multiplication"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 mb-1">CATEGORY</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value as DocumentCategory)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="topic">Topic / Concept</option>
                    <option value="formula">Formula Deck</option>
                    <option value="resource">Resource</option>
                    <option value="problem">Problem</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 mb-1">SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={newDocSubject}
                    onChange={(e) => setNewDocSubject(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 dark:text-zinc-400 mb-1">TEXT CONTENT</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter full notes, concept explanation, or problem derivation..."
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddVectorModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
                >
                  Vectorize & Save (+128-D)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Graph Node */}
      {showAddNodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-600" />
                ADD ENTITY NODE TO KNOWLEDGE GRAPH
              </h3>
              <button
                onClick={() => setShowAddNodeModal(false)}
                className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGraphNode} className="space-y-3">
              <div>
                <label className="block text-zinc-600 dark:text-zinc-400 mb-1">ENTITY NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Splay Trees / B+ Tree Splitting"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 mb-1">LABEL</label>
                  <select
                    value={newNodeLabel}
                    onChange={(e) => setNewNodeLabel(e.target.value as NodeLabel)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Topic">Topic</option>
                    <option value="Concept">Concept</option>
                    <option value="Formula">Formula</option>
                    <option value="Resource">Resource</option>
                    <option value="Problem">Problem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 mb-1">SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={newNodeSubject}
                    onChange={(e) => setNewNodeSubject(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 dark:text-zinc-400 mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Description of this node, properties, or syllabus relevance..."
                  value={newNodeDesc}
                  onChange={(e) => setNewNodeDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddNodeModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Add Node to Graph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
