const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-C9nhDCf4.js","assets/vendor-DJ3ZJzoA.js","assets/About-SROtK13U.js","assets/Breadcrumbs-CQ-_Kgs3.js","assets/usePxToRem-B-taVK49.js","assets/JSONParserView-DH_ENsAS.js","assets/ColorPickerView-B_V8FHrv.js","assets/Tools-DDMg27YS.js","assets/ChakraUIView-DCGsYW3E.js"])))=>i.map(i=>d[i]);
import { u as useBreakpointValue, j as jsxRuntimeExports, B as Box, F as Flex, L as Link, T as Text, H as Heading, a as Link$1, R as React, r as reactExports, b as Routes, c as Route, d as createSystem, e as clientExports, C as ChakraProvider, f as HashRouter, g as defaultConfig } from "./vendor-DJ3ZJzoA.js";
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
const logo = "data:image/svg+xml,%3csvg%20id='Layer_1'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2087.5%20100'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%231697f6;}.cls-2{fill:%237bc6ff;}.cls-3{fill:%231867c0;}.cls-4{fill:%23aeddff;}%3c/style%3e%3c/defs%3e%3ctitle%3eArtboard%2046%3c/title%3e%3cpolyline%20class='cls-1'%20points='43.75%200%2023.31%200%2043.75%2048.32'/%3e%3cpolygon%20class='cls-2'%20points='43.75%2062.5%2043.75%20100%200%2014.58%2022.92%2014.58%2043.75%2062.5'/%3e%3cpolyline%20class='cls-3'%20points='43.75%200%2064.19%200%2043.75%2048.32'/%3e%3cpolygon%20class='cls-4'%20points='64.58%2014.58%2087.5%2014.58%2043.75%20100%2043.75%2062.5%2064.58%2014.58'/%3e%3c/svg%3e";
const Header = () => {
  const logoSize = useBreakpointValue({ base: "30px", md: "40px" });
  const titleSize = useBreakpointValue({ base: "1.2rem", md: "1.5rem" });
  const padding = useBreakpointValue({ base: "1rem", md: "1rem 2rem" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      as: "header",
      bg: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      p: padding,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { alignItems: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", style: { textDecoration: "none", display: "flex", alignItems: "center" }, children: [
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
      ] }) })
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
const Home = React.lazy(() => __vitePreload(() => import("./Home-C9nhDCf4.js"), true ? __vite__mapDeps([0,1]) : void 0));
const About = React.lazy(() => __vitePreload(() => import("./About-SROtK13U.js").then((n) => n.A), true ? __vite__mapDeps([2,1,3,4]) : void 0));
const JSONParserView = React.lazy(() => __vitePreload(() => import("./JSONParserView-DH_ENsAS.js"), true ? __vite__mapDeps([5,1,3]) : void 0));
const ColorPickerView = React.lazy(() => __vitePreload(() => import("./ColorPickerView-B_V8FHrv.js"), true ? __vite__mapDeps([6,1,4]) : void 0));
const Tools = React.lazy(() => __vitePreload(() => import("./Tools-DDMg27YS.js"), true ? __vite__mapDeps([7,1,3]) : void 0));
const ChakraUIView = React.lazy(() => __vitePreload(() => import("./ChakraUIView-DCGsYW3E.js"), true ? __vite__mapDeps([8,1]) : void 0));
const App = () => {
  reactExports.useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center"
    }, children: "Loading..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/about", element: /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/json-parser", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONParserView, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/color-picker", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPickerView, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/tools", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Tools, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/chakra-ui", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraUIView, {}) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
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
  __vitePreload as _
};
