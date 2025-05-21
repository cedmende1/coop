export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      animation: {
        'float': 'float 20s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(5%, 5%) rotate(120deg)' },
          '66%': { transform: 'translate(-5%, 2%) rotate(240deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        }
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'neon-red': {
          DEFAULT: 'rgb(220, 20, 60)',
          '50': 'rgb(253, 242, 242)',
          '100': 'rgb(253, 232, 232)',
          '200': 'rgb(252, 212, 212)',
          '300': 'rgb(249, 180, 180)',
          '400': 'rgb(242, 131, 131)',
          '500': 'rgb(236, 78, 78)',
          '600': 'rgb(220, 38, 38)',
          '700': 'rgb(185, 28, 28)',
          '800': 'rgb(153, 27, 27)',
          '900': 'rgb(127, 29, 29)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    }
  }
}