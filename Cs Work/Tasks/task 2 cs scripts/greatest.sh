#!/bin/bash

echo "Enter first number:"
read a

echo "Enter second number:"
read b

echo "Enter third number:"
read c

if (( a >= b && a >= c )); then
  echo "First number is greatest"
elif (( b >= a && b >= c )); then
  echo "Second number is greatest"
else
  echo "Third number is greatest"
fi
