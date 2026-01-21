 #!/bin/bash

#User, Group and Login Management Script
# Name       : Simarpreet Singh
# Email      : simar27889@gmail.com
# Course     : Cloud and Devops Engineer
# Task       : User, Group and Login Details Script
# Date       : 21-01-2026

echo "Currently active user:"
who
echo "------------------------"

echo "Users currently logged in:"
whoami
echo "------------------------"

echo "Creating group: simargroup"
groupadd simargroup

echo "Creating user: simar"
useradd -m -s /bin/bash simar

echo "Adding simar to simargroup"
usermod -aG simargroup simar

echo "Setting password for simar"
passwd simar

echo "Unlocking user account"
usermod -U simar

echo "User details:"
id simar
echo "------------------------"

echo "Last login details of simar:"
last simar | head -5




