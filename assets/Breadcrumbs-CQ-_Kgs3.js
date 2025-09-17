import { s as useLocation, u as useBreakpointValue, j as jsxRuntimeExports, B as Box, F as Flex, R as React, L as Link, T as Text } from "./vendor-DJ3ZJzoA.js";
const routeLabels = {
  "/": "Home",
  "/about": "About",
  "/tools": "Development Tools",
  "/json-parser": "JSON Parser"
};
const skipBreadcrumbRoutes = ["/"];
const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  if (skipBreadcrumbRoutes.includes(currentPath)) {
    return null;
  }
  const buildBreadcrumbs = () => {
    const breadcrumbs2 = [];
    const pathSegments = currentPath.split("/").filter(Boolean);
    breadcrumbs2.push({ label: "Home", path: "/" });
    pathSegments.forEach((segment, index) => {
      let accumulatedPath2 = "";
      pathSegments.forEach((segment2, index2) => {
        accumulatedPath2 += `/${segment2}`;
        const label = routeLabels[accumulatedPath2] || segment2.charAt(0).toUpperCase() + segment2.slice(1);
        breadcrumbs2.push({ label, path: accumulatedPath2 });
      });
    });
    return breadcrumbs2;
  };
  const breadcrumbs = buildBreadcrumbs();
  const py = useBreakpointValue({ base: 4, md: 6 });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const paddingX = useBreakpointValue({ base: 2, md: 4 });
  const margin = useBreakpointValue({ base: 2, md: 4 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { as: "nav", py, px: { base: 4, md: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { align: "center", wrap: "wrap", children: breadcrumbs.map((breadcrumb, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { align: "center", children: index < breadcrumbs.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: breadcrumb.path, style: { color: "#3182ce", textDecoration: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        display: "inline-block",
        px: paddingX,
        py: 1,
        borderRadius: "sm",
        _hover: { bg: "#edf2f7" },
        transition: "all 0.2s ease",
        fontSize,
        children: breadcrumb.label
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        fontSize,
        color: "#2d3748",
        fontWeight: "500",
        px: paddingX,
        py: 1,
        children: breadcrumb.label
      }
    ) }),
    index < breadcrumbs.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        mx: margin,
        color: "#a0aec0",
        fontSize,
        children: "/"
      }
    )
  ] }, breadcrumb.path)) }) });
};
export {
  Breadcrumbs as B
};
