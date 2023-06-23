import { Claims } from '@projecthermes/core/dto/claims.dto';
import { Request } from 'express';

export type CustomRequestContext = Request & { claims: Claims };

export type ClaimType = 'sub' | 'email' | 'exp' | 'role';
