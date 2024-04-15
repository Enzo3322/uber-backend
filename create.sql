create table account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	car_plate text null,
	is_passenger boolean not null default false,
	is_driver boolean not null default false
);

create table ride (
	ride_id uuid primary key,
	passenger_id uuid not null,
	driver_id uuid,
	status text not null,
	fare numeric not null,
	distance numeric not null,
	from_lat numeric not null,
	from_long numeric not null,
	to_lat numeric not null,
	to_long numeric not null,
	date timestamp not null
);

