-- auto-generated definition


create table onske
(
    onske_id   bigint generated by default as identity
        constraint table_name_pkey      primary key,
    user_id     uuid                                                              not null,
    navn        text                                                              not null,
    gyldig_fra_dato    timestamp,
    gyldig_til_dato    timestamp,
    kommentar   text,
    inserted_at timestamp with time zone default (now() AT TIME ZONE 'utc'::text) not null,
    updated_at  timestamp with time zone default (now() AT TIME ZONE 'utc'::text) not null
);

--alter table stevne
--    owner to supabase_admin;

-- grant delete, insert, references, select, trigger, truncate, update on stevne to postgres;
--
-- grant delete, insert, references, select, trigger, truncate, update on stevne to anon;
--
-- grant delete, insert, references, select, trigger, truncate, update on stevne to authenticated;
--
-- grant delete, insert, references, select, trigger, truncate, update on stevne to service_role;

