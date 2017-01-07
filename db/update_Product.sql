UPDATE cart
SET quantity = $2
WHERE products_id = $1;
