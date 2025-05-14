const fs = require("fs");
const path = require("path");

const requiredEnvVars = ["NEXT_PUBLIC_API_URL"];

const envFiles = [
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production.local",
  ".env",
  ".env.development",
  ".env.test",
  ".env.production",
];

function validateEnv() {
  const envPath = envFiles.find((file) => path.resolve(process.cwd(), file));

  if (!envPath) {
    console.error("\x1b[31m%s\x1b[0m", "❌ .env file not found!");
    process.exit(1);
  }

  const envExamplePath = path.resolve(process.cwd(), ".env.example");

  if (!fs.existsSync(envPath)) {
    console.error("\x1b[31m%s\x1b[0m", "❌ .env.local file not found!");
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Creating .env.local from .env.example..."
    );

    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log("\x1b[32m%s\x1b[0m", "✅ .env.local created successfully!");
    } else {
      console.error("\x1b[31m%s\x1b[0m", "❌ .env.example file not found!");
      process.exit(1);
    }
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const envVars = envContent.split("\n").reduce((acc, line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  const missingVars = requiredEnvVars.filter((varName) => !envVars[varName]);

  if (missingVars.length > 0) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "❌ Missing required environment variables:"
    );
    missingVars.forEach((varName) => {
      console.error("\x1b[31m%s\x1b[0m", `   - ${varName}`);
    });
    process.exit(1);
  }

  console.log(
    "\x1b[32m%s\x1b[0m",
    "✅ All environment variables are set correctly!"
  );
}

validateEnv();
