# CKD Prediction System - Frontend Implementation Strategy

This document outlines the technical strategy for building a premium, clinical-grade frontend for the Chronic Kidney Disease (CKD) Prediction System.

## 1. Component Hierarchy

A modular approach ensures scalability and ease of testing.

### Layout Components
*   `AppLayout`: Wrapper with Responsive Sidebar and Header.
*   `Header`: Branding, User Profile (mock), and Theme Toggle.
*   `Sidebar`: Navigation (Dashboard, Predict, Patients, History).

### Core UI Components (Atomic)
*   `Card`: Glassmorphism-style containers for metrics.
*   `Input`: Custom styled text/number inputs with error states.
*   `Select / Checkbox`: For categorical attributes (e.g., Anemia: Yes/No).
*   `Stepper`: Visual indicator of progress through the 24 inputs.
*   `Button`: High-fidelity buttons with loading/hover states.

### Feature Components
*   `PredictionForm`: The main multi-step engine.
*   `StepRenderer`: Logic to switch between form steps with animations.
*   `ResultDashboard`: Post-prediction analytics view.
*   `MetricsGrid`: Quick-view stats for the home page.

---

## 2. State Management Strategy

To handle **24 medical attributes** efficiently without performance lag:

*   **Primary Tool**: `react-hook-form` + `zod`.
*   **Context**: A `FormContext` to wrap the multi-step flow. This allows different components (steps) to access and update the shared form state.
*   **Persistence**: Optional `localStorage` sync to prevent data loss if the user refreshes the page mid-form.
*   **Global State**: Use `Zustand` for non-form states (e.g., sidebar collapse, user preferences, previous prediction cache).

---

## 3. Design System & Aesthetics

### Color Palette (Tailwind Configuration)
*   **Primary (Clinical Blue)**: `medical-600: #0284c7`, `medical-900: #0c4a6e`.
*   **Success (Healthy)**: `emerald-500: #10b981`.
*   **Alert (Risk)**: `rose-500: #f43f5e`.
*   **Background**: `slate-50: #f8fafc`.

### Typography
*   **Headings**: `Outfit` or `Inter` (700 weight) for a modern, trustworthy look.
*   **Body**: `Inter` (400/500 weight) for maximum legibility in data-heavy forms.

---

## 4. Multi-Step Form Logic (The "24-Input" Challenge)

To avoid user fatigue, inputs are grouped into **4 logical steps**:

| Step | Title | Attributes |
| :--- | :--- | :--- |
| **1** | **Vitals & Urine** | Age, BP, Specific Gravity, Albumin, Sugar. |
| **2** | **Hematology** | RBC, Pus Cell, PCV, WBC, Hemoglobin. |
| **3** | **Serum Chemistry** | Glucose, Urea, Creatinine, Sodium, Potassium. |
| **4** | **Systemic History**| Hypertension, Diabetes, CAD, Appetite, Edema, Anemia. |

### Validation (Zod Schema)
Each step has a specific Zod sub-schema. 
Example for Step 1:
```typescript
const step1Schema = z.object({
  age: z.number().min(1).max(120),
  bp: z.number().min(40).max(200),
  // ... more fields
});
```

---

## 5. API Integration Plan

*   **HTTP Client**: `Axios` with a base instance (URL/Headers).
*   **Async State**: `TanStack Query` (React Query).
*   **Payload structure**:
    ```json
    {
      "features": {
        "age": 45,
        "bp": 80,
        "sg": 1.020,
        ... // all 24 features
      }
    }
    ```
*   **Response Handling**:
    ```json
    {
      "prediction": "CKD",
      "probability": 0.87,
      "feature_importance": { "sc": 0.4, "hemo": 0.2, ... }
    }
    ```

---

## 6. UX/UI Enhancements

### Animations (Framer Motion)
*   **AnimatePresence**: For smooth `Slide + Fade` transitions between form steps.
*   **Staggered Entry**: For the results page (cards pop in one by one).
*   **Layout Animations**: The Sidebar should smoothly push content when toggled.

### Data Visualization (Recharts)
*   **Risk Gauge**: A `PieChart` (half-donut) to show the probability score.
*   **Importance Chart**: A `BarChart` (horizontal) to visualize which clinical parameters most influenced the "CKD" result.

---

## 7. File Tree (Proposed `src/` Structure)

```text
src/
├── api/
│   ├── client.ts           # Axios instance
│   └── usePredict.ts       # React Query hook for /predict
├── components/
│   ├── ui/                 # Atomic UI (Button, Input, Card)
│   ├── forms/
│   │   ├── MultiStepForm.tsx
│   │   ├── Step1_Vitals.tsx
│   │   └── ...
│   ├── charts/
│   │   ├── RiskGauge.tsx
│   │   └── ImportanceChart.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── Header.tsx
├── hooks/
│   └── useMultistep.ts     # Navigation logic (next, back)
├── pages/
│   ├── Dashboard.tsx
│   ├── Predict.tsx
│   └── Results.tsx
├── schemas/
│   └── predictSchema.ts    # Zod definitions
├── types/
│   └── api.d.ts            # Request/Response interfaces
└── utils/
    └── constants.ts        # Medical ranges/defaults
```
