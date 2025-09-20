import { r as reactExports, j as jsxRuntimeExports, B as Box, V as VStack, H as Heading, T as Text, s as HStack, I as Input, a as Button, v as Textarea } from "./vendor-B_PLRQVp.js";
import { u as useTheme } from "./index-VtrfbuVB.js";
const useApiTester = () => {
  const [request, setRequest] = reactExports.useState({
    method: "GET",
    url: "",
    headers: {},
    body: ""
  });
  const [response, setResponse] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const updateRequest = (key, value) => {
    setRequest((prev) => ({ ...prev, [key]: value }));
  };
  const addHeader = (key, value) => {
    setRequest((prev) => ({
      ...prev,
      headers: { ...prev.headers, [key]: value }
    }));
  };
  const removeHeader = (key) => {
    setRequest((prev) => {
      const newHeaders = { ...prev.headers };
      delete newHeaders[key];
      return { ...prev, headers: newHeaders };
    });
  };
  const sendRequest = async () => {
    if (!request.url) {
      setError("URL is required");
      return;
    }
    setIsLoading(true);
    setError("");
    setResponse(null);
    try {
      const fetchOptions = {
        method: request.method,
        headers: request.headers,
        ...request.method !== "GET" && request.method !== "HEAD" && request.body && {
          body: request.body
        }
      };
      const apiResponse = await fetch(request.url, fetchOptions);
      const responseText = await apiResponse.text();
      const responseHeaders = {};
      apiResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      setResponse({
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        headers: responseHeaders,
        body: responseText
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    request,
    response,
    isLoading,
    error,
    updateRequest,
    addHeader,
    removeHeader,
    sendRequest
  };
};
const APITesterView = () => {
  const {
    request,
    response,
    isLoading,
    error,
    updateRequest,
    addHeader,
    removeHeader,
    sendRequest
  } = useApiTester();
  const [newHeaderKey, setNewHeaderKey] = reactExports.useState("");
  const [newHeaderValue, setNewHeaderValue] = reactExports.useState("");
  const [authType, setAuthType] = reactExports.useState("none");
  const [authValue, setAuthValue] = reactExports.useState("");
  const { currentTheme } = useTheme();
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];
  const handleAddHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      addHeader(newHeaderKey, newHeaderValue);
      setNewHeaderKey("");
      setNewHeaderValue("");
    }
  };
  const handleApplyAuth = () => {
    if (authValue) {
      const headerValue = authType === "bearer" ? `Bearer ${authValue}` : authType === "basic" ? `Basic ${btoa(authValue)}` : "";
      addHeader("Authorization", headerValue);
      setAuthValue("");
    }
  };
  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return currentTheme === "dark" ? "green.400" : "green.500";
    if (status >= 400) return currentTheme === "dark" ? "red.400" : "red.500";
    return currentTheme === "dark" ? "yellow.400" : "yellow.500";
  };
  const getStatusBg = (status) => {
    if (status >= 200 && status < 300) return currentTheme === "dark" ? "green.900" : "green.100";
    if (status >= 400) return currentTheme === "dark" ? "red.900" : "red.100";
    return currentTheme === "dark" ? "yellow.900" : "yellow.100";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { maxW: "75rem", mx: "auto", px: { base: 4, md: 8 }, py: "2rem", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: "2rem", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { textAlign: "center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "2xl", mb: 3, className: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent", children: "HTTP API Tester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "lg", color: currentTheme === "dark" ? "gray.400" : "gray.600", children: "Test REST API endpoints with comprehensive request/response handling" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { bg: currentTheme === "dark" ? "red.900" : "red.100", color: currentTheme === "dark" ? "red.200" : "red.800", p: 4, borderRadius: "lg", w: "full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", children: "Error:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: error })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(HStack, { gap: "2rem", align: "flex-start", w: "full", flexWrap: "wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: "1", minW: "25rem", bg: currentTheme === "dark" ? "gray.800" : "white", p: "1.5rem", rounded: "xl", shadow: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "xl", fontWeight: "bold", mb: "1.5rem", children: "Request Configuration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { mb: "1.5rem", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(HStack, { mb: "1rem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: request.method,
              onChange: (e) => updateRequest("method", e.target.value),
              className: "px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600",
              children: methods.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "option",
                {
                  value: method,
                  className: "text-gray-900 dark:text-white",
                  children: method
                },
                method
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "url",
              placeholder: "https://api.example.com/endpoint",
              value: request.url,
              onChange: (e) => updateRequest("url", e.target.value),
              className: "flex-1"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { mb: "1.5rem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", mb: "0.75rem", children: "Headers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HStack, { mb: 3, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Header Key",
                value: newHeaderKey,
                onChange: (e) => setNewHeaderKey(e.target.value),
                flex: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Header Value",
                value: newHeaderValue,
                onChange: (e) => setNewHeaderValue(e.target.value),
                flex: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { colorScheme: "blue", onClick: handleAddHeader, size: "sm", children: "Add" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { maxH: "12.5rem", overflowY: "auto", children: [
            Object.entries(request.headers).map(([key, value], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", py: 2, px: 3, bg: currentTheme === "dark" ? "gray.700" : "gray.100", rounded: "md", mb: 2, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fontFamily: "mono", fontSize: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                  key,
                  ":"
                ] }),
                " ",
                value
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "xs",
                  colorScheme: "red",
                  variant: "ghost",
                  onClick: () => removeHeader(key),
                  children: "×"
                }
              )
            ] }, idx)),
            Object.keys(request.headers).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: currentTheme === "dark" ? "gray.400" : "gray.500", fontSize: "sm", textAlign: "center", py: "1rem", children: "No headers added" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { mb: "1.5rem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", mb: "0.75rem", children: "Authentication" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { mb: "0.75rem", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: authType,
                onChange: (e) => setAuthType(e.target.value),
                className: "px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", className: "text-gray-900 dark:text-white", children: "None" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bearer", className: "text-gray-900 dark:text-white", children: "Bearer Token" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "basic", className: "text-gray-900 dark:text-white", children: "Basic Auth" })
                ]
              }
            ),
            authType !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: authType === "basic" ? "text" : "password",
                  placeholder: authType === "bearer" ? "Enter bearer token" : "username:password",
                  value: authValue,
                  onChange: (e) => setAuthValue(e.target.value),
                  mb: "0.5rem"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { colorScheme: "purple", onClick: handleApplyAuth, size: "sm", mb: 2, children: "Apply Auth" })
            ] })
          ] })
        ] }),
        ["POST", "PUT", "PATCH"].includes(request.method) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { mb: "1.5rem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", mb: "0.75rem", children: "Request Body" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Enter JSON, XML, or other body content",
              value: request.body,
              onChange: (e) => updateRequest("body", e.target.value),
              rows: 8,
              className: "font-mono text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { textAlign: "right", mb: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            colorScheme: "green",
            onClick: sendRequest,
            disabled: isLoading || !request.url,
            size: "lg",
            children: isLoading ? "Sending..." : "Send Request"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: "1", minW: "25rem", bg: currentTheme === "dark" ? "gray.800" : "white", p: "1.5rem", rounded: "xl", shadow: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "xl", fontWeight: "bold", mb: "1.5rem", children: "Response" }),
        response ? /* @__PURE__ */ jsxRuntimeExports.jsxs(VStack, { gap: "1.5rem", align: "stretch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { textAlign: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Text,
            {
              fontSize: "lg",
              fontWeight: "bold",
              color: getStatusColor(response.status),
              className: `px-4 py-2 rounded-lg inline-block text-center`,
              bg: getStatusBg(response.status),
              children: [
                response.status,
                " ",
                response.statusText
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", mb: "0.75rem", children: "Response Headers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                maxH: "12.5rem",
                overflowY: "auto",
                bg: currentTheme === "dark" ? "gray.700" : "gray.100",
                p: 4,
                rounded: "lg",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "font-mono text-xs", children: Object.entries(response.headers).map(([key, value]) => `${key}: ${value}`).join("\n") })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontWeight: "bold", mb: "0.75rem", children: "Response Body" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                bg: currentTheme === "dark" ? "gray.700" : "gray.100",
                p: 4,
                rounded: "lg",
                maxH: "25rem",
                overflowY: "auto",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "font-mono text-xs whitespace-pre-wrap break-all", children: response.body || "No response body" })
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { textAlign: "center", py: "4rem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: currentTheme === "dark" ? "gray.400" : "gray.500", fontSize: "lg", children: "No response yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: currentTheme === "dark" ? "gray.600" : "gray.400", fontSize: "sm", children: "Send a request to see the response" })
        ] })
      ] })
    ] })
  ] }) });
};
export {
  APITesterView as default
};
