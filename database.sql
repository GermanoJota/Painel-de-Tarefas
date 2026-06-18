CREATE TABLE usuario(
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  dataCriacao TIMESTAMP
);
-- CREATE TABLE usuario(
--   id SERIAL PRIMARY KEY,
--   titulo VARCHAR(100) NOT NULL,
--   descricao VARCHAR(200) NOT NULL,
--   dataCriacao TIMESTAMP
-- );

  ALTER TABLE tarefas
  RENAME TO tarefa;

-- CREATE TABLE usuario(
--   id SERIAL PRIMARY KEY,
--   titulo VARCHAR(100) NOT NULL,
--   descricao VARCHAR(200) NOT NULL,
--   dataCriacao TIMESTAMP
-- );

  ALTER TABLE tarefa
  RENAME TO tarefas;

-- CREATE TABLE usuario(
--   id SERIAL PRIMARY KEY,
--   titulo VARCHAR(100) NOT NULL,
--   descricao VARCHAR(200) NOT NULL,
--   dataCriacao TIMESTAMP
-- );

-- ALTER TABLE usuario
-- RENAME TO tarefas;

INSERT INTO tarefas (titulo, descricao) 
VALUES ('titulo', 'descrição')




-- CREATE TABLE usuario(
--   id SERIAL PRIMARY KEY,
--   titulo VARCHAR(100) NOT NULL,
--   descricao VARCHAR(200) NOT NULL,
--   dataCriacao TIMESTAMP
-- );

-- ALTER TABLE usuario
-- RENAME TO tarefas;

-- INSERT INTO tarefas (titulo, descricao) 
-- VALUES ('titulo', 'descrição')


SELECT * FROM tarefas ORDER BY criado_em DESC


-- ALTER TABLE tarefas
-- ALTER COLUMN criado_em TYPE TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

CREATE OR REPLACE FUNCTION atualiza_timestamp_coluna()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
--ezequiel pesquisa

TRUNCATE TABLE tarefas;

TRUNCATE TABLE tarefas;

TRUNCATE TABLE tarefas;

SELECT * FROM tarefas 
ORDER BY urgencia DESC

SELECT * FROM tarefas 
ORDER BY ('Urgente', 'Não Urgente', 'Normal')

SELECT * FROM tarefas 
ORDER BY urgencia

SELECT * FROM tarefas 
WHERE urgencia = 'Não Urgente';


TRUNCATE TABLE tarefas;
