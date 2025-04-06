/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
const baseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
}
).strict();
const relationSchema = z.object({
    posts: z.array(z.unknown()).optional(),
}
);

/**
 * `User` schema excluding foreign keys and relations.
 */
export const UserScalarSchema = baseSchema;


/**
 * `User` schema including all fields (scalar, foreign key, and relations) and validations.
 */
export const UserSchema = UserScalarSchema.merge(relationSchema.partial());


/**
 * Schema used for validating Prisma create input. For internal use only.
 * @private
 */
export const UserPrismaCreateSchema = baseSchema.partial().passthrough();


/**
 * Schema used for validating Prisma update input. For internal use only.
 * @private
 */
export const UserPrismaUpdateSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
}).partial().passthrough();


/**
 * `User` schema for create operations excluding foreign keys and relations.
 */
export const UserCreateScalarSchema = baseSchema;


/**
 * `User` schema for create operations including scalar fields, foreign key fields, and validations.
 */
export const UserCreateSchema = baseSchema;


/**
 * `User` schema for update operations excluding foreign keys and relations.
 */
export const UserUpdateScalarSchema = baseSchema.partial();


/**
 * `User` schema for update operations including scalar fields, foreign key fields, and validations.
 */
export const UserUpdateSchema = UserUpdateScalarSchema;

