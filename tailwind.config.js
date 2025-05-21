/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Always using dark mode
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "rgb(var(--border) / <alpha-value>)",
      },
      backgroundColor: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
      textColor: {
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
      ringOffsetColor: {
        background: "rgb(var(--background) / <alpha-value>)",
      },
      colors: {
        // Primary brand colors
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Primary green
          600: "#16a34a",
          700: "#15803d", // Darker green
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Dark mode background colors
        dark: {
          100: "#374151", // Lightest (card backgrounds)
          200: "#1f2937", // Secondary background
          300: "#111827", // Main background
          400: "#0f172a", // Darkest background
        },
        // Gray scale for text and borders
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        // Accent colors
        accent: {
          blue: {
            light: "#93c5fd",
            DEFAULT: "#3b82f6",
            dark: "#1d4ed8",
          },
          amber: {
            light: "#fcd34d",
            DEFAULT: "#f59e0b",
            dark: "#b45309",
          },
          red: {
            light: "#fca5a5",
            DEFAULT: "#ef4444",
            dark: "#b91c1c",
          },
        },
      },
      spacing: {
        "9/16": "56.25%",
        "3/4": "75%",
        "1/1": "100%",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-lexend)",
          "Lexend",
          "var(--font-inter)",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      inset: {
        full: "100%",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.4em",
      },
      minWidth: {
        10: "2.5rem",
      },
      scale: {
        98: ".98",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        // Custom shadows with brand colors
        "primary-sm": "0 1px 2px 0 rgba(34, 197, 94, 0.05)",
        "primary-md":
          "0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06)",
        "primary-lg":
          "0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -2px rgba(34, 197, 94, 0.05)",
        // Soft shadows
        "soft-xl": "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
        "soft-md":
          "0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07)",
        "soft-sm":
          "0 2px 5px -1px rgba(0, 0, 0, 0.13), 0 1px 3px -1px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(to right, var(--primary-500), var(--primary-600))",
        "gradient-dark":
          "linear-gradient(to bottom, var(--dark-200), var(--dark-300))",
        "gradient-card":
          "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      zIndex: {
        "-10": "-10",
        "-1": "-1",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        auto: "auto",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-gradient-primary": {
          background: "linear-gradient(to right, #22c55e, #16a34a)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".bg-blur": {
          backdropFilter: "blur(8px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};
