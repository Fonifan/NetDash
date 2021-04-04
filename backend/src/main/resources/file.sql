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
      new.fileTypeMismatch
      new.flowKey
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
