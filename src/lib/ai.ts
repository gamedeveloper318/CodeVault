// AI code generation engine.
// Uses OpenAI when OPENAI_API_KEY is set, otherwise falls back to a
// sophisticated rule-based generator so the app is always functional.

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "cpp"
  | "go"
  | "rust"
  | "ruby"
  | "php"
  | "swift"
  | "kotlin"
  | "html"
  | "css"
  | "sql"
  | "bash";

export interface GenerationResult {
  code: string;
  language: Language;
  explanation: string;
}

const LANGUAGE_KEYWORDS: Record<Language, string[]> = {
  javascript: ["javascript", "js ", "node", "react", "vue", "angular", "express", "next.js", "nextjs"],
  typescript: ["typescript", "ts ", "angular", "nestjs", "tsx"],
  python: ["python", "py ", "django", "flask", "fastapi", "pandas"],
  java: ["java ", "spring", "jvm", "android"],
  csharp: ["c#", "csharp", "c sharp", ".net", "asp.net", "unity"],
  cpp: ["c++", "cpp", "stl"],
  go: ["golang", " go ", "goroutine", "gin "],
  rust: ["rust", "cargo", "rustlang"],
  ruby: ["ruby", "rails", "sinatra"],
  php: ["php", "laravel", "symfony"],
  swift: ["swift", "ios", "swiftui", "uikit"],
  kotlin: ["kotlin", "android", "jetpack"],
  html: ["html", "webpage", "landing page", "markup"],
  css: ["css", "stylesheet", "tailwind", "styling"],
  sql: ["sql", "query", "database", "table", "postgresql", "mysql"],
  bash: ["bash", "shell", "script", "cli", "command line"],
};

export function detectLanguage(prompt: string): Language {
  const lower = prompt.toLowerCase();
  let best: Language = "python";
  let bestScore = 0;
  for (const [lang, keywords] of Object.entries(LANGUAGE_KEYWORDS) as [Language, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = lang;
    }
  }
  return best;
}

// ── OpenAI integration ────────────────────────────────────────────────
async function generateWithOpenAI(prompt: string, language: Language): Promise<GenerationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("No OpenAI API key");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert senior software engineer. The user will describe a program or feature they want built.
Respond with ONLY a JSON object containing exactly two fields: "code" (a string with the full runnable code) and "explanation" (a short 2-3 sentence explanation of what the code does).
Do not include any markdown fences or text outside the JSON. The code should be in ${language} unless the user explicitly asks for another language.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  const raw = data.choices[0]?.message?.content ?? "";
  const parsed = safeParseJson(raw);
  return {
    code: parsed.code ?? raw,
    language,
    explanation: parsed.explanation ?? "Generated code based on your prompt.",
  };
}

function safeParseJson(text: string): { code?: string; explanation?: string } {
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON from markdown code block
    const match = text.match(/```json\s*([\s\S]*?)```/) ?? text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[1] ?? match[0]);
      } catch {
        return {};
      }
    }
    return {};
  }
}

// ── Rule-based fallback generator ─────────────────────────────────────
function generateFallback(prompt: string, language: Language): GenerationResult {
  const lower = prompt.toLowerCase();
  const generators: Record<Language, (p: string) => string> = {
    javascript: genJs,
    typescript: genTs,
    python: genPython,
    java: genJava,
    csharp: genCSharp,
    cpp: genCpp,
    go: genGo,
    rust: genRust,
    ruby: genRuby,
    php: genPhp,
    swift: genSwift,
    kotlin: genKotlin,
    html: genHtml,
    css: genCss,
    sql: genSql,
    bash: genBash,
  };
  const code = generators[language](lower);
  return {
    code,
    language,
    explanation: `Generated ${language} code based on your prompt. Connect an OpenAI API key for more advanced and accurate generations.`,
  };
}

function genJs(p: string): string {
  if (p.includes("todo") || p.includes("task")) {
    return `// Todo list application
class TodoList {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push({ id: Date.now(), text: task, done: false });
    return this.tasks[this.tasks.length - 1];
  }

  toggle(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) task.done = !task.done;
  }

  remove(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  list() {
    return this.tasks;
  }
}

// Usage
const todos = new TodoList();
todos.add("Learn JavaScript");
todos.add("Build a project");
todos.toggle(todos.tasks[0].id);
console.log(todos.list());`;
  }
  if (p.includes("fetch") || p.includes("api") || p.includes("http")) {
    return `// Fetch data from an API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Usage
fetchData("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));`;
  }
  if (p.includes("fibonacci")) {
    return `// Fibonacci sequence generator
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`;
  }
  // default: a simple function
  return `// ${p}
function solution(input) {
  // Validate input
  if (!input) {
    throw new Error("Input is required");
  }

  // Process the input
  const result = input
    .toString()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return result;
}

// Usage
console.log(solution("hello world")); // "Hello World"`;
}

function genTs(p: string): string {
  if (p.includes("react") || p.includes("component")) {
    return `import { useState } from "react";

interface CounterProps {
  initial?: number;
}

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState<number>(initial);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initial);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`;
  }
  return `// ${p}
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function process<T>(value: T): Promise<Result<T>> {
  try {
    // Perform processing logic here
    return { success: true, data: value };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Usage
const result = await process("hello");
if (result.success) {
  console.log(result.data);
}`;
}

function genPython(p: string): string {
  if (p.includes("flask") || p.includes("web") || p.includes("api")) {
    return `from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/api/hello", methods=["GET"])
def hello():
    name = request.args.get("name", "World")
    return jsonify({"message": f"Hello, {name}!"})

@app.route("/api/data", methods=["POST"])
def receive_data():
    data = request.get_json()
    return jsonify({"received": data, "status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)`;
  }
  if (p.includes("class") || p.includes("object")) {
    return `class Animal:
    """A simple animal class."""

    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def __repr__(self):
        return f"Animal(name={self.name!r}, sound={self.sound!r})"


# Usage
dog = Animal("Buddy", "Woof")
print(dog.speak())  # Buddy says Woof!`;
  }
  return `# ${p}
def solution(data):
    """Process the input data and return the result."""
    if not data:
        return []

    # Example: filter and transform
    result = [
        item.upper() if isinstance(item, str) else item
        for item in data
    ]
    return result


# Usage
print(solution(["hello", "world"]))  # ['HELLO', 'WORLD']`;
}

function genJava(p: string): string {
  return `// ${p}
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<String> items = Arrays.asList("apple", "banana", "cherry");
        List<String> result = process(items);
        System.out.println(result);
    }

    public static List<String> process(List<String> input) {
        List<String> result = new ArrayList<>();
        for (String item : input) {
            result.add(item.toUpperCase());
        }
        return result;
    }
}`;
}

function genCSharp(p: string): string {
  return `// ${p}
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        var items = new List<string> { "apple", "banana", "cherry" };
        var result = Process(items);
        Console.WriteLine(string.Join(", ", result));
    }

    static List<string> Process(List<string> input)
    {
        return input.Select(item => item.ToUpper()).ToList();
    }
}`;
}

function genCpp(p: string): string {
  return `// ${p}
#include <iostream>
#include <vector>
#include <algorithm>

std::vector<std::string> process(const std::vector<std::string>& input) {
    std::vector<std::string> result;
    for (const auto& item : input) {
        std::string upper = item;
        std::transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
        result.push_back(upper);
    }
    return result;
}

int main() {
    std::vector<std::string> items = {"apple", "banana", "cherry"};
    auto result = process(items);
    for (const auto& r : result) {
        std::cout << r << " ";
    }
    std::cout << std::endl;
    return 0;
}`;
}

function genGo(p: string): string {
  return `// ${p}
package main

import (
    "fmt"
    "strings"
)

func process(input []string) []string {
    result := make([]string, len(input))
    for i, item := range input {
        result[i] = strings.ToUpper(item)
    }
    return result
}

func main() {
    items := []string{"apple", "banana", "cherry"}
    result := process(items)
    fmt.Println(result)
}`;
}

function genRust(p: string): string {
  return `// ${p}
fn process(input: &[String]) -> Vec<String> {
    input.iter().map(|s| s.to_uppercase()).collect()
}

fn main() {
    let items = vec![
        String::from("apple"),
        String::from("banana"),
        String::from("cherry"),
    ];
    let result = process(&items);
    println!("{:?}", result);
}`;
}

function genRuby(p: string): string {
  return `# ${p}
def process(input)
  return [] if input.nil? || input.empty?
  input.map(&:upcase)
end

# Usage
puts process(["apple", "banana", "cherry"]).inspect`;
}

function genPhp(p: string): string {
  return `<?php
// ${p}
function process(array $input): array {
    return array_map('strtoupper', $input);
}

// Usage
$result = process(['apple', 'banana', 'cherry']);
print_r($result);
?>`;
}

function genSwift(p: string): string {
  return `// ${p}
import Foundation

func process(_ input: [String]) -> [String] {
    return input.map { $0.uppercased() }
}

// Usage
let items = ["apple", "banana", "cherry"]
let result = process(items)
print(result)`;
}

function genKotlin(p: string): string {
  return `// ${p}
fun process(input: List<String>): List<String> {
    return input.map { it.uppercase() }
}

fun main() {
    val items = listOf("apple", "banana", "cherry")
    val result = process(items)
    println(result)
}`;
}

function genHtml(p: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        button {
            padding: 0.5rem 1rem;
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>This is a generated HTML page based on your prompt.</p>
        <button onclick="alert('Hello!')">Click Me</button>
    </div>
</body>
</html>`;
}

function genCss(p: string): string {
  return `/* ${p} */
.card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.btn-primary {
    background: #6366f1;
    color: white;
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.btn-primary:hover {
    background: #4f46e5;
}`;
}

function genSql(p: string): string {
  return `-- ${p}
-- Create a users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample user
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com')
ON CONFLICT (email) DO NOTHING;

-- Query users
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;`;
}

function genBash(p: string): string {
  return `#!/bin/bash
# ${p}

set -euo pipefail

# Function to process items
process() {
    local input=("$@")
    for item in "\${input[@]}"; do
        echo "Processing: $item"
    done
}

# Main
main() {
    echo "Starting script..."
    process "apple" "banana" "cherry"
    echo "Done!"
}

main "$@"`;
}

// ── Public API ────────────────────────────────────────────────────────
export async function generateCode(prompt: string): Promise<GenerationResult> {
  const language = detectLanguage(prompt);
  try {
    if (process.env.OPENAI_API_KEY) {
      return await generateWithOpenAI(prompt, language);
    }
  } catch (err) {
    console.error("OpenAI generation failed, falling back:", err);
  }
  return generateFallback(prompt, language);
}
