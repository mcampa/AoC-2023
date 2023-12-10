#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $0 solution_number"
  exit 1
fi

number=$1
temp_dir=$(mktemp -d)

python_file_name="$number.py"

github_url="https://raw.githubusercontent.com/jonathanpaulson/AdventOfCode/master/2023/$python_file_name"

# Download the Python script to the temporary directory (silent)
curl -s -f -o "$temp_dir/$python_file_name" "$github_url"

# Check the exit status of curl
if [ $? -ne 0 ]; then
  echo "Solution is not available yet."
  exit 1
fi

# Run the Python script with the provided file path as a parameter
python3 "$temp_dir/$python_file_name" "./src/Dec$number/input.txt"

# Cleanup: Delete the temporary directory and its contents
rm -r "$temp_dir"