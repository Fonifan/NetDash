create table if not exists pcap (
    sourceIp        text,
    destinationIp   text,
    sourcePort      int,
    destinationPort int,
    packetTime      bigint,
    protocol        text,
    octets          int,
    name            text not null
);

create or replace function before_insert_on_pcap()
    returns trigger
    language plpgsql as
$$
begin

    execute format(
      $f$
            create table if not exists %I (
            check (name = %L)
            ) inherits (pcap)
        $f$,
      concat('pcap_', new.name),
      new.name);
    execute format(
      $f$
            insert into %I
            values (%L,%L,%L,%L,%L,%L,%L,%L)
        $f$,
      concat('pcap_', new.name),
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

DROP TRIGGER IF EXISTS before_insert_on_pcap on public.pcap;

create trigger before_insert_on_pcap
    before insert
    on pcap
    for each row
execute procedure before_insert_on_pcap();

