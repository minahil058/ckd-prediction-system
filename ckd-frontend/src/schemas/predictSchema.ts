import { z } from "zod";

/**
 * Step 1: Vitals & Urine Analysis
 * Focus: Basic patient information and primary urine indicators.
 */
export const step1Schema = z.object({
  age: z.coerce.number().min(1, "Age must be at least 1").max(120, "Age cannot exceed 120"),
  bp: z.coerce.number().min(40, "BP must be at least 40").max(200, "BP cannot exceed 200"),
  sg: z.enum(["1.005", "1.010", "1.015", "1.020", "1.025"], {
    errorMap: () => ({ message: "Specific gravity is required" })
  }),
  al: z.enum(["0", "1", "2", "3", "4", "5"], {
    errorMap: () => ({ message: "Albumin level is required" })
  }),
  su: z.enum(["0", "1", "2", "3", "4", "5"], {
    errorMap: () => ({ message: "Sugar level is required" })
  }),
});

/**
 * Step 2: Blood & Microscopy
 * Focus: Cellular analysis and hemoglobin levels.
 */
export const step2Schema = z.object({
  rbc: z.enum(["normal", "abnormal"]),
  pc: z.enum(["normal", "abnormal"]),
  pcc: z.enum(["present", "notpresent"]),
  ba: z.enum(["present", "notpresent"]),
  hemo: z.coerce.number().min(3, "Hemoglobin must be at least 3").max(20, "Hemoglobin cannot exceed 20"),
  pcv: z.coerce.number().min(5, "PCV must be at least 5").max(60, "PCV cannot exceed 60"),
});

/**
 * Step 3: Serum Chemistry & Counts
 * Focus: Chemical balance in blood and precise cell counts.
 */
export const step3Schema = z.object({
  bgr: z.coerce.number().min(20, "Glucose must be at least 20").max(500, "Glucose cannot exceed 500"),
  bu: z.coerce.number().min(1, "Urea must be at least 1").max(400, "Urea cannot exceed 400"),
  sc: z.coerce.number().min(0.1, "Creatinine must be at least 0.1").max(80, "Creatinine cannot exceed 80"),
  sod: z.coerce.number().min(4, "Sodium must be at least 4").max(170, "Sodium cannot exceed 170"),
  pot: z.coerce.number().min(1, "Potassium must be at least 1").max(50, "Potassium cannot exceed 50"),
  wbcc: z.coerce.number().min(2000, "WBC must be at least 2000").max(30000, "WBC cannot exceed 30000"),
  rbcc: z.coerce.number().min(2, "RBC count must be at least 2").max(10, "RBC count cannot exceed 10"),
});

/**
 * Step 4: Systemic History & Comorbidities
 * Focus: Physical symptoms and existing medical conditions.
 */
export const step4Schema = z.object({
  htn: z.enum(["yes", "no"]),
  dm: z.enum(["yes", "no"]),
  cad: z.enum(["yes", "no"]),
  appet: z.enum(["good", "poor"]),
  pe: z.enum(["yes", "no"]),
  ane: z.enum(["yes", "no"]),
});

/**
 * Full Prediction Schema
 * Combines all steps into a single object for the final API submission.
 */
export const predictSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});
