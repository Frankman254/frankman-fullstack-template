# Arquitectura del frontend (apps/web)

Estructura simple en capas: **servicios** → **hooks** → **componentes**.

---

## Capas

### 1. Servicio (capa de red)

**Dónde:** `app/services/` (ej. `api.ts`)

**Qué hace:** Lógica de comunicación con el backend: URLs, `fetch`, parseo de JSON. **No usa React** (ni `useState`, ni `useEffect`). Solo funciones que devuelven datos o lanzan.

**Por qué:** Así puedes reutilizar la misma llamada en varios sitios, testearla sin montar componentes y cambiar la API en un solo lugar.

**Ejemplo:** `testDbConnection()` hace `fetch('/api/test-db')` y devuelve `Promise<TestDbResponse>`.

---

### 2. Hook (capa de estado y efectos)

**Dónde:** `app/hooks/` (ej. `useDbTest.ts`)

**Qué hace:** Lógica de React: estado (`useState`), efectos (`useEffect`), y llamadas a **servicios**. Expone un contrato simple al componente: datos + flags (loading, error) + acciones (refetch, submit).

**Por qué:** El componente no maneja `useState` ni la secuencia “loading → success/error”. Solo usa `const { state, isLoading, runTest } = useDbTest()` y pinta.

**Diferencia con el servicio:**

| | **Servicio** | **Hook** |
|---|--------------|----------|
| Conoce React | No | Sí (useState, useEffect, etc.) |
| Dónde vive | `services/` | `hooks/` |
| Responsabilidad | Hacer la petición y devolver datos | Guardar estado y llamar al servicio |
| Ejemplo | `testDbConnection()` | `useDbTest()` → `{ state, runTest }` |

---

### 3. Componente (capa de presentación)

**Dónde:** `app/components/` (ej. `Footer.tsx`)

**Qué hace:** Solo **renderiza** lo que recibe: props y/o el resultado de hooks. No hace `fetch` ni define estados complejos; usa hooks que ya encapsulan eso.

**Por qué:** Componentes más legibles, fáciles de cambiar (solo UI) y de testear (pasas datos por props o mockeas el hook).

---

## Flujo de datos

```
Usuario hace click → Componente llama runTest() (del hook)
                          → Hook llama testDbConnection() (servicio)
                          → Servicio hace fetch()
                          → Servicio devuelve datos
                          → Hook actualiza state
                          → Componente re-renderiza con state
```

---

## Cuándo usar cada uno

- **Nueva llamada al backend** → Añadir función en `services/api.ts` (o otro servicio).
- **Necesitas estado + esa llamada** → Crear un hook en `hooks/` que use el servicio y exponga `{ data, loading, error, refetch }` (o similar).
- **Nueva pantalla o bloque de UI** → Componente que use hooks y/o props y solo renderice.

---

## Resumen

- **Servicio** = “cómo obtenemos los datos” (fetch, URL, parseo). Sin React.
- **Hook** = “cómo los guardamos y cuándo los pedimos” (estado + llamada al servicio). Con React.
- **Componente** = “cómo los mostramos” (render con datos ya obtenidos vía props o hooks).
