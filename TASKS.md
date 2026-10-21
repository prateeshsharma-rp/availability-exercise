# Availability API — Exercise

This is a live pairing exercise, about 60 minutes with an interviewer. Think out loud, ask
questions, and state your assumptions. No write-up is required.

The exercise is not designed to be finished in the time available. Get as far as you can and
explain your choices as you go. Setup instructions are in [`README.md`](README.md).

Spend about 35 minutes exploring the problem and implementing. By the end of that time, your
changes should be ready to review as a PR. The remaining time will be used for follow-ups and
discussion.

## The problem

The company sells products at resort properties. Today the system handles inventory products with
a daily count: "Pool Day Pass — 35 of 50 available on 2024-03-15".

You are adding spa services from a 3rd-party provider. Those run on time slots: "60-Minute
Swedish Massage — 09:00, 10:00, 14:00". Integrate the provider's data and serve both product
types from one API.

## What's provided

- **Schema** — four tables, created by `migrations/`. You may add migrations.
- **Seed data** — three inventory products with inventory for 2024-03-15 (see below). No spa
  products or time slots are seeded.
- **A working endpoint** — `GET /api/availability` serves inventory products.
- **The vendor API** — hosted. Request docs in [`mock-api/API.md`](mock-api/API.md); a captured
  response in `mock-api/example-response.json`.
- **Test scaffolding** — Jest + supertest, with a DB helper and passing examples. `nock` is
  installed.

### Project layout

| Path                    | Contents                                                    |
|-------------------------|-------------------------------------------------------------|
| `src/`                  | Express app: `routes/`, `services/`, `repositories/`, `types/` |
| `migrations/`, `seeds/` | knex migrations and seed data (SQLite)                      |
| `tests/`                | Jest + supertest, with a DB helper in `tests/helpers/db.ts` |
| `mock-api/`             | Vendor API docs and a captured response                     |
| `docs/`                 | Reference screenshots                                       |

### Schema

Read `migrations/` for the full definitions.

| Table                      | Purpose                                                            |
|----------------------------|--------------------------------------------------------------------|
| `products`                 | Catalog for all product types. `external_id` is the public ID.     |
| `inventory`                | Daily counts per product: `total_quantity`, `available_quantity`.  |
| `product_timeslots`        | Per-slot rows: `date`, `start_time`, `end_time`, `available`.      |
| `product_timeslot_details` | 1:1 extension of a slot: provider name/ID, gender, `external_id`.  |

### Seeded data

Inventory rows exist for **2024-03-15** only.

| external_id     | Name                    | Total | Available |
|-----------------|-------------------------|-------|-----------|
| `pool-pass-001` | Pool Day Pass - Weekday | 50    | 35        |
| `cabana-001`    | Poolside Cabana         | 10    | 3         |
| `gym-pass-001`  | Fitness Center Day Pass | 100   | 87        |

### Current response

`GET /api/availability?productId={external_id}&date={YYYY-MM-DD}` returns:

```json
{
  "productId": "pool-pass-001",
  "productName": "Pool Day Pass - Weekday",
  "date": "2024-03-15",
  "availability": { "available": 35, "total": 50 }
}
```

Errors are `{error, message}`: 400 for a missing or malformed parameter, 404 for an unknown
product. You may change this response shape.

## Your tasks

1. **Extend the availability endpoint.** `GET /api/availability` should serve both time-slotted
   and non-time-slotted products.

2. **Integrate the vendor.** Fetch from the SpaBooking API and store what your endpoint needs.
   Think through what should happen when the vendor is slow, down, or returns something you did
   not expect.
