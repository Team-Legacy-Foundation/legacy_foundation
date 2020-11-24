
-- For IT OPS to do here: create user lcf_web_app_user with a strong password.
-- This will also need to be configured as an environment variable in the hosting
-- platform, e.g.,
-- DATABASE_URL=postgresql://lcf_web_app_user@<server>:<user-pwd>@<server-network-path>/<db-name>
create user lcf_web_app_user with password '<user-pwd>';

grant all on all tables    in schema "public" to lcf_web_app_user;
grant all on all sequences in schema "public" to lcf_web_app_user;
grant execute on all procedures in schema "public" to lcf_web_app_user;
