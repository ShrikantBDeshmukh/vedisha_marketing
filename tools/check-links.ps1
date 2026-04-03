$ErrorActionPreference = 'Stop'

$htmlFiles = Get-ChildItem -Recurse -Filter *.html
$missing = New-Object System.Collections.Generic.List[object]

foreach ($f in $htmlFiles) {
  $txt = Get-Content -Raw $f.FullName

  # Find src="..." and href="..." without using regex character classes that
  # can be mis-parsed by shells when inlined.
  $rx = [regex] '(src|href)="([^"]+)"'
  $matches = $rx.Matches($txt)

  foreach ($m in $matches) {
    $p = $m.Groups[2].Value

    if ($p -match '^(https?:|mailto:|tel:|#)') { continue }
    if ($p -match '^data:') { continue }

    $resolved = Join-Path $f.DirectoryName $p
    if (-not (Test-Path $resolved)) {
      $missing.Add([pscustomobject]@{
        file = $f.FullName
        ref  = $p
      }) | Out-Null
    }
  }
}

if ($missing.Count -eq 0) {
  'No missing local src/href refs found.'
} else {
  $missing | Sort-Object file, ref | Format-Table -AutoSize
  ''
  "Missing refs: $($missing.Count)"
}

