# Agent Notes

## Product Brief

This app was originally requested as a responsive Angular app for residents in a bail house.

Core resident workflows:

- Submit absence requests.
- Sign out when leaving based on an approved absence request.
- Sign in when returning from an approved absence request.

Current related workflow:

- Residents can submit visitor requests when someone is coming to visit them.

## Technical Direction

- Use Angular and Ionic framework patterns already present in the codebase.
- Keep the implementation responsive across mobile, tablet, and desktop layouts.
- Prefer resident-facing, task-oriented screens over marketing-style pages.
- Keep flows simple and explicit: request, approval state, sign-out eligibility, sign-in completion.
- Preserve clear separation between page components, models, and services.

## Development Guidance

- Follow the existing project structure under `src/app`.
- Use Ionic UI components where they fit the interaction.
- Keep mock/sample data realistic for a bail-house absence and visitor request context.
- Avoid broad refactors unless they directly support the requested change.
- Check route changes carefully in `src/app/app.routes.ts`.

## Validation

Useful commands:

```bash
npm start
npm run build
```

Run the narrowest relevant validation after changes, and run a full build for routing, service, or model changes when practical.
