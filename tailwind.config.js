/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#e8d08a',
          dark:    '#a07830',
          hover:   '#d4b460',
          muted:   'rgba(201,168,76,0.08)',
          'muted-h':'rgba(201,168,76,0.15)',
        },
        hap: {
          bg:       'rgb(var(--hap-bg) / <alpha-value>)',
          surface:  'rgb(var(--hap-surface) / <alpha-value>)',
          surface2: 'rgb(var(--hap-surface2) / <alpha-value>)',
          surface3: 'rgb(var(--hap-surface3) / <alpha-value>)',
          border:   'rgb(var(--hap-border) / <alpha-value>)',
          borderl:  'rgb(var(--hap-borderl) / <alpha-value>)',
        },
      },
      boxShadow: {
        gold: '0 4px 24px rgba(201,168,76,0.25)',
        card: '0 4px 16px rgba(0,0,0,0.4)',
        xl2:  '0 16px 64px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gold-grad': 'linear-gradient(135deg, #a07830, #c9a84c)',
        'gold-h':    'linear-gradient(90deg, #a07830, #c9a84c)',
      },
      animation: {
        /* existing */
        'fade-in':        'fadeIn .25s ease',
        'slide-up':       'slideUp .25s ease',
        'slide-r':        'slideR .25s ease',
        'spin-slow':      'spin .7s linear infinite',
        /* new */
        'float':          'float 6s ease-in-out infinite',
        'float-d1':       'float 7s ease-in-out 1.5s infinite',
        'float-d2':       'float 9s ease-in-out 3s infinite',
        'float-d3':       'float 5s ease-in-out 0.8s infinite',
        'shimmer':        'shimmer 2.4s linear infinite',
        'glow-pulse':     'glowPulse 2.5s ease-in-out infinite',
        'glow-pulse-fast':'glowPulse 1.2s ease-in-out infinite',
        'orbit':          'orbit 8s linear infinite',
        'orbit-rev':      'orbit 12s linear infinite reverse',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'bounce-in':      'bounceIn .65s cubic-bezier(0.36,0.07,0.19,0.97) both',
        'scale-in':       'scaleIn .45s cubic-bezier(0.34,1.56,0.64,1) both',
        'reveal':         'reveal .7s ease both',
        'reveal-right':   'revealRight .7s ease both',
        'text-pop':       'textPop .5s cubic-bezier(0.34,1.56,0.64,1) both',
        'count-up':       'countUp .4s ease both',
        'border-beam':    'borderBeam 2.5s linear infinite',
        'particle-rise':  'particleRise linear infinite',
        'shake':          'shake .5s ease-in-out',
        'tilt-in':        'tiltIn .5s ease both',
      },
      keyframes: {
        fadeIn:        { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:       { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideR:        { from: { opacity: '0', transform: 'translateX(14px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-22px) rotate(3deg)' },
          '66%':     { transform: 'translateY(-10px) rotate(-2deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 6px rgba(201,168,76,0.15), 0 0 12px rgba(201,168,76,0.05)' },
          '50%':     { boxShadow: '0 0 30px rgba(201,168,76,0.55), 0 0 60px rgba(201,168,76,0.20)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        bounceIn: {
          '0%':   { opacity: '0', transform: 'scale(0.2)' },
          '60%':  { transform: 'scale(1.1)' },
          '80%':  { transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        reveal: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        textPop: {
          '0%':   { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        countUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderBeam: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '300% 0%' },
        },
        particleRise: {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(0)', opacity: '0' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-6px)' },
          '40%':     { transform: 'translateX(6px)' },
          '60%':     { transform: 'translateX(-3px)' },
          '80%':     { transform: 'translateX(3px)' },
        },
        tiltIn: {
          '0%':   { opacity: '0', transform: 'perspective(600px) rotateX(20deg) translateY(20px)' },
          '100%': { opacity: '1', transform: 'perspective(600px) rotateX(0deg) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
