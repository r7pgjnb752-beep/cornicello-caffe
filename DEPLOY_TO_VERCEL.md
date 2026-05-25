# Deploy Cornicello Caffe to Vercel

This site is static HTML/CSS/images, so Vercel does not need a build step.

## 1. Put the site in GitHub

Create a new GitHub repository, then push this folder to it.

## 2. Import into Vercel

In Vercel, choose New Project and import the GitHub repository.

Use:

- Framework Preset: Other
- Build Command: leave blank
- Output Directory: leave blank unless Vercel asks, then use `.`

Vercel will provide a temporary `vercel.app` preview URL.

## 3. Add the live domain

In the Vercel project, open Settings, then Domains.

Add both:

- `www.cornicellocaffe.ca`
- `cornicellocaffe.ca`

Set `www.cornicellocaffe.ca` as the primary domain if you want the public site to stay on the same URL people already know.

## 4. Update DNS at Squarespace

If Squarespace manages the domain DNS, open the domain's DNS settings there.

Use the exact DNS values Vercel shows for the project. Typically this means:

- `www` as a CNAME to the Vercel-provided CNAME target
- `@` or root/apex as an A record to the Vercel-provided IP address

Remove conflicting Squarespace website records for `www` and `@`, but keep email records such as MX, SPF, DKIM, and DMARC.

## 5. Verify

Back in Vercel, wait for the domain to show as valid. SSL usually finishes automatically after DNS resolves.

Once `https://www.cornicellocaffe.ca` loads the Vercel site, the Squarespace website plan can be retired if it is no longer needed. Keep the domain registration active wherever the domain is registered.
