#!/bin/bash

clear

echo "Welcome $(whoami)"
echo "-------------------------"

echo "Date and Time:"
date
echo

echo "System Uptime:"
uptime
echo

echo "Last Login Details:"
last -n 3
echo

echo "Disk Usage:"
df -h
echo

echo "Memory Usage:"
free -h
echo

echo "Top CPU Processes:"
ps -eo pid,cmd,%cpu --sort=-%cpu | head -5
echo

echo "System information displayed successfully."
