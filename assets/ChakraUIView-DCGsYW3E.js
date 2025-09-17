import { j as jsxRuntimeExports, B as Box, H as Heading, T as Text, V as VStack, m as CardRoot, n as CardHeader, o as CardBody, h as Button, p as HStack, q as Badge, F as Flex, t as Spinner } from "./vendor-DJ3ZJzoA.js";
const ChakraUIDemo = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { maxW: "4xl", mx: "auto", p: { base: 4, md: 6 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Heading,
      {
        size: { base: "xl", md: "2xl" },
        textAlign: "center",
        mb: { base: 6, md: 8 },
        color: "gray.800",
        px: 2,
        children: "🎨 Chakra UI + Tailwind CSS Demo"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        bg: "blue.50",
        borderLeft: 4,
        borderColor: "blue.500",
        p: { base: 3, md: 4 },
        mb: { base: 6, md: 8 },
        borderRadius: "lg",
        mx: { base: 2, md: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "blue.700", fontSize: { base: "sm", md: "md" }, children: "This demo showcases real Chakra UI components integrated with Tailwind CSS styling" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: { base: 6, md: 8 }, px: { base: 2, md: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { px: { base: 4, md: 6 }, py: { base: 3, md: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heading,
          {
            size: { base: "md", md: "lg" },
            color: "gray.700",
            children: "Basic Components"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { px: { base: 4, md: 6 }, pb: { base: 4, md: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: 3, w: "full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                colorScheme: "blue",
                className: "bg-blue-500 hover:bg-blue-600",
                size: { base: "md", md: "lg" },
                w: { base: "full", md: "auto" },
                children: "Primary Button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                colorScheme: "green",
                className: "bg-green-500 hover:bg-green-600",
                size: { base: "md", md: "lg" },
                w: { base: "full", md: "auto" },
                children: "Success Button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                colorScheme: "red",
                className: "bg-red-500 hover:bg-red-600",
                size: { base: "md", md: "lg" },
                w: { base: "full", md: "auto" },
                children: "Danger Button"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Enter some text...",
              className: "w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an option" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "option3", children: "Option 3" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { px: { base: 4, md: 6 }, py: { base: 3, md: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heading,
          {
            size: { base: "md", md: "lg" },
            color: "gray.700",
            children: "Form Elements"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { px: { base: 4, md: 6 }, pb: { base: 4, md: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "md", md: "lg" }, children: "I agree to the terms and conditions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                color: "gray.700",
                fontWeight: "medium",
                mb: 3,
                fontSize: { base: "md", md: "lg" },
                children: "Choose an option:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: 2, alignItems: "flex-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "radio-group",
                    value: "option1",
                    defaultChecked: true,
                    className: "w-4 h-4 text-blue-600 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "md", md: "lg" }, children: "Option A" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "radio-group",
                    value: "option2",
                    className: "w-4 h-4 text-green-600 focus:ring-green-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "md", md: "lg" }, children: "Option B" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "radio-group",
                    value: "option3",
                    className: "w-4 h-4 text-orange-600 focus:ring-orange-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "md", md: "lg" }, children: "Option C" })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { px: { base: 4, md: 6 }, py: { base: 3, md: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heading,
          {
            size: { base: "md", md: "lg" },
            color: "gray.700",
            children: "Status Indicators"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { px: { base: 4, md: 6 }, pb: { base: 4, md: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HStack, { gap: { base: 2, md: 4 }, wrap: "wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                colorScheme: "green",
                px: { base: 2, md: 3 },
                py: 1,
                borderRadius: "full",
                fontWeight: "medium",
                fontSize: { base: "xs", md: "sm" },
                children: "Success"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                colorScheme: "yellow",
                px: { base: 2, md: 3 },
                py: 1,
                borderRadius: "full",
                fontWeight: "medium",
                fontSize: { base: "xs", md: "sm" },
                children: "Warning"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                colorScheme: "red",
                px: { base: 2, md: 3 },
                py: 1,
                borderRadius: "full",
                fontWeight: "medium",
                fontSize: { base: "xs", md: "sm" },
                children: "Error"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                colorScheme: "blue",
                px: { base: 2, md: 3 },
                py: 1,
                borderRadius: "full",
                fontWeight: "medium",
                fontSize: { base: "xs", md: "sm" },
                children: "Info"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                colorScheme: "purple",
                px: { base: 2, md: 3 },
                py: 1,
                borderRadius: "full",
                fontWeight: "medium",
                fontSize: { base: "xs", md: "sm" },
                children: "New"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Box,
            {
              w: "full",
              bg: "gray.200",
              borderRadius: "lg",
              h: 4,
              className: "bg-gradient-to-r from-green-500 to-blue-600",
              overflow: "hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { h: 4, bg: "blue.500", borderRadius: "lg", w: "75%" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Flex,
            {
              align: "center",
              justify: "center",
              direction: { base: "column", md: "row" },
              gap: { base: 2, md: 4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Spinner,
                  {
                    size: { base: "md", md: "lg" },
                    color: "blue.500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    fontSize: { base: "md", md: "lg" },
                    textAlign: "center",
                    children: "Loading..."
                  }
                )
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Box,
        {
          mt: { base: 8, md: 12 },
          textAlign: "center",
          p: { base: 4, md: 6 },
          bg: "linear-gradient(to right, #EBF8FF, #FAF5FF)",
          borderRadius: "2xl",
          mx: { base: 2, md: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heading,
              {
                size: { base: "md", md: "lg" },
                mb: 4,
                color: "gray.700",
                children: "🚀 Seamless Integration"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                fontSize: { base: "sm", md: "lg" },
                color: "gray.600",
                maxW: "2xl",
                mx: "auto",
                children: "This demo shows how Chakra UI components can be integrated with Tailwind CSS classes for rapid UI development. Both approaches complement each other perfectly!"
              }
            )
          ]
        }
      )
    ] })
  ] });
};
const ChakraUIView = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    padding: "1.25rem",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    maxWidth: "75rem",
    margin: "0 auto",
    background: "white",
    borderRadius: "1rem",
    padding: "1.875rem",
    boxShadow: "0 0.625rem 1.875rem rgba(0, 0, 0, 0.1)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraUIDemo, {}) }) });
};
export {
  ChakraUIView as default
};
