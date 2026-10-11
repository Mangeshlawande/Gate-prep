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
  targetQuestions: any[];
  clarityResources: any[];
  traps: string[];
  suggestedFollowUps: string[];
}

export class GateBotEngine {
  constructor() {
    initializeKnowledgeBases();
  }

  public async ask(userQuery: string): Promise<BotResponse> {
    initializeKnowledgeBases();

    const cleanQuery = userQuery.trim();
    if (!cleanQuery) {
      return {
        answer: "Please ask a question about GATE CS concepts, target questions (MCQ/MSQ/NAT), problem solving, formulas, prerequisites, or recommended clarity study resources.",
        retrievedVectors: [],
        graphNodes: [],
        graphEdges: [],
        prerequisites: [],
        formulas: [],
        resources: [],
        targetQuestions: [],
        clarityResources: [],
        traps: [],
        suggestedFollowUps: [
          "Target NAT questions on Virtual Memory and TLB EMAT",
          "Target MSQ questions on Theory of Computation closure properties",
          "Extended Master Theorem edge cases and target MCQ",
          "Best clarity resources for BCNF and Normalization"
        ]
      };
    }

    // Step 1: Vector Search (Semantic Retrieval)
    const vectorMatches = globalVectorDb.search(cleanQuery, {
      topK: 6,
      minScore: 0.06
    });

    // Step 2: Graph Extraction (Entity & Dependency Discovery)
    const matchedNodeIds = new Set<string>();
    const matchedNodes: GraphNode[] = [];

    const queryLower = cleanQuery.toLowerCase();
    for (const node of globalGraphDb.getAllNodes()) {
      if (
        queryLower.includes(node.name.toLowerCase()) ||
        node.name.toLowerCase().includes(queryLower) ||
        (node.properties.tags && node.properties.tags.some((t: string) => queryLower.includes(t.toLowerCase()))) ||
        (node.properties.subject && queryLower.includes(node.properties.subject.toLowerCase()))
      ) {
        matchedNodeIds.add(node.id);
        matchedNodes.push(node);
      }
    }

    for (const hit of vectorMatches) {
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
    const allTargetQuestions: any[] = [];
    const allClarityResources: any[] = [];
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

      // 4. Topic Target Questions (MCQ, MSQ, NAT)
      if (node.properties.targetQuestions && Array.isArray(node.properties.targetQuestions)) {
        for (const tq of node.properties.targetQuestions) {
          if (!allTargetQuestions.some((q) => q.id === tq.id)) {
            allTargetQuestions.push(tq);
          }
        }
      }

      // 5. Clarity Resources
      if (node.properties.clarityResources && Array.isArray(node.properties.clarityResources)) {
        for (const cr of node.properties.clarityResources) {
          if (!allClarityResources.some((r) => r.title === cr.title)) {
            allClarityResources.push(cr);
          }
        }
      }

      // 6. Memory Traps
      if (node.properties.examTrap) {
        allTraps.push(node.properties.examTrap);
      }

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
      allTargetQuestions,
      allClarityResources,
      allTraps
    );

    const suggestedFollowUps = this.generateFollowUps(matchedNodes, allPrereqs);

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
      targetQuestions: allTargetQuestions,
      clarityResources: allClarityResources,
      traps: Array.from(new Set(allTraps)),
      suggestedFollowUps
    };
  }

  private synthesizeAnswer(
    query: string,
    vectorHits: SearchResult[],
    matchedNodes: GraphNode[],
    prereqs: GraphNode[],
    formulas: GraphNode[],
    resources: GraphNode[],
    targetQuestions: any[],
    clarityResources: any[],
    traps: string[]
  ): string {
    const lines: string[] = [];

    const primarySubject =
      matchedNodes[0]?.properties.subject ||
      vectorHits[0]?.doc.metadata.subject ||
      'GATE Computer Science & Information Technology';

    lines.push(`### 💡 Conceptual Guide: ${primarySubject}\n`);

    // Section 1: Core Guidance & Conceptual Breakdown
    if (vectorHits.length > 0) {
      const topHit = vectorHits[0];
      lines.push(`**Key Concept:**`);
      lines.push(`${topHit.doc.content}\n`);

      if (vectorHits.length > 1) {
        lines.push(`**Key Mathematical & Architectural Insights:**`);
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
      lines.push(`Before solving advanced PYQs on this topic, ensure you have mastered these fundamental dependencies:`);
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

    // Section 4: TARGET EXAM QUESTIONS (BY QUESTION TYPE: MCQ, MSQ, NAT)
    if (targetQuestions.length > 0) {
      lines.push(`\n#### 🎯 Target Practice Questions By Exam Type (MCQ / MSQ / NAT)`);
      for (const q of targetQuestions.slice(0, 3)) {
        const typeBadge =
          q.questionType === 'MCQ'
            ? '📝 Multiple Choice Question (MCQ - Single Correct, Negative Marking 1/3)'
            : q.questionType === 'MSQ'
            ? '☑️ Multiple Select Question (MSQ - Multiple Correct, ZERO Partial Marks)'
            : '🔢 Numerical Answer Type (NAT - Exact Numeric / Range, No Negative Marking)';

        lines.push(`**[${q.questionType} • ${q.marks} Marks] ${q.title}** (${q.testedYear || 'Official GATE Pattern'})`);
        lines.push(`*Type:* ${typeBadge}`);
        lines.push(`\n**Problem:**\n${q.problemStatement}`);

        if (q.options && q.options.length > 0) {
          lines.push('\n**Options:**');
          for (const opt of q.options) {
            lines.push(`- ${opt}`);
          }
        }

        lines.push(`\n**Correct Answer:** \`${q.correctAnswer}\``);
        lines.push(`\n**Step-by-Step Solution:**\n${q.stepByStepSolution}`);
        if (q.trapExplanation) {
          lines.push(`\n> [!WARNING]\n> **${q.questionType} Specific Trap:** ${q.trapExplanation}`);
        }
        lines.push('\n---');
      }
    }

    // Section 5: DIRECT CLARITY RESOURCES & REFERENCE GUIDES
    if (clarityResources.length > 0) {
      lines.push(`\n#### 📚 Direct Clarity Resources & Reference Guides`);
      for (const r of clarityResources) {
        const directLink = r.url ? `([Direct Study Link](${r.url}))` : '';
        lines.push(`- **[${r.type}] ${r.title}** ${directLink}`);
        lines.push(`  *Section / Chapter:* **${r.chapterOrTopic}**`);
        lines.push(`  *Clarity Study Guidance:* ${r.clarityNotes}`);
      }
    } else if (resources.length > 0) {
      lines.push(`\n#### 📚 Recommended Standard Resources & Action Links`);
      for (const r of resources) {
        const link = r.properties.url ? `([Direct Link](${r.properties.url}))` : '';
        lines.push(`- **${r.name}** ${link}`);
        if (r.properties.description) {
          lines.push(`  *${r.properties.description}*`);
        }
      }
    }

    // Section 6: High-Frequency Exam Traps & Cognitive Error Alerts
    if (traps.length > 0) {
      lines.push(`\n#### ⚠️ Critical GATE Exam Trap to Avoid`);
      for (const t of traps.slice(0, 2)) {
        lines.push(`> [!WARNING]`);
        lines.push(`> ${t}`);
      }
    }

    // Section 7: Recommended Next Action
    lines.push(`\n#### 🚀 Recommended Action`);
    lines.push(`1. Read the indicated textbook section above to solidify concepts.`);
    lines.push(`2. Solve the target question types (MCQ, MSQ, NAT) in timed exam conditions.`);
    lines.push(`3. Record any cognitive or arithmetic slip in your **Mistake Diary**.`);

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
