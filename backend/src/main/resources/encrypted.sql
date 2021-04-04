create table if not exists encrypted (
    timestamp   bigint,
    client      text,
    alpn        text,
    cipherSuite text,
    duration    int,
    flowKey     text,
    fwdRecords  int,
    ja3Client   text,
    ja3Server   text,
    revRecords  int,
    serverName  text,
    version     text,
    name        text not null
);

create or replace function before_insert_on_encrypted()
    returns trigger
    language plpgsql as
$$
begin

    execute format(
      $f$
            create table if not exists %I (
            check (name = %L)
            ) inherits (encrypted)
        $f$,
      concat('e_', new.name),
      new.name);
    execute format(
      $f$
            insert into %I
            values (%L,%L,%L,%L,%L,%L,%L,%L,%L,%L,%L,%L)
        $f$,
      concat('e_', new.name),
      new.timestamp,
      new.client,
      new.alpn,
      new.cipherSuite,
      new.duration,
      new.flowKey,
      new.fwdRecords,
      new.ja3Client,
      new.ja3Server
      new.revRecords
      new.serverName,
      new.version,
      new.name);
    return null;
end;
$$;

DROP TRIGGER IF EXISTS before_insert_on_encrypted on public.encrypted;

create trigger before_insert_on_encrypted
    before insert
    on encrypted
    for each row
execute procedure before_insert_on_encrypted();
