import { u as useBreakpointValue, j as jsxRuntimeExports, B as Box, T as Text, H as Heading, L as Link, h as Button } from "./vendor-DJ3ZJzoA.js";
const Home = () => {
  const titleSize = useBreakpointValue({ base: "2.5rem", md: "3.5rem" });
  const subtitleSize = useBreakpointValue({ base: "1.1rem", md: "1.4rem" });
  const bannerPadding = useBreakpointValue({ base: "60px 20px", md: "80px 20px" });
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "repeat(auto-fit, minmax(250px, 1fr))" });
  const iconSize = useBreakpointValue({ base: "2rem", md: "3rem" });
  const cardPadding = useBreakpointValue({ base: 6, md: 8 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Box,
      {
        as: "section",
        bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        p: bannerPadding,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Box,
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              opacity: 0.1,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    fontSize: "3rem",
                    transform: "rotate(15deg)",
                    animation: "float 6s ease-in-out infinite",
                    children: "📱"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    position: "absolute",
                    top: "20%",
                    right: "15%",
                    fontSize: "2.25rem",
                    transform: "rotate(-10deg)",
                    animation: "float 8s ease-in-out infinite reverse",
                    children: "🎮"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    position: "absolute",
                    bottom: "15%",
                    left: "15%",
                    fontSize: "2.625rem",
                    transform: "rotate(25deg)",
                    animation: "float 7s ease-in-out infinite",
                    children: "🛠️"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    fontSize: "2.375rem",
                    transform: "rotate(-20deg)",
                    animation: "float 9s ease-in-out infinite reverse",
                    children: "⚡"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { maxW: "1200px", mx: "auto", position: "relative", zIndex: 1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heading,
              {
                fontSize: titleSize,
                fontWeight: "bold",
                mb: 5,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                children: "Welcome to App Portfolio"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                fontSize: subtitleSize,
                mb: 8,
                maxW: "600px",
                mx: "auto",
                lineHeight: "1.6",
                children: "Discover a collection of innovative applications, engaging games, and powerful development tools. From JSON parsing utilities to interactive experiences, explore our suite of modern web applications built with cutting-edge technologies."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/json-parser", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                bg: "rgba(255, 255, 255, 0.2)",
                border: "2px solid white",
                color: "white",
                px: { base: 8, md: 10 },
                py: { base: 3, md: 4 },
                fontSize: { base: "md", md: "lg" },
                fontWeight: "bold",
                borderRadius: "full",
                _hover: {
                  bg: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)"
                },
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                children: "Explore Tools →"
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { as: "section", py: { base: 16, md: 20 }, px: 5, bg: "#f8f9fa", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { maxW: "1200px", mx: "auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Heading,
        {
          as: "h2",
          textAlign: "center",
          fontSize: { base: "2rem", md: "2.5rem" },
          mb: { base: 12, md: 16 },
          color: "#333",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          children: "What You Can Do"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Box,
        {
          display: "grid",
          gridTemplateColumns,
          gap: { base: 8, md: 10 },
          alignItems: "stretch",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/tools",
                style: { textDecoration: "none", color: "inherit" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Box,
                  {
                    className: "feature-card",
                    bg: "white",
                    p: cardPadding,
                    borderRadius: "lg",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    _hover: {
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                    },
                    transition: "all 0.3s ease",
                    minH: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: iconSize, mb: 5, children: "🔧" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h3", size: "md", color: "#333", mb: 4, children: "Development Tools" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "#666", lineHeight: "1.5", children: "Powerful utilities for developers including JSON parsing, validation tools, and code formatters to streamline your workflow." })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Box,
              {
                className: "feature-card",
                bg: "white",
                p: cardPadding,
                borderRadius: "lg",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                _hover: {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                },
                transition: "all 0.3s ease",
                minH: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: iconSize, mb: 5, children: "🎯" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h3", size: "md", color: "#333", mb: 4, children: "Interactive Applications" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "#666", lineHeight: "1.5", children: "Modern web applications with responsive design, real-time validation, and intuitive user interfaces for enhanced productivity." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Box,
              {
                className: "feature-card",
                bg: "white",
                p: cardPadding,
                borderRadius: "lg",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                _hover: {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                },
                transition: "all 0.3s ease",
                minH: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: iconSize, mb: 5, children: "🚀" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h3", size: "md", color: "#333", mb: 4, children: "Performance Optimized" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "#666", lineHeight: "1.5", children: "Built with modern frameworks and optimized for speed, ensuring fast load times and smooth user experiences across all devices." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Box,
              {
                className: "feature-card",
                bg: "white",
                p: cardPadding,
                borderRadius: "lg",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                _hover: {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                },
                transition: "all 0.3s ease",
                minH: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: iconSize, mb: 5, children: "📊" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h3", size: "md", color: "#333", mb: 4, children: "Data Processing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "#666", lineHeight: "1.5", children: "Advanced data processing capabilities with JSON validation, formatting, and transformation tools for efficient data handling." })
                ]
              }
            )
          ]
        }
      )
    ] }) })
  ] });
};
export {
  Home as default
};
