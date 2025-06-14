import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, Outlet, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Layout, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function LoadingAnimation({ color }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: `animate-spin h-4 w-4 ${color || "text-black"}`,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          }
        )
      ]
    }
  );
}
function ButtonComponent({
  label,
  onClick,
  isLoading = false,
  className = "bg-blue-500 text-white w-full py-1 flex justify-center items-center gap-2 disabled:opacity-50",
  suffix = null,
  isUseLabelLoading = true,
  isSuffixWithLoading = false,
  suffixLoadingSpinnerColor = "text-blue-500",
  dataTestId = "button-component",
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      "data-testid": dataTestId,
      disabled: isLoading,
      className: `rounded-md ${className}`,
      onClick,
      title: label,
      ...rest,
      children: [
        isLoading && isUseLabelLoading && /* @__PURE__ */ jsx(LoadingAnimation, { color: suffixLoadingSpinnerColor }),
        isLoading && isUseLabelLoading ? "Loading..." : label,
        suffix && isSuffixWithLoading && isLoading ? /* @__PURE__ */ jsx(LoadingAnimation, { color: suffixLoadingSpinnerColor }) : suffix
      ]
    }
  );
}
const BASE_URL = "https://api.github.com";
const searchUsers = async (query, limit = 6) => {
  const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=${limit}`);
  if (!response.ok) throw new Error("Failed to search users");
  const data = await response.json();
  return data.items ?? [];
};
const fetchUserRepos = async (reposUrl) => {
  const response = await fetch(reposUrl);
  if (!response.ok) throw new Error("Failed to fetch repos");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};
function InputComponent({ onEnter, className, placeholder, type, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsx(
    "input",
    {
      ...rest,
      placeholder: placeholder || "Enter username",
      className: className || "w-full border px-2 py-1 mb-2",
      type: type || "text",
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter(e.currentTarget.value);
        }
      }
    }
  ) });
}
function CardComponent({ keyId, description, score, title }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-gray-100 p-2 rounded mb-2 shadow-sm  min-h-[80px]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: title }),
          score !== void 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            score,
            /* @__PURE__ */ jsx("span", { children: "⭐" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 pt-1", children: description })
      ]
    },
    keyId
  );
}
function HomeScreen() {
  const limitUser = 6;
  const { register, handleSubmit, watch } = useForm();
  const query = watch("query");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [tempSelectedUser, setTempSelectedUser] = useState(null);
  const onSubmit = useCallback(async (data) => {
    setIsLoading(true);
    setSelectedUser(null);
    setRepos([]);
    if (!data.query) {
      setIsLoading(false);
      return;
    }
    try {
      const jsonResponse = await searchUsers(data.query, limitUser);
      if (jsonResponse == null ? void 0 : jsonResponse.length) {
        setUsers(jsonResponse);
      } else {
        console.warn("No users found for the given query.");
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setIsLoading(false);
  }, []);
  const handleUserSelect = useCallback(async (user) => {
    const loginUsername = user.login;
    const reposUrl = user.repos_url;
    if (tempSelectedUser && tempSelectedUser === loginUsername) {
      setSelectedUser((prev) => prev === loginUsername ? null : loginUsername);
      return;
    } else {
      setTempSelectedUser(null);
    }
    setSelectedUser(loginUsername);
    setIsItemLoading(true);
    try {
      const data = await fetchUserRepos(reposUrl);
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repos:", error);
      setRepos([]);
    }
    setTempSelectedUser(loginUsername);
    setIsItemLoading(false);
  }, [tempSelectedUser]);
  const activeUsers = useMemo(() => {
    const activeUsers2 = users.map((user) => ({
      ...user,
      isActive: selectedUser === user.login
    }));
    return activeUsers2;
  }, [users, selectedUser]);
  return /* @__PURE__ */ jsx("div", { className: "flex p-4 gap-4 bg-gray-100 min-h-screen font-sans container", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 shadow w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsx(
        InputComponent,
        {
          ...register("query"),
          onEnter: () => {
            handleSubmit(onSubmit)();
          }
        }
      ),
      /* @__PURE__ */ jsx(
        ButtonComponent,
        {
          dataTestId: "search-button",
          label: "Search",
          type: "submit",
          isLoading,
          isUseLabelLoading: true,
          suffixLoadingSpinnerColor: "text-white"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      query && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-3 mb-2", children: [
        'Showing users for "',
        query,
        '"'
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: activeUsers.map((user) => /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx(
          ButtonComponent,
          {
            dataTestId: "user-detail-button",
            label: user.login,
            onClick: () => handleUserSelect(user),
            isLoading: isItemLoading && user.isActive,
            className: "w-full border px-2 py-1 flex justify-between items-center bg-white hover:bg-gray-50",
            suffix: /* @__PURE__ */ jsx(
              "i",
              {
                className: `transition-transform duration-300 fi ${user.isActive ? "fi-rs-angle-small-up" : "fi-rs-angle-small-down"} text-md`
              }
            ),
            isSuffixWithLoading: true,
            isUseLabelLoading: false,
            disabled: isItemLoading,
            suffixLoadingSpinnerColor: "text-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: user.isActive && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx("div", { className: "mt-2", children: repos.map((repo) => /* @__PURE__ */ jsx(CardComponent, { keyId: repo.id, description: repo.description, title: repo.name, score: repo.stargazers_count }, repo.id)) })
          },
          user.login
        ) })
      ] }, user.login)) })
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HomeScreen, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-GYH6YEgi.js", "imports": ["/assets/chunk-NL6KNZEE-b53XU3gX.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DMKCHsQ6.js", "imports": ["/assets/chunk-NL6KNZEE-b53XU3gX.js"], "css": ["/assets/root-Bk5AC_nk.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BRFb8RkU.js", "imports": ["/assets/chunk-NL6KNZEE-b53XU3gX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-26ba910e.js", "version": "26ba910e", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
