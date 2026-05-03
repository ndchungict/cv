#!/bin/bash
# Chạy Jekyll local với baseurl rỗng (tránh lỗi CSS/assets)
bundle exec jekyll serve --config _config.yml,_config.local.yml --port 4001
