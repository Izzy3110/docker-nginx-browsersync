module.exports = {
  proxy: "nginx:80",
  host: "0.0.0.0",              // 👈 listen on all interfaces
  files: ["/app/**/*.*"],
  watchOptions: {
    usePolling: true,
    interval: 1000
  },
  open: false,
  notify: true,
  port: 3000,
  ui: {
    port: 3001
  }
};
