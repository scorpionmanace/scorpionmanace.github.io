const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/JSONParser-BoG0p2N7.js","assets/vendor-DJ3ZJzoA.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-Bkifly1P.js";
import { j as jsxRuntimeExports, R as React } from "./vendor-DJ3ZJzoA.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CQ-_Kgs3.js";
const JSONParserView = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    padding: "1.25rem",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    maxWidth: "75rem",
    margin: "0 auto",
    background: "white",
    borderRadius: "1rem",
    padding: "1.875rem",
    boxShadow: "0 0.625rem 1.875rem rgba(0, 0, 0, 0.1)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JSONParser, {})
  ] }) });
};
const JSONParser = React.lazy(() => __vitePreload(() => import("./JSONParser-BoG0p2N7.js"), true ? __vite__mapDeps([0,1]) : void 0));
export {
  JSONParserView as default
};
