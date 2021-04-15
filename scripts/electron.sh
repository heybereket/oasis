
#!/bin/bash
cd desktop

# Assign the filename
filename="build-logs/build.txt"

echo "trigger build" >> $filename
git add -A
git commit -m "trigger build"
git push origin staging
cd ../