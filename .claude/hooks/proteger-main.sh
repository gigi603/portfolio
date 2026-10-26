#!/bin/bash
# Garde-fou PreToolUse (Bash) : bloque les force push, et les push ou fusions vers main.
# La publication sur main passe par la skill /publier, qui préfixe la commande par ACCORD_GILBERT=1
# seulement après le « oui, publie » explicite de Gilbert.
input=$(cat)
if [[ "$input" =~ git[[:space:]]+push[^\&\|\;]*(--force|[[:space:]]-f([[:space:]]|\")) ]]; then
  echo "Bloqué : pas de force push sur ce dépôt." >&2
  exit 2
fi
if [[ "$input" =~ git[[:space:]]+(push[^\&\|\;]*[[:space:]:]main|merge[^\&\|\;]*) ]] && [[ "$input" =~ (checkout|switch)[[:space:]]+main|push[^\&\|\;]*[[:space:]:]main ]]; then
  if [[ ! "$input" =~ ACCORD_GILBERT=1 ]]; then
    echo "Bloqué : main = site en ligne. Utilise /publier après l'accord explicite de Gilbert." >&2
    exit 2
  fi
fi
exit 0
