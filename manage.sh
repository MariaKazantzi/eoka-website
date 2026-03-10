#!/bin/bash

# Function to handle Python setup and execution
run_python_script() {
    echo "--------------------------------"
    echo "   Python Data Update"
    echo "--------------------------------"
    
    # Install dependencies globally if needed (suppressing warnings if already installed)
    echo "Ensuring requirements are installed..."
    pip install -r scripts/requirements.txt --break-system-packages --quiet

    # Run the scripts
    echo "Running read_data_doc.py..."
    python3 scripts/read_data_doc.py
    echo "Running write_data_to_html.py..."
    python3 scripts/write_data_to_html.py
}

# Function to display the menu
show_menu() {
    echo "--------------------------------"
    echo "   EOKA Website Manager"
    echo "--------------------------------"
    echo "1) Run Emulator (Localhost)"
    echo "2) Deploy to Firebase"
    echo "3) Update Data (Python)"
    echo "4) Exit"
    echo ""
    read -p "Select an option [1-4]: " choice

    case $choice in
        1)
            echo "Starting Firebase Emulator..."
            run_python_script
            firebase emulators:start --only hosting
            ;;
        2)
            echo "Deploying to Firebase..."
            run_python_script
            firebase deploy --only hosting
            ;;
        3)
            run_python_script
            ;;
        4)
            exit 0
            ;;
        *)
            echo "Invalid option."
            exit 1
            ;;
    esac
}

# Check if arguments are passed, otherwise show menu
if [ -z "$1" ]; then
    show_menu
else
    case "$1" in
        "host"|"emulator"|"local")
            firebase emulators:start --only hosting
            ;;
        "deploy")
            firebase deploy --only hosting
            ;;
        "update"|"python"|"data")
            run_python_script
            ;;
        *)
            echo "Usage: $0 [host|deploy|update]"
            exit 1
            ;;
    esac
fi