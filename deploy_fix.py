import os
import subprocess

base = os.path.expanduser("~/Documents/GitHub/omniserve")
frontend_dir = os.path.join(base, "frontend")

# 1. Clean up stale config files
js_config = os.path.join(frontend_dir, "next.config.js")
ts_config = os.path.join(frontend_dir, "next.config.ts")
mjs_config = os.path.join(frontend_dir, "next.config.mjs")

for path in [ts_config, mjs_config]:
    if os.path.exists(path):
        os.remove(path)

# 2. Write valid CommonJS next.config.js
next_config_content = """/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/omniserve' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
"""

with open(js_config, "w") as f:
    f.write(next_config_content)

print("✅ Updated frontend/next.config.js with valid JS syntax.")

# 3. Commit and rerun deployment
subprocess.run(["git", "add", "."], cwd=base, check=True)
subprocess.run(["git", "commit", "-m", "fix: corrected next.config.js syntax for static export"], cwd=base, check=True)
subprocess.run(["git", "push", "origin", "main"], cwd=base, check=True)

print("🚀 Building and deploying to gh-pages branch...")
subprocess.run(["npm", "run", "deploy"], cwd=frontend_dir, check=True)

print("\n🎉 Deployment complete! View your site at: https://tsmithcode.github.io/omniserve/")
