import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#555555"))
        self.setStrokeColor(colors.HexColor("#CCCCCC"))
        self.setLineWidth(0.5)
        self.line(40, 40, A4[0] - 40, 40)
        self.drawString(40, 28, "GATE CS & IT - 90-Day PSU Blueprint")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 40, 28, page_str)
        self.restoreState()

def build_pdf(filename="GATE_CS_90Day_PSU_Roadmap.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=45,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor("#0D233A"),
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#4B5563"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor("#1E3A8A"),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#1F2937"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#1F2937"),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#111827")
    )

    story = []

    # Title & Header
    story.append(Paragraph("GATE Computer Science & IT — 90-Day Execution Blueprint", title_style))
    story.append(Paragraph("Target: PSU Recruitment (AIR &lt; 250 | Score: 780–880+) | Comprehensive Daily Roadmap", subtitle_style))
    story.append(Spacer(1, 8))

    # Benchmark Table
    story.append(Paragraph("1. Performance & PSU Cutoff Benchmarks", h1_style))
    bench_data = [
        [Paragraph("Parameter", table_header_style), Paragraph("Qualifying", table_header_style), 
         Paragraph("Top IIT M.Tech", table_header_style), Paragraph("PSU Recruitment (IOCL/ONGC/NTPC)", table_header_style)],
        [Paragraph("Raw Marks (/100)", table_cell_style), Paragraph("28 – 32", table_cell_style), Paragraph("60 – 68", table_cell_style), Paragraph("<b>72 – 82+ marks</b>", table_cell_style)],
        [Paragraph("Normalized Score (/1000)", table_cell_style), Paragraph("350 – 420", table_cell_style), Paragraph("700 – 760", table_cell_style), Paragraph("<b>780 – 880+</b>", table_cell_style)],
        [Paragraph("All India Rank (AIR)", table_cell_style), Paragraph("10,000 – 15,000", table_cell_style), Paragraph("500 – 1,200", table_cell_style), Paragraph("<b>AIR 1 to AIR 250</b>", table_cell_style)]
    ]
    t_bench = Table(bench_data, colWidths=[120, 95, 110, 190])
    t_bench.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E3A8A")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#D1D5DB")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9FAFB")])
    ]))
    story.append(t_bench)
    story.append(Spacer(1, 10))

    # Daily Routine Architecture
    story.append(Paragraph("2. Daily Schedule Architecture (7.5 Hours/Day)", h1_style))
    story.append(Paragraph("• <b>Block 1 (07:00 AM – 10:00 AM | 3.0 hrs):</b> Core Technical Concept Breakdown & Derivations.", bullet_style))
    story.append(Paragraph("• <b>Block 2 (11:30 AM – 02:00 PM | 2.5 hrs):</b> Rigorous Practice & PYQs (20–30 problems, timed solving).", bullet_style))
    story.append(Paragraph("• <b>Block 3 (05:00 PM – 07:00 PM | 2.0 hrs):</b> General Aptitude & Math (1.25 hrs) + Mistake Diary Review (0.75 hrs).", bullet_style))
    story.append(Spacer(1, 10))

    # Phase 1
    story.append(Paragraph("3. Phase 1: High-Yield Scoring Core (Days 1 to 30)", h1_style))
    
    p1_days = [
        ("Day 1", "C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays", "Quantitative Aptitude: Ratios, Proportions, Percentages"),
        ("Day 2", "Parameter Passing, Functions, Recursion Tracing, Stack Activation Records", "Linear Algebra: Matrices, Determinants, Multiplications"),
        ("Day 3", "1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)", "Quantitative Aptitude: Powers, Exponents, Logarithms"),
        ("Day 4", "Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection", "Linear Algebra: Rank, Row Echelon, System of Equations AX=B"),
        ("Day 5", "Stacks: Implementations, Infix to Postfix/Prefix, Expression Evaluation", "Verbal Aptitude: English Grammar & Verb-Noun Agreement"),
        ("Day 6", "Queues: Circular Queue Boundary Checks, Deques, Stacks via Queues", "Linear Algebra: Eigenvalues, Eigenvectors, Cayley-Hamilton"),
        ("Day 7", "Consolidation Test: 30-Question Timed Test on C Programming & Linear DS", "Analytical Aptitude: Series, Deductions, Analogy"),
        ("Day 8", "Binary Trees: Properties, Traversals (Inorder, Preorder, Postorder)", "Quantitative Aptitude: Permutations & Combinations"),
        ("Day 9", "Binary Search Trees (BST): Insertion, Deletion cases, Successor/Predecessor", "Calculus: Limits, Continuity, Differentiability"),
        ("Day 10", "Binary Heaps: Min/Max Heap, O(n) Heapify derivation, Priority Queues", "Spatial Aptitude: Transformation, Rotation, Mirroring"),
        ("Day 11", "Asymptotic Analysis: Big-O, Omega, Theta, Master Theorem & Edge cases", "Calculus: Maxima & Minima, Mean Value Theorem"),
        ("Day 12", "Divide & Conquer: Merge Sort, Quick Sort (Pivots, Inversions)", "Quantitative Aptitude: Elementary Statistics"),
        ("Day 13", "Searching & Hashing: Collision handling (Chaining, Linear/Quadratic probing)", "Calculus: Definite & Indefinite Integration"),
        ("Day 14", "Consolidation Test: 30-Question Timed Test on Trees, Heaps, Sorting, Hashing", "Analytical Aptitude: Syllogisms & Logic Deduction"),
        ("Day 15", "Greedy: Fractional Knapsack, Huffman Coding, Activity Selection", "Discrete Math: Propositional Logic, Truth Tables, CNF/DNF"),
        ("Day 16", "Dynamic Programming 1: 0/1 Knapsack, Matrix Chain Multiplication, LCS", "Discrete Math: First-Order Logic, Quantifiers, Scope"),
        ("Day 17", "Dynamic Programming 2: Optimal BST, Subset Sum, Bellman-Ford, Floyd-Warshall", "Discrete Math: Sets, Relations, Inclusion-Exclusion"),
        ("Day 18", "Graph Traversals: BFS, DFS, Topological Sorting, Dijkstra's Algorithm", "Discrete Math: Equivalence Relations & Classes"),
        ("Day 19", "Minimum Spanning Trees: Prim's, Kruskal's, DSU, Cut & Cycle properties", "Discrete Math: Posets, Hasse Diagrams, Lattices"),
        ("Day 20", "Algebraic Structures: Semigroups, Monoids, Groups, Lagrange's Theorem", "Verbal Aptitude: Reading Comprehension & Sequencing"),
        ("Day 21", "Consolidation Test: Timed Test on Algorithms & Mathematical Logic", "Spatial Aptitude: Paper Folding & 2D/3D Patterns"),
        ("Day 22", "Combinatorics: Pigeonhole Principle, Permutations, Derangements", "Quantitative Aptitude: Mensuration & Geometry"),
        ("Day 23", "Recurrence Relations & Generating Functions: Solving Linear Recurrences", "Verbal Aptitude: Vocabulary, Idioms & Phrases"),
        ("Day 24", "Graph Theory 1: Degree Sequences, Handshaking Lemma, Connectivity", "Quantitative Aptitude: Speed, Time, Distance, Work"),
        ("Day 25", "Graph Theory 2: Eulerian & Hamiltonian Graphs, Spanning Trees", "Analytical Aptitude: Numerical Relations & Family Trees"),
        ("Day 26", "Graph Theory 3: Planar Graphs (Euler's formula), Matching, Colouring", "Quantitative Aptitude: Data Interpretation (Charts)"),
        ("Day 27", "Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)", "Aptitude Drill: 20 Mixed Questions"),
        ("Day 28", "Comprehensive Revision of C, DS, Algorithms & Math Formulas", "Mistake Diary Review & Correction"),
        ("Day 29", "Full Subject Mock 1: Programming, DS & Algorithms (65 Marks, 90 mins)", "Mock 1 In-depth Analysis & Error Remediation"),
        ("Day 30", "Full Subject Mock 2: Discrete Mathematics & Engg Math (65 Marks, 90 mins)", "Mock 2 In-depth Analysis & Error Remediation")
    ]

    p1_table_data = [[Paragraph("Day", table_header_style), Paragraph("Core Technical Focus (5.5 hrs)", table_header_style), Paragraph("Evening Aptitude & Math (2.0 hrs)", table_header_style)]]
    for d, c, e in p1_days:
        p1_table_data.append([Paragraph(d, table_cell_style), Paragraph(c, table_cell_style), Paragraph(e, table_cell_style)])

    t_p1 = Table(p1_table_data, colWidths=[55, 270, 190])
    t_p1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E3A8A")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#D1D5DB")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9FAFB")])
    ]))
    story.append(t_p1)
    story.append(PageBreak())

    # Phase 2
    story.append(Paragraph("4. Phase 2: Systems, Theory & Databases (Days 31 to 60)", h1_style))
    p2_days = [
        ("Day 31", "Finite Automata: DFA Design, NFA to DFA Conversion, Epsilon-NFA", "Probability: Sample Space, Conditional, Product Rule"),
        ("Day 32", "Regular Expressions, DFA State Minimization (Myhill-Nerode)", "Probability: Bayes' Theorem & Total Probability"),
        ("Day 33", "Pumping Lemma for Regular Languages, Non-regularity proofs", "Probability: Discrete Random Variables, Expectation"),
        ("Day 34", "CFG & CFL: Derivations, Ambiguity, Pushdown Automata (DPDA/NPDA)", "Probability: Continuous Variables, PDF, CDF"),
        ("Day 35", "Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy", "Probability: Uniform & Exponential Distributions"),
        ("Day 36", "Turing Machines: Recursive/RE Languages, Undecidability, Rice's Theorem", "Probability: Poisson, Binomial, Normal Distributions"),
        ("Day 37", "Consolidation Day: TOC Closure & Decidability Master Matrix + Timed Test", "General Aptitude: 15-Mark Full Sectional Test"),
        ("Day 38", "Compiler Design: Lexical Analysis, Token generation, Lex regular rules", "Quantitative Aptitude: Profit, Loss, Interest"),
        ("Day 39", "Parsing 1: Top-down, First & Follow Sets, LL(1) Table & Conflicts", "Spatial Aptitude: 2D/3D Rotation & Transformations"),
        ("Day 40", "Parsing 2: Bottom-up, LR(0), SLR(1), CLR(1), LALR(1) Item Sets & Conflicts", "Analytical Aptitude: Seating & Direction Sense"),
        ("Day 41", "Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code", "General Aptitude: Complex Tables Data Interpretation"),
        ("Day 42", "Optimization: Basic Blocks, Flow Graphs, Liveness, Common Subexpressions", "Linear Algebra & Probability: Mixed Revision Set"),
        ("Day 43", "OS: System Calls, Fork Tracing, Threads, Scheduling (FCFS, SJF, RR)", "Verbal Aptitude: Sentence Completion & Error Spotting"),
        ("Day 44", "OS Synchronization: Critical Sections, Peterson's, Semaphores, Classics", "Consolidation Test: Compiler & Synchronization Drill"),
        ("Day 45", "Deadlocks: Necessary Conditions, RAG, Banker's Algorithm, Recovery", "Engineering Math: Determinants & Limits Drill"),
        ("Day 46", "Memory Management: Paging, Page Table Size, Multi-Level Paging Math", "Quantitative Aptitude: Mixtures, Clocks, Calendars"),
        ("Day 47", "Virtual Memory: TLB Hit/Miss (EMAT), Inverted Tables, Page Replacement", "Spatial Aptitude: Mirror Imaging & Paper Cutting"),
        ("Day 48", "File Systems & Disk Scheduling: i-nodes, SCAN, C-SCAN, LOOK, C-LOOK", "Analytical Aptitude: Logical Deductions"),
        ("Day 49", "DBMS: ER-Model, Cardinality, Relational Schema Mapping", "Discrete Math: Logic & Lattices Quick Review"),
        ("Day 50", "Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries", "Quantitative Aptitude: Permutations & Probability"),
        ("Day 51", "Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins", "Consolidation Test: Operating Systems Timed Test"),
        ("Day 52", "File Organization & Indexing: B & B+ Trees (Node Order, Record Pointers)", "Engineering Math: Linear Equations & Bayes' Review"),
        ("Day 53", "Transactions: ACID, Conflict vs View Serializability, Precedence Graphs", "General Aptitude: 15-Mark Full Sectional Test"),
        ("Day 54", "Concurrency Control: 2PL, Strict 2PL, Timestamp Ordering Protocol", "Analytical Aptitude: Numerical Reasoning Drills"),
        ("Day 55", "Digital Logic 1: Boolean Algebra, K-Maps, Tabular Method (Quine-McCluskey)", "Calculus & Probability: Formula Review Set"),
        ("Day 56", "Digital Logic 2: Number Representations, 2's Complement, IEEE 754 Floating", "Spatial Aptitude: 3D Assembling from 2D Nets"),
        ("Day 57", "Combinational Circuits: Adders, MUX, Decoders, Circuit Implementations", "Quantitative Aptitude: Advanced DI Test"),
        ("Day 58", "Sequential Circuits: Flip-Flops (JK, D, T), Counters (Mod-N), State Diagrams", "Consolidation Test: DBMS & Digital Logic Test"),
        ("Day 59", "Full Subject Mock 3: Operating Systems & Compiler Design (65 Marks)", "Mock 3 In-depth Analysis & Error Remediation"),
        ("Day 60", "Full Subject Mock 4: DBMS & Theory of Computation (65 Marks)", "Mock 4 In-depth Analysis & Error Remediation")
    ]

    p2_table_data = [[Paragraph("Day", table_header_style), Paragraph("Core Technical Focus (5.5 hrs)", table_header_style), Paragraph("Evening Aptitude & Math (2.0 hrs)", table_header_style)]]
    for d, c, e in p2_days:
        p2_table_data.append([Paragraph(d, table_cell_style), Paragraph(c, table_cell_style), Paragraph(e, table_cell_style)])

    t_p2 = Table(p2_table_data, colWidths=[55, 270, 190])
    t_p2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E3A8A")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#D1D5DB")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9FAFB")])
    ]))
    story.append(t_p2)
    story.append(PageBreak())

    # Phase 3
    story.append(Paragraph("5. Phase 3: Architecture, Networks & Full Mocks (Days 61 to 90)", h1_style))
    p3_days = [
        ("Day 61", "COA 1: Machine Instructions, Addressing Modes, Hardwired/Microprogrammed CU", "Verbal Aptitude: Reading Comprehension"),
        ("Day 62", "COA 2: Memory Hierarchy, Cache Mapping (Direct, Set-Assoc), AMAT Math", "Quantitative Aptitude: Probability Drills"),
        ("Day 63", "COA 3: Instruction Pipelining, Structural/Data/Control Hazards, Speedup", "Engineering Math: Matrices & Calculus"),
        ("Day 64", "COA 4: I/O Interface: Programmed, Interrupt-Driven, DMA Cycle Stealing", "Spatial Aptitude: Mixed Spatial Paper Test"),
        ("Day 65", "Networks 1: Switching, Framing, Delays (Tx, Prop), CRC & Checksums", "Analytical Aptitude: Syllogisms & Logic"),
        ("Day 66", "Networks 2: Flow Control (Stop & Wait, GBN, SR), CSMA/CD, Ethernet", "General Aptitude: 15-Mark Full Sectional"),
        ("Day 67", "Networks 3: IPv4 Header, Fragmentation Offsets, CIDR, Subnetting, Routing", "Consolidation Test: COA & Networks Timed Drill"),
        ("Day 68", "Networks 4: TCP Congestion Control (Slow Start, Congestion Avoidance, AIMD)", "Quantitative Aptitude: Full Speed Drill"),
        ("Day 69", "Networks 5: Application Layer: DNS, HTTP Persistent/Non-persistent RTT", "Discrete Math: Monoids & Graphs Quick Review"),
        ("Day 70", "Full Subject Mock 5: COA & Digital Logic (65 Marks, 90 mins)", "Mock 5 Detailed Analysis & Error Log Scrub"),
        ("Day 71", "Full Subject Mock 6: Networks & General Aptitude (65 Marks, 90 mins)", "Mock 6 Detailed Analysis & Error Log Scrub"),
        ("Day 72", "Multi-Subject Test 1: Programming + DS + Algorithms + OS (50 Marks)", "Multi-Subject 1 Error Review"),
        ("Day 73", "Multi-Subject Test 2: TOC + Compiler + DBMS + Networks (50 Marks)", "Multi-Subject 2 Error Review"),
        ("Day 74", "Multi-Subject Test 3: Discrete Math + Engg Math + Digital + COA (50 Marks)", "Master Formula Sheet Consolidation"),
        ("Day 75", "Full-Length Mock 1 (FLT 1) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis (3.5 hrs)"),
        ("Day 76", "Weakness Remediation: Revision of bottom 2 subjects from FLT 1", "Aptitude & Math Timed Speed Drill"),
        ("Day 77", "Full-Length Mock 2 (FLT 2) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis & Log Update"),
        ("Day 78", "Master Formula Review (Paging, Caching, Pipelining, Master Theorem)", "Solve 15 NATs on GateOverflow with timer"),
        ("Day 79", "Full-Length Mock 3 (FLT 3) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis (3.5 hrs)"),
        ("Day 80", "TOC Closure Table, Decidability, and Compiler Parsing Tables Revision", "Spatial & Analytical Aptitude Review"),
        ("Day 81", "Full-Length Mock 4 (FLT 4) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis (3.5 hrs)"),
        ("Day 82", "Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review", "Engineering Math High-Yield Formulas"),
        ("Day 83", "Full-Length Mock 5 (FLT 5) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis (3.5 hrs)"),
        ("Day 84", "NAT-Only Speed Drill: 40 Numerical Answer Type questions timed", "Verbal & Quantitative Final Polish"),
        ("Day 85", "Full-Length Mock 6 (FLT 6) — 65 Questions / 100 Marks (09:30 - 12:30)", "Full Root-Cause Analysis (3.5 hrs)"),
        ("Day 86", "Complete Mistake Diary Scrub: Re-solve every logged error", "Re-attempt all negative marks from FLTs"),
        ("Day 87", "Full-Length Mock 7 (FLT 7 — Final Simulation) — 65 Qs / 100 Marks", "Final Strategy & Question Skip Check"),
        ("Day 88", "Final Comprehensive Formula & Identity Review across all 10 subjects", "Zero new problems; consolidate memory"),
        ("Day 89", "Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh", "Mental Relaxation & Sleep Optimization"),
        ("Day 90", "Exam Logistics: Verify Admit Card, Original Photo ID, Center Route", "Rest & High Performance Priming")
    ]

    p3_table_data = [[Paragraph("Day", table_header_style), Paragraph("Core Technical Focus (5.5 hrs)", table_header_style), Paragraph("Evening Aptitude & Math (2.0 hrs)", table_header_style)]]
    for d, c, e in p3_days:
        p3_table_data.append([Paragraph(d, table_cell_style), Paragraph(c, table_cell_style), Paragraph(e, table_cell_style)])

    t_p3 = Table(p3_table_data, colWidths=[55, 270, 190])
    t_p3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E3A8A")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#D1D5DB")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9FAFB")])
    ]))
    story.append(t_p3)
    story.append(Spacer(1, 10))

    # Resources & Execution Rules
    story.append(Paragraph("6. Authoritative Textbook References & Strategy", h1_style))
    story.append(Paragraph("• <b>Algorithms & DS:</b> Cormen, Leiserson, Rivest, Stein (CLRS) — Focus on Chapters 1–4, 11, 12, 15, 16, 22–24.", bullet_style))
    story.append(Paragraph("• <b>Operating Systems:</b> Silberschatz, Galvin, Gagne — Focus on Processes, Synchronization, Deadlocks, Memory Management.", bullet_style))
    story.append(Paragraph("• <b>Databases:</b> Silberschatz, Korth, Sudarshan — Relational Algebra, Normalization, B+ Trees, Transactions.", bullet_style))
    story.append(Paragraph("• <b>Theory of Computation:</b> Peter Linz — Automata, Regular Languages, CFG, Turing Machines, Undecidability.", bullet_style))
    story.append(Paragraph("• <b>Computer Networks:</b> Kurose & Ross — Framing, CRC, Sliding Window, Subnetting, TCP Congestion Control.", bullet_style))
    story.append(Paragraph("• <b>Computer Organization:</b> Carl Hamacher — Cache Mapping, Pipeline Hazards & Throughput, Addressing Modes.", bullet_style))
    story.append(Paragraph("• <b>Discrete Mathematics:</b> Kenneth H. Rosen — Propositional Logic, Equivalence Relations, Graph Invariants.", bullet_style))
    story.append(Paragraph("• <b>PYQ Resource:</b> GateOverflow PDF Volumes 1 & 2 (Official past papers 1987–2026). Prioritize 2012–2026.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("7. Negative Marking & Exam-Room Protocols", h1_style))
    story.append(Paragraph("• <b>Three-Pass Solving Technique:</b> Pass 1 (0–60m): Direct 1-markers and trivial 2-markers (aim for 30–35 marks). Pass 2 (60–140m): Multi-step NATs and code traces. Pass 3 (140–180m): Verification and flagged questions.", bullet_style))
    story.append(Paragraph("• <b>Zero Guessing on MCQs:</b> A single 2-mark incorrect MCQ incurs a -0.66 deduction (effective loss of 2.66 marks). 3 wild guesses can forfeit ~8 marks, dropping rank from Top 250 to outside 1,500.", bullet_style))
    story.append(Paragraph("• <b>NAT Advantage:</b> Numerical Answer Type questions carry NO negative marking. If your answer is within a verified mathematical bound, never leave it blank.", bullet_style))
    story.append(Paragraph("• <b>Virtual Calculator:</b> Never compute by hand for exponents or logarithms. Practice exclusively with the official TCS on-screen calculator.", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[+] PDF successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()