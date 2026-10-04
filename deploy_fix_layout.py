import os
import subprocess

base = os.path.expanduser("~/Documents/GitHub/omniserve")
frontend_dir = os.path.join(base, "frontend")

# 1. Determine app directory location
app_dir = os.path.join(frontend_dir, "src", "app")
if not os.path.exists(app_dir):
    app_dir = os.path.join(frontend_dir, "app")

# 2. Ensure layout.tsx exists
layout_path = os.path.join(app_dir, "layout.tsx")
if not os.path.exists(layout_path):
    layout_content = """import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniServe",
  description: "Real-Time AI Support Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"""
    with open(layout_path, "w") as f:
        f.write(layout_content)
    print("✅ Created root app/layout.tsx file.")
else:
    print("ℹ️ layout.tsx already exists.")

# 3. Commit layout changes to main
subprocess.run(["git", "add", "."], cwd=base, check=True)
subprocess.run(["git", "commit", "-m", "fix: added root layout.tsx for Next.js App Router"], cwd=base, check=True)
subprocess.run(["git", "push", "origin", "main"], cwd=base, check=True)

# 4. Trigger build and gh-pages deployment
print("🚀 Building Next.js static site and deploying to gh-pages...")
subprocess.run(["npm", "run", "deploy"], cwd=frontend_dir, check=True)

print("\n🎉 Deployment complete! View your site at: https://tsmithcode.github.io/omniserve/")
