-- DELETE FROM  access_oauths; 
-- DELETE FROM  accounts;
-- DROP TABLE favorites_products;
-- SELECT * FROM access_oauths;
-- SELECT * FROM accounts; 
-- SELECT * FROM products; 
-- SELECT * FROM messages; 
-- SELECT * FROM discussions; 
SELECT * FROM votes; 
-- SELECT * FROM recommendation_accounts;
-- SELECT * FROM recommendation_products;
-- SELECT * FROM report_accounts;
-- SELECT * FROM report_products;

-- SELECT * FROM favorites_products;
-- SELECT * FROM favorites_accounts;

-- delete from `categories` where `id` = '63df2126-8000-4012-b59a-d09eac53326e';

-- insert into `products` 
--        (`account_id`,                         `caracteristique`, `category_id`                          , `created_at`      , `description`         , `express_time`        , `id`                                  , `last_appearance`     , `price`, `status`, `title`                    , `updated_at`)
--  values ('b9d72f26-8d4b-455d-b458-d7e18b5b83ba', '\"new\"'     , 'f81d1a02-fe10-4388-afd5-57b6ac43b77b', '2024-02-09 12:44:51', 'il n''y a pas mieux', '2024-02-09 12:44:51', 'a6e79d52-aee8-4e18-a95f-ed45c2b68225', '2024-02-09 12:44:51', 40         , 0         , 'zooo', '2024-02-09 12:44:51');
-- SELECT * FROM products; 
-- Appartement
-- Maison
-- Terrain

-- DROP TABLE votes;

-- CREATE TABLE IF NOT EXISTS "votes" (
-- 	"id"	char(36) NOT NULL,
-- 	"star"	integer NOT NULL,
-- 	"provider_account_id"	char(36) NOT NULL,
-- 	"client_account_id"	char(36) NOT NULL,
-- 	"created_at"	datetime,
-- 	"updated_at"	datetime,
-- 	FOREIGN KEY("client_account_id") REFERENCES "accounts"("id"),
-- 	FOREIGN KEY("provider_account_id") REFERENCES "accounts"("id"),
-- 	PRIMARY KEY("id")
-- );



SELECT sum(votes),avg(star) from (
    select count(`id`) as `votes`, avg(`star`) as `star` from `votes` where `provider_account_id` = '6c6a546d-429d-4120-b907-4bc782958bb7' group by `id` 
);