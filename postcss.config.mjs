const config = {
  plugins: ["@tailwindcss/postcss"],
  tailwindConfig: {
    darkMode: "class",
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          darkBg: "#0A0A0A",
          darkPanel: "rgba(255,255,255,0.04)",
          neonYellow: "#FFD300",
        },
        boxShadow: {
          glow: "0 0 20px rgba(255, 211, 0, 0.6)",
          glowLg: "0 0 40px rgba(255, 211, 0, 0.8)",
        },
        backdropBlur: {
          xs: "2px",
        },
        borderRadius: {
          glass: "1.25rem",
        },
        animation: {
          float: "float 4s ease-in-out infinite",
          pulseGlow: "pulseGlow 3s ease-in-out infinite",
        },
        keyframes: {
          float: {
            "0%,100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-6px)" },
          },
          pulseGlow: {
            "0%,100%": { boxShadow: "0 0 0 rgba(255,211,0,0)" },
            "50%": { boxShadow: "0 0 25px rgba(255,211,0,.8)" },
          },
        },
      },
    },
  },
};

export default config;
