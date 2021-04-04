create table if not exists conversation (
    sourceIp        text,
    destinationIp   text,
    sourcePort      int,
    destinationPort int,
    packetTime      bigint,
    protocol        text,
    octets          int,
    name            text not null
);

create or replace function before_insert_on_conversation()
    returns trigger
    language plpgsql as
    $$
begin

    execute format(
      $f$
            create table if not exists %I (
            check (name = %L)
            ) inherits (conversation)
        $f$,
      concat('c_', new.name),
      new.name);
    execute format(
      $f$
            insert into %I
            values (%L,%L,%L,%L,%L,%L,%L,%L)
        $f$,
      concat('c_', new.name),
      new.sourceIp,
      new.destinationIp,
      new.sourcePort,
      new.destinationPort,
      new.packetTime,
      new.protocol,
      new.octets,
      new.name);
    return null;
end;
$$;

DROP TRIGGER IF EXISTS before_insert_on_conversation on public.conversation;

create trigger before_insert_on_conversation
    before insert
    on conversation
    for each row
execute procedure before_insert_on_conversation();
