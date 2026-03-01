#!/bin/bash

# Function to display the menu
show_menu() {
    echo "--------------------------------"
    echo "   EOKA Website Manager"
    echo "--------------------------------"
    echo "1) Run Emulator (Localhost)"
    echo "2) Deploy to Firebase"
    echo "3) Exit"
    echo ""
    read -p "Select an option [1-3]: " choice

    case $choice in
        1)
            echo "Starting Firebase Emulator..."
            # Starts the emulator for hosting. 
            # You can add --open to automatically open the browser.
            firebase emulators:start --only hosting
            ;;
        2)
            echo "Deploying to Firebase..."
            firebase deploy --only hosting
            ;;
        3)
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
        *)
            echo "Usage: $0 [host|deploy]"
            exit 1
            ;;
    esac
fi