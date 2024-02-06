-- DELETE FROM  access_oauths; 
-- DELETE FROM  accounts;
-- SELECT * FROM categories; 
-- SELECT * FROM accounts; 
-- SELECT * FROM products; 


SELECT * FROM accounts, products WHERE products.account_id = accounts.id AND products.id IN ('5d231a71-cab1-4deb-9063-37b811acacc8' );

