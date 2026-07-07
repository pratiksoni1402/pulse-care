import { mysqlEnum } from 'drizzle-orm/mysql-core/columns'

export const genderEnum = mysqlEnum('gender', [
  'male',
  'female',
  'other',
  'prefer_not_to_say',
])

export const bloodGroupEnum = mysqlEnum('blood_group', [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
  'unknown',
])

export const maritalStatusEnum = mysqlEnum('marital_status', [
  'single',
  'married',
  'divorced',
  'widowed',
  'separated',
  'prefer_not_to_say',
])

export const conditionStatusEnum = mysqlEnum('condition_status', [
  'active',
  'resolved',
  'managed',
])

export const disabilitySeverityEnum = mysqlEnum('disability_severity', [
  'mild',
  'moderate',
  'severe',
])

export const allergyTypeEnum = mysqlEnum('allergy_type', [
  'drug',
  'food',
  'environmental',
  'other',
])

export const allergySeverityEnum = mysqlEnum('allergy_severity', [
  'mild',
  'moderate',
  'severe',
  'anaphylactic',
])

export const familyRelationEnum = mysqlEnum('family_relation', [
  'father',
  'mother',
  'brother',
  'sister',
  'son',
  'daughter',
  'grandfather',
  'grandmother',
  'uncle',
  'aunt',
  'other',
])

export const smokingStatusEnum = mysqlEnum('smoking_status', [
  'never',
  'former',
  'current',
])

export const alcoholConsumptionEnum = mysqlEnum('alcohol_consumption', [
  'never',
  'occasionally',
  'weekly',
  'daily',
])

export const exerciseFrequencyEnum = mysqlEnum('exercise_frequency', [
  'none',
  '1_2_times_week',
  '3_5_times_week',
  'daily',
])

export const dietTypeEnum = mysqlEnum('diet_type', [
  'vegetarian',
  'non_vegetarian',
  'vegan',
  'eggetarian',
  'other',
])

export const pregnancyStatusEnum = mysqlEnum('pregnancy_status', [
  'not_pregnant',
  'pregnant',
  'postpartum',
  'unknown',
  'not_applicable',
])
