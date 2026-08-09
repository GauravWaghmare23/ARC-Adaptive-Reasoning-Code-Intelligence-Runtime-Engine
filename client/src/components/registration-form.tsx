"use client";

import { useState } from "react";
import { authClient } from "@/lib/authClient";
import { cn } from "../lib/utils";

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(
          error.message || "Failed to create your account."
        );
        return;
      }

      // Registration successful
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('w-full', 'max-w-md')}>
      {/* Header */}
      <div className={cn('mb-8', 'text-center')}>
        <h1 className={cn('text-3xl', 'font-semibold', 'tracking-tight')}>
          Welcome
        </h1>

        <p className={cn('mt-2', 'text-sm', 'text-muted-foreground')}>
          Create your account
        </p>
      </div>

      {/* Form */}
      <div className={cn('rounded-xl', 'border', 'bg-card', 'p-6', 'shadow-sm')}>
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className={cn('text-sm', 'font-medium')}
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={isLoading}
              autoComplete="name"
              required
              className={cn('h-10', 'w-full', 'rounded-md', 'border', 'bg-background', 'px-3', 'text-sm', 'outline-none', 'transition', 'focus:ring-2', 'focus:ring-ring', 'disabled:cursor-not-allowed', 'disabled:opacity-50')}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className={cn('text-sm', 'font-medium')}
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={isLoading}
              autoComplete="email"
              required
              className={cn('h-10', 'w-full', 'rounded-md', 'border', 'bg-background', 'px-3', 'text-sm', 'outline-none', 'transition', 'focus:ring-2', 'focus:ring-ring', 'disabled:cursor-not-allowed', 'disabled:opacity-50')}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className={cn('text-sm', 'font-medium')}
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={isLoading}
              autoComplete="new-password"
              required
              className={cn('h-10', 'w-full', 'rounded-md', 'border', 'bg-background', 'px-3', 'text-sm', 'outline-none', 'transition', 'focus:ring-2', 'focus:ring-ring', 'disabled:cursor-not-allowed', 'disabled:opacity-50')}
            />

            <p className={cn('text-xs', 'text-muted-foreground')}>
              Password must be at least 8 characters.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className={cn('rounded-md', 'border', 'border-red-200', 'bg-red-50', 'px-3', 'py-2')}>
              <p className={cn('text-sm', 'text-red-600')}>
                {error}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={cn('h-10', 'w-full', 'rounded-md', 'bg-primary', 'px-4', 'text-sm', 'font-medium', 'text-primary-foreground', 'transition-opacity', 'hover:opacity-90', 'disabled:cursor-not-allowed', 'disabled:opacity-50')}
          >
            {isLoading ? (
              <span className={cn('flex', 'items-center', 'justify-center', 'gap-2')}>
                <span className={cn('h-4', 'w-4', 'animate-spin', 'rounded-full', 'border-2', 'border-current', 'border-t-transparent')} />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </div>

      {/* Login */}
      <p className={cn('mt-6', 'text-center', 'text-sm', 'text-muted-foreground')}>
        Already have an account?{" "}
        <a
          href="/sign-in"
          className={cn('font-medium', 'text-foreground', 'underline', 'underline-offset-4', 'hover:no-underline')}
        >
          Sign in
        </a>
      </p>
    </div>
  );
};