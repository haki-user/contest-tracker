// vite.config.ts
import { defineConfig } from "file:///mnt/hdd2/cf-extension/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/hdd2/cf-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import copy from "file:///mnt/hdd2/cf-extension/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: ["./manifest.json"], dest: "./dist" }]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2hkZDIvY2YtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2hkZDIvY2YtZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvaGRkMi9jZi1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGNvcHkgZnJvbSAncm9sbHVwLXBsdWdpbi1jb3B5JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLFxuICBjb3B5KHtcbiAgXHR0YXJnZXRzOiBbeyBzcmM6IFsnLi9tYW5pZmVzdC5qc29uJ10sIGRlc3Q6ICcuL2Rpc3QnfV0sXG4gIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1AsU0FBUyxvQkFBb0I7QUFDalIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxNQUFNO0FBQUEsSUFDaEIsS0FBSztBQUFBLE1BQ0osU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sU0FBUSxDQUFDO0FBQUEsSUFDdEQsQ0FBQztBQUFBLEVBQ0Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
