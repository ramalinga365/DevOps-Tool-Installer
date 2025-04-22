#!/bin/bash

set -e

# === Config ===
TIMESTAMP=$(date "+%Y%m%d_%H%M%S")
LOG_DIR="logs/uninstall_$TIMESTAMP"
LOG_FILE="$LOG_DIR/uninstall.log"
DRY_RUN=false

mkdir -p "$LOG_DIR"

# Emojis and colors
GREEN="\033[1;32m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
RESET="\033[0m"
SUCCESS="${GREEN}✅${RESET}"
FAIL="${RED}❌${RESET}"
INFO="${BLUE}ℹ️${RESET}"

# Welcome Banner
clear
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BLUE}║${RESET}                                                                      ${BLUE}║${RESET}"
echo -e "${BLUE}║${RESET}   ${GREEN}🔥 ProDevOpsGuy DevOps Tool Uninstaller - Clean With Confidence! ${RESET}   ${BLUE}║${RESET}"
echo -e "${BLUE}║${RESET}                                                                      ${BLUE}║${RESET}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  ${YELLOW}🔸 Remove DevOps tools with cleanup of configs and services.${RESET}"
echo -e "  ${YELLOW}🔸 Logs stored at ${LOG_FILE}.${RESET}"
echo -e "  ${YELLOW}🔸 Use \`--dry-run\` to simulate uninstallation.${RESET}"
echo ""

# Log function
log() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# OS and package manager detection
detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$ID
    else
        OS=$(uname -s)
    fi

    case "$OS" in
        ubuntu | debian | zorin) PKG_MANAGER="apt-get" ;;
        centos | rhel | fedora | amazon) PKG_MANAGER="yum" ;;
        arch) PKG_MANAGER="pacman" ;;
        opensuse | sles) PKG_MANAGER="zypper" ;;
        alpine) PKG_MANAGER="apk" ;;
        *) log "${FAIL} Unsupported OS: $OS" && exit 1 ;;
    esac
    log "${INFO} Detected OS: $OS, using package manager: $PKG_MANAGER"
}

# Dry run notice
run_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY RUN] $1"
    else
        eval "$1"
    fi
}

# Uninstall commands per tool
declare -A UNINSTALL_CMDS=(
    [docker]="sudo systemctl stop docker; sudo $PKG_MANAGER remove -y docker*; sudo rm -rf /var/lib/docker /etc/docker"
    [kubectl]="sudo rm -f /usr/local/bin/kubectl"
    [ansible]="sudo $PKG_MANAGER remove -y ansible"
    [terraform]="sudo $PKG_MANAGER remove -y terraform; sudo rm -f /usr/local/bin/terraform"
    [helm]="sudo rm -f /usr/local/bin/helm"
    [awscli]="sudo rm -rf /usr/local/aws /usr/local/bin/aws"
    [azurecli]="sudo $PKG_MANAGER remove -y azure-cli"
    [gcloud]="sudo rm -rf /usr/local/google-cloud-sdk"
    [grafana]="sudo systemctl stop grafana-server; sudo $PKG_MANAGER remove -y grafana; sudo rm -rf /etc/grafana /var/lib/grafana"
    [gitlab-runner]="sudo gitlab-runner uninstall; sudo rm -f /usr/local/bin/gitlab-runner"
    [istio]="sudo rm -f /usr/local/bin/istioctl"
    [openshift]="sudo rm -f /usr/local/bin/oc /usr/local/bin/kubectl"
    [minikube]="sudo rm -f /usr/local/bin/minikube"
    [packer]="sudo rm -f /usr/local/bin/packer"
    [jenkins]="sudo systemctl stop jenkins; sudo $PKG_MANAGER remove -y jenkins; sudo rm -rf /var/lib/jenkins /etc/jenkins"
    [vault]="sudo rm -f /usr/local/bin/vault"
    [consul]="sudo rm -f /usr/local/bin/consul"
)

# Group tools by category
declare -A TOOL_CATEGORIES=(
    [Cloud]="awscli azurecli gcloud"
    [Containers]="docker kubectl helm openshift istio minikube"
    [IaC]="terraform ansible packer vault consul"
    [CI/CD]="gitlab-runner jenkins"
    [Monitoring]="grafana"
)

# Gum-based checklist UI
show_tool_checklist() {
    local tool_list=()
    for CATEGORY in "${!TOOL_CATEGORIES[@]}"; do
        for TOOL in ${TOOL_CATEGORIES[$CATEGORY]}; do
            tool_list+=("$TOOL ($CATEGORY)")
        done
    done

    SELECTED=$(printf "%s\n" "${tool_list[@]}" | gum choose --no-limit --height=20 --header="Select tools to uninstall:")

    for item in $SELECTED; do
        echo "$item" | awk '{print $1}'
    done
}

# CLI fallback
cli_tool_prompt() {
    echo "Enter tool names to uninstall (space-separated). Options:"
    for CATEGORY in "${!TOOL_CATEGORIES[@]}"; do
        echo "- $CATEGORY: ${TOOL_CATEGORIES[$CATEGORY]}"
    done
    read -rp "Your selection: " selection
    echo "$selection"
}

# === MAIN ===

# Check for dry run
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    log "${INFO} Dry run enabled. No changes will be made."
fi

detect_os

# Check gum or fallback
if command -v gum >/dev/null 2>&1; then
    SELECTED_TOOLS=$(show_tool_checklist)
else
    SELECTED_TOOLS=$(cli_tool_prompt)
fi

SELECTED_TOOLS=$(echo "$SELECTED_TOOLS" | tr -d '"')

for TOOL in $SELECTED_TOOLS; do
    if [[ -n "${UNINSTALL_CMDS[$TOOL]}" ]]; then
        log "${INFO} Uninstalling $TOOL..."
        run_cmd "${UNINSTALL_CMDS[$TOOL]}" \
            && log "${SUCCESS} $TOOL uninstalled successfully." \
            || log "${FAIL} Failed to uninstall $TOOL."
    else
        log "${YELLOW}⚠️ Unknown tool: $TOOL. Skipping.${RESET}"
    fi
done

log "${SUCCESS} Uninstallation complete."
echo -e "\n📁 Logs saved in: ${BLUE}$LOG_FILE${RESET}"
echo -e "🧹 ${GREEN}Cleanup done. You're all set!${RESET}"
echo ""
echo "############################################################################"
echo "#                                                                          #"
echo "#     🧹 DevOps Tool Uninstaller by ProDevOpsGuy Tech                     #"
echo "#                                                                          #"
echo "############################################################################"
echo ""
echo "🔸 For more tools and scripts, visit: https://github.com/notharshhaa       🔸"
