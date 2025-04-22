#!/bin/bash

set -e
LOG_FILE="install_devops_tools.log"

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
echo -e "\033[1;34m╔════════════════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;34m║\033[0m                                                                      \033[1;34m║\033[0m"
echo -e "\033[1;34m║\033[0m   \033[1;32m🚀  ProDevOpsGuy DevOps Tool Installer - Simplify Your Setup!  \033[0m   \033[1;34m║\033[0m"
echo -e "\033[1;34m║\033[0m                                                                      \033[1;34m║\033[0m"
echo -e "\033[1;34m╚════════════════════════════════════════════════════════════════════════╝\033[0m"
echo ""
echo -e "  \033[1;33m🔹 Easily install top DevOps tools like Docker, K8s, Ansible, and more.\033[0m"
echo -e "  \033[1;33m🔹 Smart detection of your OS and package manager (apt, yum, etc).\033[0m"
echo -e "  \033[1;33m🔹 Select tools via interactive checklist (whiptail or fallback).\033[0m"
echo -e "  \033[1;33m🔹 Enhanced logs with emojis for clarity and fun. 😎\033[0m"
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

# Ensure dependencies
install_dependencies() {
    log "${INFO} Installing required dependencies..."
    case "$PKG_MANAGER" in
        apt-get) sudo $PKG_MANAGER update && sudo $PKG_MANAGER install -y curl wget unzip whiptail ;;
        yum | dnf) sudo $PKG_MANAGER install -y curl wget unzip newt ;;
        pacman) sudo $PKG_MANAGER -Sy --noconfirm curl wget unzip newt ;;
        zypper) sudo $PKG_MANAGER install -y curl wget unzip dialog ;;
        apk) sudo $PKG_MANAGER add --no-cache curl wget unzip dialog ;;
    esac
}

# Check if tool is installed
is_installed() {
    command -v "$1" >/dev/null 2>&1
}

install_tool() {
    local tool="$1"
    local cmd="$2"

    if is_installed "$tool"; then
        log "${YELLOW}⚠️ $tool is already installed. Skipping.${RESET}"
        return
    fi

    log "${INFO} Installing $tool..."

    case "$tool" in
        awscli)
            if [[ -d "/usr/local/aws-cli" ]]; then
                log "${YELLOW}⚠️ AWS CLI already installed. Attempting update...${RESET}"
                eval "${cmd} --update" && log "${SUCCESS} AWS CLI updated." || log "${FAIL} Failed to update AWS CLI."
            else
                eval "$cmd" && log "${SUCCESS} AWS CLI installed." || log "${FAIL} Failed to install AWS CLI."
            fi
            ;;
        
        # Add similar special handling below as needed:
        # terraform)
        #     # logic for existing terraform version cleanup if needed
        #     ;;
        
        *)
            # Default install logic for all other tools
            eval "$cmd" && log "${SUCCESS} $tool installed successfully." || log "${FAIL} Failed to install $tool."
            ;;
    esac
}

# Tool install commands (DO NOT MODIFY THIS)
declare -A INSTALL_CMDS=(
    [docker]="sudo $PKG_MANAGER install -y docker"
    [kubectl]="curl -LO https://dl.k8s.io/release/stable.txt && curl -LO https://dl.k8s.io/\$(cat stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/"
    [ansible]="sudo $PKG_MANAGER install -y ansible"
    [terraform]="curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null && echo 'deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com \$(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/hashicorp.list > /dev/null && sudo $PKG_MANAGER update && sudo $PKG_MANAGER install -y terraform"
    [helm]="curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"
    [awscli]="curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscli.zip && unzip awscli.zip && sudo ./aws/install"
    [azurecli]="curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    [gcloud]="curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-346.0.0-linux-x86_64.tar.gz && tar -xvzf google-cloud-sdk-346.0.0-linux-x86_64.tar.gz && ./google-cloud-sdk/install.sh"
    [grafana]="sudo $PKG_MANAGER install -y grafana"
    [gitlab-runner]="curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64 && chmod +x /usr/local/bin/gitlab-runner"
    [istio]="curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.18.0 sh - && sudo mv istio-1.18.0/bin/istioctl /usr/local/bin/"
    [openshift]="curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-linux.tar.gz && tar -xvf openshift-client-linux.tar.gz && sudo mv oc /usr/local/bin/ && sudo mv kubectl /usr/local/bin/"
    [minikube]="curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube"
    [packer]="curl -LO https://releases.hashicorp.com/packer/1.9.2/packer_1.9.2_linux_amd64.zip && unzip packer_1.9.2_linux_amd64.zip && sudo mv packer /usr/local/bin/"
    [jenkins]="sudo $PKG_MANAGER install -y jenkins"
    [vault]="curl -LO https://releases.hashicorp.com/vault/1.7.0/vault_1.7.0_linux_amd64.zip && unzip vault_1.7.0_linux_amd64.zip && sudo mv vault /usr/local/bin/"
    [consul]="curl -LO https://releases.hashicorp.com/consul/1.9.4/consul_1.9.4_linux_amd64.zip && unzip consul_1.9.4_linux_amd64.zip && sudo mv consul /usr/local/bin/"
)

# Group tools by category
declare -A TOOL_CATEGORIES=(
    [Cloud]="awscli azurecli gcloud"
    [Containers]="docker kubectl helm openshift istio minikube"
    [IaC]="terraform ansible packer vault consul"
    [CI/CD]="gitlab-runner jenkins"
    [Monitoring]="grafana"
)

# Whiptail-based checklist
show_tool_checklist() {
    OPTIONS=""
    for CATEGORY in "${!TOOL_CATEGORIES[@]}"; do
        for TOOL in ${TOOL_CATEGORIES[$CATEGORY]}; do
            OPTIONS+="$TOOL "$CATEGORY" off "
        done
    done

    SELECTED=$(whiptail --title "DevOps Tool Installer"         --checklist "Select tools to install (use spacebar to select):" 25 78 16         $OPTIONS 3>&1 1>&2 2>&3)

    echo "$SELECTED"
}

# CLI fallback
cli_tool_prompt() {
    echo "Enter tool names to install (space-separated). Options:"
    for CATEGORY in "${!TOOL_CATEGORIES[@]}"; do
        echo "- $CATEGORY: ${TOOL_CATEGORIES[$CATEGORY]}"
    done
    read -rp "Your selection: " selection
    echo "$selection"
}

# === MAIN ===
detect_os
install_dependencies

if command -v whiptail >/dev/null 2>&1; then
    SELECTED_TOOLS=$(show_tool_checklist)
else
    SELECTED_TOOLS=$(cli_tool_prompt)
fi

# Clean up input
SELECTED_TOOLS=$(echo "$SELECTED_TOOLS" | tr -d '"')

for TOOL in $SELECTED_TOOLS; do
    if [[ -n "${INSTALL_CMDS[$TOOL]}" ]]; then
        install_tool "$TOOL" "${INSTALL_CMDS[$TOOL]}"
    else
        log "${YELLOW}⚠️ Unknown tool: $TOOL. Skipping.${RESET}"
    fi
done

log "${SUCCESS} All operations completed."
echo -e "\n🎉 ${GREEN}Installation finished. See $LOG_FILE for details.${RESET}"
echo "############################################################################"
echo "#                                                                          #"
echo "#      🚀 DevOps Tool Installer by ProDevOpsGuy Tech                      #"
echo "#                                                                          #"
echo "############################################################################"
echo ""
echo "🔹 For more tools and scripts, visit: https://github.com/notharshhaa       🔹"
