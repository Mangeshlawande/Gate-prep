// Embedded Graph Database for Knowledge Representation, Dependencies, & Multi-Hop Traversal
// Stores entities (Subjects, Topics, Formulas, Resources, Problems) and semantic relationships

export type NodeLabel =
  | 'Subject'
  | 'Topic'
  | 'Concept'
  | 'Formula'
  | 'Resource'
  | 'Problem'
  | 'MistakeTrap';

export type EdgeType =
  | 'PREREQUISITE_OF'
  | 'DEPENDS_ON'
  | 'SUBTOPIC_OF'
  | 'HAS_FORMULA'
  | 'RECOMMENDED_FOR'
  | 'TESTED_IN'
  | 'COMMON_TRAP_IN';

export interface GraphNode {
  id: string;
  label: NodeLabel;
  name: string;
  properties: {
    subject?: string;
    description?: string;
    difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Very High';
    expectedMarks?: number;
    url?: string;
    category?: string;
    tags?: string[];
    formulaText?: string;
    examTrap?: string;
    [key: string]: any;
  };
}

export interface GraphEdge {
  id: string;
  source: string; // source node id
  target: string; // target node id
  type: EdgeType;
  properties?: {
    weight?: number;
    notes?: string;
    [key: string]: any;
  };
}

export interface Subgraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface PathResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
  length: number;
}

export class GraphDatabase {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: Map<string, GraphEdge> = new Map();
  private outEdges: Map<string, Set<string>> = new Map();
  private inEdges: Map<string, Set<string>> = new Map();
  private storageKey: string;

  constructor(storageKey: string = 'gate_graph_db_v1') {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  public addNode(node: GraphNode): GraphNode {
    this.nodes.set(node.id, node);
    if (!this.outEdges.has(node.id)) this.outEdges.set(node.id, new Set());
    if (!this.inEdges.has(node.id)) this.inEdges.set(node.id, new Set());
    this.saveToStorage();
    return node;
  }

  public addEdge(edge: GraphEdge): GraphEdge {
    this.edges.set(edge.id, edge);

    if (!this.outEdges.has(edge.source)) this.outEdges.set(edge.source, new Set());
    if (!this.inEdges.has(edge.target)) this.inEdges.set(edge.target, new Set());

    this.outEdges.get(edge.source)!.add(edge.id);
    this.inEdges.get(edge.target)!.add(edge.id);

    this.saveToStorage();
    return edge;
  }

  public getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  public getEdge(id: string): GraphEdge | undefined {
    return this.edges.get(id);
  }

  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllEdges(): GraphEdge[] {
    return Array.from(this.edges.values());
  }

  public deleteNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;

    // Delete associated edges
    const outSet = this.outEdges.get(id) || new Set();
    const inSet = this.inEdges.get(id) || new Set();

    for (const edgeId of outSet) {
      const e = this.edges.get(edgeId);
      if (e) {
        this.inEdges.get(e.target)?.delete(edgeId);
        this.edges.delete(edgeId);
      }
    }

    for (const edgeId of inSet) {
      const e = this.edges.get(edgeId);
      if (e) {
        this.outEdges.get(e.source)?.delete(edgeId);
        this.edges.delete(edgeId);
      }
    }

    this.outEdges.delete(id);
    this.inEdges.delete(id);
    const result = this.nodes.delete(id);
    this.saveToStorage();
    return result;
  }

  public deleteEdge(id: string): boolean {
    const edge = this.edges.get(id);
    if (!edge) return false;

    this.outEdges.get(edge.source)?.delete(id);
    this.inEdges.get(edge.target)?.delete(id);
    const result = this.edges.delete(id);
    this.saveToStorage();
    return result;
  }

  /**
   * Retrieves adjacent nodes and edges
   */
  public getNeighbors(
    nodeId: string,
    direction: 'in' | 'out' | 'both' = 'both',
    edgeType?: EdgeType
  ): Array<{ node: GraphNode; edge: GraphEdge; direction: 'in' | 'out' }> {
    const results: Array<{ node: GraphNode; edge: GraphEdge; direction: 'in' | 'out' }> = [];

    if (direction === 'out' || direction === 'both') {
      const edgeIds = this.outEdges.get(nodeId) || new Set();
      for (const eId of edgeIds) {
        const edge = this.edges.get(eId);
        if (!edge) continue;
        if (edgeType && edge.type !== edgeType) continue;
        const targetNode = this.nodes.get(edge.target);
        if (targetNode) {
          results.push({ node: targetNode, edge, direction: 'out' });
        }
      }
    }

    if (direction === 'in' || direction === 'both') {
      const edgeIds = this.inEdges.get(nodeId) || new Set();
      for (const eId of edgeIds) {
        const edge = this.edges.get(eId);
        if (!edge) continue;
        if (edgeType && edge.type !== edgeType) continue;
        const sourceNode = this.nodes.get(edge.source);
        if (sourceNode) {
          results.push({ node: sourceNode, edge, direction: 'in' });
        }
      }
    }

    return results;
  }

  /**
   * Graph Traversal: Find foundational prerequisite chain for a topic
   * Crawls incoming PREREQUISITE_OF edges or outgoing DEPENDS_ON edges
   */
  public getPrerequisites(nodeId: string, maxDepth: number = 3): GraphNode[] {
    const visited = new Set<string>();
    const prereqs: GraphNode[] = [];
    const queue: Array<{ id: string; depth: number }> = [{ id: nodeId, depth: 0 }];
    visited.add(nodeId);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr.depth >= maxDepth) continue;

      // Check incoming PREREQUISITE_OF (Source is prerequisite of Target)
      const inEdgeIds = this.inEdges.get(curr.id) || new Set();
      for (const eId of inEdgeIds) {
        const edge = this.edges.get(eId);
        if (edge && edge.type === 'PREREQUISITE_OF') {
          if (!visited.has(edge.source)) {
            visited.add(edge.source);
            const node = this.nodes.get(edge.source);
            if (node) {
              prereqs.push(node);
              queue.push({ id: edge.source, depth: curr.depth + 1 });
            }
          }
        }
      }

      // Check outgoing DEPENDS_ON (Source depends on Target)
      const outEdgeIds = this.outEdges.get(curr.id) || new Set();
      for (const eId of outEdgeIds) {
        const edge = this.edges.get(eId);
        if (edge && edge.type === 'DEPENDS_ON') {
          if (!visited.has(edge.target)) {
            visited.add(edge.target);
            const node = this.nodes.get(edge.target);
            if (node) {
              prereqs.push(node);
              queue.push({ id: edge.target, depth: curr.depth + 1 });
            }
          }
        }
      }
    }

    return prereqs;
  }

  /**
   * Graph Traversal: Find downstream topics unlocked by this topic
   */
  public getDownstreamTopics(nodeId: string, maxDepth: number = 3): GraphNode[] {
    const visited = new Set<string>();
    const downstream: GraphNode[] = [];
    const queue: Array<{ id: string; depth: number }> = [{ id: nodeId, depth: 0 }];
    visited.add(nodeId);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr.depth >= maxDepth) continue;

      const outEdgeIds = this.outEdges.get(curr.id) || new Set();
      for (const eId of outEdgeIds) {
        const edge = this.edges.get(eId);
        if (edge && edge.type === 'PREREQUISITE_OF') {
          if (!visited.has(edge.target)) {
            visited.add(edge.target);
            const node = this.nodes.get(edge.target);
            if (node) {
              downstream.push(node);
              queue.push({ id: edge.target, depth: curr.depth + 1 });
            }
          }
        }
      }
    }

    return downstream;
  }

  /**
   * Get connected formula nodes for a topic
   */
  public getFormulasForTopic(nodeId: string): GraphNode[] {
    const neighbors = this.getNeighbors(nodeId, 'out', 'HAS_FORMULA');
    return neighbors.map((n) => n.node).filter((n) => n.label === 'Formula');
  }

  /**
   * Get connected resource nodes for a topic
   */
  public getResourcesForTopic(nodeId: string): GraphNode[] {
    const outNeighbors = this.getNeighbors(nodeId, 'out', 'RECOMMENDED_FOR');
    const inNeighbors = this.getNeighbors(nodeId, 'in', 'RECOMMENDED_FOR');
    const combined = [...outNeighbors, ...inNeighbors];
    return Array.from(new Set(combined.map((n) => n.node))).filter((n) => n.label === 'Resource');
  }

  /**
   * BFS Shortest Path finding between two concepts
   */
  public findShortestPath(sourceId: string, targetId: string): PathResult | null {
    if (!this.nodes.has(sourceId) || !this.nodes.has(targetId)) return null;
    if (sourceId === targetId) {
      return { nodes: [this.nodes.get(sourceId)!], edges: [], length: 0 };
    }

    const queue: string[] = [sourceId];
    const visited = new Set<string>([sourceId]);
    const parent = new Map<string, { prevNodeId: string; edgeId: string }>();

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr === targetId) break;

      const neighbors = this.getNeighbors(curr, 'both');
      for (const { node, edge } of neighbors) {
        if (!visited.has(node.id)) {
          visited.add(node.id);
          parent.set(node.id, { prevNodeId: curr, edgeId: edge.id });
          queue.push(node.id);
          if (node.id === targetId) break;
        }
      }
    }

    if (!parent.has(targetId)) return null;

    // Reconstruct path
    const pathNodes: GraphNode[] = [];
    const pathEdges: GraphEdge[] = [];
    let curr = targetId;

    while (curr !== sourceId) {
      pathNodes.unshift(this.nodes.get(curr)!);
      const step = parent.get(curr)!;
      pathEdges.unshift(this.edges.get(step.edgeId)!);
      curr = step.prevNodeId;
    }
    pathNodes.unshift(this.nodes.get(sourceId)!);

    return {
      nodes: pathNodes,
      edges: pathEdges,
      length: pathEdges.length
    };
  }

  /**
   * Extract connected subgraph around nodes
   */
  public extractSubgraph(centerNodeIds: string[], hops: number = 1): Subgraph {
    const nodeSet = new Set<string>(centerNodeIds);
    let frontier = new Set<string>(centerNodeIds);

    for (let h = 0; h < hops; h++) {
      const nextFrontier = new Set<string>();
      for (const nId of frontier) {
        const neighbors = this.getNeighbors(nId, 'both');
        for (const { node } of neighbors) {
          if (!nodeSet.has(node.id)) {
            nodeSet.add(node.id);
            nextFrontier.add(node.id);
          }
        }
      }
      frontier = nextFrontier;
    }

    const edgeSet = new Set<string>();
    for (const nId of nodeSet) {
      const outSet = this.outEdges.get(nId) || new Set();
      for (const eId of outSet) {
        const edge = this.edges.get(eId);
        if (edge && nodeSet.has(edge.target)) {
          edgeSet.add(eId);
        }
      }
    }

    return {
      nodes: Array.from(nodeSet).map((id) => this.nodes.get(id)!).filter(Boolean),
      edges: Array.from(edgeSet).map((id) => this.edges.get(id)!).filter(Boolean)
    };
  }

  /**
   * Filter nodes by criteria
   */
  public queryNodes(criteria: {
    label?: NodeLabel;
    subject?: string;
    search?: string;
  }): GraphNode[] {
    let result = Array.from(this.nodes.values());

    if (criteria.label) {
      result = result.filter((n) => n.label === criteria.label);
    }

    if (criteria.subject) {
      result = result.filter(
        (n) => n.properties.subject && n.properties.subject.toLowerCase().includes(criteria.subject!.toLowerCase())
      );
    }

    if (criteria.search) {
      const s = criteria.search.toLowerCase();
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(s) ||
          (n.properties.description && n.properties.description.toLowerCase().includes(s)) ||
          (n.properties.tags && n.properties.tags.some((t: string) => t.toLowerCase().includes(s)))
      );
    }

    return result;
  }

  public exportState(): string {
    return JSON.stringify(
      {
        nodes: Array.from(this.nodes.values()),
        edges: Array.from(this.edges.values())
      },
      null,
      2
    );
  }

  public importState(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.nodes || !data.edges) return false;

      this.nodes.clear();
      this.edges.clear();
      this.outEdges.clear();
      this.inEdges.clear();

      for (const n of data.nodes) {
        this.addNode(n);
      }
      for (const e of data.edges) {
        this.addEdge(e);
      }

      this.saveToStorage();
      return true;
    } catch {
      return false;
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const payload = JSON.stringify({
        nodes: Array.from(this.nodes.values()),
        edges: Array.from(this.edges.values())
      });
      localStorage.setItem(this.storageKey, payload);
    } catch {
      // Ignore quota errors cleanly
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const item = localStorage.getItem(this.storageKey);
      if (item) {
        const data = JSON.parse(item);
        if (data.nodes && data.edges) {
          for (const n of data.nodes) this.nodes.set(n.id, n);
          for (const e of data.edges) this.edges.set(e.id, e);
          for (const n of this.nodes.values()) {
            this.outEdges.set(n.id, new Set());
            this.inEdges.set(n.id, new Set());
          }
          for (const e of this.edges.values()) {
            this.outEdges.get(e.source)?.add(e.id);
            this.inEdges.get(e.target)?.add(e.id);
          }
        }
      }
    } catch {
      // Fallback cleanly
    }
  }
}

// Global singleton instance
export const globalGraphDb = new GraphDatabase();
