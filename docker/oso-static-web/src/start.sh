#!/bin/bash -e

# This is useful so we can debug containers running inside of OpenShift that are
# failing to start properly.
if [ "$OO_PAUSE_ON_START" = "true" ] ; then
  echo
  echo "This container's startup has been paused indefinitely because OO_PAUSE_ON_START has been set."
  echo
  while true ; do
    sleep 10
  done
fi

echo
echo 'Running Ansible playbook'
echo '------------------------'
ansible-playbook /root/config.yml

echo
echo 'Starting httpd'
echo '--------------'
LANG=C /usr/sbin/httpd -DFOREGROUND
