# Git

Distributed version control system for tracking changes in source code

## Requirements

- Any operating system (Windows, Linux, macOS)
- Internet connectivity for installation and repository operations
- Text editor for configuration

## Linux Installation

1. Update package index:
```bash
sudo apt update
```

2. Install Git:
```bash
sudo apt install git
```

3. Verify installation:
```bash
git --version
```

4. Configure Git:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Windows Installation

1. Download Git:
- Visit [Git for Windows](https://git-scm.com/download/windows)
- Download the latest version

2. Run installer:
- Double-click the downloaded .exe file
- Follow installation wizard
- Use recommended settings

3. Verify installation:
```powershell
git --version
```

4. Configure Git:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Basic Configuration

1. Set default branch name:
```bash
git config --global init.defaultBranch main
```

2. Set default editor:
```bash
git config --global core.editor "code --wait"  # For VS Code
```

3. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

4. Start SSH agent and add key:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## Common Commands

```bash
# Initialize repository
git init

# Clone repository
git clone <repository-url>

# Add files
git add <file>
git add .  # Add all files

# Commit changes
git commit -m "Commit message"

# Push changes
git push origin main

# Pull changes
git pull origin main

# Create branch
git checkout -b feature-branch

# Switch branch
git checkout main

# Merge branch
git merge feature-branch

# View status
git status

# View log
git log
```

## Git Credential Storage

### Linux
```bash
# Store credentials in memory for 15 minutes
git config --global credential.helper cache

# Store credentials permanently
git config --global credential.helper store
```

### Windows
```powershell
# Store credentials in Windows Credential Manager
git config --global credential.helper wincred
```

## Uninstallation Instructions

### Linux

1. Remove Git:
```bash
sudo apt remove git
sudo apt autoremove
```

2. Remove configuration:
```bash
rm -rf ~/.git
rm ~/.gitconfig
```

### Windows

1. Uninstall via Control Panel:
- Open Control Panel
- Programs and Features
- Select Git
- Click Uninstall

2. Remove configuration:
```powershell
Remove-Item -Path "$env:USERPROFILE\.gitconfig"
Remove-Item -Recurse -Force -Path "$env:USERPROFILE\.git"
``` 