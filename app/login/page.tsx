'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Lock, Check, ArrowRight, Info } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            // User is already logged in, redirect to dashboard
            router.replace('/dashboard');
            return;
          }
        }
      } catch (error) {
        // Not logged in, continue with login page
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // Prevent browser navigation (back/forward buttons) on login page
  // Only when user is NOT logged in
  useEffect(() => {
    if (isCheckingAuth) return;

    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            // User is logged in, don't prevent navigation (they'll be redirected by middleware)
            return;
          }
        }
      } catch {
        // Not logged in, continue with prevention
      }

      // Only prevent navigation if user is NOT logged in
      // Store the initial URL
      const loginUrl = window.location.href;
      
      // Replace current history entry to prevent back navigation
      window.history.replaceState({ preventBack: true }, '', loginUrl);

      // Listen for popstate events (back/forward button clicks)
      const handlePopState = (event: PopStateEvent) => {
        // If navigating away from login, allow it (user might be going forward)
        if (window.location.pathname !== '/login') {
          return;
        }

        // If trying to go back from login page, prevent it
        if (event.state?.preventBack !== true) {
          // User tried to go back, prevent it
          window.history.pushState({ preventBack: true }, '', loginUrl);
          toast.info('Please use the login form to access the application');
        }
      };

      // Push a new state to mark this as the login entry point
      window.history.pushState({ preventBack: true }, '', loginUrl);

      // Add event listener
      window.addEventListener('popstate', handlePopState);

      // Cleanup
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    };

    checkLoggedIn();
  }, [isCheckingAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Login successful');
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Informational */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 text-white" style={{ background: 'linear-gradient(to bottom right, rgb(4, 182, 253), rgb(4, 182, 253) 90%, rgb(0, 173, 239))' }}>
        <div>
          <div className="flex items-center gap-3 mb-16">
            <Image
              src="/images/WhiteLogo.png"
              alt="TravelCard Sys"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-semibold">TravelCard Sys</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-8 leading-tight">
              Empowering corporate travel with seamless approvals.
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <p className="text-lg">Multi-stage approval workflows</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <p className="text-lg">Real-time expense tracking</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <p className="text-lg">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-white/80">
          <span>© 2024 Travel Card Systems Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign in</h2>
          <p className="text-slate-600 mb-8">
            Welcome back! Please enter your details to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-slate-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Forgot password functionality coming soon');
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-medium hover:opacity-90 transition-opacity"
              style={{ 
                background: 'linear-gradient(to right, rgb(4, 182, 253), rgb(0, 173, 239))'
              }}
              disabled={loading}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm text-slate-700">
                <p className="font-semibold mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs">
                  <p>Branch Officer: <span className="font-mono">branch.officer1</span> / any password</p>
                  <p>Operations: <span className="font-mono">operations1</span> / any password</p>
                  <p>Ops Head: <span className="font-mono">ops.head</span> / any password</p>
                  <p>Admin: <span className="font-mono">admin</span> / any password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
