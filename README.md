# Publisher Next

A data privacy first prototype to break our chains to WordPress.

## Setup

1. [Install Devbox](https://www.jetpack.io/devbox/docs/quickstart/)
2. Run `devbox install` to install all runtime dependencies
3. Run `devbox run bootstrap` to install all dependencies

## Development

1. Start the server: `devbox run server`
2. Start the client: `devbox run client`
3. Happy development 😘

> Tip: Use `devbox shell` to open a development shell

## Authentication Flow

- Podlove Publisher creates the following url in the banner: `https://my-wordpress-domain.example/wp-admin/authorize-application.php?app_name=Podlove Onboarding Wizard&app_id=e5218c66-6a0b-469a-b979-9892b8a628e6&success_url=https://onboarding.podlove.org/#/wizard`

- After clicking "authenticate" it will redirect to with the params:
  - site_url: `https://my-wordpress-domain.example`
  - user_login: `admin`
  - password: `EJNH tnhv ah6j PS0y U9c8 2aZF`
