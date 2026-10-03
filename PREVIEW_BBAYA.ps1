$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
Start-Process 'http://127.0.0.1:8765/'
py -m http.server 8765
