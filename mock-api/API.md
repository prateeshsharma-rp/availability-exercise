# SpaBooking API — v2.1.4

The 3rd-party vendor. It is hosted; there is nothing to start and no credentials are needed.

```
https://9a3t40rc5h.execute-api.us-west-2.amazonaws.com/prod
```

This is the value of `THIRD_PARTY_API_URL`. Read it from the environment rather than hardcoding it.

## Endpoints

| Endpoint                | Inputs                                       |
|-------------------------|----------------------------------------------|
| `GET /spa-availability` | `date` — query param, required, `YYYY-MM-DD` |

This is the whole API. There is no catalog endpoint; services are returned inside the
availability response.

```bash
curl "$THIRD_PARTY_API_URL/spa-availability?date=2024-03-15"
```

`mock-api/example-response.json` is a captured `?date=2024-03-15` response. Slot availability
can differ between requests for the same date.

## Triggering a failure

Add `?simulate=failure` and the vendor returns a 503 every time:

```bash
curl -i "$THIRD_PARTY_API_URL/spa-availability?date=2024-03-15&simulate=failure"
```
