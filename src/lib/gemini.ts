import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Document } from "@langchain/core/documents";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promptcommit = [
  "You are an expert programmer summarizing git diffs.",
  "Git diffs show changes to files: lines starting with '-' indicate deletions, '+' indicate additions, unchanged lines provide context. File headers (e.g., 'diff --git a/<file> b/<file>') identify files, hunk headers (e.g., '@@ -start,end +start,end @@') show changed line ranges.",
  "Task: Summarize **all** changes in the provided diff in a concise bullet-point list, covering every file and hunk.",
  "Requirements:",
  "- Include **all** modified files and their changes, no matter how many.",
  "- For each file, summarize **all** hunks (e.g., added/removed code, modified logic).",
  "- Use technical language (e.g., function names, variable changes).",
  "- Handle edge cases: whitespace/formatting ('Whitespace cleanup in <file>'), new/deleted files ('Added <file>'), binary files ('Updated binary <file>'), unclear diffs (best-effort summary).",
  "- Avoid vague terms like 'Updated file'; be specific (e.g., 'Added null check in validateInput').",
  "- Do **not** limit to a few bullets; cover **all** changes, even for large diffs.",
  "- If diff is empty/invalid, state 'No changes found' or 'Invalid diff'.",
  "- Never leave response blank; always summarize, even for minor changes.",
  "Summarize the following diff:\n\n${diff}",
];

export const aiSummarizeCommit = async (diff: string) => {
  const response = await model.generateContent([promptcommit.join("\n")]);

  return response.response.text();
};

export async function aiSummarizeCode(doc: Document) {
  console.log("getting sumary for", doc.metadata.source);

  const code = doc.pageContent.slice(0, 10000);

  const prompt = [
    `You are a senior software engineer helping onboard junior developers to a codebase.`,
    `Your job is to summarize the purpose of the following file.`,
    `File path: ${doc.metadata.source}`,
    `Code:\n"""${code}"""`,
    `Provide a concise summary of what this file likely does. If the code is incomplete, give your best guess based on what's available.`,
    `Always respond with a summary, even if it's partial or uncertain. Do not reply with "I don't know".`,
  ];

  try {
    const response = await model.generateContent(prompt);

    return response.response.text();
  } catch (error) {
    return "";
  }
}

export async function generateEmbedding(summary: string) {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });

  const result = await model.embedContent(summary);

  const embedding = result.embedding;

  return embedding.values;
}
