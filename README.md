# Sentry Breadcrumb Example

Clone the repo, edit the Sentry key in `public/index.html`, and then run the following:

```
npm install
npm run build
serve -s build
```

Clicking some of the redux buttons and then clicking the button to trigger an error will send a report to sentry.

Expected: The report contains the redux actions as breadcrumbs

Actual: No breadcrumbs recorded
