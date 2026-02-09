// FILE: auth.ts
// PATH: /legato/lib/validations/auth.ts
// PURPOSE: Form validation schemas using Zod

import { z } from 'zod';

// Common validation messages
const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Cannot exceed ${length} characters`,
};

// Common user schema
const baseUserSchema = z.object({
  email: z.string()
    .min(1, validationMessages.required)
    .email(validationMessages.email),
  password: z.string()
    .min(6, validationMessages.minLength(6))
    .max(50, validationMessages.maxLength(50)),
  displayName: z.string()
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50)),
});

// Client registration schema
export const clientRegisterSchema = baseUserSchema.extend({
  phone: z.string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .optional(),
  address: z.string()
    .min(5, "Please enter a valid address")
    .max(200, validationMessages.maxLength(200))
    .optional(),
});

// Lawyer registration schema
export const lawyerRegisterSchema = baseUserSchema.extend({
  phone: z.string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  specialization: z.array(z.string())
    .min(1, "Please select at least one specialization"),
  experience: z.number()
    .min(0, "Experience cannot be negative")
    .max(60, "Please enter a valid experience"),
  hourlyRate: z.number()
    .min(0, "Hourly rate cannot be negative")
    .max(1000, "Please enter a reasonable hourly rate"),
  bio: z.string()
    .min(50, "Please write a detailed bio (at least 50 characters)")
    .max(1000, validationMessages.maxLength(1000)),
  languages: z.array(z.string())
    .min(1, "Please select at least one language"),
  barLicense: z.string()
    .min(5, "Please enter your bar license number")
    .optional(),
});

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, validationMessages.required)
    .email(validationMessages.email),
  password: z.string()
    .min(1, validationMessages.required),
});

// Password reset schema
export const resetPasswordSchema = z.object({
  email: z.string()
    .min(1, validationMessages.required)
    .email(validationMessages.email),
});

// Type inference for TypeScript
export type ClientRegisterInput = z.infer<typeof clientRegisterSchema>;
export type LawyerRegisterInput = z.infer<typeof lawyerRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;