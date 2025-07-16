'use client';

import { Button } from '@/components/shadcn/button';
import { useAuth, useSignOut } from '@/lib/hooks/use-auth';

export default function DashboardPage() {
  const { user } = useAuth();
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'User'}!
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          disabled={signOutMutation.isPending}
        >
          {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Name</span>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Email</span>
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">User ID</span>
            <span className="text-sm font-medium">{user?.id}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start">
            View Profile
          </Button>
          <Button variant="ghost" className="justify-start">
            Update Settings
          </Button>
          <Button variant="ghost" className="justify-start">
            Help & Support
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Total Sessions</span>
            <span className="text-sm font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Last Login</span>
            <span className="text-sm font-medium">Today</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Account Status</span>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
