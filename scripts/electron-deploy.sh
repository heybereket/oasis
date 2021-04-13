# Add all files 
git add -A

# Make a commit
git commit -m "trigger build"

# Change branch to prod
git checkout prod

# Merge staging into prod
git merge staging

# Push all changes to GitHub
git push origin prod

# Go back to staging
git checkout staging