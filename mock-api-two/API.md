# ResortActivities API — v1.2

A second 3rd-party vendor, also hosted with no credentials needed.

```
https://9a3t40rc5h.execute-api.us-west-2.amazonaws.com/prod
```

This is the value of `VENDOR_TWO_API_URL`. It is a separate vendor with its own contract, so read
it from its own variable.

## Endpoints

| Endpoint                          | Inputs                                                   |
|-----------------------------------|----------------------------------------------------------|
| `GET /v1/activities`              | — (returns the activity catalog)                         |
| `GET /v1/sessions`                | `day` — query param, required, `YYYY-MM-DD`              |
| `GET /v1/sessions/:activity_code` | `activity_code` — path param; `day` — query param        |

```bash
curl "$VENDOR_TWO_API_URL/v1/activities"
curl "$VENDOR_TWO_API_URL/v1/sessions?day=2024-03-15"
curl "$VENDOR_TWO_API_URL/v1/sessions/YOGA-SUNRISE?day=2024-03-15"
```

`activity_code` is case-sensitive. Each request covers one day.

Captured responses: `example-activities.json` (`/v1/activities`) and `example-sessions.json`
(`/v1/sessions?day=2024-03-15`). Availability can differ between requests for the same day.

## Triggering a failure

Add `?simulate=failure` to any endpoint and the vendor returns a 503 every time:

```bash
curl -i "$VENDOR_TWO_API_URL/v1/sessions?day=2024-03-15&simulate=failure"
```
