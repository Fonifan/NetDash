-- region Conversation
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
-- endregion Conversation
-- region File
create table if not exists file (
    timestamp        bigint,
    application      text,
    client           text,
    contentType      text,
    fileType         text,
    server           text,
    contentLength    int,
    exportedPath     text,
    fileTypeMismatch text,
    flowKey          text,
    name             text not null
);

create or replace function before_insert_on_file()
    returns trigger
    language plpgsql as
$$
begin

    execute format(
      $f$
            create table if not exists %I (
            check (name = %L)
            ) inherits (file)
        $f$,
      concat('f_', new.name),
      new.name);
    execute format(
      $f$
            insert into %I
            values (%L,%L,%L,%L,%L,%L,%L,%L,%L,%L,%L)
        $f$,
      concat('f_', new.name),
      new.timestamp,
      new.application,
      new.client,
      new.contentType,
      new.fileType,
      new.server,
      new.contentLength,
      new.exportedPath,
      new.fileTypeMismatch,
      new.flowKey,
      new.name);
    return null;
end;
$$;

DROP TRIGGER IF EXISTS before_insert_on_file on public.file;

create trigger before_insert_on_file
    before insert
    on file
    for each row
execute procedure before_insert_on_file();
-- endregion File
-- region Encrypted
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
      new.ja3Server,
      new.revRecords,
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
-- endregion Encrypted
-- region Domain
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
      new.resolvedTo,
      new.rtt,
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
-- endregion Domain
