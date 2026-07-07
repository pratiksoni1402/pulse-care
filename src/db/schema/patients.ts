import {
  mysqlTable,
  varchar,
  date,
  timestamp,
  mysqlEnum,
  int,
  decimal,
  text,
  boolean,
} from 'drizzle-orm/mysql-core'

import {
  alcoholConsumptionEnum,
  allergySeverityEnum,
  allergyTypeEnum,
  bloodGroupEnum,
  conditionStatusEnum,
  dietTypeEnum,
  disabilitySeverityEnum,
  exerciseFrequencyEnum,
  familyRelationEnum,
  genderEnum,
  maritalStatusEnum,
  pregnancyStatusEnum,
  smokingStatusEnum,
} from '../enums/patients.enum'

export const patients = mysqlTable('patients', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Personal Information
  fullName: varchar('full_name', { length: 150 }).notNull(),

  dateOfBirth: date('date_of_birth').notNull(),

  gender: genderEnum.notNull(),

  bloodGroup: bloodGroupEnum.default('unknown'),

  // Contact Information
  phone: varchar('phone', { length: 20 }).notNull(),

  email: varchar('email', { length: 255 }),

  address: varchar('address', { length: 500 }),

  // Emergency Contact
  emergencyContactName: varchar('emergency_contact_name', {
    length: 150,
  }),

  emergencyContactRelation: varchar('emergency_contact_relation', {
    length: 50,
  }),

  emergencyContactPhone: varchar('emergency_contact_phone', {
    length: 20,
  }),

  // Other Information
  preferredLanguage: varchar('preferred_language', {
    length: 50,
  }).default('English'),

  maritalStatus: maritalStatusEnum.default('prefer_not_to_say'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})

export const patientVitals = mysqlTable('patient_vitals', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  // Anthropometric Measurements
  heightCm: decimal('height_cm', {
    precision: 5,
    scale: 2,
  }).notNull(),

  weightKg: decimal('weight_kg', {
    precision: 5,
    scale: 2,
  }).notNull(),

  // Store calculated BMI for faster querying
  bmi: decimal('bmi', {
    precision: 4,
    scale: 1,
  }),

  // Blood Pressure
  systolicBp: int('systolic_bp').notNull(),

  diastolicBp: int('diastolic_bp').notNull(),

  // Heart Rate
  restingHeartRate: int('resting_heart_rate'),

  // Temperature
  bodyTemperatureC: decimal('body_temperature_c', {
    precision: 4,
    scale: 1,
  }),

  recordedAt: timestamp('recorded_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})

export const medicalConditions = mysqlTable('medical_conditions', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  conditionName: varchar('condition_name', {
    length: 150,
  }).notNull(),

  diagnosedDate: timestamp('diagnosed_date', {
    mode: 'date',
  }),

  status: conditionStatusEnum.default('active'),

  notes: text('notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})

export const surgicalHistory = mysqlTable('surgical_history', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', {
    length: 36,
  })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  surgeryName: varchar('surgery_name', {
    length: 200,
  }).notNull(),

  surgeryDate: date('surgery_date'),

  hospitalName: varchar('hospital_name', {
    length: 255,
  }),

  surgeonName: varchar('surgeon_name', {
    length: 150,
  }),

  notes: text('notes'),
})

export const hospitalizations = mysqlTable('hospitalizations', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', {
    length: 36,
  })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  hospitalName: varchar('hospital_name', {
    length: 255,
  }).notNull(),

  admissionDate: date('admission_date'),

  dischargeDate: date('discharge_date'),

  reason: varchar('reason', {
    length: 255,
  }),

  notes: text('notes'),
})

export const ongoingTreatments = mysqlTable('ongoing_treatments', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', {
    length: 36,
  })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  treatmentName: varchar('treatment_name', {
    length: 200,
  }).notNull(),

  startDate: date('start_date'),

  expectedEndDate: date('expected_end_date'),

  physician: varchar('physician', {
    length: 150,
  }),

  notes: text('notes'),
})

export const disabilities = mysqlTable('disabilities', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', {
    length: 36,
  })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  disabilityName: varchar('disability_name', {
    length: 150,
  }).notNull(),

  severity: disabilitySeverityEnum,

  notes: text('notes'),
})

export const allergies = mysqlTable('allergies', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  type: allergyTypeEnum.notNull(),

  allergen: varchar('allergen', {
    length: 150,
  }).notNull(),

  severity: allergySeverityEnum.notNull(),

  reaction: text('reaction'),

  diagnosedAt: timestamp('diagnosed_at', {
    mode: 'date',
  }),

  notes: text('notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),
})

export const medications = mysqlTable('medications', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  medicineName: varchar('medicine_name', {
    length: 200,
  }).notNull(),

  dosage: varchar('dosage', {
    length: 100,
  }).notNull(),

  frequency: varchar('frequency', {
    length: 100,
  }).notNull(),

  prescribingDoctor: varchar('prescribing_doctor', {
    length: 150,
  }),

  startDate: date('start_date'),

  isOngoing: boolean('is_ongoing').notNull().default(true),

  endDate: date('end_date'),

  purpose: varchar('purpose', {
    length: 255,
  }),

  notes: text('notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),
})

export const familyMedicalHistory = mysqlTable('family_medical_history', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  relation: familyRelationEnum.notNull(),

  conditionName: varchar('condition_name', {
    length: 150,
  }).notNull(),

  ageAtDiagnosis: int('age_at_diagnosis'),

  notes: varchar('notes', {
    length: 500,
  }),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),
})

export const lifestyleInfo = mysqlTable('lifestyle_info', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .unique()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  smokingStatus: smokingStatusEnum.default('never'),

  smokingFrequency: varchar('smoking_frequency', {
    length: 100,
  }),

  alcoholConsumption: alcoholConsumptionEnum.default('never'),

  exerciseFrequency: exerciseFrequencyEnum,

  dietType: dietTypeEnum,

  dietaryRestrictions: text('dietary_restrictions'),

  averageSleepHours: int('average_sleep_hours'),

  sleepNotes: text('sleep_notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})

export const immunizations = mysqlTable('immunizations', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  vaccineName: varchar('vaccine_name', {
    length: 150,
  }).notNull(),

  administeredDate: date('administered_date'),

  nextDueDate: date('next_due_date'),

  doseNumber: int('dose_number'),

  healthcareProvider: varchar('healthcare_provider', {
    length: 150,
  }),

  facilityName: varchar('facility_name', {
    length: 255,
  }),

  lotNumber: varchar('lot_number', {
    length: 100,
  }),

  isBooster: boolean('is_booster').notNull().default(false),

  notes: text('notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),
})

export const reproductiveHealth = mysqlTable('reproductive_health', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .unique()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  pregnancyStatus: pregnancyStatusEnum.default('not_applicable'),

  expectedDeliveryDate: date('expected_delivery_date'),

  lastMenstrualPeriod: date('last_menstrual_period'),

  menstrualCycleLength: int('menstrual_cycle_length'),

  menstrualNotes: text('menstrual_notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})

export const mentalHealthInfo = mysqlTable('mental_health_info', {
  id: int('id').primaryKey().autoincrement(),

  patientId: varchar('patient_id', { length: 36 })
    .notNull()
    .unique()
    .references(() => patients.id, {
      onDelete: 'cascade',
    }),

  diagnosis: varchar('diagnosis', {
    length: 255,
  }),

  receivingTherapy: boolean('receiving_therapy').notNull().default(false),

  therapistName: varchar('therapist_name', {
    length: 150,
  }),

  counselingFrequency: varchar('counseling_frequency', {
    length: 100,
  }),

  medications: text('medications'),

  notes: text('notes'),

  createdAt: timestamp('created_at', {
    mode: 'date',
  }).defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .defaultNow()
    .onUpdateNow(),
})
