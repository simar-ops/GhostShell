#!/bin/bash
# To write a script through which we can check file exists and readable , file exists but no permission and file not found
echo "Enter file path:"
read file

if [ -f "$file" ]; then
  if [ -r "$file" ]; then
    echo "File exists and readable"
  else
    echo "File exists but no read permission"
  fi
else
  echo "Not Found"
fi
