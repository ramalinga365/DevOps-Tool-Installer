# devops.ps1 - DevOps Tool Manager by ProDevOpsGuy

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║                                                                       ║" -ForegroundColor Cyan
    Write-Host "║       🚀 DevOps Tool Manager by ProDevOpsGuy Tech                     ║" -ForegroundColor Cyan
    Write-Host "║                                                                       ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Show-Menu {
    Write-Host "📦 What would you like to do?" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "  [1] ➕ Install DevOps Tools" -ForegroundColor Green
    Write-Host "  [2] ➖ Uninstall DevOps Tools" -ForegroundColor Red
    Write-Host "  [3] ❌ Exit" -ForegroundColor Yellow
    Write-Host ""
}

function Run-Script {
    param (
        [string]$relativePath,
        [string]$scriptType
    )
    $scriptPath = Join-Path -Path $PSScriptRoot -ChildPath $relativePath

    if (Test-Path $scriptPath) {
        Write-Host "`n⚙️ Launching $scriptType script..." -ForegroundColor Cyan
        . $scriptPath
    } else {
        Write-Host "`n❗ $scriptType script not found at: $scriptPath" -ForegroundColor Red
    }
}

# Main Program
Show-Banner
Show-Menu

$choice = Read-Host -Prompt "👉 Enter your choice (1/2/3)"

switch ($choice) {
    "1" { Run-Script -relativePath "scripts/install_devops_tools.ps1" -scriptType "Installer" }
    "2" { Run-Script -relativePath "scripts/uninstall_devops_tools.ps1" -scriptType "Uninstaller" }
    "3" { Write-Host "`n👋 Exiting... Have a productive DevOps day!" -ForegroundColor Yellow; exit }
    default {
        Write-Host "`n⚠️ Invalid choice. Please run the script again and select a valid option." -ForegroundColor Red
    }
}
