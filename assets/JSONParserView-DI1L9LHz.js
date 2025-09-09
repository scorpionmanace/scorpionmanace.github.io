const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/JSONParser-B12ZB0UN.js","assets/vendor-mYFzaRka.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CXx3addn.js";
import { j as jsxRuntimeExports, R as React } from "./vendor-mYFzaRka.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CByg_1Os.js";
const JSONParserView = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JSONParser, {})
  ] }) });
};
const JSONParser = React.lazy(() => __vitePreload(() => import("./JSONParser-B12ZB0UN.js"), true ? __vite__mapDeps([0,1]) : void 0));
export {
  JSONParserView as default
};
