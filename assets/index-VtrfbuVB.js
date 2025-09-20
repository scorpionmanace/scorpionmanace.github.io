const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-6BvfilQy.js","assets/vendor-B_PLRQVp.js","assets/About-B0ZIsJfp.js","assets/usePxToRem-B-taVK49.js","assets/JSONParserView-BBkAT5dz.js","assets/ColorPickerView-DA-wG3Yl.js","assets/DataConverterView-8wOZp3i_.js","assets/Tools-vDisFMVr.js","assets/ChakraUIView-CIknvjo_.js","assets/CodeFormatter-Dl54EELa.js","assets/CodePlayground-DVPKlvSy.js","assets/APITesterView-BrUWeBsI.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, u as useBreakpointValue, B as Box, F as Flex, L as Link, T as Text, a as Button, b as useLocation, H as Heading, c as Link$1, R as React, d as Routes, e as Route, f as createSystem, g as clientExports, C as ChakraProvider, h as HashRouter, i as defaultConfig } from "./vendor-B_PLRQVp.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const ThemeContext = reactExports.createContext(void 0);
const useTheme = () => {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = reactExports.useState("system");
  const [currentTheme, setCurrentTheme] = reactExports.useState("light");
  const [isInitialized, setIsInitialized] = reactExports.useState(false);
  const updateCurrentTheme = (newTheme) => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let resolvedTheme;
    if (newTheme === "system") {
      resolvedTheme = prefersDark ? "dark" : "light";
    } else {
      resolvedTheme = newTheme;
    }
    setCurrentTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };
  reactExports.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (savedTheme === "system") {
        updateCurrentTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    updateCurrentTheme(savedTheme);
    setIsInitialized(true);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  reactExports.useEffect(() => {
    updateCurrentTheme(theme);
  }, [theme]);
  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const value = {
    theme,
    currentTheme,
    isInitialized,
    setTheme,
    toggleTheme
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
};
const logo = "data:image/svg+xml,%3csvg%20id='Layer_1'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2087.5%20100'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%231697f6;}.cls-2{fill:%237bc6ff;}.cls-3{fill:%231867c0;}.cls-4{fill:%23aeddff;}%3c/style%3e%3c/defs%3e%3ctitle%3eArtboard%2046%3c/title%3e%3cpolyline%20class='cls-1'%20points='43.75%200%2023.31%200%2043.75%2048.32'/%3e%3cpolygon%20class='cls-2'%20points='43.75%2062.5%2043.75%20100%200%2014.58%2022.92%2014.58%2043.75%2062.5'/%3e%3cpolyline%20class='cls-3'%20points='43.75%200%2064.19%200%2043.75%2048.32'/%3e%3cpolygon%20class='cls-4'%20points='64.58%2014.58%2087.5%2014.58%2043.75%20100%2043.75%2062.5%2064.58%2014.58'/%3e%3c/svg%3e";
const Header = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const logoSize = useBreakpointValue({ base: "30px", md: "40px" });
  const titleSize = useBreakpointValue({ base: "1.2rem", md: "1.5rem" });
  const padding = useBreakpointValue({ base: "1rem", md: "1rem 2rem" });
  const headerGradient = currentTheme === "dark" ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)" : "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      as: "header",
      bg: headerGradient,
      boxShadow: currentTheme === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.15)",
      p: padding,
      className: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { alignItems: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", style: { textDecoration: "none", display: "flex", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logo,
              alt: "Logo",
              style: {
                width: logoSize,
                height: logoSize,
                marginRight: useBreakpointValue({ base: "12px", md: "16px" })
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              fontSize: titleSize,
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
              children: "Karan Khare"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: toggleTheme,
            size: "sm",
            variant: "outline",
            colorScheme: "whiteAlpha",
            _hover: { bg: "whiteAlpha.200" },
            display: { base: "none", md: "inline-flex" },
            children: currentTheme === "light" ? "🌙" : "☀️"
          }
        )
      ]
    }
  );
};
const SubHeader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { style: {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderBottom: "1px solid #dee2e6",
    padding: "0.75rem 2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: {
    display: "flex",
    listStyle: "none",
    margin: "0",
    padding: "0",
    gap: "3rem"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        style: {
          color: "#2d3748",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          transition: "all 0.3s ease",
          display: "block"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "#e2e8f0";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        },
        children: "🏠 Home"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/tools",
        style: {
          color: "#2d3748",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          transition: "all 0.3s ease",
          display: "block"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "#e2e8f0";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        },
        children: "🔧 Development Tools"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/about",
        style: {
          color: "#2d3748",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          transition: "all 0.3s ease",
          display: "block"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "#e2e8f0";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        },
        children: "📄 About"
      }
    ) })
  ] }) }) });
};
const usePxToRem = () => {
  const pxToRem = (px, base = 16) => {
    let pixelValue;
    if (typeof px === "string") {
      pixelValue = parseFloat(px.replace(/px$/, ""));
      if (isNaN(pixelValue)) {
        throw new Error(`Invalid px value: ${px}`);
      }
    } else {
      pixelValue = px;
    }
    const remValue = pixelValue / base;
    const rounded = Math.round(remValue * 1e4) / 1e4;
    return `${rounded}rem`;
  };
  const pxToRemBatch = (pixels, base = 16) => {
    if (!Array.isArray(pixels)) {
      return pxToRem(pixels, base);
    }
    return pixels.map((pixel) => pxToRem(pixel, base));
  };
  const remToPx = (rem, base = 16) => {
    let remValue;
    if (typeof rem === "string") {
      remValue = parseFloat(rem.replace(/rem$/, ""));
      if (isNaN(remValue)) {
        throw new Error(`Invalid rem value: ${rem}`);
      }
    } else {
      remValue = rem;
    }
    return remValue * base;
  };
  const getRootFontSize = () => {
    if (typeof window !== "undefined") {
      const computedStyle = getComputedStyle(document.documentElement);
      return parseFloat(computedStyle.fontSize);
    }
    return 16;
  };
  return {
    pxToRem,
    pxToRemBatch,
    remToPx,
    getRootFontSize
  };
};
const ROUTE_LABELS = {
  "/": "Home",
  "/about": "About",
  "/tools": "Development Tools",
  "/json-parser": "JSON Parser",
  "/color-picker": "Color Picker",
  "/code-formatter": "Code Formatter",
  "/code-playground": "Code Playground",
  "/chakra-ui": "Chakra UI Demo",
  "/data-converter": "Data Converter",
  "/text-utils": "Text Utilities",
  "/api-tester": "API Tester"
};
const SKIP_BREADCRUMB_ROUTES = ["/"];
const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { pxToRem } = usePxToRem();
  const { currentTheme, isInitialized } = useTheme();
  if (!isInitialized) {
    return null;
  }
  const shouldShowBreadcrumbs = reactExports.useMemo(() => {
    return !SKIP_BREADCRUMB_ROUTES.includes(currentPath);
  }, [currentPath]);
  const TOOL_ROUTES = [
    "/json-parser",
    "/color-picker",
    "/code-formatter",
    "/code-playground",
    "/chakra-ui",
    "/data-converter",
    "/api-tester"
  ];
  const breadcrumbs = reactExports.useMemo(() => {
    if (currentPath === "/") return [];
    const breadcrumbItems = [
      { label: "Home", path: "/", isActive: false }
    ];
    const isToolRoute = TOOL_ROUTES.includes(currentPath);
    if (isToolRoute && currentPath !== "/tools") {
      breadcrumbItems.push({
        label: "Development Tools",
        path: "/tools",
        isActive: false
      });
    }
    const isActive = true;
    const label = ROUTE_LABELS[currentPath] || currentPath.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    breadcrumbItems.push({
      label,
      path: "",
      isActive
    });
    return breadcrumbItems;
  }, [currentPath]);
  if (!shouldShowBreadcrumbs || breadcrumbs.length === 0) {
    return null;
  }
  const navBackgroundColor = currentTheme === "dark" ? "gray.800" : "#f8fafc";
  const navBorderColor = currentTheme === "dark" ? "gray.700" : "#e2e8f0";
  const separatorColor = currentTheme === "dark" ? "#6b7280" : "#94a3b8";
  const activeTextColor = currentTheme === "dark" ? "#d1d5db" : "#1e293b";
  const activeBgColor = currentTheme === "dark" ? "#374151" : "#f1f5f9";
  const linkColor = currentTheme === "dark" ? "#60a5fa" : "#3b82f6";
  const hoverBgColor = currentTheme === "dark" ? "#264b7e" : "#eff6ff";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Breadcrumb",
      style: {
        padding: `${pxToRem(16)} ${pxToRem(24)}`,
        backgroundColor: navBackgroundColor,
        borderBottom: `1px solid ${navBorderColor}`,
        transition: "background-color 0.3s ease, border-color 0.3s ease"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "ol",
        {
          style: {
            display: "flex",
            listStyle: "none",
            padding: 0,
            margin: "0 auto",
            alignItems: "center",
            fontSize: pxToRem(14),
            maxWidth: pxToRem(1200)
          },
          children: breadcrumbs.map((breadcrumb, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { display: "flex", alignItems: "center" }, children: [
            index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  margin: `0 ${pxToRem(8)}`,
                  color: separatorColor,
                  fontSize: pxToRem(12),
                  userSelect: "none"
                },
                "aria-hidden": "true",
                children: "›"
              }
            ),
            breadcrumb.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  color: activeTextColor,
                  fontWeight: "600",
                  padding: `${pxToRem(6)} ${pxToRem(12)}`,
                  borderRadius: pxToRem(6),
                  backgroundColor: activeBgColor,
                  cursor: "default"
                },
                "aria-current": "page",
                children: breadcrumb.label
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: breadcrumb.path,
                style: {
                  color: linkColor,
                  textDecoration: "none",
                  padding: `${pxToRem(6)} ${pxToRem(12)}`,
                  borderRadius: pxToRem(6),
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = hoverBgColor;
                  e.currentTarget.style.textDecoration = "underline";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.textDecoration = "none";
                },
                children: breadcrumb.label
              }
            )
          ] }, breadcrumb.path || breadcrumb.label))
        }
      )
    }
  );
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" });
  const spacing = useBreakpointValue({ base: "2rem", md: "3rem" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      as: "footer",
      bg: "#2d3748",
      color: "#a0aec0",
      px: { base: 4, md: 8 },
      py: { base: 8, md: 12 },
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mt: "auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { maxW: "1200px", mx: "auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            display: "grid",
            gridTemplateColumns,
            gap: spacing,
            alignItems: "start",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heading,
                  {
                    size: { base: "md", md: "lg" },
                    color: "#e2e8f0",
                    mb: { base: 4, md: 4 },
                    children: "App Portfolio"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    fontSize: { base: "sm", md: "md" },
                    lineHeight: "1.6",
                    mb: { base: 4, md: 0 },
                    children: "A collection of innovative web applications, games, and development tools built with modern technologies and best practices."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heading,
                  {
                    size: { base: "sm", md: "md" },
                    color: "#e2e8f0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: { base: 4, md: 4 },
                    children: "Quick Links"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { display: "flex", flexDirection: "column", gap: { base: 2, md: 2 }, children: [
                  { href: "#home", text: "Home" },
                  { href: "#tools", text: "Development Tools" },
                  { href: "#about", text: "About" },
                  { href: "#contact", text: "Contact" }
                ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link$1,
                  {
                    href: link.href,
                    color: "#a0aec0",
                    textDecoration: "none",
                    fontSize: { base: "sm", md: "md" },
                    _hover: { color: "#e2e8f0" },
                    transition: "color 0.3s ease",
                    children: link.text
                  },
                  link.href
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heading,
                  {
                    size: { base: "sm", md: "md" },
                    color: "#e2e8f0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: { base: 4, md: 4 },
                    children: "Built With"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: { base: 2, md: 2 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "sm", md: "md" }, children: "⚛️ React & TypeScript" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "sm", md: "md" }, children: "⚡ Vite & Modern Tools" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "sm", md: "md" }, children: "🎨 Styled Components" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: { base: "sm", md: "md" }, children: "🌐 Web Standards" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            mt: { base: 8, md: 16 },
            pt: 6,
            borderTop: "1px solid #4a5568",
            textAlign: "center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Text,
              {
                fontSize: { base: "xs", md: "sm" },
                color: "#718096",
                children: [
                  "© ",
                  currentYear,
                  " App Portfolio. Built with ❤️ using modern web technologies."
                ]
              }
            )
          }
        )
      ] })
    }
  );
};
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/"
      });
      console.log("[SW] Service worker registered successfully:", registration);
      registration.addEventListener("updatefound", () => {
        console.log("[SW] New service worker found, installing...");
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("[SW] New version available! Refresh page to activate.");
              showUpdateNotification();
            } else {
              console.log("[SW] Service worker installed for the first time");
            }
          }
        });
      });
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("[SW] Service worker registration failed:", error);
    }
  }
};
const showUpdateNotification = () => {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #2ecc71;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    z-index: 10000;
    cursor: pointer;
    transition: opacity 0.3s ease;
  `;
  notification.innerHTML = "⚡ App updated! Click to refresh";
  notification.onclick = () => {
    var _a;
    (_a = navigator.serviceWorker.controller) == null ? void 0 : _a.postMessage({ type: "SKIP_WAITING" });
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  };
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }
  }, 1e4);
  document.body.appendChild(notification);
};
const Home = React.lazy(() => __vitePreload(() => import("./Home-6BvfilQy.js"), true ? __vite__mapDeps([0,1]) : void 0));
const About = React.lazy(() => __vitePreload(() => import("./About-B0ZIsJfp.js").then((n) => n.A), true ? __vite__mapDeps([2,1,3]) : void 0));
const JSONParserView = React.lazy(() => __vitePreload(() => import("./JSONParserView-BBkAT5dz.js"), true ? __vite__mapDeps([4,1]) : void 0));
const ColorPickerView = React.lazy(() => __vitePreload(() => import("./ColorPickerView-DA-wG3Yl.js"), true ? __vite__mapDeps([5,1,3]) : void 0));
const DataConverterView = React.lazy(() => __vitePreload(() => import("./DataConverterView-8wOZp3i_.js"), true ? __vite__mapDeps([6,1]) : void 0));
const Tools = React.lazy(() => __vitePreload(() => import("./Tools-vDisFMVr.js"), true ? __vite__mapDeps([7,1]) : void 0));
const ChakraUIView = React.lazy(() => __vitePreload(() => import("./ChakraUIView-CIknvjo_.js"), true ? __vite__mapDeps([8,1]) : void 0));
const CodeFormatter = React.lazy(() => __vitePreload(() => import("./CodeFormatter-Dl54EELa.js"), true ? __vite__mapDeps([9,1,3]) : void 0));
const CodePlayground = React.lazy(() => __vitePreload(() => import("./CodePlayground-DVPKlvSy.js"), true ? __vite__mapDeps([10,1,3]) : void 0));
const APITesterView = React.lazy(() => __vitePreload(() => import("./APITesterView-BrUWeBsI.js"), true ? __vite__mapDeps([11,1]) : void 0));
const App = () => {
  reactExports.useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { role: "banner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Secondary navigation", role: "navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeader, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb navigation", role: "navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        id: "main-content",
        className: "flex-1 flex flex-col",
        role: "main",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 flex items-center justify-center min-h-[400px] dark:bg-gray-900",
            "aria-live": "polite",
            "aria-label": "Loading application content",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 bg-white dark:bg-gray-800 border rounded-lg shadow-lg text-center transition-colors", role: "status", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sr-only", children: "Loading Karan Khare's development portfolio and tools..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "Loading..." })
            ] })
          }
        ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/about", element: /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/json-parser", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONParserView, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/color-picker", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPickerView, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/data-converter", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DataConverterView, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/api-tester", element: /* @__PURE__ */ jsxRuntimeExports.jsx(APITesterView, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/code-formatter", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeFormatter, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/code-playground", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CodePlayground, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/tools", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Tools, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/chakra-ui", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraUIView, {}) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { role: "contentinfo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}) })
  ] }) });
};
const system = createSystem(defaultConfig);
const container = document.getElementById("root");
if (!container) {
  console.error("Failed to find the root element");
} else {
  console.log("Found root element, mounting React app");
  const root = clientExports.createRoot(container);
  console.log("Main.tsx executed, mounting React app");
  try {
    root.render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraProvider, { value: system, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HashRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) })
    );
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error during React render:", error);
  }
}
export {
  __vitePreload as _,
  useTheme as u
};
