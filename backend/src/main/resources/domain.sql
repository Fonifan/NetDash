create table if not exists domain (
    timestamp  bigint,
    alexa      bool,
    client     text,
    dga        text,
    category   text,
    domain     text,
    status     text,
    flowKey    text,
    resolvedTo text,
    rtt        int,
    server     text,
    name       text not null
);

create or replace function before_insert_on_domain()
    returns trigger
    language plpgsql as
$$
begin

    execute format(
      $f$
            create table if not exists %I (
            check (name = %L)
            ) inherits (domain)
        $f$,
      concat('d_', new.name),
      new.name);
    execute format(
      $f$
            insert into %I
            values (%L,%L,%L,%L,%L,%L,%L,%L,%L,%L,%L)
        $f$,
      concat('d_', new.name),
      new.timestamp,
      new.alexa,
      new.client,
      new.dga,
      new.category,
      new.domain,
      new.status,
      new.flowKey,
      new.resolvedTo
      new.rtt
      new.server,
      new.name);
    return null;
end;
$$;

DROP TRIGGER IF EXISTS before_insert_on_domain on public.domain;

create trigger before_insert_on_domain
    before insert
    on domain
    for each row
execute procedure before_insert_on_domain();
