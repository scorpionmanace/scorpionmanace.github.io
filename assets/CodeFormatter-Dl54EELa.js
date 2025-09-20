import { r as reactExports, j as jsxRuntimeExports } from "./vendor-B_PLRQVp.js";
import { u as usePxToRem } from "./usePxToRem-B-taVK49.js";
const languages = [{ "key": "javascript", "name": "JavaScript", "extension": ".js", "sample": "function greetUser(name) {\n  console.log('Hello, ' + name + '!');\n  return true;\n}\n\n// Arrow function\nconst square = (x) => x * x;\n\n// Array operations\nconst numbers = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter(n => n % 2 === 0);\nconst squaredNumbers = evenNumbers.map(square);", "formatter": "javascript" }, { "key": "typescript", "name": "TypeScript", "extension": ".ts", "sample": "interface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n}\n\nclass UserService {\n  private users: User[] = [];\n\n  async addUser(user: User): Promise<boolean> {\n    try {\n      // Validate user data\n      if (!user.name || !user.email) {\n        throw new Error('Name and email are required');\n      }\n\n      // Check for duplicate email\n      const existingUser = this.users.find(u => u.email === user.email);\n      if (existingUser) {\n        return false;\n      }\n\n      this.users.push({\n        ...user,\n        id: this.users.length + 1,\n        isActive: user.isActive ?? true\n      });\n\n      return true;\n    } catch (error) {\n      console.error('Failed to add user:', error);\n      return false;\n    }\n  }\n}\n\nconst userService = new UserService();", "formatter": "typescript" }, { "key": "python", "name": "Python", "extension": ".py", "sample": `import json
from typing import List, Dict, Optional

class StudentManager:
    def __init__(self):
        self.students: List[Dict] = []

    def add_student(self, name: str, age: int, grade: str) -> bool:
        """Add a new student to the system."""
        try:
            student = {
                'id': len(self.students) + 1,
                'name': name,
                'age': age,
                'grade': grade,
                'active': True
            }
            self.students.append(student)
            return True
        except Exception as e:
            print(f"Error adding student: {e}")
            return False

    def get_students_by_grade(self, grade: str) -> List[Dict]:
        """Get all students in a specific grade."""
        return [s for s in self.students if s['grade'] == grade]

    def save_to_json(self, filename: str) -> None:
        """Save students to JSON file."""
        with open(filename, 'w') as f:
            json.dump(self.students, f, indent=4)

def main() -> None:
    manager = StudentManager()

    # Add some students
    students_data = [
        ('Alice Johnson', 16, '10th'),
        ('Bob Smith', 17, '11th'),
        ('Carol Davis', 15, '9th'),
        ('David Wilson', 17, '11th')
    ]

    for name, age, grade in students_data:
        manager.add_student(name, age, grade)

    # Get all 11th graders
    grade_11_students = manager.get_students_by_grade('11th')
    print(f"Grade 11 students: {len(grade_11_students)}")

if __name__ == '__main__':
    main()`, "formatter": "python" }, { "key": "java", "name": "Java", "extension": ".java", "sample": `import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class UserManagementSystem {
    private Map<String, User> users;
    private int nextId;

    public UserManagementSystem() {
        this.users = new HashMap<>();
        this.nextId = 1;
    }

    public static class User {
        private final int id;
        private final String name;
        private final String email;
        private boolean active;

        public User(int id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.active = true;
        }

        // Getters and setters
        public int getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }

        @Override
        public String toString() {
            return String.format("User{id=%d, name='%s', email='%s', active=%b}",
                               id, name, email, active);
        }
    }

    public User createUser(String name, String email) {
        if (name == null || email == null) {
            throw new IllegalArgumentException("Name and email cannot be null");
        }

        // Check for duplicate email
        for (User user : users.values()) {
            if (user.getEmail().equals(email)) {
                throw new IllegalStateException("Email already exists: " + email);
            }
        }

        int userId = nextId++;
        User newUser = new User(userId, name, email);
        users.put(email, newUser);

        return newUser;
    }

    public List<User> getActiveUsers() {
        List<User> activeUsers = new ArrayList<>();
        for (User user : users.values()) {
            if (user.isActive()) {
                activeUsers.add(user);
            }
        }
        return activeUsers;
    }

    public static void main(String[] args) {
        UserManagementSystem system = new UserManagementSystem();

        try {
            User user1 = system.createUser("John Doe", "john.doe@example.com");
            User user2 = system.createUser("Jane Smith", "jane.smith@example.com");

            System.out.println("Created users:");
            System.out.println(user1);
            System.out.println(user2);

            List<User> activeUsers = system.getActiveUsers();
            System.out.println("\\nActive users count: " + activeUsers.size());

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`, "formatter": "java" }];
const languagesData = {
  languages
};
const useCodeFormatter = () => {
  const languages2 = reactExports.useMemo(() => languagesData.languages, []);
  const [selectedLanguage, setSelectedLanguage] = reactExports.useState(null);
  const [codeInput, setCodeInput] = reactExports.useState("");
  const [formattedCode, setFormattedCode] = reactExports.useState("");
  const [isFormatting, setIsFormatting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (languages2.length > 0 && !selectedLanguage) {
      loadSample(languages2[0]);
    }
  }, [languages2]);
  const formatCode = reactExports.useCallback(async () => {
    if (!selectedLanguage) return;
    setIsFormatting(true);
    setError("");
    try {
      const formatted = await getFormatter(selectedLanguage, codeInput);
      setFormattedCode(formatted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Formatting failed";
      setError(errorMessage);
      setFormattedCode(codeInput);
    } finally {
      setIsFormatting(false);
    }
  }, [selectedLanguage, codeInput]);
  const loadSample = reactExports.useCallback((language) => {
    setSelectedLanguage(language);
    setCodeInput(language.sample);
    setFormattedCode("");
    setError("");
  }, []);
  const copyToClipboard = reactExports.useCallback(async () => {
    try {
      const textToCopy = formattedCode || codeInput;
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } catch (error2) {
      console.error("Failed to copy to clipboard:", error2);
      return false;
    }
  }, [formattedCode, codeInput]);
  const getLanguage = reactExports.useCallback((key) => {
    return languages2.find((lang) => lang.key === key);
  }, [languages2]);
  const quickSamples = reactExports.useMemo(() => languages2.slice(0, 6), [languages2]);
  return {
    // State
    languages: languages2,
    selectedLanguage,
    codeInput,
    formattedCode,
    isFormatting,
    error,
    // Actions
    setCodeInput,
    formatCode,
    loadSample,
    copyToClipboard,
    getLanguage,
    // Utilities
    quickSamples,
    canFormat: selectedLanguage && codeInput.trim().length > 0,
    canCopy: (formattedCode || codeInput).trim().length > 0
  };
};
const getFormatter = async (language, code) => {
  switch (language.formatter) {
    case "javascript":
    case "typescript":
      return formatJavaScriptTypeScript(code, language.formatter);
    case "python":
      return formatPython(code);
    case "java":
      return formatJava(code);
    case "csharp":
      return formatCSharp(code);
    case "cpp":
      return formatCpp(code);
    case "go":
      return formatGo(code);
    case "rust":
      return formatRust(code);
    case "php":
      return formatPHP(code);
    case "ruby":
      return formatRuby(code);
    case "sql":
      return formatSQL(code);
    case "json":
      return formatJSON(code);
    case "css":
      return formatCSS(code);
    case "html":
      return formatHTML(code);
    case "xml":
      return formatXML(code);
    default:
      throw new Error(`Unsupported language: ${language.formatter}`);
  }
};
const formatJavaScriptTypeScript = async (code, type) => {
  try {
    let formatted = code;
    formatted = formatted.split("\n").map((line, index, lines) => {
      const trimLine = line.trim();
      if (!trimLine) return "";
      let indentLevel = 0;
      for (let i = 0; i < lines.length && i < index; i++) {
        const prevTrim = lines[i].trim();
        if (prevTrim && (prevTrim.includes("{") || prevTrim.includes("(") && !prevTrim.includes(")"))) {
          indentLevel++;
        }
        if (prevTrim.includes("}") || prevTrim.includes(")") && !prevTrim.includes("(")) {
          indentLevel--;
        }
      }
      return "  ".repeat(Math.max(0, indentLevel)) + trimLine;
    }).join("\n");
    formatted = formatted.replace(/([^=!])=([^=])/g, "$1 = $2").replace(/([^=!])<([^<=])/g, "$1 < $2").replace(/([^=!])>([^>=])/g, "$1 > $2").replace(/([^=!])<=([^=])/g, "$1 <= $2").replace(/([^=!])>=([^=])/g, "$1 >= $2").replace(/([^=!])==([^=])/g, "$1 == $2").replace(/([^=!])!=([^=])/g, "$1 != $2");
    formatted = formatted.split("\n").map((line) => line.trimRight()).join("\n");
    return formatted;
  } catch (error) {
    throw new Error("JavaScript/TypeScript formatting failed");
  }
};
const formatPython = async (code) => {
  try {
    let formatted = code;
    formatted = formatted.split("\n").map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      const indentLevel = Math.max(0, (line.length - line.trimLeft().length) / 4);
      return "    ".repeat(indentLevel) + trimmed;
    }).join("\n");
    formatted = formatted.replace(/\n\s*\n\s*\n/g, "\n\n");
    return formatted;
  } catch (error) {
    throw new Error("Python formatting failed");
  }
};
const formatJava = async (code) => {
  try {
    let formatted = code;
    formatted = formatted.split("\n").map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      let indentLevel = 0;
      for (let i = 0; i < line.length; i++) {
        if (line.includes("{")) indentLevel++;
        else if (line.includes("}")) indentLevel--;
      }
      return "    ".repeat(Math.max(0, indentLevel)) + trimmed;
    }).join("\n");
    return formatted;
  } catch (error) {
    throw new Error("Java formatting failed");
  }
};
const formatCSharp = async (code) => code;
const formatCpp = async (code) => code;
const formatGo = async (code) => code;
const formatRust = async (code) => code;
const formatPHP = async (code) => code;
const formatRuby = async (code) => code;
const formatSQL = async (code) => code;
const formatJSON = async (code) => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};
const formatCSS = async (code) => {
  try {
    let formatted = code;
    formatted = formatted.split("\n").map((line) => {
      const trimmed = line.trim();
      if (trimmed === "" || trimmed.includes("{") || trimmed.includes("}") || trimmed.includes("@media")) {
        return trimmed;
      }
      return "  " + trimmed;
    }).join("\n").replace(/\n\n\n+/g, "\n\n");
    formatted = formatted.replace(/([^:]):([^])/g, "$1: $2");
    return formatted;
  } catch (error) {
    throw new Error("CSS formatting failed");
  }
};
const formatHTML = async (code) => code;
const formatXML = async (code) => code;
const CodeFormatter = () => {
  const { pxToRem } = usePxToRem();
  const textareaRef = reactExports.useRef(null);
  const {
    languages: languages2,
    selectedLanguage,
    codeInput,
    formattedCode,
    isFormatting,
    error,
    setCodeInput,
    formatCode,
    loadSample,
    copyToClipboard
  } = useCodeFormatter();
  const containerPadding = pxToRem(20);
  const gapSpacing = pxToRem(16);
  const inputPadding = pxToRem(12);
  const buttonPadding = pxToRem(12);
  const borderRadius = pxToRem(8);
  const minHeight = pxToRem(150);
  const fontSizeTitle = pxToRem(24);
  const sectionMarginBottom = pxToRem(24);
  const codeToFormat = reactExports.useMemo(() => {
    return formattedCode || codeInput;
  }, [formattedCode, codeInput]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: containerPadding
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    maxWidth: pxToRem(1e3),
    margin: "0 auto",
    background: "white",
    borderRadius,
    padding: containerPadding,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      textAlign: "center",
      marginBottom: sectionMarginBottom,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)",
        height: pxToRem(6),
        width: pxToRem(100),
        borderRadius
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
        fontSize: fontSizeTitle,
        fontWeight: "bold",
        color: "#2d3748",
        marginBottom: pxToRem(16)
      }, children: "🛠 Multi-Language Code Formatter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        color: "#718096",
        fontSize: "1.1rem",
        marginBottom: pxToRem(20)
      }, children: "Format and beautify code for popular programming languages including JavaScript, TypeScript, Python, Java, Go, C++, CSS, and JSON" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        gap: gapSpacing,
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: sectionMarginBottom
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          fontSize: "0.9rem",
          color: "#4a5568",
          fontWeight: "500"
        }, children: "Load samples:" }),
        languages2.slice(0, 6).map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => loadSample(lang),
            style: {
              padding: `${pxToRem(4)} ${pxToRem(8)}`,
              background: (selectedLanguage == null ? void 0 : selectedLanguage.key) === lang.key ? "#3b82f6" : "#f3f4f6",
              color: (selectedLanguage == null ? void 0 : selectedLanguage.key) === lang.key ? "white" : "#374151",
              border: "none",
              borderRadius: pxToRem(4),
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s"
            },
            children: lang.name
          },
          lang.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginBottom: sectionMarginBottom
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
        display: "block",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#374151",
        marginBottom: pxToRem(8)
      }, children: "Select Programming Language:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: (selectedLanguage == null ? void 0 : selectedLanguage.key) || "",
          onChange: (e) => {
            const lang = languages2.find((l) => l.key === e.target.value);
            if (lang) loadSample(lang);
          },
          style: {
            width: "100%",
            padding: inputPadding,
            border: "1px solid #d1d5db",
            borderRadius,
            fontSize: "1rem",
            backgroundColor: "white"
          },
          children: languages2.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: lang.key, children: [
            lang.name,
            " (",
            lang.extension,
            ")"
          ] }, lang.key))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginBottom: sectionMarginBottom
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
        display: "block",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#374151",
        marginBottom: pxToRem(8)
      }, children: "Code to Format:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: textareaRef,
          value: codeInput,
          onChange: (e) => setCodeInput(e.target.value),
          style: {
            width: "100%",
            minHeight,
            padding: inputPadding,
            border: "1px solid #d1d5db",
            borderRadius,
            fontSize: "0.9rem",
            fontFamily: "Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace",
            resize: "vertical",
            backgroundColor: "#f8f9fa"
          },
          placeholder: "Paste your code here to format it..."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      gap: gapSpacing,
      marginBottom: sectionMarginBottom
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: formatCode,
          disabled: isFormatting,
          style: {
            padding: buttonPadding,
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius,
            fontSize: "1rem",
            fontWeight: "500",
            cursor: isFormatting ? "not-allowed" : "pointer",
            opacity: isFormatting ? 0.6 : 1,
            flex: "1",
            transition: "all 0.2s"
          },
          children: isFormatting ? "🔄 Formatting..." : `✨ Format ${(selectedLanguage == null ? void 0 : selectedLanguage.name) || "Code"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: copyToClipboard,
          disabled: !codeToFormat.trim(),
          style: {
            padding: buttonPadding,
            backgroundColor: !codeToFormat.trim() ? "#d1d5db" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius,
            fontSize: "1rem",
            fontWeight: "500",
            cursor: !codeToFormat.trim() ? "not-allowed" : "pointer",
            flex: "1",
            transition: "all 0.2s"
          },
          children: "📋 Copy Formatted Code"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      padding: pxToRem(12),
      borderRadius,
      marginBottom: sectionMarginBottom,
      border: "1px solid #fecaca"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Error:" }),
      " ",
      error
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
        display: "block",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#374151",
        marginBottom: pxToRem(8)
      }, children: "Formatted Code:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        padding: inputPadding,
        borderRadius,
        overflow: "auto",
        fontFamily: "Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace",
        fontSize: "0.8rem",
        lineHeight: "1.5",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all"
      }, children: codeToFormat })
    ] })
  ] }) });
};
export {
  CodeFormatter as default
};
