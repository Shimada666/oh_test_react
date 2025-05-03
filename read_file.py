# Script to read the content of ../test.txt
import os

def read_file_content(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            return content
    except FileNotFoundError:
        return "Error: File not found."
    except Exception as e:
        return f"Error reading file: {str(e)}"

# Get the absolute path to the file
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(os.path.dirname(current_dir), 'test.txt')

# Read and print the content
content = read_file_content(file_path)
print(f"Content of ../test.txt:")
print(content)