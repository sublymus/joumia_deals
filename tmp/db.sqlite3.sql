BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "adonis_schema" (
	"id"	integer NOT NULL,
	"name"	varchar(255) NOT NULL,
	"batch"	integer NOT NULL,
	"migration_time"	datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "adonis_schema_versions" (
	"version"	integer NOT NULL
);
CREATE TABLE IF NOT EXISTS "accounts" (
	"id"	char(36) NOT NULL,
	"name"	varchar(30) NOT NULL,
	"location"	text NOT NULL,
	"email"	text NOT NULL,
	"avatar_url"	text,
	"access_id"	text NOT NULL,
	"phone"	text NOT NULL,
	"acl_id"	char(36),
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("acl_id") REFERENCES "acls"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "lieux" (
	"id"	char(36) NOT NULL,
	"counytry_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"ville"	text NOT NULL,
	"quarter"	text,
	"commune"	text,
	"pointer"	text,
	"descrption"	text,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("account_id") REFERENCES "accounts"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("counytry_id") REFERENCES "countries"("id")
);
CREATE TABLE IF NOT EXISTS "messages" (
	"id"	char(36) NOT NULL,
	"text"	text,
	"group_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("account_id") REFERENCES "accounts"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("group_id") REFERENCES "groups"("id")
);
CREATE TABLE IF NOT EXISTS "groups" (
	"id"	char(36) NOT NULL,
	"name"	text,
	"description"	text,
	"isDiscussion"	boolean NOT NULL,
	"product_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id"),
	FOREIGN KEY("product_id") REFERENCES "products"("id")
);
CREATE TABLE IF NOT EXISTS "members" (
	"id"	char(36) NOT NULL,
	"rules_id"	char(36) NOT NULL,
	"group_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("rules_id") REFERENCES "rules"("id"),
	FOREIGN KEY("group_id") REFERENCES "groups"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "rules" (
	"id"	char(36) NOT NULL,
	"name"	text NOT NULL,
	"change_group_info"	boolean NOT NULL,
	"delete_messages"	boolean NOT NULL,
	"ban_users"	boolean NOT NULL,
	"invite_user_via_link"	boolean NOT NULL,
	"pin_message"	boolean NOT NULL,
	"remain_anonymous"	boolean NOT NULL,
	"add_new_admins"	boolean NOT NULL,
	"send_message"	boolean NOT NULL,
	"send_file"	boolean NOT NULL,
	"add_member"	boolean NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "reports" (
	"id"	char(36) NOT NULL,
	"message"	text NOT NULL,
	"product_id"	char(36) NOT NULL,
	"client_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("client_account_id") REFERENCES "accounts"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("product_id") REFERENCES "products"("id")
);
CREATE TABLE IF NOT EXISTS "favorites_account_products" (
	"product_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("product_id") REFERENCES "products"("id"),
	FOREIGN KEY("account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "favorites_client_providers" (
	"my_account_id"	char(36) NOT NULL,
	"other_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("other_account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("my_account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "visited_client_providers" (
	"client_account"	char(36) NOT NULL,
	"provider_account"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("provider_account") REFERENCES "accounts"("id"),
	FOREIGN KEY("client_account") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "visited_account_products" (
	"product_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("product_id") REFERENCES "products"("id")
);
CREATE TABLE IF NOT EXISTS "recommendation_account_product_receivers" (
	"recommendation_id"	char(36) NOT NULL,
	"receiver_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("receiver_account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("recommendation_id") REFERENCES "recommendation_products"("id")
);
CREATE TABLE IF NOT EXISTS "recommendation_client_account_receivers" (
	"recommendation_id"	char(36) NOT NULL,
	"receiver_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("receiver_account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("recommendation_id") REFERENCES "recommendation_client_providers"("id")
);
CREATE TABLE IF NOT EXISTS "recommendation_client_accounts" (
	"other_account_id"	char(36) NOT NULL,
	"my_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("other_account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("my_account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "recommendation_products" (
	"product_id"	char(36) NOT NULL,
	"my_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("my_account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("product_id") REFERENCES "products"("id")
);
CREATE TABLE IF NOT EXISTS "votes" (
	"id"	char(36) NOT NULL,
	"star"	integer NOT NULL,
	"provider_account_id"	char(36) NOT NULL,
	"client_account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id"),
	FOREIGN KEY("client_account_id") REFERENCES "account"("id"),
	FOREIGN KEY("provider_account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	char(36) NOT NULL,
	"title"	text NOT NULL,
	"subtitle"	text NOT NULL,
	"price"	integer NOT NULL,
	"description"	text NOT NULL,
	"status"	integer NOT NULL,
	"express_time"	datetime,
	"last_appearance"	datetime,
	"caracteristique"	json,
	"moderator_id"	char(36),
	"category_id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("moderator_id") REFERENCES "moderators"("id"),
	FOREIGN KEY("account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	char(36) NOT NULL,
	"label"	text NOT NULL,
	"caracteristique_field"	json,
	"parent_category_id"	char(36),
	"is_parentable"	boolean,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id"),
	FOREIGN KEY("parent_category_id") REFERENCES "categories"("id")
);
CREATE TABLE IF NOT EXISTS "transactions" (
	"id"	char(36) NOT NULL,
	"mode"	text NOT NULL,
	"price"	integer NOT NULL,
	"currency"	text NOT NULL,
	"country_id"	text NOT NULL,
	"frais_entrant"	text NOT NULL,
	"payment_reference"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	FOREIGN KEY("account_id") REFERENCES "accounts"("id"),
	FOREIGN KEY("country_id") REFERENCES "countries"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("payment_reference") REFERENCES "payment_references"("id")
);
CREATE TABLE IF NOT EXISTS "payment_references" (
	"id"	char(36) NOT NULL,
	"mode"	text NOT NULL,
	"sum"	char(36) NOT NULL,
	"payement_refences"	text NOT NULL,
	"method_payment"	text NOT NULL,
	"transaction_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id"),
	FOREIGN KEY("transaction_id") REFERENCES "payment_references"("id")
);
CREATE TABLE IF NOT EXISTS "moderators" (
	"id"	char(36) NOT NULL,
	"name"	text NOT NULL,
	"_key"	text NOT NULL,
	"phone"	text NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "admins" (
	"id"	char(36) NOT NULL,
	"pseudo"	text NOT NULL,
	"password"	text NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "file" (
	"id"	char(36) NOT NULL,
	"extension"	text NOT NULL,
	"mine"	text NOT NULL,
	"url"	text NOT NULL,
	"label"	text NOT NULL,
	"size"	integer NOT NULL,
	"table_name"	text NOT NULL,
	"table_id"	char(36) NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "countries" (
	"id"	char(36) NOT NULL,
	"name"	text NOT NULL,
	"currency"	json NOT NULL,
	"language"	json NOT NULL,
	"payment_method"	json NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "acls" (
	"id"	char(36) NOT NULL,
	"account_id"	char(36) NOT NULL,
	"post"	boolean NOT NULL,
	"report"	boolean NOT NULL,
	"create_product"	boolean NOT NULL,
	"baned"	boolean NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id"),
	FOREIGN KEY("account_id") REFERENCES "accounts"("id")
);
CREATE TABLE IF NOT EXISTS "access_oauths" (
	"id"	char(36) NOT NULL,
	"auth_table_name"	varchar(255),
	"auth_table_id"	varchar(255),
	"init_id"	varchar(255),
	"oauth_provider_name"	varchar(255) NOT NULL,
	"original_id"	varchar(255) NOT NULL,
	"oauth_client_unique"	varchar(255) NOT NULL,
	"password"	varchar(180) NOT NULL,
	"remember_me_token"	varchar(255),
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "api_tokens" (
	"id"	integer NOT NULL,
	"user_id"	integer,
	"name"	varchar(255) NOT NULL,
	"type"	varchar(255) NOT NULL,
	"token"	varchar(64) NOT NULL,
	"expires_at"	datetime,
	"created_at"	datetime NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "access_oauths"("id") on delete CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "adonis_schema" VALUES (1,'database/migrations/1706781946085_accounts',1,'2024-02-07 17:52:00'),
 (2,'database/migrations/1706782007272_lieux',1,'2024-02-07 17:52:00'),
 (3,'database/migrations/1706782052895_messages',1,'2024-02-07 17:52:00'),
 (4,'database/migrations/1706782064690_groups',1,'2024-02-07 17:52:00'),
 (5,'database/migrations/1706782078116_members',1,'2024-02-07 17:52:00'),
 (6,'database/migrations/1706782100264_rules',1,'2024-02-07 17:52:00'),
 (7,'database/migrations/1706782170801_reports',1,'2024-02-07 17:52:00'),
 (8,'database/migrations/1706782298173_favorites_account_products',1,'2024-02-07 17:52:00'),
 (9,'database/migrations/1706782323233_favorites_client_providers',1,'2024-02-07 17:52:00'),
 (10,'database/migrations/1706782335707_visited_client_providers',1,'2024-02-07 17:52:00'),
 (11,'database/migrations/1706782350094_visited_account_products',1,'2024-02-07 17:52:00'),
 (12,'database/migrations/1706782414848_recommendation_account_product_receivers',1,'2024-02-07 17:52:00'),
 (13,'database/migrations/1706782441698_recommendation_client_account_receivers',1,'2024-02-07 17:52:00'),
 (14,'database/migrations/1706782455050_recommendation_client_accounts',1,'2024-02-07 17:52:00'),
 (15,'database/migrations/1706782464937_recommendation_products',1,'2024-02-07 17:52:00'),
 (16,'database/migrations/1706782509104_votes',1,'2024-02-07 17:52:00'),
 (17,'database/migrations/1706782563488_products',1,'2024-02-07 17:52:01'),
 (18,'database/migrations/1706782595404_categories',1,'2024-02-07 17:52:01'),
 (19,'database/migrations/1706782622200_transactions',1,'2024-02-07 17:52:01'),
 (20,'database/migrations/1706782644856_payment_references',1,'2024-02-07 17:52:01'),
 (21,'database/migrations/1706782669894_moderators',1,'2024-02-07 17:52:01'),
 (22,'database/migrations/1706782677885_admins',1,'2024-02-07 17:52:01'),
 (23,'database/migrations/1706782753000_file',1,'2024-02-07 17:52:01'),
 (24,'database/migrations/1706784167515_countries',1,'2024-02-07 17:52:01'),
 (25,'database/migrations/1706784229652_acls',1,'2024-02-07 17:52:01'),
 (26,'database/migrations/1707016148720_access_oauths',1,'2024-02-07 17:52:01'),
 (27,'database/migrations/1707016148729_api_tokens',1,'2024-02-07 17:52:01');
INSERT INTO "adonis_schema_versions" VALUES (2);
INSERT INTO "accounts" VALUES ('cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','Opus Opus','Abidjan Bingerville','sublymus@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJ6hVgh-aQAw0ouG9G2rtHxuEsbShW7JWoRZUbgDqeJqw=s96-c','615844cb-96e6-4d28-a183-64239a7cbd28','0759929515',NULL,'2024-02-07 20:52:38','2024-02-07 20:52:38'),
 ('f582030a-be65-4a42-ae09-6e30eca1d6bf','opas opas','Abidjan Bingerville','sablymus@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocKdMMXaPql66fbyzuxiV4xy1eK4_ZwgeguIDHRAOWrBIQ=s96-c','70cc3d70-536c-497d-8b8d-c5e3ca545739','4444444444',NULL,'2024-02-08 10:36:08','2024-02-08 10:36:08');
INSERT INTO "recommendation_client_accounts" VALUES ('cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:33:51','2024-02-08 10:33:51'),
 ('f582030a-be65-4a42-ae09-6e30eca1d6bf','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:36:35','2024-02-08 10:36:35'),
 ('f582030a-be65-4a42-ae09-6e30eca1d6bf','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:49:50','2024-02-08 10:49:50'),
 ('f582030a-be65-4a42-ae09-6e30eca1d6bf','f582030a-be65-4a42-ae09-6e30eca1d6bf','2024-02-08 11:03:55','2024-02-08 11:03:55'),
 ('cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','f582030a-be65-4a42-ae09-6e30eca1d6bf','2024-02-08 11:05:04','2024-02-08 11:05:04'),
 ('cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','f582030a-be65-4a42-ae09-6e30eca1d6bf','2024-02-08 11:22:33','2024-02-08 11:22:33');
INSERT INTO "recommendation_products" VALUES ('962327b6-b851-4d3d-a94c-d3dbd72b7190','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:41:01','2024-02-08 10:41:01'),
 ('e95b5355-8d22-46e4-948c-c66fab5e9908','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:41:33','2024-02-08 10:41:33'),
 ('3713d5b9-396a-4771-b3fb-d2198ef2f24a','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 10:41:49','2024-02-08 10:41:49'),
 ('3713d5b9-396a-4771-b3fb-d2198ef2f24a','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-08 11:34:03','2024-02-08 11:34:03'),
 ('3713d5b9-396a-4771-b3fb-d2198ef2f24a','f582030a-be65-4a42-ae09-6e30eca1d6bf','2024-02-08 12:23:18','2024-02-08 12:23:18');
INSERT INTO "products" VALUES ('962327b6-b851-4d3d-a94c-d3dbd72b7190','la firste grillard','t''a pas croire',40,'il n''y a pas mieux',0,'2024-02-07 21:33:08','2024-02-07 21:33:08','new',NULL,'3d2f0ce1-0d10-48dd-a7ca-1d337fcbeaec','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-07 21:33:08','2024-02-07 21:33:08'),
 ('e95b5355-8d22-46e4-948c-c66fab5e9908','le poulet de france','zoo poulet',40,'il n''y a pas mieux',0,'2024-02-07 21:35:05','2024-02-07 21:35:05','new',NULL,'55f9d8b4-f3fc-4820-87b2-ec215c8f7ec1','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-07 21:35:05','2024-02-07 21:35:05'),
 ('3713d5b9-396a-4771-b3fb-d2198ef2f24a','number one du poulet','c''est doux dans pain',40,'il n''y a pas mieux',0,'2024-02-07 21:35:46','2024-02-07 21:35:46','new',NULL,'72d0f314-609e-42e0-a957-f4ed34cb20ba','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b','2024-02-07 21:35:46','2024-02-07 21:35:46');
INSERT INTO "categories" VALUES ('7e17e72e-5802-402e-952a-80f49b078333','Food','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]',NULL,0,'2024-02-07 20:58:09','2024-02-07 20:58:09'),
 ('3d2f0ce1-0d10-48dd-a7ca-1d337fcbeaec','Grillard','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','7e17e72e-5802-402e-952a-80f49b078333',1,'2024-02-07 20:59:30','2024-02-07 20:59:30'),
 ('1a3cdf76-2508-41b8-85ad-0d5bcd70d372','Soupe','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','7e17e72e-5802-402e-952a-80f49b078333',1,'2024-02-07 20:59:40','2024-02-07 20:59:40'),
 ('1b345364-466b-4774-9cda-1a953e3f316c','Salade','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','7e17e72e-5802-402e-952a-80f49b078333',1,'2024-02-07 20:59:49','2024-02-07 20:59:49'),
 ('162268ac-52fc-4fda-92fe-779c2ffff095','Verte','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','1b345364-466b-4774-9cda-1a953e3f316c',1,'2024-02-07 21:00:48','2024-02-07 21:00:48'),
 ('9fbd5d27-8e2b-4203-bb71-ec655fabf21d','Choux','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','1b345364-466b-4774-9cda-1a953e3f316c',1,'2024-02-07 21:00:59','2024-02-07 21:00:59'),
 ('f8939e1d-1965-4933-8172-49ea907bbae8','blanc','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','9fbd5d27-8e2b-4203-bb71-ec655fabf21d',1,'2024-02-07 21:01:15','2024-02-07 21:04:00'),
 ('8c581c05-c781-4190-a83a-561a2438872e','noire','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','9fbd5d27-8e2b-4203-bb71-ec655fabf21d',1,'2024-02-07 21:04:14','2024-02-07 21:04:14'),
 ('344bc5f7-4daf-464c-81ca-59a1e7ddda8c','Alloco','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','3d2f0ce1-0d10-48dd-a7ca-1d337fcbeaec',1,'2024-02-07 21:26:00','2024-02-07 21:26:00'),
 ('c57de8be-1c07-4662-a9e9-5e0276222464','Frite','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','3d2f0ce1-0d10-48dd-a7ca-1d337fcbeaec',1,'2024-02-07 21:26:12','2024-02-07 21:26:12'),
 ('c5934ae2-9680-4a29-8894-0de311c77c86','Jaune','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','c57de8be-1c07-4662-a9e9-5e0276222464',1,'2024-02-07 21:26:38','2024-02-07 21:26:38'),
 ('6e945275-ef1b-4c73-8ee9-f17c51aaa86c','Dure','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','c57de8be-1c07-4662-a9e9-5e0276222464',1,'2024-02-07 21:27:07','2024-02-07 21:27:07'),
 ('4a01fd55-ee57-46ec-b7d8-5848b2978478','Boeuf','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','1a3cdf76-2508-41b8-85ad-0d5bcd70d372',1,'2024-02-07 21:28:17','2024-02-07 21:28:17'),
 ('7bef03ae-7323-433f-801f-fb08487186fe','Poulet','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','1a3cdf76-2508-41b8-85ad-0d5bcd70d372',1,'2024-02-07 21:28:25','2024-02-07 21:28:25'),
 ('55f9d8b4-f3fc-4820-87b2-ec215c8f7ec1','Ivoire','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','7bef03ae-7323-433f-801f-fb08487186fe',1,'2024-02-07 21:28:47','2024-02-07 21:28:47'),
 ('72d0f314-609e-42e0-a957-f4ed34cb20ba','Fouanie','[{"type":"string","name":"noga","placeholder":"by ng","field":"textarea","require":true,"icon":"url","uppercase":true,"capitalize":true,"trim":true,"match":["regexString","i"],"enum":["azerty","piokioulou"],"minLength":10,"maxLength":100},{"type":"booean","name":"isValid","placeholder":"is Valid product","field":"input","require":true,"default":false,"icon":"url"},{"type":"number","name":"volume","placeholder":"Volume","field":"input","require":true,"default":30,"icon":"url","enum":[30,50,75],"min":30,"max":75},{"type":"date","name":"date d''acquisition","placeholder":"yyyy-mm-dd","field":"input","require":true,"default":"2024-02-05","icon":"url","min":"2024-02-01","max":"2024-02-14"},{"type":"files","name":"piscture","placeholder":"picture","field":"input","require":true,"min":1,"max":100,"maxSize":1000000,"mime":["image/png",["video/mp4",12000000]]}]','7bef03ae-7323-433f-801f-fb08487186fe',1,'2024-02-07 21:28:55','2024-02-07 21:28:55');
INSERT INTO "access_oauths" VALUES ('615844cb-96e6-4d28-a183-64239a7cbd28','accounts','cb4fc999-5b66-4abc-a1a9-7e7ea2f32a3b',NULL,'google','107985695692135018977','sublymus@gmail.com','$scrypt$n=16384,r=8,p=1$5MKEhEJSxTkFUcfkme4Ehw$SVQZihLWu/8JuHvSMXmrYj1+gJFwxfI5Ni5I5zCdqKzwtxAiPXTkkA4La8OQ6jpZZGOcEyrVTljZoTOZjSBVxA',NULL,'2024-02-07 20:52:22','2024-02-07 20:52:22'),
 ('70cc3d70-536c-497d-8b8d-c5e3ca545739','accounts','f582030a-be65-4a42-ae09-6e30eca1d6bf',NULL,'google','116218946430053054276','sablymus@gmail.com','$scrypt$n=16384,r=8,p=1$rUQMGioGefGUR7Ua1ySFkg$3YOIBpV+bchpB1+1kBgHmr9SBwabILhsMQce9zAAn/DzQZlWVwCX0WW91/f+nP0evAHEadqA8L2MyIlj0D1Z2Q',NULL,'2024-02-08 10:36:02','2024-02-08 10:36:02');
INSERT INTO "api_tokens" VALUES (1,'615844cb-96e6-4d28-a183-64239a7cbd28','Opaque Access Token','api','f34e6d022ff64e7fb820c17473bdcc1f0e3d4e5f9ad4add67f22f2fd5c002964',NULL,'2024-02-07 20:52:39'),
 (2,'615844cb-96e6-4d28-a183-64239a7cbd28','Opaque Access Token','api','8ca56be8215a75ebc12dae3e4f71f6ae7a0bbcdfc4957be04717382355cbd3e1',NULL,'2024-02-07 20:55:38'),
 (3,'615844cb-96e6-4d28-a183-64239a7cbd28','Opaque Access Token','api','42506f5897a37f09fbb9d58ffe162c2ca7c4f57a8a8772d3b66dc8a67b3a92e2',NULL,'2024-02-08 10:16:47'),
 (4,'615844cb-96e6-4d28-a183-64239a7cbd28','Opaque Access Token','api','54751d3f039ab3066c90ac272d16e2c5744cc20f9c59bea802018c44dbb2994c',NULL,'2024-02-08 10:27:30'),
 (5,'70cc3d70-536c-497d-8b8d-c5e3ca545739','Opaque Access Token','api','ec785440c11889ee59f5e31e8b0b7c537ce2cb52c96bcbfe7034ae238a238f38',NULL,'2024-02-08 10:36:08');
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_email_unique" ON "accounts" (
	"email"
);
CREATE UNIQUE INDEX IF NOT EXISTS "access_oauths_oauth_client_unique_unique" ON "access_oauths" (
	"oauth_client_unique"
);
CREATE UNIQUE INDEX IF NOT EXISTS "api_tokens_token_unique" ON "api_tokens" (
	"token"
);
COMMIT;
