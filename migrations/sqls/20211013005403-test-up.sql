/* Replace with your SQL commands */
-- Table: public.users

CREATE TABLE public.users
(
    id serial NOT NULL,
    login character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_login_key UNIQUE (login)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

-- Table: public.authors

CREATE TABLE public.authors
(
    id serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    patronymic character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT authors_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.authors
    OWNER to postgres;

-- Table: public.images

CREATE TABLE public.images
(
    id serial NOT NULL,
    filename character varying(200) COLLATE pg_catalog."default" NOT NULL,
    ext character varying(5) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT images_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.images
    OWNER to postgres;

-- Table: public.books

-- DROP TABLE public.books;

CREATE TABLE public.books
(
    id serial NOT NULL,
    title character varying(200) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    author integer,
    description character varying(500) COLLATE pg_catalog."default",
    image integer,
    CONSTRAINT books_pkey PRIMARY KEY (id),
    CONSTRAINT books_author_fkey FOREIGN KEY (author)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT books_image_fkey FOREIGN KEY (image)
        REFERENCES public.images (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.books
    OWNER to postgres;
