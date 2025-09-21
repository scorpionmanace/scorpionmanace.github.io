const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/JSONParser-BbqFJwkg.js","assets/vendor-B_PLRQVp.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-VtrfbuVB.js";
import { j as jsxRuntimeExports, R as React } from "./vendor-B_PLRQVp.js";
const JSONParserView = () => {
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
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONParser, {}) }) });
};
const JSONParser = React.lazy(() => __vitePreload(() => import("./JSONParser-BbqFJwkg.js"), true ? __vite__mapDeps([0,1]) : void 0));
export {
  JSONParserView as default
};
