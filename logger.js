const fs = require("fs");
const path = require("path");

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFile = path.join(__dirname, "logs", `log-${timestamp}.log`);


if (!fs.existsSync(path.dirname(logFile))) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const logStream = fs.createWriteStream(logFile, { flags: "a" });

// Override console.log and others
["log", "warn", "error", "info"].forEach(level => {
    const original = console[level];
    console[level] = (...args) => {
        const timestamp = new Date().toISOString();
        const message = args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" ");
        logStream.write(`[${timestamp}] [${level.toUpperCase()}] ${message}\n`);
        original.apply(console, args);
    };
});

module.exports = logStream;