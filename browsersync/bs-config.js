const { exec } = require("child_process");

module.exports = {
  proxy: "nginx:80",
  host: "0.0.0.0",              // 👈 listen on all interfaces
  ignore: [
    "config/bs-config.js",
    "config/*.*",
    "config/**/*.*",
    "package-lock.json",
    "package.json"
  ],
  files: [
    "/app/**/*.*",
  ],
  callbacks: {
    ready: function (err, bs) {
      bs.emitter.on("file:changed", function (file) {
        console.log("File changed:", file);
        if (file.path.endsWith(".scss")) {
          console.log("Rebuilding SCSS...");
          console.log(bs.emitter)
          exec("npm run build-scss", (err, stdout, stderr) => {
            if (err) {
              console.error(`SCSS build error: ${stderr}`);
            } else {
              console.log(`SCSS rebuilt:\n${stdout}`);
            }
          });
        }
      });
    }
  },

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
