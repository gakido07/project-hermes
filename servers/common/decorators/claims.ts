import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClaimType } from '@projecthermes/common/types';

export const Claims = createParamDecorator(
  (data: ClaimType, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data) return request.claims[data];
    return request.claims;
  },
);
