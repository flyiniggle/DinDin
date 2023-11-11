#!/usr/bin/env bash
export DOCKER_BUILDKIT=1

echo Enter version number:

read version

echo $version

docker build -f Dockerfile -t flyiniggle/dindin-data-store:$version ../../