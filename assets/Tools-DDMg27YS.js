import { r as reactExports, j as jsxRuntimeExports, B as Box, H as Heading, T as Text, u as useBreakpointValue, L as Link, q as Badge } from "./vendor-DJ3ZJzoA.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CQ-_Kgs3.js";
const useTools = () => {
  const tools = reactExports.useMemo(() => [
    {
      id: "json-parser",
      name: "JSON Parser",
      description: "Parse, validate, and format JSON data with real-time validation and beautification.",
      icon: "🔧",
      route: "/json-parser",
      category: "Development Tools"
    },
    {
      id: "code-formatter",
      name: "Code Formatter",
      description: "Format and beautify your code across multiple programming languages.",
      icon: "💻",
      route: "#",
      category: "Development Tools"
    },
    {
      id: "data-converter",
      name: "Data Converter",
      description: "Convert between different data formats including JSON, XML, and CSV.",
      icon: "🔄",
      route: "#",
      category: "Data Tools"
    },
    {
      id: "color-picker",
      name: "Color Picker",
      description: "Pick, analyze, and generate color palettes for your projects with CSV and Figma exports.",
      icon: "🎨",
      route: "/color-picker",
      category: "Design Tools"
    },
    {
      id: "chakra-ui",
      name: "Chakra UI Demo",
      description: "Interactive demonstration of Chakra UI components with Tailwind CSS styling.",
      icon: "🧩",
      route: "/chakra-ui",
      category: "Design Tools"
    },
    {
      id: "text-utils",
      name: "Text Utilities",
      description: "Collection of text processing tools including formatting, validation, and transformations.",
      icon: "✏️",
      route: "#",
      category: "Text Tools"
    },
    {
      id: "api-tester",
      name: "API Tester",
      description: "Test and validate REST API endpoints with comprehensive request/response handling.",
      icon: "🌐",
      route: "#",
      category: "Web Tools"
    }
  ], []);
  return { tools };
};
const ToolsHeader = ({ title, subtitle }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { textAlign: "center", mb: { base: 10, md: 12 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Heading,
      {
        as: "h1",
        size: { base: "xl", md: "2xl" },
        color: "#2d3748",
        mb: { base: 4, md: 5 },
        fontWeight: "bold",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        children: title
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        fontSize: { base: "lg", md: "xl" },
        color: "#4a5568",
        maxW: "600px",
        mx: "auto",
        lineHeight: "1.6",
        children: subtitle
      }
    )
  ] });
};
const ToolCard = ({ tool }) => {
  const iconSize = useBreakpointValue({ base: "3rem", md: "3.5rem" });
  const titleSize = useBreakpointValue({ base: "1.25rem", md: "1.5rem" });
  const descSize = useBreakpointValue({ base: "0.9rem", md: "1rem" });
  const paddingValue = useBreakpointValue({ base: 6, md: 8 });
  const categoryFontSize = useBreakpointValue({ base: "0.75rem", md: "0.8rem" });
  const isToolAvailable = tool.route !== "#";
  return isToolAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: tool.route,
      style: { textDecoration: "none", color: "inherit" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Box,
        {
          bg: "white",
          borderRadius: "lg",
          p: paddingValue,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          transition: "all 0.3s ease",
          cursor: "pointer",
          display: "block",
          position: "relative",
          overflow: "hidden",
          _hover: { transform: "translateY(-5px)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                fontSize: iconSize,
                textAlign: "center",
                mb: 4,
                display: "block",
                children: tool.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                bg: "#edf2f7",
                color: "#4a5568",
                px: 3,
                py: 1,
                borderRadius: "full",
                fontSize: categoryFontSize,
                fontWeight: "500",
                mx: "auto",
                display: "block",
                mb: 3,
                children: tool.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                fontSize: titleSize,
                fontWeight: "bold",
                color: "#2d3748",
                textAlign: "center",
                mb: 3,
                children: tool.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                color: "#4a5568",
                fontSize: descSize,
                lineHeight: "1.6",
                textAlign: "center",
                mb: 5,
                children: tool.description
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                textAlign: "center",
                color: "#3182ce",
                fontWeight: "500",
                fontSize: descSize,
                children: "Launch Tool →"
              }
            )
          ]
        }
      )
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      bg: "white",
      borderRadius: "lg",
      p: paddingValue,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e2e8f0",
      transition: "all 0.3s ease",
      cursor: "default",
      display: "block",
      position: "relative",
      overflow: "hidden",
      opacity: 0.7,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Text,
          {
            fontSize: iconSize,
            textAlign: "center",
            mb: 4,
            display: "block",
            children: tool.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            bg: "#edf2f7",
            color: "#4a5568",
            px: 3,
            py: 1,
            borderRadius: "full",
            fontSize: categoryFontSize,
            fontWeight: "500",
            mx: "auto",
            display: "block",
            mb: 3,
            children: tool.category
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Text,
          {
            fontSize: titleSize,
            fontWeight: "bold",
            color: "#2d3748",
            textAlign: "center",
            mb: 3,
            children: tool.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Text,
          {
            color: "#4a5568",
            fontSize: descSize,
            lineHeight: "1.6",
            textAlign: "center",
            mb: 5,
            children: tool.description
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Text,
          {
            textAlign: "center",
            color: "#3182ce",
            fontWeight: "500",
            fontSize: descSize,
            children: "Coming Soon"
          }
        )
      ]
    }
  );
};
const ToolGrid = ({ tools }) => {
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" });
  const gap = useBreakpointValue({ base: "24px", md: "32px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { px: { base: 4, md: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      display: "grid",
      gridTemplateColumns,
      gap,
      children: tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToolCard, { tool }, tool.id))
    }
  ) });
};
const Tools = () => {
  const { tools } = useTools();
  const containerStyle = {
    padding: "3.75rem 1.25rem",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    flex: 1
  };
  const contentStyle = {
    maxWidth: "75rem",
    margin: "0 auto"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0.25rem;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .tool-card:hover::before {
          transform: scaleX(1);
        }

        .tool-card.coming-soon {
          opacity: 0.7;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: contentStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolsHeader,
        {
          title: "Development Tools",
          subtitle: "Explore our comprehensive collection of web development tools designed to streamline your workflow and boost productivity."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolGrid, { tools })
    ] })
  ] });
};
export {
  Tools as default
};
