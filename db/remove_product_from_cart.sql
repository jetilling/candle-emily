DELETE FROM cart
WHERE user_token = $2 AND products_id = $1
