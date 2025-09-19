#!/bin/bash
cd /home/kavia/workspace/code-generation/kavia-ai-crm-platform-87080-87090/crm_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

