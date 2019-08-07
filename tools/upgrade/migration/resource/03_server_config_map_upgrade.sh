#!/bin/bash
# Add the new parameter to server ConfigMap
# fetch the application.yml and append the new parameter
APP_YAML=$(python - <<EOF
import yaml
import os

def quoted_presenter(dumper, data):
    return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='"')

yaml.add_representer(str, quoted_presenter)

with os.popen("oc get configmap syndesis-server-config -o jsonpath='{.data.application\.yml}'") as stream:
  config = yaml.load(stream)
  config["knative"] = config.get("knative", dict())
  config["knative"]["enabled"] = False
  config["integrationLivenessProbeInitialDelaySeconds"] = config.get("integrationLivenessProbeInitialDelaySeconds", dict())
  config["integrationLivenessProbeInitialDelaySeconds"] = 120
  updated = yaml.dump(config, default_flow_style=False)
  print updated.replace('\n', "\\\n").replace('\"', '\\\"')
EOF
)
APP_YAML_PATCH="{ \"data\": { \"application.yml\": \"$APP_YAML\" } }"
oc patch configmap syndesis-server-config -p "$APP_YAML_PATCH"
