import os
import json
import subprocess

base = os.path.expanduser("~/Documents/GitHub/omniserve")
frontend_dir = os.path.join(base, "frontend")

# 1. Update next.config.ts / next.config.js for static export
next_config_path = os.path.join(frontend_dir, "next.config.ts")
if not os.path.exists(next_config_path):
    next_config_path = os.path.join(frontend_dir, "next.config.js")

next_config_content = """import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/omniserve" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
"""

with open(next_config_path, "w") as f:
    f.write(next_config_content)

print("✅ Next.config configured for GitHub Pages static export!")

# 2. Install gh-pages dependency in frontend
print("📦 Installing gh-pages CLI tool...")
subprocess.run(["npm", "install", "--save-dev", "gh-pages"], cwd=frontend_dir, check=True)

# 3. Add deploy scripts to frontend package.json
pkg_path = os.path.join(frontend_dir, "package.json")
with open(pkg_path, "r") as f:
    pkg_data = json.load(f)

pkg_data.setdefault("scripts", {})
pkg_data["scripts"]["predeploy"] = "npm run build"
pkg_data["scripts"]["deploy"] = "gh-pages -d out -b gh-pages"

with open(pkg_path, "w") as f:
    json.dump(pkg_data, f, indent=2)

print("✅ Package.json deployment scripts added!")

# 4. Commit latest code to main
print("🐙 Committing local updates to main branch...")
subprocess.run(["git", "add", "."], cwd=base, check=True)
subprocess.run(["git", "commit", "-m", "feat: setup github pages static export & deployment pipeline"], cwd=base, check=True)
subprocess.run(["git", "push", "origin", "main"], cwd=base, check=True)

# 5. Build and Deploy to gh-pages branch
print("🚀 Building Next.js static site & deploying to gh-pages...")
subprocess.run(["npm", "run", "deploy"], cwd=frontend_dir, check=True)

print("\n🎉 SUCCESS! OmniServe has been published to GitHub Pages!")
print("🔗 Live URL: https://tsmithcode.github.io/omniserve/")
