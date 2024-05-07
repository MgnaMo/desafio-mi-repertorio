const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "repertorio",
    password: "7589",
    port: 5432,
});

const consultaInsertarCancion = 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)';
const consultaObtenerCanciones = 'SELECT * FROM canciones';
const consultaActualizarCancion = 'UPDATE canciones SET artista = $1, tono = $2 WHERE id = $3';
const consultaEliminarCancion = 'DELETE FROM canciones WHERE id = $1';

const postSongs = async (titulo, artista, tono) => {
    try {
        await pool.query(consultaInsertarCancion, [titulo, artista, tono]);
    } catch (error) {
        console.error("Error al agregar canción: ", error);
        throw error;
    }
};

const getSongs = async () => {
    try {
        const result = await pool.query(consultaObtenerCanciones);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener canciones: ", error);
        throw error;
    }
};

const putSongs = async (artista, tono, id) => {
    try {
        await pool.query(consultaActualizarCancion, [artista, tono, id]);
    } catch (error) {
        console.error("Error al actualizar canción: ", error);
        throw error;
    }
};

const deleteSongs = async (id) => {
    try {
        await pool.query(consultaEliminarCancion, [id]);
    } catch (error) {
        console.error("Error al eliminar canción: ", error);
        throw error;
    }
};

module.exports = { postSongs, getSongs, putSongs, deleteSongs }