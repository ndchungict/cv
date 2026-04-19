# Nguyen Van A - CV Website

A personal CV website built with Jekyll, deployable to GitHub Pages.

## Local Development

### Prerequisites

- Ruby 3.0 or higher
- Bundler (`gem install bundler`)

### Setup

```bash
bundle install
```

### Run locally

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000/jekyll-cv-website`.

To serve with live reload:

```bash
bundle exec jekyll serve --livereload
```

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in your repository.
3. Under **Source**, select the `main` branch and click **Save**.
4. GitHub Pages will automatically build and deploy the site using Jekyll.
5. Your site will be available at `https://<username>.github.io/jekyll-cv-website`.

> **Note:** Update `url` and `baseurl` in `_config.yml` to match your GitHub username and repository name before deploying.

## `.nojekyll` Usage

By default, GitHub Pages runs Jekyll automatically on your repository. This project relies on that behavior.

If you ever pre-build the site locally and push the `_site/` directory directly (e.g., via a CI/CD pipeline), add a `.nojekyll` file to the root of the deployed branch to tell GitHub Pages to skip its own Jekyll processing:

```bash
touch .nojekyll
```

This is only needed when deploying pre-built static files. For standard Jekyll-based deployments (the default for this project), do **not** add `.nojekyll`.

## Updating CV Content

All CV content is stored in YAML files under `_data/`:

| File | Content |
|---|---|
| `_data/profile.yml` | Personal info, photo, summary, contact links |
| `_data/experience.yml` | Work history |
| `_data/education.yml` | Academic background |
| `_data/skills.yml` | Skills grouped by category |
| `_data/projects.yml` | Notable projects |
| `_data/i18n.yml` | UI labels for VI / EN / ZH |

Edit these files to update your CV without touching any HTML templates.
