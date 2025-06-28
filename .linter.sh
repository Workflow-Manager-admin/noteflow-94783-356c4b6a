#!/bin/bash
cd /home/kavia/workspace/code-generation/noteflow-94783-356c4b6a/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

