
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Fontes do Sistema
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'orbitron': ['Orbitron', 'monospace'],
			},
			
			// Cores Semânticas Marvel
			colors: {
				// Sistema Base
				border: 'hsl(var(--card-border))',
				input: 'hsl(var(--card-border))',
				ring: 'hsl(var(--primary))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Marvel Brand
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))',
					foreground: 'hsl(0 0% 100%)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(0 0% 100%)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					light: 'hsl(var(--accent-light))',
					foreground: 'hsl(var(--foreground))',
				},
				
				// Estados
				hover: 'hsl(var(--hover))',
				active: 'hsl(var(--active))',
				
				// Cards
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))',
				},
				
				// Sistema Complementar
				muted: {
					DEFAULT: 'hsl(var(--accent-light))',
					foreground: 'hsl(var(--accent))',
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(0 0% 100%)',
				},
				popover: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			
			// Raio de Bordas
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			
			// Sombras Marvel
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'large': 'var(--shadow-large)',
				'hero': 'var(--shadow-hero)',
			},
			
			// Animações Avançadas
			keyframes: {
				// Animações do Sistema Original
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				
				// Animações Marvel
				'hero-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)',
						transform: 'scale(1.02)'
					}
				},
				'slide-up-fade': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in-bounce': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'50%': { 
						transform: 'scale(1.05)'
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			
			animation: {
				// Animações do Sistema
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Animações Marvel
				'hero-pulse': 'hero-pulse 3s ease-in-out infinite',
				'slide-up-fade': 'slide-up-fade 0.6s ease-out',
				'scale-in-bounce': 'scale-in-bounce 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			
			// Grid Template para Produtos
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
				'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
