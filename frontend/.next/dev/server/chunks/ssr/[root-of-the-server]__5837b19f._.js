module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/services/strapi.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHomePageData",
    ()=>getHomePageData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
async function getHomePageData() {
    const query = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify({
        populate: {
            blocks: {
                // Sintaxis especial de Strapi v5 para Zonas Dinámicas
                on: {
                    // AQUÍ ES IMPORTANTE: Debes usar el UID de tu componente.
                    // Formato: 'categoria.nombre_componente'
                    // Basado en tu imagen anterior, tu categoría es 'Herosection' y el nombre 'hero_section'
                    'blocks.hero': {
                        populate: '*' // Esto trae la imagen y todos los campos del Hero
                    },
                    // Si tuvieras más componentes, los agregarías aquí:
                    'blocks.faq': {
                        populate: '*'
                    }
                }
            }
        }
    });
    try {
        const res = await fetch(`${STRAPI_URL}/api/homepage?${query}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            // Esto nos ayudará a ver el error exacto en la consola del navegador/servidor si falla
            const errorBody = await res.text();
            throw new Error(`Error Strapi ${res.status}: ${errorBody}`);
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error en getHomePageData:", error);
        return null;
    }
}
}),
"[project]/components/herosection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const STRAPI_URL = "http://localhost:1337";
function HeroSection({ data }) {
    // Construimos la URL de la imagen
    const imageUrl = data.hero_image ? `${STRAPI_URL}${data.hero_image.url}` : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-gray-900 text-white py-20 px-6 text-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-bold mb-6",
                    children: data.hero_title
                }, void 0, false, {
                    fileName: "[project]/components/herosection.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-gray-300 mb-8",
                    children: data.hero_descrip
                }, void 0, false, {
                    fileName: "[project]/components/herosection.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: data.hero_image?.alternativeText || "Hero image",
                        className: "object-cover w-full h-full"
                    }, void 0, false, {
                        fileName: "[project]/components/herosection.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/herosection.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this),
                data.hero_cta_descrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition",
                    children: data.hero_cta_descrip
                }, void 0, false, {
                    fileName: "[project]/components/herosection.tsx",
                    lineNumber: 42,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/herosection.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/herosection.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/page.tsx'\n\nExpected '</', got ';'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5837b19f._.js.map