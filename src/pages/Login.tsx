import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/spotlight/brands');
    }, 800);
  };
  return (
    <div className="auth-shell">
      <div
        className="bg-white p-8 w-full max-w-[420px] relative"
        style={{
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,.10)'
        }}>
        
        {/* Brand Mark */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center bg-[var(--brand-indigo)]"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px'
            }}>
            
            {/* Colored dots on indigo chip */}
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#0070FC]"></div>
              <div className="w-2 h-2 rounded-full bg-[#00C158]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FFF7E5]"></div>
            </div>
          </div>
          <span className="brand-wordmark text-[var(--brand-indigo)]">
            Spotlight
          </span>
        </div>

        <h1 className="auth-title mb-2">Sign in to your account</h1>
        <p className="text-[var(--text-muted)] mb-8 text-sm">
          Enter your credentials to access the Spotlight suite.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="field-label">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail size={16} className="text-[var(--text-muted)]" />
              </div>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full"
                style={{
                  paddingLeft: '40px'
                }}
                required
                defaultValue="admin@spotlight.com" />
              
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="field-label">Password</label>
              <a
                href="#"
                className="text-xs text-[var(--brand-blue)] hover:underline font-medium">
                
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock size={16} className="text-[var(--text-muted)]" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full"
                style={{
                  paddingLeft: '40px'
                }}
                required
                defaultValue="password123" />
              
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-2 flex justify-center items-center h-[42px]"
            disabled={isLoading}>
            
            {isLoading ?
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> :

            'Sign in'
            }
          </button>
        </form>
      </div>
    </div>);

}