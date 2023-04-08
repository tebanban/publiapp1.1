import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],

    server: {
      port: 3000,
    },
  });
};

// defineConfig(({ mode }) => {
//   // Loads our env file and merges it with Node's process.env
//   Object.assign(process.env, loadEnv(mode, process.cwd()));
// })
