import { CircleX } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/shadcn/alert';

export const AlertError = (statusCode: number, message: string | string[]) => {
  switch (statusCode) {
    case 400:
      return (
        <Alert variant="destructive">
          <CircleX className="h-4 w-4" />
          <AlertTitle>
            {Array.isArray(message) ? message.join(', ') : message}
          </AlertTitle>
        </Alert>
      );
    case 409:
      return (
        <Alert variant="destructive">
          <CircleX className="h-4 w-4" />
          <AlertTitle>
            Email already in use, please use a different email or sign in.
          </AlertTitle>
        </Alert>
      );
  }
};
