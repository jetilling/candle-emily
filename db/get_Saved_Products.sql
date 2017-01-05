SELECT cart.products_id, sum(cart.quantity) AS quantity, max(products.price) AS price, max(products.description) AS description, max(products.name) AS name
FROM cart
JOIN products ON products.id = cart.products_id
WHERE cart.user_token = $1
GROUP BY cart.products_id;
