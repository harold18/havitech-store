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
                    'blocks.hero-section': {
                        populate: '*' // Esto trae la imagen y todos los campos del Hero
                    },
                    // Si tuvieras más componentes, los agregarías aquí:
                    'blocks.faq-section': {
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
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$strapi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/strapi.ts [app-rsc] (ecmascript)"); // Importamos nuestra función
;
;
async function Home() {
    // 1. Llamamos a los datos
    const strapiData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$strapi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHomePageData"])();
    // 2. Un console.log para que veas en tu TERMINAL (donde corre npm run dev) qué llega
    //console.log("Datos recibidos de Strapi:", JSON.stringify(strapiData, null, 2));
    // Si no hay datos, mostramos un aviso simple (útil si Strapi está apagado)
    if (!strapiData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "No se pudieron cargar los datos. Revisa que Strapi esté corriendo."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    // 3. Renderizamos
    // Nota: strapiData tiene tus campos. Si pusiste un titulo en la homepage:
    const { blocks } = strapiData;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-4",
                children: "Conectado con Strapi"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl text-blue-600 mb-8",
                children: [
                    "Título desde Strapi: ",
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100 p-4 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-black",
                        children: "Bloques encontrados (Dynamic Zone):"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-black",
                        children: JSON.stringify(blocks, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8857cd1f._.js.map