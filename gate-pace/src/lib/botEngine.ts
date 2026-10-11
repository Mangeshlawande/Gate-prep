// Hybrid Graph-RAG AI Bot Engine for GATE CS & IT Preparation
// Combines Vector DB semantic similarity retrieval + Graph DB multi-hop dependency traversal

import { globalVectorDb, SearchResult, VectorDocument } from './vectorDb';
import { globalGraphDb, GraphNode, GraphEdge, NodeLabel } from './graphDb';
import { initializeKnowledgeBases, CORE_TOPICS, CORE_GATE_SUBJECTS } from './knowledgeBase';

export interface BotResponse {
  answer: string;
  retrievedVectors: SearchResult[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  prerequisites: GraphNode[];
  formulas: GraphNode[];
  resources: GraphNode[];
  traps: string[];
  suggestedFollowUps: string[];
}

export class GateBotEngine {
  constructor() {
    // Ensure databases are populated
    initializeKnowledgeBases();
  }

  /**
   * Main Hybrid Graph-RAG Retrieval & Generation pipeline
   */
  public async ask(userQuery: string): Promise<BotResponse> {
    initializeKnowledgeBases();

    const cleanQuery = userQuery.trim();
    if (!cleanQuery) {
      return {
        answer: "Please ask a question about GATE CS concepts, problem solving, formulas, prerequisites, or recommended study resources.",
        retrievedVectors: [],
        graphNodes: [],
        graphEdges: [],
        prerequisites: [],
        formulas: [],
        resources: [],
        traps: [],
        suggestedFollowUps: [
          "How to calculate TLB Effective Memory Access Time (EMAT)?",
          "What are the best standard textbooks for Computer Networks?",
          "Explain Master Theorem divide & conquer edge cases",
          "Prerequisites for BCNF and Normalization"
        ]
      };
    }

    // Step 1: Vector Search (Semantic Retrieval)
    const vectorMatches = globalVectorDb.search(cleanQuery, {
      topK: 5,
      minScore: 0.08
    });

    // Step 2: Graph Extraction (Entity & Dependency Discovery)
    const matchedNodeIds = new Set<string>();
    const matchedNodes: GraphNode[] = [];

    // Match by direct name search in graph
    const queryLower = cleanQuery.toLowerCase();
    for (const node of globalGraphDb.getAllNodes()) {
      if (
        queryLower.includes(node.name.toLowerCase()) ||
        node.name.toLowerCase().includes(queryLower) ||
        (node.properties.tags && node.properties.tags.some((t: string) => queryLower.includes(t.toLowerCase())))
      ) {
        matchedNodeIds.add(node.id);
        matchedNodes.push(node);
      }
    }

    // Also match nodes corresponding to top vector hits
    for (const hit of vectorMatches) {
      // If hit has corresponding graph node
      const potentialNodeId = hit.doc.id.replace('vec-', '');
      const node = globalGraphDb.getNode(potentialNodeId) || globalGraphDb.getNode(hit.doc.id);
      if (node && !matchedNodeIds.has(node.id)) {
        matchedNodeIds.add(node.id);
        matchedNodes.push(node);
      }
    }

    // Step 3: Multi-Hop Graph Traversal
    const allPrereqs: GraphNode[] = [];
    const allFormulas: GraphNode[] = [];
    const allResources: GraphNode[] = [];
    const allTraps: string[] = [];
    const collectedEdges: GraphEdge[] = [];

    for (const node of matchedNodes) {
      // 1. Prerequisites (upstream)
      const prereqs = globalGraphDb.getPrerequisites(node.id, 2);
      for (const p of prereqs) {
        if (!allPrereqs.some((x) => x.id === p.id)) allPrereqs.push(p);
      }

      // 2. Associated Formulas
      const forms = globalGraphDb.getFormulasForTopic(node.id);
      for (const f of forms) {
        if (!allFormulas.some((x) => x.id === f.id)) allFormulas.push(f);
      }

      // 3. Recommended Resources
      const res = globalGraphDb.getResourcesForTopic(node.id);
      for (const r of res) {
        if (!allResources.some((x) => x.id === r.id)) allResources.push(r);
      }

      // 4. Memory Traps
      if (node.properties.examTrap) {
        allTraps.push(node.properties.examTrap);
      }

      // Edges around this node
      const neighbors = globalGraphDb.getNeighbors(node.id, 'both');
      for (const n of neighbors) {
        if (!collectedEdges.some((e) => e.id === n.edge.id)) {
          collectedEdges.push(n.edge);
        }
      }
    }

    // Collect traps from top vector hits as well
    for (const hit of vectorMatches) {
      if (hit.doc.metadata.trapWarning && !allTraps.includes(hit.doc.metadata.trapWarning)) {
        allTraps.push(hit.doc.metadata.trapWarning);
      }
    }

    // Step 4: Synthesize Structured Pedagogical Response
    const answer = this.synthesizeAnswer(
      cleanQuery,
      vectorMatches,
      matchedNodes,
      allPrereqs,
      allFormulas,
      allResources,
      allTraps
    );

    // Step 5: Suggested follow-ups based on context
    const suggestedFollowUps = this.generateFollowUps(matchedNodes, allPrereqs);

    // Combined unique nodes
    const combinedNodesMap = new Map<string, GraphNode>();
    for (const n of [...matchedNodes, ...allPrereqs, ...allFormulas, ...allResources]) {
      combinedNodesMap.set(n.id, n);
    }

    return {
      answer,
      retrievedVectors: vectorMatches,
      graphNodes: Array.from(combinedNodesMap.values()),
      graphEdges: collectedEdges.slice(0, 15),
      prerequisites: allPrereqs,
      formulas: allFormulas,
      resources: allResources,
      traps: Array.from(new Set(allTraps)),
      suggestedFollowUps
    };
  }

  /**
   * Generates a pedagogical, clear, step-by-step answer combining Vector DB content & Graph DB facts
   */
  private synthesizeAnswer(
    query: string,
    vectorHits: SearchResult[],
    matchedNodes: GraphNode[],
    prereqs: GraphNode[],
    formulas: GraphNode[],
    resources: GraphNode[],
    traps: string[]
  ): string {
    const lines: string[] = [];

    // Header / Subject Context
    const primarySubject =
      matchedNodes[0]?.properties.subject ||
      vectorHits[0]?.doc.metadata.subject ||
      'GATE Computer Science & Information Technology';

    lines.push(`### 💡 Conceptual Guide: ${primarySubject}\n`);

    // Section 1: Core Guidance / Explanation
    if (vectorHits.length > 0) {
      const topHit = vectorHits[0];
      lines.push(`**Key Concept:**`);
      lines.push(`${topHit.doc.content}\n`);

      if (vectorHits.length > 1) {
        lines.push(`**Key Mathematical & Architectural Details:**`);
        for (let i = 1; i < Math.min(3, vectorHits.length); i++) {
          lines.push(`- **${vectorHits[i].doc.title}**: ${vectorHits[i].doc.content}`);
        }
        lines.push('');
      }
    } else if (matchedNodes.length > 0) {
      lines.push(`**Key Concept:**`);
      lines.push(`${matchedNodes[0].properties.description || matchedNodes[0].name}\n`);
    } else {
      lines.push(`Based on the GATE syllabus and official exam pattern for ${query}, here is the recommended conceptual breakdown:`);
    }

    // Section 2: Prerequisite Knowledge Graph Chain
    if (prereqs.length > 0) {
      lines.push(`\n#### 🔗 Prerequisite Knowledge Chain (from Graph DB)`);
      lines.push(`Before solving advanced PYQs on this topic, ensure you have mastered these fundamental building blocks:`);
      for (const p of prereqs) {
        lines.push(`- **${p.name}** (${p.properties.subject || 'Fundamental'}): ${p.properties.description || 'Core requirement'}`);
      }
    }

    // Section 3: High-Yield Formulas & Exact Derivations
    if (formulas.length > 0) {
      lines.push(`\n#### 📐 High-Yield Formulas (from Formula Deck & Graph DB)`);
      for (const f of formulas) {
        lines.push(`> **${f.name}**`);
        lines.push(`\`\`\`\n${f.properties.formulaText || f.properties.description}\n\`\`\``);
      }
    }

    // Section 4: Recommended Standard Textbooks & Practice Links
    if (resources.length > 0) {
      lines.push(`\n#### 📚 Recommended Standard Resources & Action Links`);
      for (const r of resources) {
        const link = r.properties.url ? `([Direct Link](${r.properties.url}))` : '';
        lines.push(`- **${r.name}** ${link}`);
        if (r.properties.description) {
          lines.push(`  *${r.properties.description}*`);
        }
      }
    } else {
      // General textbook recommendation
      const foundSubj = CORE_GATE_SUBJECTS.find((s) => s.name.toLowerCase().includes(primarySubject.toLowerCase()));
      if (foundSubj) {
        lines.push(`\n#### 📚 Recommended Standard Book`);
        lines.push(`- **${foundSubj.name}**: Standard reference textbook is **${foundSubj.book}**.`);
      }
    }

    // Section 5: High-Frequency Exam Traps & Cognitive Error Alerts
    if (traps.length > 0) {
      lines.push(`\n#### ⚠️ Critical GATE Exam Trap to Avoid`);
      for (const t of traps.slice(0, 2)) {
        lines.push(`> [!WARNING]`);
        lines.push(`> ${t}`);
      }
    }

    // Section 6: Recommended Next Action
    lines.push(`\n#### 🚀 Recommended Next Action`);
    lines.push(`1. Solve **15-20 GateOverflow PYQs** exclusively in timed 3-minute exam mode.`);
    lines.push(`2. If you make any arithmetic, sign, or boundary mistake, log it into your **Mistake Diary** to neutralize it permanently.`);

    return lines.join('\n');
  }

  private generateFollowUps(matchedNodes: GraphNode[], prereqs: GraphNode[]): string[] {
    const list: string[] = [];

    if (matchedNodes.length > 0) {
      const n = matchedNodes[0];
      list.push(`What are the hardest GATE questions asked on ${n.name}?`);
      list.push(`Show me standard formula derivation for ${n.name}`);
      list.push(`Which textbook chapters cover ${n.name} best?`);
    }

    if (prereqs.length > 0) {
      list.push(`Explain prerequisites: ${prereqs[0].name}`);
    }

    if (list.length < 4) {
      list.push("How to calculate TLB Effective Memory Access Time (EMAT)?");
      list.push("What is the common trap in IP Fragmentation Offset?");
      list.push("Explain Master Theorem divide & conquer edge cases");
    }

    return list.slice(0, 4);
  }
}

// Global Bot Engine Singleton
export const globalBotEngine = new GateBotEngine();
