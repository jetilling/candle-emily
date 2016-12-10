SELECT id, first_name, last_name, email, company, address, apt_num, city, country, state, zipcode
FROM users
WHERE id = $1;
