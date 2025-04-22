#!/bin/bash

# devops.sh - DevOps Tool Manager by ProDevOpsGuy Tech

# Function: Clear and show banner
show_banner() {
    clear
    echo ""
    echo -e "\033[0;36m╔═══════════════════════════════════════════════════════════════════════╗"
    echo -e "║                                                                       ║"
    echo -e "║       🚀 \033[1;31mWelcome to DevOps Tool Manager\033[0;36m                               ║"
    echo -e "║       \033[1;34mEffortlessly Manage Your DevOps Tools\033[0;36m                           ║"
    echo -e "║                                                                       ║"
    echo -e "╠═══════════════════════════════════════════════════════════════════════╣"
    echo -e "║       \033[1;32mCreated by: ProDevOpsGuy Tech\033[0;36m                                   ║"
    echo -e "║       \033[1;33mVersion: 1.0.0\033[0;36m                                                  ║"
    echo -e "╚═══════════════════════════════════════════════════════════════════════╝\033[0m"
    echo ""
}

# Function: Show main menu
show_menu() {
  echo -e "\033[0;35m📦 What would you like to do?\033[0m"
  echo ""
  echo -e "  \033[0;32m[1] ➕ Install DevOps Tools\033[0m"
  echo -e "  \033[0;31m[2] ➖ Uninstall DevOps Tools\033[0m"
  echo -e "  \033[0;33m[3] ❌ Exit\033[0m"
  echo ""
}

# Function: Run installer or uninstaller script
run_script() {
  local relative_path=$1
  local script_type=$2
  local full_path="$(dirname "$0")/$relative_path"

  if [[ -f "$full_path" ]]; then
    echo -e "\n⚙️ Launching $script_type script..."
    bash "$full_path"
  else
    echo -e "\n❗ $script_type script not found at: $full_path"
  fi
}

# Main Program Execution
show_banner
show_menu

read -p "👉 Enter your choice (1/2/3): " choice

case "$choice" in
  1)
    run_script "scripts/install_devops_tools.sh" "Installer"
    ;;
  2)
    run_script "scripts/uninstall_devops_tools.sh" "Uninstaller"
    ;;
  3)
    echo -e "\n👋 Exiting... Have a productive DevOps day!"
    exit 0
    ;;
  *)
    echo -e "\n⚠️ Invalid choice. Please run the script again and select a valid option."
    ;;
esac
