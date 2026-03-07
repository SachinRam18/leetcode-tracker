import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Trophy, ListChecks, Target, BookOpen, Download, Upload, RefreshCw, Filter } from "lucide-react";

const RAW_DATA = String.raw`I. Two Pointer Patterns	
Pattern 1: Two Pointers - Converging (Sorted Array Target Sum)	1. Two Sum, 11. Container With Most Water, 15. 3Sum, 16. 3Sum Closest, 18. 4Sum, 167. Two Sum II - Input Array Is Sorted, 349. Intersection of Two Arrays, 392. Is Subsequence, 881. Boats to Save People, 977. Squares of a Sorted Array, 259. 3Sum Smaller
Pattern 2: Two Pointers - Fast & Slow (Cycle Detection)	141. Linked List Cycle, 202. Happy Number, 287. Find the Duplicate Number
Pattern 3: Two Pointers - Fixed Separation (Nth Node from End)	19. Remove Nth Node From End of List, 876. Middle of the Linked List, 2095. Delete the Middle Node of a Linked List
Pattern 4: Two Pointers - In-place Array Modification	26. Remove Duplicates from Sorted Array, 27. Remove Element, 75. Sort Colors, 80. Remove Duplicates from Sorted Array II, 283. Move Zeroes, 443. String Compression, 905. Sort Array By Parity, 2337. Move Pieces to Obtain a String, 2938. Separate Black and White Balls
Pattern 5: Two Pointers - String Comparison with Backspaces	844. Backspace String Compare
Pattern 6: Two Pointers - Expanding From Center (Palindromes)	5. Longest Palindromic Substring, 647. Palindromic Substrings
Pattern 7: Two Pointers - String Reversal	151. Reverse Words in a String, 344. Reverse String, 345. Reverse Vowels of a String, 541. Reverse String II
II. Sliding Window Patterns	
Pattern 8: Sliding Window - Fixed Size (Subarray Calculation)	346. Moving Average from Data Stream, 643. Maximum Average Subarray I, 2985. Calculate Compressed Mean, 3254. Find the Power of K-Size Subarrays I, 3318. Find X-Sum of All K-Long Subarrays I
Pattern 9: Sliding Window - Variable Size (Condition-Based)	3. Longest Substring Without Repeating Characters, 76. Minimum Window Substring, 209. Minimum Size Subarray Sum, 219. Contains Duplicate II, 424. Longest Repeating Character Replacement, 713. Subarray Product Less Than K, 904. Fruit Into Baskets, 1004. Max Consecutive Ones III, 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit, 1493. Longest Subarray of 1's After Deleting One Element, 1658. Minimum Operations to Reduce X to Zero, 1838. Frequency of the Most Frequent Element, 2461. Maximum Sum of Distinct Subarrays With Length K, 2516. Take K of Each Character From Left and Right, 2762. Continuous Subarrays, 2779. Maximum Beauty of an Array After Applying Operation, 2981. Find Longest Special Substring That Occurs Thrice I, 3026. Maximum Good Subarray Sum, 3346. Maximum Frequency of an Element After Performing Operations I, 3347. Maximum Frequency of an Element After Performing Operations II
Pattern 10: Sliding Window - Monotonic Queue for Max/Min	239. Sliding Window Maximum, 862. Shortest Subarray with Sum at Least K, 1696. Jump Game VI
Pattern 11: Sliding Window - Character Frequency Matching	438. Find All Anagrams in a String, 567. Permutation in String
III. Tree Traversal Patterns (DFS & BFS)	
Pattern 12: Tree BFS - Level Order Traversal	102. Binary Tree Level Order Traversal, 103. Binary Tree Zigzag Level Order Traversal, 199. Binary Tree Right Side View, 515. Find Largest Value in Each Tree Row, 1161. Maximum Level Sum of a Binary Tree
Pattern 13: Tree DFS - Recursive Preorder Traversal	100. Same Tree, 101. Symmetric Tree, 105. Construct Binary Tree from Preorder and Inorder Traversal, 114. Flatten Binary Tree to Linked List, 226. Invert Binary Tree, 257. Binary Tree Paths, 988. Smallest String Starting From Leaf
Pattern 14: Tree DFS - Recursive Inorder Traversal	94. Binary Tree Inorder Traversal, 98. Validate Binary Search Tree, 173. Binary Search Tree Iterator, 230. Kth Smallest Element in a BST, 501. Find Mode in Binary Search Tree, 530. Minimum Absolute Difference in BST
Pattern 15: Tree DFS - Recursive Postorder Traversal	104. Maximum Depth of Binary Tree, 110. Balanced Binary Tree, 124. Binary Tree Maximum Path Sum, 145. Binary Tree Postorder Traversal, 337. House Robber III, 366. Find Leaves of Binary Tree, 543. Diameter of Binary Tree, 863. All Nodes Distance K in Binary Tree, 1110. Delete Nodes And Return Forest, 2458. Height of Binary Tree After Subtree Removal Queries
Pattern 17: Tree - Lowest Common Ancestor (LCA) Finding	235. Lowest Common Ancestor of a Binary Search Tree, 236. Lowest Common Ancestor of a Binary Tree
Pattern 18: Tree - Serialization and Deserialization	297. Serialize and Deserialize Binary Tree, 572. Subtree of Another Tree, 652. Find Duplicate Subtrees
IV. Graph Traversal Patterns (DFS & BFS)	
Pattern 19: Graph DFS - Connected Components / Island Counting	130. Surrounded Regions, 200. Number of Islands, 417. Pacific Atlantic Water Flow, 547. Number of Provinces, 695. Max Area of Island, 733. Flood Fill, 841. Keys and Rooms, 1020. Number of Enclaves, 1254. Number of Closed Islands, 1905. Count Sub Islands, 2101. Detonate the Maximum Bombs
Pattern 20: Graph BFS - Connected Components / Island Counting	127. Word Ladder, 542. 01 Matrix, 994. Rotting Oranges, 1091. Shortest Path in Binary Matrix
Pattern 21: Graph DFS - Cycle Detection (Directed Graph)	207. Course Schedule, 210. Course Schedule II, 802. Find Eventual Safe States, 1059. All Paths from Source Lead to Destination
Pattern 22: Graph BFS - Topological Sort (Kahn's Algorithm)	207. Course Schedule, 210. Course Schedule II, 269. Alien Dictionary, 310. Minimum Height Trees, 444. Sequence Reconstruction, 1136. Parallel Courses, 1857. Largest Color Value in a Directed Graph, 2050. Parallel Courses III, 2115. Find All Possible Recipes from Given Supplies, 2392. Build a Matrix With Conditions
Pattern 23: Graph - Deep Copy / Cloning	133. Clone Graph
Pattern 24: Graph - Shortest Path (Dijkstra's Algorithm)	743. Network Delay Time, 778. Swim in Rising Water, 1514. Path with Maximum Probability, 1631. Path With Minimum Effort, 1976. Number of Ways to Arrive at Destination, 2045. Second Minimum Time to Reach Destination, 2203. Minimum Weighted Subgraph With the Required Paths, 2290. Minimum Obstacle Removal to Reach Corner, 2577. Minimum Time to Visit a Cell In a Grid, 2812. Find the Safest Path in a Grid
Pattern 25: Graph - Shortest Path (Bellman-Ford / BFS+K)	787. Cheapest Flights Within K Stops
Pattern 26: Graph - Union-Find (Disjoint Set Union - DSU)	200. Number of Islands, 261. Graph Valid Tree, 305. Number of Islands II, 323. Number of Connected Components in an Undirected Graph, 547. Number of Provinces, 684. Redundant Connection, 721. Accounts Merge, 737. Sentence Similarity II, 947. Most Stones Removed with Same Row or Column, 952. Largest Component Size by Common Factor, 959. Regions Cut By Slashes, 1101. The Earliest Moment When Everyone Become Friends
V. Dynamic Programming (DP) Patterns	
Pattern 27: DP - 1D Array (Fibonacci Style)	70. Climbing Stairs, 91. Decode Ways, 198. House Robber, 213. House Robber II, 337. House Robber III, 509. Fibonacci Number, 740. Delete and Earn, 746. Min Cost Climbing Stairs
Pattern 28: DP - 1D Array (Kadane's Algorithm for Max/Min Subarray)	53. Maximum Subarray
Pattern 29: DP - 1D Array (Coin Change / Unbounded Knapsack Style)	322. Coin Change, 377. Combination Sum IV, 518. Coin Change II
Pattern 30: DP - 1D Array (0/1 Knapsack Subset Sum Style)	416. Partition Equal Subset Sum, 494. Target Sum
Pattern 31: DP - 1D Array (Word Break Style)	139. Word Break, 140. Word Break II
Pattern 32: DP - 2D Array (Longest Common Subsequence - LCS)	583. Delete Operation for Two Strings, 1143. Longest Common Subsequence
Pattern 33: DP - 2D Array (Edit Distance / Levenshtein Distance)	72. Edit Distance
Pattern 34: DP - 2D Array (Unique Paths on Grid)	62. Unique Paths, 63. Unique Paths II, 64. Minimum Path Sum, 120. Triangle, 221. Maximal Square, 931. Minimum Falling Path Sum, 1277. Count Square Submatrices with All Ones
Pattern 35: DP - Interval DP	312. Burst Balloons, 546. Remove Boxes
Pattern 36: DP - Catalan Numbers	95. Unique Binary Search Trees II, 96. Unique Binary Search Trees, 241. Different Ways to Add Parentheses
Pattern 37: DP - Longest Increasing Subsequence (LIS)	300. Longest Increasing Subsequence, 354. Russian Doll Envelopes, 1671. Minimum Number of Removals to Make Mountain Array, 2407. Longest Increasing Subsequence II
VI. Heap (Priority Queue) Patterns	
Pattern 38: Heap - Top K Elements (Selection/Frequency)	215. Kth Largest Element in an Array, 347. Top K Frequent Elements, 451. Sort Characters By Frequency, 506. Relative Ranks, 703. Kth Largest Element in a Stream, 973. K Closest Points to Origin, 1046. Last Stone Weight, 2558. Take Gifts From the Richest Pile
Pattern 39: Heap - Two Heaps for Median Finding	295. Find Median from Data Stream, 1825. Finding MK Average
Pattern 40: Heap - K-way Merge	23. Merge k Sorted Lists, 373. Find K Pairs with Smallest Sums, 378. Kth Smallest Element in a Sorted Matrix, 632. Smallest Range Covering Elements from K Lists
Pattern 41: Heap - Scheduling / Minimum Cost (Greedy with Priority Queue)	253. Meeting Rooms II, 767. Reorganize String, 857. Minimum Cost to Hire K Workers, 1642. Furthest Building You Can Reach, 1792. Maximum Average Pass Ratio, 1834. Single-Threaded CPU, 1942. The Number of the Smallest Unoccupied Chair, 2402. Meeting Rooms III
VII. Backtracking Patterns	
Pattern 42: Backtracking - Subsets (Include/Exclude)	17. Letter Combinations of a Phone Number, 77. Combinations, 78. Subsets, 90. Subsets II
Pattern 43: Backtracking - Permutations	31. Next Permutation, 46. Permutations, 60. Permutation Sequence
Pattern 44: Backtracking - Combination Sum	39. Combination Sum, 40. Combination Sum II
Pattern 45: Backtracking - Parentheses Generation	22. Generate Parentheses, 301. Remove Invalid Parentheses
Pattern 46: Backtracking - Word Search / Path Finding in Grid	79. Word Search, 212. Word Search II, 2018. Check if Word Can Be Placed In Crossword
Pattern 47: Backtracking - N-Queens / Constraint Satisfaction	37. Sudoku Solver, 51. N-Queens
Pattern 48: Backtracking - Palindrome Partitioning	131. Palindrome Partitioning
VIII. Greedy Patterns	
Pattern 49: Greedy - Interval Merging/Scheduling	56. Merge Intervals, 57. Insert Interval, 759. Employee Free Time, 986. Interval List Intersections, 2406. Divide Intervals Into Minimum Number of Groups
Pattern 51: Greedy - Jump Game Reachability/Minimization	45. Jump Game II, 55. Jump Game
Pattern 52: Greedy - Buy/Sell Stock	121. Best Time to Buy and Sell Stock, 122. Best Time to Buy and Sell Stock II
Pattern 53: Greedy - Gas Station Circuit	134. Gas Station
Pattern 54: Greedy - Task Scheduling (Frequency Based)	621. Task Scheduler
IX. Binary Search Patterns	
Pattern 55: Binary Search - On Sorted Array/List	35. Search Insert Position, 69. Sqrt(x), 74. Search a 2D Matrix, 278. First Bad Version, 374. Guess Number Higher or Lower, 540. Single Element in a Sorted Array, 704. Binary Search, 1539. Kth Missing Positive Number
Pattern 56: Binary Search - Find Min/Max in Rotated Sorted Array	33. Search in Rotated Sorted Array, 81. Search in Rotated Sorted Array II, 153. Find Minimum in Rotated Sorted Array, 162. Find Peak Element, 852. Peak Index in a Mountain Array, 1095. Find in Mountain Array
Pattern 57: Binary Search - On Answer / Condition Function	410. Split Array Largest Sum, 774. Minimize Max Distance to Gas Station, 875. Koko Eating Bananas, 1011. Capacity To Ship Packages Within D Days, 1482. Minimum Number of Days to Make m Bouquets, 1760. Minimum Limit of Balls in a Bag, 2064. Minimized Maximum of Products Distributed to Any Store, 2226. Maximum Candies Allocated to K Children
Pattern 58: Binary Search - Find First/Last Occurrence	34. Find First and Last Position of Element in Sorted Array, 658. Find K Closest Elements
Pattern 59: Binary Search - Median of Two Sorted Arrays	4. Median of Two Sorted Arrays
X. Stack Patterns	
Pattern 60: Stack - Valid Parentheses Matching	20. Valid Parentheses, 32. Longest Valid Parentheses, 921. Minimum Add to Make Parentheses Valid, 1249. Minimum Remove to Make Valid Parentheses, 1963. Minimum Number of Swaps to Make the String Balanced
Pattern 61: Stack - Monotonic Stack	402. Remove K Digits, 496. Next Greater Element I, 503. Next Greater Element II, 739. Daily Temperatures, 901. Online Stock Span, 907. Sum of Subarray Minimums, 962. Maximum Width Ramp, 1475. Final Prices With a Special Discount in a Shop, 1673. Find the Most Competitive Subsequence
Pattern 62: Stack - Expression Evaluation (RPN/Infix)	150. Evaluate Reverse Polish Notation, 224. Basic Calculator, 227. Basic Calculator II, 772. Basic Calculator III
Pattern 63: Stack - Simulation / Backtracking Helper	71. Simplify Path, 394. Decode String, 735. Asteroid Collision
Pattern 64: Stack - Min Stack Design	155. Min Stack
Pattern 65: Stack - Largest Rectangle in Histogram	84. Largest Rectangle in Histogram, 85. Maximal Rectangle
XI. Bit Manipulation Patterns	
Pattern 66: Bitwise XOR - Finding Single/Missing Number	136. Single Number, 137. Single Number II, 268. Missing Number, 389. Find the Difference
Pattern 67: Bitwise AND - Counting Set Bits (Hamming Weight)	191. Number of 1 Bits
Pattern 70: Bitwise DP - Counting Bits Optimization	338. Counting Bits
Pattern 69: Bitwise Operations - Power of Two/Four Check	231. Power of Two, 342. Power of Four
XII. Linked List Manipulation Patterns	
Pattern 71: Linked List - In-place Reversal	83. Remove Duplicates from Sorted List, 92. Reverse Linked List II, 206. Reverse Linked List, 25. Reverse Nodes in k-Group, 234. Palindrome Linked List, 82. Remove Duplicates from Sorted List II
Pattern 72: Linked List - Merging Two Sorted Lists	21. Merge Two Sorted Lists
Pattern 73: Linked List - Addition of Numbers	2. Add Two Numbers, 369. Plus One Linked List
Pattern 74: Linked List - Intersection Detection	160. Intersection of Two Linked Lists
Pattern 75: Linked List - Reordering / Partitioning	24. Swap Nodes in Pairs, 61. Rotate List, 86. Partition List, 143. Reorder List, 328. Odd Even Linked List
XIII. Array/Matrix Manipulation Patterns	
Pattern 76: Array/Matrix - In-place Rotation	48. Rotate Image, 189. Rotate Array
Pattern 77: Array/Matrix - Spiral Traversal	54. Spiral Matrix, 885. Spiral Matrix III, 2326. Spiral Matrix IV
Pattern 78: Array/Matrix - Set Matrix Zeroes (In-place Marking)	73. Set Matrix Zeroes
Pattern 79: Array - Product Except Self (Prefix/Suffix Products)	238. Product of Array Except Self
Pattern 80: Array - Plus One (Handling Carry)	66. Plus One
Pattern 81: Array - Merge Sorted Array (In-place from End)	88. Merge Sorted Array
Pattern 82: Array - Cyclic Sort	41. First Missing Positive, 268. Missing Number, 287. Find the Duplicate Number, 442. Find All Duplicates in an Array, 448. Find All Numbers Disappeared in an Array
Pattern 83: Array - Kadane's Variant for Maximum Product	152. Maximum Product Subarray
XIV. String Manipulation Patterns	
Pattern 84: String - Palindrome Check (Two Pointers / Reverse)	9. Palindrome Number, 125. Valid Palindrome, 680. Valid Palindrome II
Pattern 85: String - Anagram Check (Frequency Count/Sort)	49. Group Anagrams, 242. Valid Anagram
Pattern 86: String - Roman to Integer Conversion	13. Roman to Integer
Pattern 87: String - String to Integer (atoi)	8. String to Integer (atoi)
Pattern 88: String - Multiply Strings (Manual Simulation)	43. Multiply Strings
Pattern 89: String Matching - Naive / KMP / Rabin-Karp	28. Find the Index of the First Occurrence in a String, 214. Shortest Palindrome, 686. Repeated String Match, 796. Rotate String, 3008. Find Beautiful Indices in the Given Array II
Pattern 90: String - Repeated Substring Pattern Detection	459. Repeated Substring Pattern
XV. Design Patterns	
Pattern 91: Design (General/Specific)	146. LRU Cache, 155. Min Stack, 208. Implement Trie (Prefix Tree), 211. Design Add and Search Words Data Structure, 225. Implement Stack using Queues, 232. Implement Queue using Stacks, 251. Flatten 2D Vector, 271. Encode and Decode Strings, 295. Find Median from Data Stream, 341. Flatten Nested List Iterator, 346. Moving Average from Data Stream, 353. Design Snake Game, 359. Logger Rate Limiter, 362. Design Hit Counter, 379. Design Phone Directory, 380. Insert Delete GetRandom O(1), 432. All O
aone Data Structure, 460. LFU Cache, 604. Design Compressed String Iterator, 622. Design Circular Queue, 641. Design Circular Deque, 642. Design Search Autocomplete System, 706. Design HashMap, 715. Range Module, 900. RLE Iterator, 981. Time Based Key-Value Store, 1146. Snapshot Array, 1348. Tweet Counts Per Frequency, 1352. Product of the Last K Numbers, 1381. Design a Stack With Increment Operation, 1756. Design Most Recently Used Queue, 2013. Detect Squares, 2034. Stock Price Fluctuation, 2296. Design a Text Editor, 2336. Smallest Number in Infinite Set`;

const USERNAME = "SachinRam27";
const STORAGE_KEY = `leetcode-tracker-${USERNAME}-v1`;
const DEFAULT_NOTES = "";
const STATUS_ORDER = ["all", "todo", "in-progress", "solved", "review"];
const STATUS_LABELS = {
    todo: "To Do",
    "in-progress": "In Progress",
    solved: "Solved",
    review: "Revision",
};

function parseRawData(raw: string) {
    const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
    const topics: any[] = [];
    let currentTopic: any = null;
    for (const line of lines) {
        if (/^[IVXLCDM]+\./.test(line) && !line.startsWith("Pattern")) {
            currentTopic = { name: line.replace(/\t/g, "").trim(), patterns: [] };
            topics.push(currentTopic);
            continue;
        }
        const [patternNamePart, problemsPart = ""] = line.split("\t");
        if (!patternNamePart?.startsWith("Pattern") || !currentTopic) continue;
        const pattern = {
            name: patternNamePart.trim(),
            topic: currentTopic.name,
            problems: extractProblems(problemsPart),
        };
        currentTopic.patterns.push(pattern);
    }
    return topics;
}

function extractProblems(input: string) {
    const matches = [...input.matchAll(/(\d+)\.\s*([^,]+?)(?=(?:,\s*\d+\.|$))/g)];
    return matches.map((m) => ({
        id: Number(m[1]),
        title: m[2].replace(/\s+/g, " ").trim(),
    }));
}

const TOPICS = parseRawData(RAW_DATA);
const ALL_PROBLEMS = TOPICS.flatMap((topic) =>
    topic.patterns.flatMap((pattern: any) =>
        pattern.problems.map((problem: any) => ({
            ...problem,
            topic: topic.name,
            pattern: pattern.name,
            key: `${problem.id}-${problem.title}`,
        }))
    )
);

function loadTracker() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveTracker(data: any) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function exportJson(data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${USERNAME}-leetcode-tracker.json`;
    a.click();
    URL.revokeObjectURL(url);
}

async function fetchLeetCodeLive(username: string) {
    const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
          starRating
          realName
          userAvatar
          aboutMe
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
        topPercentage
      }
      userProfileUserQuestionProgressV2(userSlug: $username) {
        numAcceptedQuestions {
          difficulty
          count
        }
        numFailedQuestions {
          difficulty
          count
        }
      }
    }
  `;

    const response = await fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) throw new Error("Failed to fetch LeetCode stats");
    const json = await response.json();
    if (json.errors?.length) throw new Error(json.errors[0].message || "GraphQL error");
    return json.data;
}

function StatCard({ icon: Icon, label, value, sub }: any) {
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-slate-100 p-2"><Icon className="h-5 w-5" /></div>
                    <div>
                        <div className="text-sm text-slate-500">{label}</div>
                        <div className="text-2xl font-bold tracking-tight">{value}</div>
                        {sub ? <div className="text-xs text-slate-500 mt-1">{sub}</div> : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ProblemRow({ problem, itemState, onStateChange, onToggleSolved }: any) {
    const status = itemState?.status || "todo";
    const notes = itemState?.notes || DEFAULT_NOTES;
    return (
        <div className="rounded-2xl border p-3 md:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Checkbox checked={status === "solved"} onCheckedChange={onToggleSolved} />
                        <span className="font-semibold">#{problem.id}</span>
                        <span>{problem.title}</span>
                        <Badge variant="secondary">{problem.topic.replace(/^[IVXLCDM]+\.\s*/, "")}</Badge>
                    </div>
                    <div className="text-xs text-slate-500">{problem.pattern}</div>
                    <textarea
                        className="w-full min-h-20 rounded-xl border p-2 text-sm"
                        value={notes}
                        placeholder="Add notes, mistakes, revision hints, edge cases..."
                        onChange={(e) => onStateChange({ ...itemState, status, notes: e.target.value })}
                    />
                </div>
                <div className="min-w-[180px]">
                    <Select value={status} onValueChange={(value) => onStateChange({ ...itemState, status: value, notes })}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="solved">Solved</SelectItem>
                            <SelectItem value="review">Revision</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default function LeetCodePatternTracker() {
    const [tracker, setTracker] = useState<any>({});
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [topicFilter, setTopicFilter] = useState("all");
    const [selectedPattern, setSelectedPattern] = useState("all");
    const [liveStats, setLiveStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setTracker(loadTracker());
    }, []);

    useEffect(() => {
        saveTracker(tracker);
    }, [tracker]);

    const refreshStats = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchLeetCodeLive(USERNAME);
            setLiveStats(data);
        } catch (e: any) {
            setError("Live LeetCode sync failed in preview. The tracker still works locally. When you deploy it, the GraphQL call may work directly. If CORS blocks it, use a tiny backend proxy.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshStats();
    }, []);

    const patterns = useMemo(() => {
        const list = TOPICS.flatMap((topic: any) => topic.patterns);
        if (topicFilter === "all") return list;
        return list.filter((p: any) => p.topic === topicFilter);
    }, [topicFilter]);

    const filteredProblems = useMemo(() => {
        return ALL_PROBLEMS.filter((problem: any) => {
            const state = tracker[problem.key] || { status: "todo", notes: DEFAULT_NOTES };
            const matchesSearch = !search || `${problem.id} ${problem.title} ${problem.pattern} ${problem.topic}`.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "all" || state.status === statusFilter;
            const matchesTopic = topicFilter === "all" || problem.topic === topicFilter;
            const matchesPattern = selectedPattern === "all" || problem.pattern === selectedPattern;
            return matchesSearch && matchesStatus && matchesTopic && matchesPattern;
        });
    }, [search, statusFilter, topicFilter, selectedPattern, tracker]);

    const summary = useMemo(() => {
        const total = ALL_PROBLEMS.length;
        const counts: any = { todo: 0, "in-progress": 0, solved: 0, review: 0 };
        ALL_PROBLEMS.forEach((problem: any) => {
            const status = tracker[problem.key]?.status || "todo";
            counts[status] = (counts[status] || 0) + 1;
        });
        return { total, counts, progress: total ? Math.round((counts.solved / total) * 100) : 0 };
    }, [tracker]);

    const topics = TOPICS.map((t: any) => t.name);

    const acceptedTotal = liveStats?.userProfileUserQuestionProgressV2?.numAcceptedQuestions?.find((x: any) => x.difficulty === "All")?.count
        ?? liveStats?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x: any) => x.difficulty === "All")?.count
        ?? "—";

    const setProblemState = (problem: any, next: any) => {
        setTracker((prev: any) => ({ ...prev, [problem.key]: next }));
    };

    const importJson = async (file: any) => {
        const text = await file.text();
        const parsed = JSON.parse(text);
        setTracker(parsed);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">LeetCode Pattern Tracker</h1>
                        <p className="text-slate-600 mt-1">Pattern-wise roadmap + local progress tracker + live profile snapshot for {USERNAME}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="rounded-2xl" onClick={refreshStats}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Live Stats
                        </Button>
                        <Button variant="outline" className="rounded-2xl" onClick={() => exportJson(tracker)}>
                            <Download className="mr-2 h-4 w-4" /> Export Progress
                        </Button>
                        <label className="inline-flex cursor-pointer items-center rounded-2xl border bg-white px-4 py-2 text-sm font-medium shadow-sm">
                            <Upload className="mr-2 h-4 w-4" /> Import Progress
                            <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard icon={Trophy} label="Solved in tracker" value={`${summary.counts.solved}/${summary.total}`} sub={`${summary.progress}% complete`} />
                    <StatCard icon={Target} label="Live accepted on LeetCode" value={acceptedTotal} sub={liveStats?.userContestRanking?.rating ? `Contest rating ${Math.round(liveStats.userContestRanking.rating)}` : "Contest rating unavailable"} />
                    <StatCard icon={BookOpen} label="To revise" value={summary.counts.review} sub={`${summary.counts["in-progress"]} currently in progress`} />
                    <StatCard icon={ListChecks} label="Patterns covered" value={`${new Set(ALL_PROBLEMS.filter((p: any) => tracker[p.key]?.status === "solved").map((p: any) => p.pattern)).size}`} sub={`Across ${TOPICS.length} major sections`} />
                </div>

                <Card className="rounded-3xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Overall Progress</span>
                            <Badge variant="secondary">{summary.progress}%</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Progress value={summary.progress} className="h-3" />
                        <div className="grid gap-2 text-sm md:grid-cols-4">
                            <div>To Do: <span className="font-semibold">{summary.counts.todo}</span></div>
                            <div>In Progress: <span className="font-semibold">{summary.counts["in-progress"]}</span></div>
                            <div>Solved: <span className="font-semibold">{summary.counts.solved}</span></div>
                            <div>Revision: <span className="font-semibold">{summary.counts.review}</span></div>
                        </div>
                        {error ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{error}</div> : null}
                        {loading ? <div className="text-sm text-slate-500">Refreshing live profile data...</div> : null}
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
                    <Card className="rounded-3xl shadow-sm xl:sticky xl:top-4 xl:h-[calc(100vh-3rem)]">
                        <CardHeader>
                            <CardTitle>Filters & roadmap</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input value={search} onChange={(e: any) => setSearch(e.target.value)} className="rounded-2xl pl-9" placeholder="Search problem, topic, pattern..." />
                            </div>

                            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 xl:grid-cols-1 xl:h-auto xl:gap-2 xl:bg-transparent">
                                    {STATUS_ORDER.map((status) => (
                                        <TabsTrigger key={status} value={status} className="rounded-xl xl:justify-start">
                                            {status === "all" ? "All" : STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>

                            <div className="space-y-2">
                                <div className="text-sm font-medium flex items-center gap-2"><Filter className="h-4 w-4" /> Topic</div>
                                <Select value={topicFilter} onValueChange={(v) => { setTopicFilter(v); setSelectedPattern("all"); }}>
                                    <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All topics</SelectItem>
                                        {topics.map((topic) => (
                                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium">Pattern</div>
                                <Select value={selectedPattern} onValueChange={setSelectedPattern}>
                                    <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All patterns</SelectItem>
                                        {patterns.map((pattern: any) => (
                                            <SelectItem key={pattern.name} value={pattern.name}>{pattern.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <ScrollArea className="h-[420px] xl:h-[calc(100vh-26rem)] rounded-2xl border p-3">
                                <div className="space-y-4">
                                    {TOPICS.map((topic: any) => (
                                        <div key={topic.name} className="space-y-2">
                                            <div className="font-semibold text-sm">{topic.name}</div>
                                            <div className="space-y-2">
                                                {topic.patterns.map((pattern: any) => {
                                                    const solvedCount = pattern.problems.filter((p: any) => tracker[`${p.id}-${p.title}`]?.status === "solved").length;
                                                    return (
                                                        <button
                                                            key={pattern.name}
                                                            onClick={() => { setTopicFilter(topic.name); setSelectedPattern(pattern.name); }}
                                                            className="w-full rounded-2xl border p-3 text-left hover:bg-slate-50"
                                                        >
                                                            <div className="text-sm font-medium leading-snug">{pattern.name}</div>
                                                            <div className="mt-1 text-xs text-slate-500">{solvedCount}/{pattern.problems.length} solved</div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card className="rounded-3xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <span>Visible problems</span>
                                    <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                                        <span>{filteredProblems.length} shown</span>
                                        <span>•</span>
                                        <span>{ALL_PROBLEMS.length} total in roadmap</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>

                        {filteredProblems.map((problem: any) => {
                            const itemState = tracker[problem.key] || { status: "todo", notes: DEFAULT_NOTES };
                            return (
                                <ProblemRow
                                    key={problem.key}
                                    problem={problem}
                                    itemState={itemState}
                                    onStateChange={(next: any) => setProblemState(problem, next)}
                                    onToggleSolved={() => setProblemState(problem, { ...itemState, status: itemState.status === "solved" ? "todo" : "solved" })}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
