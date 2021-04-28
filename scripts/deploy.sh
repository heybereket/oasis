read -p "Deploy to production (y/n)? " -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Git pull from staging
  git pull origin staging

  # Add all files
  git add -A

  # Make a commit
  git commit -m "build"

  # Change branch to prod
  git checkout prod

  # Merge staging into prod
  git merge staging

  # Push all changes to GitHub
  git push origin prod --force

  # Go back to staging
  git checkout staging
fi
