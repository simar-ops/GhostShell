#!/bin/bash

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
