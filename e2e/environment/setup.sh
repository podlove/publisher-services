#!/usr/bin/env bash
wp core install --allow-root --url=localhost:8080 --title="WP-CLI" --admin_user=$WORDPRESS_USER --admin_password=$WORDPRESS_PASSWORD --admin_email=admin@local.local
wp config --allow-root set PODLOVE_ONBOARDING http://localhost:8000/onboarding/
