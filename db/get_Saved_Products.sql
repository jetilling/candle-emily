SELECT cart.products_id, cart.quantity, cart.price, products.price, products.description, products.name
FROM cart
JOIN products ON products.id = cart.products_id
WHERE cart.user_token = $1;
