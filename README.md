# Splunk Connector
[![Build Status](https://travis-ci.org/Reekoh/splunk-connector.svg)](https://travis-ci.org/Reekoh/splunk-connector)
![Dependencies](https://img.shields.io/david/Reekoh/splunk-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/splunk-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Splunk Connector Plugin for the Reekoh IoT Platform. Integrates a Reekoh Instance with Splunk to synchronize device data.

## Description
This plugin saves all devices' data from the Reekoh Instance to Splunk.

## Configuration
To configure this plugin a Splunk account and enabled HTTP Event Collector are needed to provide the following:

1. Token - The HTTP Event collector token to use.
2. URL - The Splunk instance URL.

These parameters are then injected to the plugin from the platform.